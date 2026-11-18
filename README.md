# video-editor-skills

A **video editor and motion designer agent** for [Claude Code](https://claude.com/claude-code), with 62 motion and video skills and a browser film recorder.

The agent plans, builds, re-cuts, records and reviews product and launch films made in code: a web page plays the film, and `scripts/record-film.mjs` records it from Chrome to a steady 30 fps WebM, with JPEG snapshots for checking the cut without watching it.

## What's inside
| Path | What it is |
| --- | --- |
| `agents/video-editor.md` | The agent: role, how films are made, recording and checking method, craft rules, skills index. |
| `skills/` | 62 skills, copied unchanged from their sources (see `THIRD_PARTY.md`). |
| `scripts/record-film.mjs` | Records a film page to VP9 WebM via Playwright and Chrome's screencast, with optional snapshots. |
| `examples/portfolio-what-if.md` | A worked example: a launch film for a product concept on a portfolio site. |
| `.claude-plugin/` | Plugin and marketplace manifests, so the repo installs as a Claude Code plugin. |

## Skills
Grouped as the agent uses them. Every skill folder is `skills/<name>/SKILL.md`.

<!--
To add a skill:
1. Copy its folder into skills/ unchanged.
2. Add a row to the right group below (or start a new group): name, one line, source.
3. Add its source, commit and licence to THIRD_PARTY.md.
4. Add it to the skills index in agents/video-editor.md.
5. Update the skill count in this README, plugin.json and marketplace.json.
-->

### Direction and timing
| Skill | What it's for | Source |
| --- | --- | --- |
| `motion-art-direction` | Motion language, tone, pacing and restraint across a piece | motion-design-skills |
| `animation-principles` | Easing, timing, overshoot and stagger that feel natural | motion-design-skills |
| `shot-composition` | Grids, safe areas, focal points, camera moves, aspect ratios | motion-design-skills |
| `beat-sync-editing` | Cutting to the beat, transitions, speed ramps, edit plans | motion-design-skills |
| `color-motion` | Palettes, gradients, perceptual colour interpolation, grading | motion-design-skills |

### Product and launch films
| Skill | What it's for | Source |
| --- | --- | --- |
| `product-demo-video` | Animated demos from screenshots: frames, cursor, zooms, callouts | ecommerce-video-skills |
| `launch-video` | Hook, tease, reveal, montage and end-card launch films | ad-video-skills |
| `explainer-video` | Script, storyboard, narration and caption sync for explainers | explainer-video-skills |
| `ad-creative-video` | Video ads and batches of A/B variants in several aspect ratios | ad-video-skills |
| `promo-video` | Sale and offer videos: discount reveals, promo codes, urgency | ecommerce-video-skills |

### Type and text
| Skill | What it's for | Source |
| --- | --- | --- |
| `kinetic-typography` | Headline animation, split-text reveals, title cards | kinetic-typography-skills |
| `caption-animation` | Word-by-word and karaoke captions, burn-in or sidecar | tiktok-video-skills |
| `lower-thirds` | Name and title overlays with enter and exit timing | tiktok-video-skills |
| `text-message-animation` | Chat conversation videos from a messages array | text-message-video-skills |

### Maps, diagrams and data
| Skill | What it's for | Source |
| --- | --- | --- |
| `map-animation` | Editorial map zooms, routes, pins and region highlights | map-animation-skills |
| `diagram-animation` | Flowcharts and architecture diagrams that reveal step by step | explainer-video-skills |
| `chart-animation` | Bar chart races, counters and charts from a CSV | data-animation-skills |
| `animated-infographic` | Designed infographics that animate in sequence | data-animation-skills |
| `isometric-animation` | 2.5D isometric scenes and exploded diagrams | explainer-video-skills |
| `wrapped-video` | Year-in-review recap videos | explainer-video-skills |

### Web motion
| Skill | What it's for | Source |
| --- | --- | --- |
| `micro-interaction` | Hover, press, toggles, toasts, drawers and layout transitions | web-animation-skills |
| `svg-animation` | Line draw-on, morphing, motion along a path | web-animation-skills |
| `60fps-animation` | Fixing janky animation with transform-only motion and FLIP | web-animation-skills |
| `accessible-animation` | Reduced-motion patterns in CSS and JS | web-animation-skills |
| `page-transition-animation` | Route transitions with View Transitions and Framer Motion | web-animation-skills |
| `gsap-web` | GSAP timelines, ScrollTrigger, SplitText, Flip, smooth scroll | web-animation-skills |
| `lottie-animation` | Playing, controlling and theming Lottie files | web-animation-skills |
| `glassmorphism` | Frosted and liquid-glass panels with fallbacks | web-animation-skills |
| `motion-background` | Mesh, shader and particle backgrounds that loop | motion-design-skills |

### 3D and effects
| Skill | What it's for | Source |
| --- | --- | --- |
| `threejs-animation` | Three.js scenes and camera animation | webgl-animation-skills |
| `shader-glsl` | Fragment shaders, noise, transitions, post-processing | webgl-animation-skills |
| `particle-system` | Confetti, flow fields, constellations, GPU points | webgl-animation-skills |
| `ascii-animation` | ASCII art motion for web and terminal | web-animation-skills |

### Formats
| Skill | What it's for | Source |
| --- | --- | --- |
| `short-form-video` | Reels, TikTok and Shorts: hooks, retention, loops, 9:16 safe areas | tiktok-video-skills |
| `youtube-intro-outro` | Channel intros, outros and end screens | youtube-video-skills |
| `audiogram` | Podcast clips with waveforms and captions | youtube-video-skills |
| `countdown-video` | Frame-accurate countdown timers | tiktok-video-skills |
| `photo-slideshow` | Ken Burns slideshows synced to music | ecommerce-video-skills |
| `presentation-video` | Slide decks rebuilt as narrated motion | data-animation-skills |
| `testimonial-video` | Customer quote and review videos | ad-video-skills |
| `whiteboard-animation` | Hand-drawn whiteboard explainers | explainer-video-skills |
| `logo-animation` | Logo intros, stingers, splash and loader animation | motion-design-skills |

### Tools and delivery
| Skill | What it's for | Source |
| --- | --- | --- |
| `remotion-video` | React video compositions rendered with Remotion | motion-design-skills |
| `after-effects` | Expressions, rigging, export, performance, project hygiene | motion-design-skills |
| `video-delivery-specs` | Codecs, bitrates and platform delivery specs | freelance-motion-skills |

### Briefs and clients
| Skill | What it's for | Source |
| --- | --- | --- |
| `creative-brief` | Turning a vague ask into a sign-off-ready brief | freelance-motion-skills |
| `client-revisions` | Revision caps, feedback translation, change orders | freelance-motion-skills |
| `motion-pricing` | Quotes, day rates and cost drivers | freelance-motion-skills |
| `brand-motion-guidelines` | A brand motion system: easing and timing tokens, rules | freelance-motion-skills |

### Video tools and QA
| Skill | What it's for | Source |
| --- | --- | --- |
| `ffmpeg-cli` | ffmpeg reference: encode, seek, filters, GIFs, thumbnails, contact sheets, ffprobe | wookstar-claude-plugins |
| `ffmpeg-video-analysis` | Automated video QA: black, freeze and blur detection, scene cuts, PSNR/SSIM/VMAF | claude-plugin-marketplace |
| `ffmpeg-color-grading-chromakey` | LUTs, curves, BT.709 and chroma keying | claude-plugin-marketplace |
| `video-design` | Video design rules and a contact-sheet critique loop | claude-code-video-toolkit |

### Audio and voice
| Skill | What it's for | Source |
| --- | --- | --- |
| `ffmpeg-audio-processing` | Loudness (EBU R128), LUFS targets, EQ, fades, mastering | claude-plugin-marketplace |
| `text-to-speech` | Voiceover with ElevenLabs | elevenlabs/skills |
| `sound-effects` | Sound effects with ElevenLabs | elevenlabs/skills |
| `music` | Music with ElevenLabs | elevenlabs/skills |
| `speech-to-text` | Transcription with word timestamps (ElevenLabs) | elevenlabs/skills |
| `transcribe` | Local Whisper transcription to TXT, SRT or VTT | wookstar-claude-plugins |

### Planning
| Skill | What it's for | Source |
| --- | --- | --- |
| `storyboard-architect` | Brief to storyboard and shot list (Apache-2.0, NOTICE included) | shotkit |

### Code animation engines
| Skill | What it's for | Source |
| --- | --- | --- |
| `motion-canvas` | Motion Canvas guide: scenes, signals, rendering | udnisap/skills |
| `manim-skill` | Manim Community Edition explainers | manim-skill |

Before using some of these, read the rules in `agents/video-editor.md`. The ElevenLabs skills need an API key and cost money; `transcribe` downloads Whisper through `uvx`; and the ffmpeg QA filters need a full ffmpeg, because Playwright's bundled ffmpeg is a stripped build.

### More skills
Add new skills to a group above, or start a new group table here.

## Install
Replace `dheerazsah/video-editor-skills` with the repository's real `owner/name` if it differs.

### 1. As a Claude Code plugin
```text
/plugin marketplace add dheerazsah/video-editor-skills
/plugin install video-editor@video-editor-skills
```
The agent and skills load from the plugin. Plugin skills are namespaced (for example `video-editor:launch-video`). Copy `scripts/record-film.mjs` into the project you record from, since the agent runs it from there.

### 2. Into one project
```sh
git clone https://github.com/dheerazsah/video-editor-skills.git /tmp/video-editor-skills
mkdir -p .claude/agents .claude/skills scripts
cp /tmp/video-editor-skills/agents/video-editor.md .claude/agents/
cp -R /tmp/video-editor-skills/skills/* .claude/skills/
cp /tmp/video-editor-skills/scripts/record-film.mjs scripts/
```
Keep `THIRD_PARTY.md` with the copied skills (for example as `.claude/skills/THIRD_PARTY.md`).

### 3. For every project on your machine
```sh
mkdir -p ~/.claude/agents ~/.claude/skills
cp /tmp/video-editor-skills/agents/video-editor.md ~/.claude/agents/
cp -R /tmp/video-editor-skills/skills/* ~/.claude/skills/
```
Copy the recorder into each project that records films. A project's own `.claude/` copy wins over the one in `~/.claude/`.

### Recorder requirements
Node 18.3 or later, Playwright with its Chromium and ffmpeg:
```sh
npm i -D playwright
npx playwright install chromium ffmpeg
node scripts/record-film.mjs --url http://localhost:5173/film --out film.webm --end "text=The end" --snaps snaps
```
All flags and defaults are documented at the top of the script. The film page should support a hold mode (`?hold`) and expose `window.startFilm()`; see `agents/video-editor.md`.

## Using the agent
In Claude Code, ask for it by name: "Use the video-editor agent to cut a 30 s launch film for the new onboarding flow." Give it the film, the feedback and what "done" looks like. It reads your project's `CLAUDE.md` and design docs first; your project's rules win over the skills.

## Updating the skill packs
1. Clone the source repository (listed in `THIRD_PARTY.md`) into a temporary folder.
2. Read the diff since the recorded commit.
3. Copy the changed skill folders over the old ones in `skills/`, unchanged.
4. Update the commit in `THIRD_PARTY.md`, and the README and agent if skills were added or removed.

Don't use `npx skills add`; it runs a third-party installer.

## Credits
- Skills: [iart.ai](https://iart.ai) skill packs (MIT); henkisdabro/wookstar-claude-plugins, JosiahSiegel/claude-plugin-marketplace, digitalsamba/claude-code-video-toolkit, elevenlabs/skills, udnisap/skills and Yusuke710/manim-skill (MIT); whystrohm/shotkit (Apache-2.0, with NOTICE). Sources, commits and full licence texts in `THIRD_PARTY.md`.
- Worth reading, not included: https://github.com/remotion-dev/skills (no permissive licence) and https://github.com/heygen-com/hyperframes.
- Craft notes studied from https://github.com/mattypark/Motion-graphics-skill (not copied).
- Film reference: Google's "Ask Maps" launch film.

## Licence
MIT for the agent, recorder, examples, README and manifests; see `LICENSE`. The skills keep their own licences (MIT, and Apache-2.0 for `storyboard-architect`); see `THIRD_PARTY.md`.
