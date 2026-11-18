#!/usr/bin/env node
// Records a film that plays in a web page to a VP9 WebM, frame by frame, at a
// steady frame rate, with no blank start.
//
// How it works: the page opens with a "hold" query parameter (default
// `?hold`), which should make it wait on its first frame until
// window.startFilm() is called. Images are warmed first, then Chrome's
// screencast (CDP Page.startScreencast) starts, the film starts, and every
// frame Chrome paints is kept with its timestamp. Those frames are written at
// a steady frame rate from the moment the film started, so the video's timing
// matches the page's, even when Chrome paints unevenly. A page that has no
// start function still records; the clock then starts with the screencast.
//
// Usage:
//   node record-film.mjs --url http://localhost:5173/film --out film.webm \
//     [--end "h1:has-text('The end')"] [--duration 20] [--tail 3] \
//     [--hold hold] [--start startFilm] [--fps 30] [--size 1280x720] \
//     [--bitrate 3M] [--preload /a.jpg,/b.jpg] [--hide "header nav,.cookie"] \
//     [--snaps <dir>] [--step 1]
//
// Flags (defaults in brackets):
//   --url       page that plays the film [http://localhost:5173/]
//   --out       output .webm [film.webm]
//   --hold      query parameter that holds the first frame; "" to skip [hold]
//   --start     name of the window function that starts the film; "" to skip
//               [startFilm]
//   --end       Playwright selector that appears when the film ends; the
//               recording stops --tail seconds after it shows up
//   --duration  seconds to record when there is no --end selector [15]
//   --timeout   seconds to wait for --end before giving up [90]
//   --tail      seconds to hold the last frame after --end appears [3]
//   --fps       output frame rate [30]
//   --size      viewport and video size, WIDTHxHEIGHT [1280x720]
//   --bitrate   VP9 target bitrate [3M]
//   --preload   extra image URLs to decode before recording, comma separated
//               (every <img> already on the page is warmed anyway)
//   --hide      CSS selectors to hide (site chrome, banners), comma separated
//   --snaps     also write one JPEG per --step seconds of film into this
//               folder (s00.jpg, s01.jpg, … or s04.50.jpg for fractional
//               steps), for checking the cut without decoding the video
//   --step      seconds between snapshots [1]
//
// Checking the cut: snapshot file sizes find dead air. A near-blank 1280x720
// JPEG is under ~15 KB; one dip at a cut is fine, two or more in a row is a
// blank stretch. Look at a few snapshots only, shrunk (e.g. `sips -Z 400` on
// macOS), never as PNG.
//
// Needs Playwright (`npm i -D playwright`) with its Chromium and ffmpeg:
// `npx playwright install chromium ffmpeg`. Playwright's ffmpeg only decodes
// MJPEG and encodes VP9, and has no pipe protocol, so frames go in through
// file:/dev/stdin (macOS and Linux). Set FFMPEG=<path> to use another ffmpeg,
// and CHROME=<path> to use a specific Chromium build.
import { spawn } from "node:child_process"
import { existsSync, mkdirSync, readdirSync, writeFileSync } from "node:fs"
import { homedir, platform } from "node:os"
import { join } from "node:path"
import { parseArgs } from "node:util"
import { chromium } from "playwright"

const { values: opt } = parseArgs({
  options: {
    url: { type: "string", default: "http://localhost:5173/" },
    out: { type: "string", default: "film.webm" },
    hold: { type: "string", default: "hold" },
    start: { type: "string", default: "startFilm" },
    end: { type: "string" },
    duration: { type: "string", default: "15" },
    timeout: { type: "string", default: "90" },
    tail: { type: "string", default: "3" },
    fps: { type: "string", default: "30" },
    size: { type: "string", default: "1280x720" },
    bitrate: { type: "string", default: "3M" },
    preload: { type: "string", default: "" },
    hide: { type: "string", default: "" },
    snaps: { type: "string" },
    step: { type: "string", default: "1" },
  },
})
const FPS = Number(opt.fps)
const [WIDTH, HEIGHT] = opt.size.split("x").map(Number)
const step = Number(opt.step)
if (!FPS || !WIDTH || !HEIGHT || !step)
  throw new Error("Check --fps, --size (WIDTHxHEIGHT) and --step")

const url = new URL(opt.url)
if (opt.hold) url.searchParams.set(opt.hold, "")
// `?film&hold` reads better than `?film=&hold=`.
const pageUrl = url.toString().replace(/=(?=&|$)/g, "")

// Playwright's own ffmpeg build, unless FFMPEG is set.
function playwrightFfmpeg() {
  const cache =
    process.env.PLAYWRIGHT_BROWSERS_PATH ||
    {
      darwin: join(homedir(), "Library/Caches/ms-playwright"),
      win32: join(homedir(), "AppData/Local/ms-playwright"),
    }[platform()] ||
    join(homedir(), ".cache/ms-playwright")
  if (!existsSync(cache)) return undefined
  const dir = readdirSync(cache)
    .filter((name) => name.startsWith("ffmpeg-"))
    .sort()
    .at(-1)
  if (!dir) return undefined
  const bin = { darwin: "ffmpeg-mac", win32: "ffmpeg-win64.exe" }[platform()]
  return join(cache, dir, bin || "ffmpeg-linux")
}
const FFMPEG = process.env.FFMPEG || playwrightFfmpeg()
if (!FFMPEG || !existsSync(FFMPEG))
  throw new Error(
    "No ffmpeg: run `npx playwright install ffmpeg` or set FFMPEG=<path>"
  )

