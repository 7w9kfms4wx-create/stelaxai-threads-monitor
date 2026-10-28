# ref02 — Vertical creator-style explainer for Eleven v4 "audio tags": talking-head presenter (bottom) + live product UI demo (top) in a split screen that breathes

## Format
- 720×1280 (9:16), 30 fps, 52.6 s, AAC stereo 48 kHz.
- No hard cuts were detected by the scene filter. The changes are panel wipes and jump-cuts inside the face panel.
- Audio: **presenter VO on top of a quiet tonal music pad** (constant low-frequency harmonic lines in the spectrogram). Product AI-voice samples play after each "Generate" click. It ends abruptly at 52.5 s (−46 dB). See "Sound & sync".

## Timeline
| Time | On screen | How it animates | Why it works |
|---|---|---|---|
| 0.0–0.6 | Top half: 3 purple tag chips `[whispers] [excited] [shouts]` stacked, centred. Bottom half: presenter, orange-lit studio, caption "these purple words" | Chips are static (they enter on frame 0 as the hook). Caption is 1–3 words, white, small (~2% of frame height), at the top of the face panel | Hook = the feature itself, in the brand accent purple |
| 0.6–1.4 | Chips fly into an editor | **Shared-element flight**: each chip travels from its hero position to its inline spot in a script line ("[whispers] Okay, okay, listen… [excited] we actually won! [shouts] WE WON!"). Stagger ~3 frames, ~16–20 frames each, ease-in-out with a slight blur in motion. The editor text fades/blurs in behind them; the speaker label "George – Warm, Captivating Storyteller" fades in at top | Explains the concept by literally placing the words |
| 1.0–1.4 | Generation rows + buttons build | Two "Generation" audio rows: avatar circles scale in, icons fade in, then the bottom bar ("Auto-tag", "Regenerate speech" button). The button **goes from grey (disabled) to black (enabled)** ~6 frames | Fake product readiness |
| 1.4–3.1 | UI holds, presenter talks | Captions change on every 2–3 spoken words (~0.4–0.6 s) | Lets the VO carry it |
| 3.1–3.4 | "V4" hero | A huge "V4" crossfades in over the UI (3 frames) while a **gradient-stroke rounded rectangle (green→red→orange) ring** sits at the frame edges. The ring shrinks slowly for 3 frames, then **snaps in 1 frame into a small pill outline** around "V4" and settles 1.1→1 over 3 frames (9 frames total, snap on the beat) | A punchy brand stamp |
| 3.4–4.6 | Pill "V4" → "Eleven V4" | The word "Eleven" fades/slides in left of the pill (~8 frames). The pill then flips/fades to the "II" mark | Name build |
| 4.6–5.6 | "IIEleven Creativ(e)" | Typed reveal, logo bold + product name regular | Brand lock-up mid-video (not just at the end) |
| 5.6–7.4 | Product UI: "What would you like to create?" home → cursor clicks "Speech" | The home screen **slides up from the bottom** of the top panel with blur. The cursor (macOS arrow) glides on a curved path (~20 frames, ease-in-out) and clicks (press = scale 0.9 for 3 frames) | Real-product credibility |
| 6.5–9.0 | Settings panel → model picker → "Eleven v4" selected | Panels **slide horizontally** (push left, ~10 frames). A list item highlights with a red-gradient outline on select | Navigation as a story |
| 9.0–14.3 | Editor; typing "[whispers] I think someone's in the house." | **Real-time typing with a caret**, ~2 chars/frame, irregular bursts. Purple tag chip colour applied once "]" is typed. The placeholder text fades out as typing begins. The character counter (0/10,000) increments | The viewer reads along with the VO |
| 14.4–14.9 | **Panel expansion** | The face panel **slides down out of frame** (its top edge moves from 50% to 100% over ~10 frames, ease-in-out, with vertical motion blur); the white UI panel grows to full screen. The UI content shifts down and scales up slightly to re-centre, blurred during the move | Focus moment: "listen to this" |
| 14.9–16.6 | Full-screen UI: cursor clicks "Generate speech"; the waveform plays | Waveform bars light up progressively (playhead), the play icon becomes a pause icon | Payoff for the demo |
| 16.6–17.4 | Reverse: UI blurs up, the face returns | The UI **translates up with strong vertical motion blur** (~8 frames) while the face panel slides back up to 50% | Tension/release loop |
| 17.4–18.4 | Big tag typed in hero size: "[shouts] Get out of the house, now!" | Hero-size text centred in the top panel; **words appear one by one with a fade + blur** (≈4 frames each) | Large type for the key example |
| 18.4–19.0 | The hero line shrinks into an editor card ("Harry – Fierce Warrior") | **Zoom-out dock**: the hero text scales down (~0.55) into its place inside the card while the card chrome fades in around it; the panel expands to full screen again; the cursor clicks Generate | A repeated pattern = learnable rhythm |
| 21.0–23.5 | "[clears throat]" typed big with a caret, then docks into a card ("Matilda") | Same pattern: hero typing → dock → full-screen → generate | Pattern #3 |
| 23.5–37.5 | Stack of generations (Matilda, Laura, Sarah) | New cards **push in from below**; earlier cards slide up (stack grows, ~10 frames each) | Accumulation = variety |
| 37.2–37.8 | Stack exits | Content **blurs vertically** and slides up out of the panel (motion-blur exit, ~8 frames); the face panel returns | Transition reused |
| 37.8–46.5 | New script "[whispers] Okay, okay, listen… [excited] we actually won! [shouts] WE WON!" typed → generate | Same as 9–16 s | Callback to the opening hook |
| 46.5–48.3 | Tag carousel: `[excited] [sarcastic] [nervous] [whispers] [warmly] [curious] [mischievously]` | A single chip **crossfades in place** every ~0.33 s with blur (~6-frame fade) | Rapid listing = "endless options" |
| 48.3–50.4 | "IIEleven Creative" + a voice-name grid (avatar dot + name chips) | The grid fades in **row by row** (~3-frame stagger), then the rows drift horizontally in alternating directions (marquee) | Scale of the voice library |
| 50.4–52.2 | SFX tags grid `[door creaks] [thunder] [applause] [footsteps] [rain] [explosion] [dog barking] [heartbeat]` | Chips pop in pairwise (2 per row, ~4-frame stagger, fade + slight scale) | Feature #2 teaser |
| 52.2–52.6 | The opening 3 tags return big | The chips slide in from the left with motion blur, ending on the hook frame | Loopable ending (Reels) |

