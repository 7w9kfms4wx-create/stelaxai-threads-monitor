# ref07 — ElevenLabs "Dictation Orb" app promo: an orb lands in a phone, speech becomes text → audio → image → social post, end card with store badges

## Format
- 1280×720 (16:9 landscape), 30 fps, 26.4 s (~792 frames). Last ~0.2 s black.
- Audio: stereo 44.1 kHz. Bass-heavy music bed (low band −21.7 dB ≈ mid band −23.5 dB), punchy hits roughly every 1.0–1.25 s in the first 8 s (RMS peaks at 0.0, 1.5, 2.5, 3.75, 4.75, 6.75, 7.75 s), denser/continuous 13.5–15 s (typing section), dip at 23.25 s (−30 dB, the breath right before the logo), loudest sustained section 24–26 s (end card). No clear VO; any "dictation" is implied visually.

## Timeline
| time | on screen | how it animates | why it works |
|---|---|---|---|
| 0.0–2.4 | Line-art phone (thick ~6px black stroke, rounded 60px corners, white screen) cropped by frame top; soft blue radial glow behind/below phone; tiny orange orb enters from right edge | Orb flies in from off-screen right on a curved path (right→center, slightly down), scale ~0.05→1 (8 px → 150 px dia. at 720p). First 1.2 s it hovers small near the right edge (slow), then 1.2–2.2 s accelerates toward center while growing — ease-in-out, settles ~frame 66 with no overshoot. Orb itself has a slowly rotating internal gradient (orange/peach/lavender) | Hero "character" introduced first, alone; simple wireframe device = zero clutter |
| 2.4–5.5 | Orb idle in phone | Internal gradient churns (noise-driven colour swirl), slight breathing scale ±2%; phone drifts very slowly (camera creep up ~20 px over 3 s) | Holds attention on the brand object while music builds |
| 5.5–7.5 | Orb "listens" | At 5.6 s orb shrinks 1→0.8 (6 frames) and a thin 1.5px gold ring appears around it at r≈1.3× orb, ring expands to 1.6× while fading (pulse), repeats ~every 1.1 s (on the beat). Orb wobbles/rotates gradient faster | Communicates "listening/recording" without text |
| 7.5–8.6 | Camera tilts down/phone slides: top of phone with header "‹ Hello  + ⋮", avatar "Bella", text being dictated | Hard-ish cut at 7.55 to the phone's TOP (phone now enters from below: y +200→0 in ~4 frames, ease-out). Text appears word-by-word: each new word fades in light purple (#8b7fd6 ~50% opacity), previous words darken to near-black over ~6 frames — a "live transcription" colour trail (~3 words/0.125 s, accelerating) | Dictation made visible; colour trail = recency, reads as live |
| 8.6–9.7 | Camera pans back down: orb + ring at bottom, pill "Generate" button (black, white label) with a round icon button left | Phone slides up (~+250 px, 4–5 frames, ease-out) revealing lower screen. Generate button's fill gets a left→right purple/lavender gradient sweep (~10 frames) = "pressed" | One continuous device, camera moves between regions instead of cutting |
| 9.73–9.8 | White flash | 2–3 frames pure white | Punctuates the "generate" moment |
| 9.8–11.9 | Full-frame heavily blurred photographic bg (blue/yellow bokeh, blur ~60px) + the Generate pill alone, centred, ~2× larger | Pill drifts up-right while small white square "sparkle" particles blink around it (3–4 px squares, 2–3 frames each). 10.4–10.9: liquid gradient sweep across pill (dark→white→lavender→violet, left-to-right, 0.5 s). 10.9–11.3: pill MORPHS — height 1→~2.2×, width 1→1.35×, radius stays ~24 px, fill becomes frosted glass (white 25% + backdrop blur) while a blurred ghost of the audio-player UI fades/de-blurs in (blur 12→0 px, 8 frames). Result: glass audio player card "TikTok UGC voice for Piire", progress bar, play button, share icon | The button literally becomes its output — strongest storytelling device in the piece |
| 11.9–13.6 | Back to white, orb centred, no phone | Cut. Ring around orb expands slowly r 1.25→1.5× and fades out over ~1.2 s (pulse decay) | "Breathing" reset between two feature beats |
| 13.63–17.9 | Same blurred bokeh bg; frosted glass prompt card "+ Image" chip, toolbar row, auto-growing textarea | Card fades in 3 frames. Prompt types itself: slow first (~1 char / 2 frames for "G…Gener"), then accelerating to ~4–6 chars/frame; card height auto-grows line-by-line (smooth ~4 frames per line). Card drifts up ~30 px overall as it grows (keeps centred) | Typing cadence acceleration feels human-then-magic |
| 17.9–18.85 | Phone (now full upper half, with Dynamic-Island pill) showing "Today / Image" + prompt text with word-trail colouring + top of generated pink image | Cut; text again in fade-trail. Blue glow behind phone | Brings the glass card back "into the device" |
| 18.87–19.75 | Generated image (pink portrait) alone, then de-saturates/recolours to a real photo; then camera dives INTO image | Image card ~240×330 px at centre, sliding up slowly; colour grade animates pink→neutral over ~15 frames; image bottom edge feathers to white. At 19.0 cut to a tight crop (zoomed 3×) of image bottom + a black "Post" pill bottom-right; pill gets same lavender gradient sweep (10 frames) | Reuses the "press = gradient sweep" vocabulary |
| 19.75–20.4 | Transition: blue orb | The Post pill swells into a white rounded shape + blue leaf icon (1 frame), then cut to white with a small blue marbled orb (≈90 px) that grows 90→160 px and blurs (0→40 px) over ~0.4 s, until it fills the frame as a blue blur | Orb = transition wipe ("blur bloom") — the brand object carries the cut |
| 20.4–22.9 | Phone "Posts" screen with the portrait; floating comment pills ("love the glow", "this is so cool 💙", "absolute fire 🔥") and red hearts popping around phone | Phone de-blurs out of the blue bloom (blur 30→0, scale 1.1→1, ~8 frames). Comment pills pop in staggered every ~3–4 frames (scale 0.6→1, slight overshoot, opacity 0→1); hearts pop with overshoot (scale 0→1.2→1, ~8 frames) and float up slowly; everything drifts subtly | Social-proof payoff; density ramps up = climax |
| 22.9–24.4 | White, "IIElevenLabs" wordmark centred (bold, ~5% frame height) | Hard cut on the beat (after audio dip at 23.25). Hold ~1.5 s, static | Breath / brand stamp |
| 24.3–24.8 | Logo exits | Feathered LEFT→RIGHT opacity wipe (gradient mask ~40% of width, travels across logo in 7 f), logo drifts right ~10 px; then 8 f of empty white | Soft directional exit contrasts the hard entry |
| 24.83–26.2 | End card: left text block "IIElevenLabs / Dictation Orb / Speak it. Create it. Share it." + App Store / Google Play badges; right: phone (cropped by bottom edge) showing the dictation UI + orb; big blue planet/orb arc at bottom | Lands on strong hit 24.80. Text block revealed by the same feathered L→R opacity wipe (frames 16→23 of the native strip = 8 f), fill from grey to black as wipe completes. Phone + blue arc fade in 6 f later (f22→f29, ~8 f, also slightly L→R), no slide. Static hold ~1.2 s | Clear CTA; the L→R wipe mirrors the logo exit so the two read as one gesture |
| 26.2–26.4 | Black | cut | |