const browser = await chromium.launch({
  executablePath: process.env.CHROME || undefined,
})
const context = await browser.newContext({
  viewport: { width: WIDTH, height: HEIGHT },
})
const page = await context.newPage()
const errors = []
page.on("pageerror", (error) => errors.push(String(error)))
await page.goto(pageUrl, { waitUntil: "networkidle" })
if (opt.hide)
  await page.addStyleTag({
    content: `${opt.hide} { display: none !important }`,
  })

// Warm every image the film uses, so nothing pops in late. Anything slow on
// mount still shows up as blank frames: measure it in the page, don't blame
// the recorder.
const preload = opt.preload
  .split(",")
  .map((src) => src.trim())
  .filter(Boolean)
await page.evaluate(async (extra) => {
  const sources = new Set(
    [...document.querySelectorAll("img")].map((image) => image.src)
  )
  for (const src of extra) sources.add(src)
  for (const src of sources) {
    const image = new Image()
    image.src = src
    await image.decode().catch(() => {})
  }
}, preload)
await page.waitForTimeout(500)

const cdp = await context.newCDPSession(page)
const frames = []
cdp.on("Page.screencastFrame", async (frame) => {
  frames.push({
    t: frame.metadata.timestamp,
    data: Buffer.from(frame.data, "base64"),
  })
  await cdp
    .send("Page.screencastFrameAck", { sessionId: frame.sessionId })
    .catch(() => {})
})
await cdp.send("Page.startScreencast", {
  format: "jpeg",
  quality: 92,
  maxWidth: WIDTH,
  maxHeight: HEIGHT,
})
await page.waitForTimeout(150)
const startedAt = Date.now() / 1000
const started = opt.start
  ? await page.evaluate((name) => {
      const start = window[name]
      if (typeof start !== "function") return false
      start()
      return true
    }, opt.start)
  : false
if (opt.start && !started)
  console.warn(`No window.${opt.start}(); recording from the screencast start`)

if (opt.end) {
  await page
    .locator(opt.end)
    .first()
    .waitFor({ timeout: Number(opt.timeout) * 1000 })
  await page.waitForTimeout(Number(opt.tail) * 1000)
} else {
  await page.waitForTimeout(Number(opt.duration) * 1000)
}
await cdp.send("Page.stopScreencast")
await browser.close()
if (!frames.length) throw new Error("Chrome painted no frames")

// A steady frame rate from the moment the film started: each output frame
// is the latest frame Chrome had painted by then.
const start = Math.max(startedAt, frames[0].t)
const end = frames.at(-1).t
const encoder = spawn(
  FFMPEG,
  [
    ...["-y", "-f", "image2pipe", "-c:v", "mjpeg", "-framerate", String(FPS)],
    ...["-i", "file:/dev/stdin", "-c:v", "libvpx-vp9", "-b:v", opt.bitrate],
    ...["-pix_fmt", "yuv420p", "-row-mt", "1", "-deadline", "good"],
    ...["-cpu-used", "4", opt.out],
  ],
  { stdio: ["pipe", "ignore", "pipe"] }
)
let log = ""
encoder.stderr.on("data", (chunk) => (log += chunk))
encoder.stdin.on("error", () => {})
let at = 0
let written = 0
for (let t = start; t <= end; t += 1 / FPS) {
  while (at + 1 < frames.length && frames[at + 1].t <= t) at++
  if (!encoder.stdin.write(frames[at].data))
    await new Promise((resolve) => encoder.stdin.once("drain", resolve))
  written++
}
encoder.stdin.end()
const code = await new Promise((resolve) => encoder.on("close", resolve))

// Snapshots come straight from Chrome's JPEG frames (the encoder can't write
// stills), named by their time in the film.
if (opt.snaps) {
  mkdirSync(opt.snaps, { recursive: true })
  let index = 0
  for (let k = 0; start + k * step <= end; k++) {
    const t = k * step
    while (index + 1 < frames.length && frames[index + 1].t <= start + t)
      index++
    const name =
      step === 1
        ? `s${String(t).padStart(2, "0")}.jpg`
        : `s${t.toFixed(2).padStart(5, "0")}.jpg`
    writeFileSync(join(opt.snaps, name), frames[index].data)
  }
}

console.log(
  `${opt.out}: ${written} frames at ${FPS} fps = ${(written / FPS).toFixed(1)} s`,
  errors.length ? `| page errors: ${errors.join("; ")}` : "",
  code ? `| ffmpeg failed: ${log.slice(-400)}` : ""
)
if (code || errors.length) process.exit(1)