## Animation architecture
- **Layers**: Top panel = white #F9FAF5–#FFFFFF product canvas. Bottom panel = presenter video. A caption overlay at the top of the face panel. Cursor layer above the UI.
- **Split-screen system**: a single state variable `split` (0.5 = half/half, 1 = UI full screen). All transitions animate it in ~8–10 frames with ease-in-out and vertical motion blur on the moving edge and content. The UI content is always re-centred within its current panel height.
- **Camera**: inside the UI, a virtual camera zooms between "hero type" scale (text ~5% of frame height) and "app" scale (~1.8%) and pans to wherever the action is (the cursor or the typing line). No 3D.
- **Transition vocabulary**: panel push (slide with motion blur), shared-element flight (chips → editor), zoom-dock (hero text → card), horizontal panel push for app navigation, crossfade-in-place for lists.
- **Typography**: Inter-like grotesk, black on white. Tags in purple (#9B3FC5-ish) inside 1px purple rounded-rect outlines (radius ~4px, padding 2/6px). Captions are white, small, lowercase-ish, 1–3 words, sitting at the top of the face panel (not the bottom), centred.
- **UI simulation**: caret typing, counters, cursor glide + click compress, disabled→enabled buttons, waveform playhead fill, stacking cards.
- **Colour system**: white UI + black buttons + one accent (purple tags). The presenter's orange/red lighting is the warm counterpoint. The V4 ring uses a brand multi-colour gradient.

## Pacing & rhythm
- Caption changes every ~0.5 s, and a UI state changes every ~1–2 s. The big structural beat (panel expansion → generate → collapse) repeats every ~4–8 s: 14.4, 18.4, 22.6, 37–44 s.
- The same mini-loop repeats 4×: **say it → type it (hero) → dock into product → go full-screen → generate → back to the face**. The repetition teaches the viewer, then the finale breaks the pattern with fast lists (tags, voices, SFX).
- No explicit CTA. It ends by looping back to the opening chips (built for autoplay feeds).

## Measured motion (every frame at 30 fps)
| Motion | Frames | Distance / scale | Progress at f2 / f4 / f8 | Best fit | Notes |
|---|---|---|---|---|---|
| Chip flight into editor ([shouts], f22→f44) | 22 | y 484→273 px (−211 px = 16% of height), width 177→94 (scale 0.53) | 0.05 / 0.29 / 0.78 | `cubic-bezier(0.30,0,0,1.0)` (spring ≈ damping 14, stiffness 70) | Short anticipation, long glide. Chips are staggered ~2–3 frames. Editor text blur-fades in behind |
| Panel expand: face slides down (f435→f448) | 13 | edge 667→1280 px (48% of height) | 0.07 / 0.49 / 0.89 | `cubic-bezier(0.50,0.15,0,0.85)` ≈ (0.5,0,0,1) | Peak 164 px/frame at frame 4 (13% of height per frame), with vertical motion blur on the moving content |
| Panel collapse: face slides up (f511→f522) | 11 | edge 1280→667 px | 0.07 / 0.16 / 0.51 | `cubic-bezier(0.90,0.29,0.90,1.0)` (pure ease-in) | **Slams into place at max speed** (last frame +101 px), no deceleration; the cut to the face takes over |
| V4 stamp (f95→f104) | 9 | full-frame gradient pill → 60 px pill | — | 3-frame crossfade, 3-frame slow shrink, **1-frame snap**, 3-frame settle (1.1→1) | The snap lands at f101 = 3.37 s (beat 3.42) |
| Typing (editor) | — | 42 chars in 2.25 s | — | ≈ 0.6 chars/frame (19 chars/s), bursty | Caret visible; purple applied when `]` is typed |
| Caption cadence | — | 1–3 words | — | changes every ~12–18 frames | Follows the VO word timing |

## Sound & sync
- **Music**: a soft, sustained harmonic pad (no drums; the beat tracker's 110 BPM comes from speech, not music). It sits ~15–20 dB under the VO and is only noticeable in gaps.
- **VO script** (ASR + on-screen captions; approximate): 0.0 "These purple words are what you call audio tags, and they let you direct the voice with Eleven v4 inside of ElevenCreative('s) Text to Speech tool. Just make sure that Eleven v4 is selected. And then before a line I write how I want it delivered, within square brackets. So [whispers] will whisper the line…" (AI sample 15.4–16.5) "…or [shouts] will shout the line" (AI sample ~19.1–20.0: "Get out of the house, now!") "…you can do things like [clears throat]" (24.9 "Can I have everyone's attention, please?") "…[laughs] No way, you actually did that… [cries] I really thought he was coming back. And you can put as many as you need inside of a sentence, so the delivery changes throughout the line" (44–46 "Okay, okay, listen… we actually won! WE WON!") "…You can use any words you can think of as direction. You now have full control of your voices, and you can even drop in sound effects. Thanks to…"
- **VO-to-visual sync**: speech-band pauses at 4.15–4.40 (Eleven V4 lock-up), 8.70–8.95 (model-picker navigation), 13.0–13.2, **14.75–15.15 (panel expands + Generate click)**, **18.65–19.05 (dock + click)**, 20.90–21.20 ([clears throat] typing starts), 22.95–23.20 (dock), 46.35–46.70 (tag ticker). That is **8/8 major UI transitions inside a VO pause**. The pattern: the presenter finishes the sentence → panel expands (13 frames) → click (~10 frames later) → AI sample plays ~15 frames after the click → panel collapses the moment the presenter speaks again.
- **Cut-on-beat**: not applicable (no beat). Motion peaks land "on beat" 33% vs 25% chance, i.e. noise. Sync is to **speech**, not music.
- **Sync rules to copy**: (1) every UI state change waits for a VO breath ≥0.2 s. (2) Click → result audio delay = 12–15 frames. (3) Show the word being said as a caption (1–3 words, swap every ~15 frames). (4) The UI holds still while a product sample plays; nothing moves except the waveform playhead.

## Reusable recipes
1. **Breathing split-screen (measured)**: expand: `split` 0.5→1.0 over **13 frames** with `Easing.bezier(0.5,0,0,1)` (50% at frame 4). Collapse: 1.0→0.5 over **11 frames** with `Easing.bezier(0.9,0.3,0.9,1)` (ease-in, hard stop). The face panel's translateY = (split−0.5)·2·(H/2). While moving, apply a vertical motion blur proportional to velocity (`filter: blur(min(10, v/16)px)`, or an SVG feGaussianBlur stdDeviation="0 v/10") on the moving content. UI content translateY = (split−0.5)·H/2 to stay centred.
2. **Chip flight into editor (FLIP, measured)**: measure the chip's start rect (hero, 24px font) and end rect (inline, ~12px). Animate x, y and scale (≈0.53) over **22 frames** with `Easing.bezier(0.3,0,0,1)` (or spring({damping:14, stiffness:70, mass:1})), stagger 2–3 frames, top chip first. Surrounding editor text opacity 0→1, blur 6→0, starting 6 frames after the first chip lands.
3. **Hero-type → dock**: type the line big (1 char per frame, caret blink 15-frame period, purple tag colour applied on "]"). Hold 10 frames. Then scale 1→0.45 and move to the card slot over 14 frames, ease-in-out, while the card chrome (border, avatar label, waveform row) fades in with 3-frame stagger.
4. **Cursor click**: the cursor moves along a quadratic bezier path over 18–22 frames, `bezier(0.4,0,0.2,1)`. Click: cursor scale 1→0.85→1 (6 frames) and button scale 1→0.96→1, background #000→#333→#000.
5. **Waveform playback**: ~60 vertical bars (1.5px wide, gap 2px, random heights 20–100%), grey #C8C8C8. A playhead converts bars to #111 left→right over the clip length. The play icon morphs to pause on click.
6. **Disabled→enabled button**: background #D9D9D9→#000 and text #FFF opacity 0.6→1 over 6 frames as soon as the input is non-empty.
7. **Crossfade list ticker**: a single slot; each item holds 8 frames, with fade + blur(4px) in/out of 3 frames. 7 items ≈ 2.3 s.
8. **Word-by-word line**: words appear every 4–5 frames; each word opacity 0→1, blur 6px→0, y +6px→0 over 6 frames, `bezier(0.2,0.8,0.2,1)`.

## Saved key frames
- `/tmp/claude-0/-home-user/fcc2596b-9e93-59c3-8571-0f8d02d480d4/scratchpad/video/a1/r02_k1_tags_dock.png`: purple chips mid-flight into the script editor, split-screen.
- `/tmp/claude-0/-home-user/fcc2596b-9e93-59c3-8571-0f8d02d480d4/scratchpad/video/a1/r02_k2_v4_ring.png`: big "V4" stamp with gradient ring.
- `/tmp/claude-0/-home-user/fcc2596b-9e93-59c3-8571-0f8d02d480d4/scratchpad/video/a1/r02_k3_panel_wipe.png`: the face panel sliding down with motion blur as the UI goes full-screen.
- `/tmp/claude-0/-home-user/fcc2596b-9e93-59c3-8571-0f8d02d480d4/scratchpad/video/a1/r02_k4_split_typing.png`: typing state in the editor + presenter caption.
- `/tmp/claude-0/-home-user/fcc2596b-9e93-59c3-8571-0f8d02d480d4/scratchpad/video/a1/r02_k5_voice_grid.png`: logo over the voice-name marquee grid.
- Contact sheet: `/tmp/claude-0/-home-user/fcc2596b-9e93-59c3-8571-0f8d02d480d4/scratchpad/video/a1/r02_sheet.png`. Strips: `a1/r02_s*.png`, `a1/r02_t*.png`; native-30fps tile of the V4 stamp: `a1/r02_n_v4.png`.
