# ref09 — "Character casting in Audiobooks" vertical feature demo: typed headline → modal UI walkthrough with cursor → voiced character quote cards (karaoke text) → one-line CTA

## Format
- 720×1280 (9:16 vertical), 25 fps, 28.2 s (~705 frames). Ends ~26.6 s; last 1.5 s near-silent (−45…−53 dB) with black from ~27 s.
- Audio: stereo 48 kHz. Mid-dominant (1 kHz band −22.3 dB > low −26.0 dB) → voice-led with a light music bed. Clear speech-style gaps (≈ −27…−33 dB) at 2.5–3.75, 7.5–8.25, 12.0–12.75, 14.0–14.25, 19.25 s. The quote-card section (11.7–25 s) is character voice acting; each card swap aligns with a gap (≈14.2, ≈19.3 s).

## Timeline
| time | on screen | how it animates | why it works |
|---|---|---|---|
| 0.0–2.3 | Full-bleed animated grainy gradient (pink/mauve top, orange bottom-left, occasional yellow glow right); small white headline "Introducing Character casting in Audiobooks" building at mid-height, left-aligned | Word-by-word: each new word appears already at its final x, ~30 px BELOW its slot (looks like a second line in sparse sampling) at ~50% opacity, and rises into place: per-frame offset 30→23→14→8→4→2→1 px (50% at frame 2, 87% at frame 4, settled frame 6 @25 fps) = pure exponential ease-out ≈ cubic-bezier(0.16,1,0.3,1), no overshoot. ~1 word / 0.3–0.4 s (synced to VO). Gradient blobs morph slowly (~10 px/s) with visible film grain | The drop-in offset makes each word feel spoken; slow and calm |
| 2.3–3.0 | Full sentence + blinking text cursor (1 px white bar after last char) | Cursor blinks ~2 Hz (on 6 f / off 6 f) | "This is a text field" metaphor, a pause |
| 3.0–3.2 | Backspace | Sentence deletes right→left fast (~4–6 chars/frame) | Fast delete = energy shift |
| 3.2–3.6 | "IIEleven Creative" (wordmark bold "IIEleven" + light "Creative") typed char-by-char centred | ~1 char/frame, cursor leading | Brand reveal via same typing grammar |
| 3.7–4.0 | **Slit open**: 1–2 px white vertical line appears at centre and grows tall (scaleY 0→1, ~3 f), then widens into a white rectangle (scaleX 0.01→1, ~5 f) = the modal "Create an Audiobook" (≈65% frame width); logo text is overlapped/hidden as the slit passes | Slit + expand, ease-out, no bounce | Signature transition: thin line → window |
| 4.0–5.0 | Modal (sidebar: Create an Audiobook / Publish to ElevenReader / Create series; tabs Upload › Formatting › Characters › Pronunciations; File dropzone; Narration style Single/Multi cast; Model) | A file chip "alice_in_wonderland.epub" (purple pill) is dragged in by the cursor from the left sidebar into the dropzone. At ~5.0 the modal steps up in scale 0.65→0.83 of frame width (~6 f ease-out) — camera push-in when the action begins | Push-in focuses attention just as the important interaction starts |
| 5.0–8.4 | Cursor selects "Multi cast" (card border darkens, check icon appears), then "Continue" → progress bar "Parsing your file…" under model | Cursor moves on smooth curved paths (ease-in-out, ~15 f per move), hover state, click = card border 1 px→1.5 px dark + check; progress bar fills linearly ~1.5 s | Realistic, unhurried UI flow; VO pauses at 7.5–8.25 for "loading" |
| 8.4–10.4 | Tab switches to "Characters": list of ~10 character rows (avatar, name, voice, play buttons) | Content swap in place: crossfade ~3 f (no slide); tab label underline moves | Fast reveal of the key payoff (auto-detected characters) |
| 10.4–11.0 | "Pronunciations" tab: table of words with phonetic overrides; "Create audiobook" button | Instant swap; modal starts to shrink (scale 0.83→0.65, ~8 f) and drift up | Shrink = we're done with this UI |
| 11.18–11.55 | Modal pulls back | Width 578→440 px (scale 1→0.76) over 9 f, ease-in-out (3% at f2, 51% at f5, 85% at f7, 96% at f9) | Pull-back = 'done here' |
| 12.06–12.34 | **Slit close**: modal edges move inward symmetrically to a 10 px bar (f4→f10), then a 2 px line (f11) | ease-in, 7 f; then 2 f EMPTY (12.38 = beat, inside VO gap) | Mirror of slit open |
| 12.46–12.75 | **Slit open → quote card**: new thin bar appears, expands horizontally into a wide white card (≈90% width, 22% height, 12 px radius) containing book cover (left), quote text, narrator avatar + name | scaleX 0.02→1 in ~5 f ease-out, contents present (clipped) | Same transition grammar, new object |
| 12.75–14.2 | Card: "Chapter 1. Down the rabbit hole" — Piotr Fronczewski (narrator) | Karaoke: words go light grey (#BDBDBD) → dark (#333) in sync with VO, ~1 word / 0.25–0.4 s, each word's colour transition ~4 f | Voice made visible; viewer reads along |
| 14.2–19.3 | Card swaps to "I know what 'it' means well enough, when I find a thing…" — character voice (Duck – vintage…) | Swap = crossfade ~6 f (card briefly tinted/translucent showing bg — content+card fade together) ; book cover image re-tinted; karaoke continues | Same frame, different voice → the feature (character casting) demonstrated |
| 19.3–24.6 | "I am older than you, and must know better." — Jen Frankie – Entitled & Spoiled | Same crossfade; karaoke in salmon/pink tint during fade, then grey→dark | Three voices = rule of three |
| 24.6–24.7 | Card slit-closes to a thin bar | scaleX→0 ~4 f | |
| 24.7–26.6 | "Create your Audiobook in IIEleven Creative" (white; "Create your Audiobook in" regular, wordmark bold) centred | Text appears as the slit closes (revealed from centre), drifts up ~10 px and settles (ease-out ~8 f); gradient keeps flowing | Single-line CTA on brand gradient |
| 26.6–28.2 | Black / silence | cut | |

## Animation architecture
- **Layers**: (1) living gradient background: 3–4 large blurred colour blobs (pink #D88BC4, mauve #C46BB0, orange #E8611A, yellow #E6C46A) on #D9A6CE, each slowly translating/scaling; plus 3–5% monochrome film grain (animated per frame) — this is what makes the flat UI feel premium; (2) single foreground object at a time (headline / modal / quote card / CTA line), always horizontally centred, white, crisp, minimal shadow; (3) cursor.
- **Camera**: virtually static; the only "camera" moves are discrete scale steps of the modal (push-in 0.65→0.83 when interaction starts, pull-back before exit).
- **Transition vocabulary**: ONE signature transition — the **vertical slit** (collapse to 1–2 px vertical bar / expand from it). Used 4×. Plus in-place crossfades for content swaps and typing/backspace for text.
- **Typography**: small (≈2.2–2.6% frame height) white grotesk; word-by-word drop-in offset; cursor + backspace; brand line two-weight (bold wordmark + light descriptor). Quote cards use karaoke grey→dark word fill.
- **UI simulation**: real-looking modal at native density (not simplified), cursor drag-and-drop, selection states, progress bar, tab switching; karaoke text synced to audio.
- **Depth/lighting**: almost none — flat white surfaces on a soft, grainy, moving gradient. Depth comes from blur contrast (sharp UI vs. soft bg).
- **Colour**: warm sunset palette (pink/orange/yellow) vs. pure white UI and white text; product UI is neutral greys/black.

## Pacing & rhythm
- Very few "shots" (no hard cuts until the final black): 5 macro-sections — headline 3.6 s, modal walkthrough 7.4 s, three quote cards ~4.5 s each, CTA 2 s.
- Rhythm follows the voice, not music: text events land on words, swaps on VO pauses.
- Tension: tell (headline) → show the process (UI) → payoff (hear the cast characters) → CTA.
- Ending: centred one-liner on the gradient, 2 s hold, black.

## Reusable recipes
1. **Living grain gradient bg**: 4 radial-gradient blobs (r 40–70% of frame), each position = base + 60 px·sin(t·0.15 + φ), scale 1±0.08; whole layer filter: blur(40px); overlay SVG feTurbulence grain (baseFrequency .9, opacity .05) re-seeded every frame.
2. **Word rise-in headline**: per word, start at (x, y+30 px @1280h ≈ 2.3% of frame height), opacity 0.5; animate to (x, y), opacity 1 over 7 f (25 fps; 8 f at 30 fps) with cubic-bezier(0.16,1,0.3,1); next word starts at its VO word timestamp (here every ~8–10 f).
3. **Cursor blink + backspace**: 1.5 px × 1.1em bar, opacity square-wave 12 f period; backspace removes 4–6 chars/frame; then type new text 1 char/frame.
4. **Vertical slit open/close** (measured): line appears 2 px wide; height 18%→100% of target in 2 f (f4→f5, practically a pop); holds as a line ~5 f (while the previous text is wiped/hidden); then width 0→100% over 8 f ease-out (60% at f2, 73% at f3, 81% at f4) ≈ cubic-bezier(0.16,1,0.3,1); content is clipped (clip-path: inset(0 50% 0 50%) → inset(0 0 0 0)), never squashed. Close = edges inward over 7 f ease-in (cubic-bezier(0.7,0,0.84,0)), line visible 1 f, then 2 f empty, then next slit fades in over 3 f and opens. Total close→open swap ≈ 16 f @25 fps (0.64 s ≈ 1.33 beats at 125 bpm).
5. **Interaction push-in** (measured): width 440→584 px = scale 1→1.33, 16 f @25 fps; progress 3% f1, 13% f2, 49% f4, 80% f6, 90% f8, 98% f12 → slow-start ease-in-out ≈ cubic-bezier(0.45,0,0.15,1) (or spring damping 30, stiffness 170, mass 1 with 2-f delay). Starts on a beat (4.88 vs beat 4.83). Pull-back mirror: scale 1→0.76 over 9 f, cubic-bezier(0.65,0,0.35,1).
6. **Cursor path**: moves between targets on a slight arc (bezier control point offset 10–15% of distance perpendicular), duration 12–18 f ease-in-out; click = cursor scale 1→0.85→1 (4 f) + target state change on the down frame.
7. **Karaoke quote fill**: each word colour #C4C4C4→#2E2E2E over 4 f at its timestamp; current word optionally accent (#C0392B-ish) for 6 f.
8. **In-place card content swap**: card + content opacity 1→0.6→1 while content crossfades over 6 f; image cross-dissolve; keep card geometry fixed.
9. **Two-weight brand line CTA** (measured): card slit-closes 101→13 px wide in 4 f (ease-in), text appears on the next frame 24 px low and rises 24→0 over 6 f (42% f1, 67% f2, 83% f3) ≈ cubic-bezier(0.22,1,0.36,1); regular 400 + bold 700 wordmark, white, centred. VO says the line ~8 f after it appears.

## Saved key frames
- /tmp/claude-0/-home-user/fcc2596b-9e93-59c3-8571-0f8d02d480d4/scratchpad/video/a3/ref09_f1.5.png — word-by-word headline on grainy gradient
- /tmp/claude-0/-home-user/fcc2596b-9e93-59c3-8571-0f8d02d480d4/scratchpad/video/a3/ref09_f4.1.png — modal just after slit-open (small scale)
- /tmp/claude-0/-home-user/fcc2596b-9e93-59c3-8571-0f8d02d480d4/scratchpad/video/a3/ref09_f6.5.png — modal pushed in, cursor selecting Multi cast
- /tmp/claude-0/-home-user/fcc2596b-9e93-59c3-8571-0f8d02d480d4/scratchpad/video/a3/ref09_f13.png — karaoke quote card
- /tmp/claude-0/-home-user/fcc2596b-9e93-59c3-8571-0f8d02d480d4/scratchpad/video/a3/ref09_quotes.png — quote card mid-karaoke vs. mid-crossfade (crops)
- Dense strips: ref09_s0.png (word drop-in), ref09_s3.2.png (slit open), ref09_s4.6.png (push-in), ref09_s11.6.png (slit close/open), ref09_s24.6.png (CTA) (same folder)

## Motion measurements (native 25 fps, per frame)
| move | frames @25 | progress profile | easing verdict |
|---|---|---|---|
| Word rise-in (each word) | 6–7 | offset 30→23→14→8→4→2→1 px | expo-out cubic-bezier(0.16,1,0.3,1) |
| Slit open (3.76 s) | 2 (height) + ~5 hold + 8 (width) | width 60% f2, 73% f3, 81% f4 | pop + expo-out |
| Push-in (4.88 s) | 16 | 3/13/49/80/90/98 % at f1/2/4/6/8/12 | cubic-bezier(0.45,0,0.15,1) |
| Pull-back (11.18 s) | 9 | 3/51/85/96 % at f2/5/7/9 | cubic-bezier(0.65,0,0.35,1) |
| Slit close (12.06 s) | 7 + 2 empty + 3 fade-in + ~8 open | | ease-in close, ease-out open |
| Quote content swap (14.2, 19.3 s) | ~6 | card+content dip to ~60% opacity, cross-dissolve | linear |
| CTA slit-close + text rise (24.54 s) | 4 + 6 | text 42/67/83 % at f1/2/3 | cubic-bezier(0.22,1,0.36,1) |
| Cursor moves | 12–18 | | ease-in-out on a slight arc |
Background blobs drift ~10 px/s continuously; grain re-seeded per frame. No motion blur.

## Sound & sync
- **Music**: 125 BPM (beat = 0.48 s = **12 f @25 fps / 14.4 f @30 fps**), soft, low-mid bed well under the voice (low band −26 dB vs voice band −22 dB). Spectrogram is dominated by voice formants; the music is barely audible in VO gaps (−27…−35 dB).
- **VO script (reconstructed; ASR is rough, wording approximate)**:
  - 0.1–2.4 "Introducing Character Casting in Audiobooks." — on-screen words rise in as they're spoken (~1 word / 8–10 f).
  - 2.5–3.75 **pause** → cursor blink, backspace, "IIEleven Creative" types on, slit line appears (visuals breathe in the gap).
  - 4.0–7.5 "Now, when creating an audiobook, we'll automatically find your characters…" — slit opens 3.76 just before the VO resumes; push-in 4.88 on the beat as the action starts.
  - 7.5–8.25 **pause** → "Parsing your file…" progress bar fills.
  - 8.5–11.0 "…give them their own voices… change any voice…" — Characters tab appears at 8.4 (≈1 f before "give them…"), Pronunciations at 10.4.
  - 12.0–12.75 **pause** → slit close/open to the quote card (empty frames land on beat 12.38).
  - 13.0–14.0 narrator: "Chapter one. Down the rabbit hole." — karaoke fill.
  - 14.5–19.2 character voice: "I know what 'it' means well enough, when I find a thing…" — card swap at 14.2 in the gap.
  - 19.8–24.3 character voice: "I am older than you, and must know better." — swap at 19.3 in the gap.
  - 25.0–26.5 "Create your audiobooks in ElevenCreative." — CTA text appears 24.74, ~6 f before the line.
- **Strong hits** (s): 0.19, 0.96, 1.31, 1.47, 1.79, 4.03, 4.51, 5.82, 8.64, 9.54, 10.66, 11.84, 13.06, 14.69, 16.96, 18.11, 21.66, 22.18, 23.01, 23.23, 25.06, 25.73.
- **Cut-on-beat ratio**: about 7/12 within ±2 f (slit 3.76 ✓ beat 3.84, push-in 4.88 ✓, Pronunciations 10.40 ✓, slit-empty 12.38 ✓, swap 14.2 ✓, swap 19.3 ✓, CTA close 24.54 ✓; backspace 3.0, Characters 8.4, pull-back 11.18, slit-close start 12.06, CTA text 24.74 ✗). The **primary clock is the VO**: every structural transition sits inside a VO pause; within a pause it snaps to the nearest beat.
- **SFX**: none distinct (no whooshes); UI clicks are not audible above the bed.
- **Sync rules to reuse**: (1) a reveal arrives 0–6 f BEFORE the word that names it (the eye leads the ear); (2) transitions only in VO gaps of ≥0.5 s; (3) the slit's empty frames sit on a beat; (4) karaoke fill = word timestamps, 4-f colour ramp per word; (5) the CTA line appears ~6 f before it's spoken and is held 1.5 s after.

## Saved key frames (additions)
- /tmp/claude-0/-home-user/fcc2596b-9e93-59c3-8571-0f8d02d480d4/scratchpad/video/a3/ref09_n0.3.png — native 25 fps: word rise-in (cropped headline band)
- /tmp/claude-0/-home-user/fcc2596b-9e93-59c3-8571-0f8d02d480d4/scratchpad/video/a3/ref09_n11.9.png — native: slit close → empty → slit reopen