## Animation architecture
- **Layers**: (1) background: pure white #FDFDFE or full-bleed heavily-blurred photo (bokeh, ~60 px blur) for "magic/generation" moments; (2) soft blue radial glow (#3d7bff, ~400 px radius, 60% → 0) behind the device; (3) device: minimalist line-art phone (black 6 px stroke, no bezel detail early, Dynamic Island added later), always cropped by the frame — never shown whole until the end card; (4) UI content inside device; (5) hero object: the orb (gradient sphere with animated swirl); (6) floating overlays (comment pills, hearts, sparkles); (7) white flash / blur bloom transitions.
- **Camera**: 2D only. The "camera" is a crop window over a tall phone: it pans vertically between header/text region and button region (fast 4–5-frame ease-out slides), and does dive-in crops (3× zoom cut) on images. Constant micro-drift (5–20 px/s) keeps every hold alive.
- **Transition vocabulary**: hard cuts on beats; 2-frame white flash; **morph** (button → glass player); **blur bloom** (small orb grows + blurs to fill frame, next scene de-blurs out of it); blur-out/blur-in for logo/end card.
- **Typography**: SF/Inter-like grotesk, regular weight UI text; "live dictation" word trail (new words in light violet, settling to dark grey); typewriter with accelerating cadence for prompts; end card title large regular (not bold), tagline small grey.
- **UI simulation**: typing with auto-growing input; gradient "press" sweep on pills; ring pulse for listening; progress bar on player; floating reaction pills + hearts.
- **Depth/lighting**: frosted glass (white 20–30%, backdrop blur, 1 px white 40% border, 24 px radius) over blurred photo; coloured glow behind phone; no grain.
- **Colour**: white + black line art, one warm hero (orange/peach orb) vs. one cool accent (electric blue glow + lavender/violet UI highlights). Warm/cool complementary pair.

