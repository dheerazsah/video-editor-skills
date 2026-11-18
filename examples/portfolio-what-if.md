# Worked example: the What-if film on a portfolio site

How the `video-editor` agent is used on a real project: a personal portfolio (Vite, React 19, TypeScript, Tailwind CSS v4, `motion`) with a "What-if" series of product concepts. Episode 01 is a group-rides feature for Google Maps, shown as a launch film. Use it as a pattern; the paths and taste notes belong to that project.

## How the film is built
| Part | Where | Notes |
| --- | --- | --- |
| The film page | `src/features/what-if/showcase.tsx` | Renders at `/what-if/<slug>?film`. |
| The edit | `SCENES` in the same file | Each scene is a shot (`text`, `route`, `screen`, `both`) with a length in ms, a camera (`rx`, `ry`, `rz`, `scale`, `y`), and optional kicker, title (`\n` for line breaks), line, callout, tap, pulse and `sheetAway`. |
| Phone screens | `src/features/what-if/phone-screen.tsx` | `ScreenContent`, with `moving` for riders and `sheetAway` for the bottom sheet. |
| Media | `public/work/what-if/group-rides/` | Overview and ride maps, the owner's own photos (Kathmandu, Pokhara), a QR code. |
| Output | `public/work/reels/group-rides.webm` | Plus a poster JPEG from a snapshot. |

## Recording it
```sh
pnpm dev   # http://localhost:5180
node scripts/record-film.mjs \
  --url "http://localhost:5180/what-if/ride-together?film" \
  --out public/work/reels/group-rides.webm \
  --end "[data-showcase] h1:has-text('Google Maps')" --tail 3 \
  --hide '[aria-label="Back to top"],[aria-label="Cookie preferences"],header nav' \
  --preload /work/what-if/group-rides/overview.jpg,/work/what-if/group-rides/ride.jpg,/work/what-if/group-rides/kathmandu-photo.jpg,/work/what-if/group-rides/pokhara-photo.jpg,/work/what-if/group-rides/qr.svg \
  --snaps scratch/snaps --step 0.25
```
The site also had a cookie banner. The project's own copy of the script set the consent value in `localStorage` before load so the banner never showed; with the general script, hide the banner with `--hide`.

After recording: check snapshot sizes for dead air, look at a few shrunk JPEG frames (first second, every cut, the riding shots, the end card), write the poster, run `pnpm typecheck`, `pnpm lint`, `pnpm build`, and log the change in the project's roadmap.

## The owner's taste (standing feedback for this film)
- A launch film, not a slideshow: sequential, staggered text (word-by-word blur-in), varied moves, the screen growing out of a blur, a 3D camera that tilts and punches in on the part that matters.
- "Introducing" on the first frame. No blank seconds anywhere, especially the start.
- White, light background, no black containers. Blue in moderation: one accent word per headline and the app's own blues, not blue everywhere.
- Headlines in two lines, short, never overlapping the phone. Text-only shots read in one glance.
- No labels on screen-only shots; let the interaction speak. No repeated cards or shots; no floating icons that look like app UI outside the phone.
- Show features as interactions (taps, holds, sheets moving) inside the real app UI, matched to the real Google Maps and iOS look.
- People move inside the film: riders go forward (up the road), slowly but visibly, and the sheet slides away to show the whole group, then comes back up. On the episode page, keep the map still.
- Real material: the real route and map, the owner's own photos. Only photos the owner owns or has licensed.
- End on the question, with the site and "A concept by Dhiraj Kumar Sah Kanu · Not affiliated with Google".

## Project rules that overrode the skills
- React and `motion` only: Remotion, GSAP and Lottie were not installed, and new dependencies needed the owner's approval.
- Theme tokens only: no hard-coded colours or fonts. Geist as the one typeface.
- The episode page respects reduced motion; the film itself is a recording with a poster and a text description beside it.
- No PNG anywhere in checks or delivery.