## Pacing & rhythm
- Average shot ≈ 2.2 s, but first shot is long (7.5 s, slow build with the orb) then cuts tighten to 1–2 s (17.9 → 18.9 → 19.8 are ~1 s apart) → climax with social proof → hard cut to logo after an audio drop.
- Rhythm: action every ~1.1 s matches music hits (orb ring pulses, word bursts, sweeps).
- Payoff: button morphing into the produced audio, and the post exploding with comments.
- Ending: logo hold (1.5 s) → end card with product name, tagline triplet, store badges, device (1.3 s).

## Reusable recipes
1. **Hero orb fly-in (3 phases, measured)**: (a) f0–8: dart in from the right edge, x 952→894 (−58 px) with ease-out (most in f4–6), diameter 7→32 px; (b) f8–37 hover: drift y +0.5 px/f, diameter 32→37 (barely alive, ~2.4 beats at 144 bpm); (c) launch on the strong hit at f38 (1.25 s): position travels (895,252)→(648,360) on a downward-dipping arc — 20% at f42, 65% at f46, ~95% at f50, with a **y overshoot of 14 px (13%)** that settles by f62 → spring(damping 14, stiffness 180, mass 1). Scale lags position by ~8 f: diameter 37→176 px (×4.75), 25% at f50, 67% at f56, 83% at f60, 94% at f66, settled f72 → ease-out cubic-bezier(0.33,1,0.68,1), 24 f. Inside: rotating gradient (~20°/s) + noise.
2. **Listening ring pulse (measured)**: on the strong hit (5.60 s) orb diameter 148→137 in ONE frame (−7%), then exponential decay to 120 (−19% total) over 13 f (126 at f5, 122 at f9) — i.e. a step + ease-out, cubic-bezier(0.2,0.9,0.3,1). Ring 1.5 px #E8C98A appears same frame at r≈1.15× orb, expands to ~1.6× while fading over ~25 f (2 beats at 144 bpm); re-trigger every 2 beats (25 f).
3. **Live-dictation word trail**: words revealed at 2–3/6 f; each word opacity 0→1 over 4 f in #9B8CE6, then colour lerp to #2B2B2B over next 10 f. Line wraps naturally; cadence accelerates 1.0→1.6×.
4. **Pill "press" sweep**: overlay linear-gradient(90°, #1a1a1a, #fff, #c8c0ff, #6b5cff) with background-position animating −100%→100% over 12 f, ease-in-out; optional 1-frame scale 0.97.
5. **Button→card morph**: width 1→1.35, height 1→2.2 (spring damping 20, stiffness 120, ~14 f), fill solid black→rgba(255,255,255,.22)+backdrop-blur 24px; card content blur 12→0, opacity 0→1, starts at f+4, 8 f.
6. **Accelerating typewriter + auto-grow box**: chars(t)=N·(t/T)^1.8 over T=60–90 f; box height = measured text height, animated with spring (damping 22, stiffness 180) so each new line eases in ~4 f; card y offsets −height/2 to stay centred.
7. **Blur-bloom transition**: small orb (90 px) at centre: scale 1→12, blur 0→60 px, over 12 f ease-in; next scene enters at f8 with blur 30→0, scale 1.08→1, opacity 0→1 over 10 f ease-out.
8. **Reaction pop swarm**: N=8 comment pills + 8 hearts at preset positions around device; each: scale 0.6→1 spring(damping 12, stiffness 220) ~10 f, opacity 0→1 4 f; stagger 3–4 f; after landing, drift y −6 px/s; hearts scale 0→1.2→1.
9. **White flash cut**: 2 frames #FFFFFF between two scenes on a music hit.
10. **End card assembly (L→R feather wipe)**: mask-image linear-gradient(90deg, #000 (p−0.4), transparent p) with p: 0→1.4 over 8 f, bezier(.4,0,.2,1); logo exit uses the inverse mask over 7 f; device + arc fade (opacity 0→1, 8 f) starting 6 f after the text. Land the text wipe on a strong hit; at 144 bpm, logo hold = 3 beats (37 f), exit+gap = 1.2 beats (15 f).

## Saved key frames
- /tmp/claude-0/-home-user/fcc2596b-9e93-59c3-8571-0f8d02d480d4/scratchpad/video/a3/ref07_f3.png — orb settled in cropped line-art phone with blue glow
- /tmp/claude-0/-home-user/fcc2596b-9e93-59c3-8571-0f8d02d480d4/scratchpad/video/a3/ref07_f7.png — listening ring around orb
- /tmp/claude-0/-home-user/fcc2596b-9e93-59c3-8571-0f8d02d480d4/scratchpad/video/a3/ref07_f9.png — live-dictation word trail (violet → dark)
- /tmp/claude-0/-home-user/fcc2596b-9e93-59c3-8571-0f8d02d480d4/scratchpad/video/a3/ref07_f11.png — glass audio player morphed from Generate button over blurred photo
- /tmp/claude-0/-home-user/fcc2596b-9e93-59c3-8571-0f8d02d480d4/scratchpad/video/a3/ref07_f21.5.png — social-proof swarm (comment pills + hearts)
- /tmp/claude-0/-home-user/fcc2596b-9e93-59c3-8571-0f8d02d480d4/scratchpad/video/a3/ref07_f25.5.png — end card (name, tagline, store badges, phone)
- Dense strips: ref07_s0.png, ref07_s7.2.png, ref07_s9.6.png, ref07_s13.5.png, ref07_s17.6.png, ref07_s19.6.png, ref07_s21.8.png (same folder)

## Motion measurements (native 30 fps, per frame)
Measured with a colour-mask bbox tracker (`a3/tools/measure.py`) and native-rate tile strips (`a3/ref07_n*.png`).
| move | frames | progress profile | easing verdict |
|---|---|---|---|
| Orb dart-in (0.00 s) | 8 | x −58 px, mostly f4–6 | ease-out |
| Orb launch to centre (1.27 s) | 12 to 95%, settles f24 | 20% f4 / 65% f8 / 95% f12; y overshoot 14 px (13%) | spring d≈14, k≈180, m=1 |
| Orb grow (lags 8 f) | 24 | 25% f2 / 67% f8 / 83% f12 / 94% f18 | cubic-bezier(0.33,1,0.68,1) |
| Orb listen squeeze (5.60 s) | 1 + 13 | −7% in first frame, then decay to −19% | step + expo-out |
| Dictation → button region (9.08 s) | 0 | hard cut inside the device (match cut), drift continues | cut on strong hit 9.15 (−2 f) |
| Button→player morph (≈10.8 s) | 3 (shape) + 8 (content de-blur) | pill width ~75%→95% f0–2, height jumps to card on f3; content blur ~12→0 f3–f11 | fast ease-out, no overshoot |
| Blur bloom (19.8 s) | 18 | f0–9 slow grow (+20%) + blur starts f6; f10–17 exponential scale to full frame (ease-in, cubic-bezier(0.7,0,0.84,0)); f18 phone opens as a horizontal line growing vertically inside a white radial hole, full by f23 | ease-in into cut, ease-out out |
| Logo L→R wipe out (24.3 s) | 7 | linear-ish feathered mask | linear / ease-in-out |
| End card L→R wipe in (24.83 s) | 8 (+8 phone fade, 6 f offset) | | cubic-bezier(0.4,0,0.2,1) |
No motion blur is rendered on any move; speed is sold by large per-frame displacement and the blur filters.

## Sound & sync
- **Music**: 144 BPM (beat = 0.417 s = **12.5 f @30 fps**, bar = 50 f), bass-heavy electronic bed with chopped/stuttered **vocal samples** (the spectrogram shows short harmonic formant stacks in bursts every ~2 beats; the ASR transcript is gibberish → it's processed voice snippets used musically, not a VO). Loudness alternates −12/−30 dB every 0.5 s in the first 7 s (sparse, pulsing); fuller from 7.5 s (dictation), densest 13.5–15 s (typing), a broadband **noise riser 21.0–22.6 s** under the social-proof swarm, a hit at ~23.0 (logo), **0.5 s near-silence 23.25–23.6**, then the loudest sustained block 24–26 s under the end card; ends dry at 26.2.
- **Strong hits** (s): 0.10, 0.29, 1.25, 1.44, 4.00, 4.77, 5.60, 7.49, 8.74–9.34 (roll), 9.76, 13.34, 14.78, 18.91, 22.69, 23.94, 24.80, 25.70.
- **Cut/animation-on-beat ratio**: ~9 of 12 key events within ±2 f of a beat or strong hit: orb in 0.0 (hit 0.10 ✓), orb launch 1.27 (hit 1.25 ✓), listen squeeze 5.60 (hit 5.60 ✓, exact), dictation cut 7.60 (hit 7.49, 3 f ✗), button-region cut 9.08 (9.15 ✓), white flash 9.73 (9.76 ✓), orb cut 11.90 (beat 11.87 ✓), prompt card 13.63 (beat 13.54, 3 f ✗), phone 17.90 (✗), image 18.87 (hit 18.91 ✓), bloom 19.77 (beat 19.78 ✓), end card 24.83 (hit 24.80 ✓). The white flash sits on the 4-hit roll 8.74–9.34 → the "Generate" press is the musical fill.
- **SFX**: no separate whooshes; the music's own transients (the hit roll before 9.76 and the riser before the logo) act as whoosh/impact. Silence before the end card = the "breath".
- **VO**: none (voice is musical texture). Text on screen is never read aloud.
- **Sync rules to reuse**: (1) every hero event (enter, launch, squeeze, flash) sits exactly on a strong hit; (2) holds are 2–3 beats (25–37 f); (3) build tension with a riser under the busiest visual (swarm), cut to the logo on the hit, leave ½ s of silence, then land the end card on the next downbeat; (4) at 144 bpm a "press" fill = 4 sixteenth-ish hits over 0.6 s → put the button sweep + flash there.

## Saved key frames (additions)
- /tmp/claude-0/-home-user/fcc2596b-9e93-59c3-8571-0f8d02d480d4/scratchpad/video/a3/ref07_n10.8.png — native 30 fps: button → glass player morph (frames 0–17)
- /tmp/claude-0/-home-user/fcc2596b-9e93-59c3-8571-0f8d02d480d4/scratchpad/video/a3/ref07_n19.8.png — native: blur-bloom transition into the Posts phone
- /tmp/claude-0/-home-user/fcc2596b-9e93-59c3-8571-0f8d02d480d4/scratchpad/video/a3/ref07_n24.3.png — native: logo L→R wipe out + end card wipe in
