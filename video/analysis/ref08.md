# ref08 — "ElevenLabs for students" vertical offer promo: one continuous sideways-scrolling canvas of floating photos, orbs and UI cards, each stop = one benefit, dark CTA card at the end

## Format
- 720×1280 (9:16 vertical), 30 fps, 15.3 s (~460 frames). Last ~0.9 s fades to black/silence.
- Audio: stereo 44.1 kHz, steady music bed (RMS −13…−19 dB, no silences), bass-dominant (low band −18.6 dB vs mid −23.1 dB), opening transient at 0.0 s (−4.6 dB hit), small swells at 6.0, 7.5, 12.3–12.5 s (lining up with section changes ~7.6, ~12.6 s). Fade-out 14.2–15.0 s. A narrator VO sits on top in three phrases (see Sound & sync); music-only 2.6–5.3 s.

## Timeline
| time | on screen | how it animates | why it works |
|---|---|---|---|
| 0.0–1.4 | Full-bleed motion-blurred gradient (magenta/violet/periwinkle diagonal streaks, like a long-exposure); left: "IIElevenLabs" wordmark (white, bold, small), right: "Introducing Elevenlabs / for students" (white, regular, 2 lines, ~3% frame h) | Wordmark reveals letter-by-letter over 0.2–0.6 s (~1 char/frame, starting with the "II" bars), static after. Gradient streaks drift slowly diagonally | Brand + promise in the first second; streaks imply speed |
| 1.4–1.7 | Transition | The gradient panel slides LEFT as a hard-edged slab (whip, ~8 frames, ease-in-out, slight motion blur), revealing an off-white canvas (#F2F0EE) behind. The headline text STAYS in place but flips white→near-black as the slab passes over it (text is above both layers; colour switches where slab edge crosses) | Persistent text across a wipe = continuity; feels like one camera |
| 1.6–3.2 | Canvas: headline left-centre, 3–4 floating rounded-square cards (yellow abstract with a mini search UI, two lifestyle photos), irregular sizes (60–110 px), scattered | Cards enter from the right with the slab move then keep a slow parallax drift (different speeds per card: 10–40 px/s, smaller = slower = farther). At ~2.8 s the whole canvas pans left (camera), headline exits left | Depth via differential drift, no 3D needed |
| 3.0–3.6 | Cards converge | All cards fly to centre and stack (staggered ~2 f, each with slight rotation ±6°→0 and scale to the same size ~90 px); top card becomes a hand-writing photo; stack resolves to one card | "Gather" moment, sets up the next morph |
| 3.6–4.0 | Card → orb morph | Card scales 1→1.35 (6 f), then on one frame switches to a circle (border-radius → 50%) filled with the yellow marble texture + white circular icon badge (book); circle continues growing 1→1.5 over ~8 f with soft ease-out, holds | Morph instead of cut keeps one object in focus |
| 4.0–4.9 | Yellow orb hero, centred, big (~80% frame width) | Very slow push-in; icon badge pulses subtly | Hold beat |
| 4.9–5.4 | Zoom-out reveal | Orb shrinks 1→0.4 (≈12 f, ease-in-out); simultaneously text blocks "Free ElevenLabs / Creator Plan for 3 months" (top-left of orb, right-aligned) and "free ElevenReader / Ultra for a year" (bottom-right, left-aligned) slide/scale IN from outside the frame — they start ~2.5× scale off-frame and shrink into place (they're on the same plane as the camera pull-back). Foreground blurred orbs appear: big orange blob bottom-left (blur ~30 px, partly off-frame), small yellow one top-right (blur ~6 px) | Camera pull-back = "there's more"; out-of-focus foreground objects add strong depth |
| 5.4–7.4 | Offer layout holds | Everything drifts; the foreground blobs move faster than mid-ground (parallax ratio ~2:1); faint 1 px vertical/horizontal grid lines (#E4E1DD) fade in on bg at ~7.0 s | Two-text-around-object composition = balanced diagonal |
| 7.4–7.9 | Whip pan right→left | All elements exit left at different speeds (text first and fastest, orb, blobs), new section enters from right: three UI screenshot cards (white, 8 px radius, soft shadow) | Continuous strip camera = feels like one long product tour |
| 7.9–9.3 | "Make it / ElevenCreative" — grey light "Make it" over black "ElevenCreative" (2-tone), right of a stacked trio of UI screenshots (top card offset right, middle left, bottom centre) | Product name types in char-by-char (~1 char/1.5 f) after the prefix is already there. Cards drift slowly upward/left at different speeds | Two-tone line: verb in grey, product in black — readable hierarchy |
| 9.3–9.8 | Transition | Cards slide out left with stagger (~2 f), the outgoing top card shrinks to a thin sliver at frame edge; new phone-shaped white card with yellow orb + call icon enters from right | |
| 9.8–11.0 | "Build a / study buddy" (left) + card (centre) + "ElevenAgents" (right) | Static-ish with drift. At 10.6–11.0 the group EXPLODES outward: label left flies up-left, label right flies down-right, card slides down, all accelerating (ease-in) — a scatter exit | Scatter exit makes room without a cut |
| 11.1–12.5 | "Build it in / ElevenAPI" two-tone text between a dark photo (boy on laptop) and a column of three white API UI cards | Photo enters from left while UI column enters from right — they cross/overlap mid-screen (photo layer slides OVER UI column), then settle side by side; continuous drift right→left; text scales up slightly (1→1.15) during the last 6 f before exit | Opposed-direction crossing = energetic "two worlds meet" |
| 12.6–14.1 | "Listen on the go" (small, top-left) + browser card "Find your next audiobook" with a fanned carousel of book covers + "ElevenReader" (bottom-right) | Whip in from right (8 f), slow drift. Grid lines visible | Final feature, same template |
| 14.13–15.0 | Dark end card #1C1C1C with subtle tile pattern (thin wavy/rounded-square lines, ~6% white) ; centred "Visit elevenlabs.io/students" (white, regular) + "to claim your student discount and learn more" (smaller, 80% white) | Hard cut. Text starts at scale ~1.15 and settles to 1.0 over ~6 f (ease-out), hold; whole thing fades to black from ~14.8 s | Inverting to dark = unmistakable "end"; one clear URL CTA |

## Animation architecture
- **Layers**: (1) bg off-white #F2F0EE with optional faint 1 px grid; (2) mid-ground: content cards (photos, UI screenshots, orbs), rounded 10–14 px; (3) text, two-tone (grey light prefix / black product name), small size (~3.5% of frame height), never centred huge; (4) foreground out-of-focus orbs (blur 6–30 px) for depth; (5) opening & closing "slabs" (gradient and dark).
- **Camera**: a single horizontal 2D strip. Every section is a "stop" along it; transitions are whip pans right→left (8–12 f) with **per-layer speed multipliers** (text 1.3×, cards 1.0×, bg grid 0.6×, foreground blobs 1.6×) = parallax. Plus a few zooms (orb pull-back) and scale-morphs.
- **Transition vocabulary**: slab wipe with persistent text colour-flip; gather/stack → morph (square → circle); zoom-out reveal; whip pan with parallax; scatter-exit; crossing layers; hard cut to dark end card.
- **Typography choreography**: char-by-char type-on for brand/product names only; static otherwise; settle-scale on end text. Text is small, editorial, left-/right-aligned around objects (asymmetric layouts).
- **UI simulation**: no interaction — UI is shown as static screenshot cards; motion comes entirely from layout/camera.
- **Depth**: blur-based DOF foreground objects; differential drift speeds; card shadows very soft (0 8px 24px rgba(0,0,0,.08)).
- **Colour**: warm off-white canvas, black text, one saturated hero material (yellow/gold marble), accent orange blob; opener uses a contrasting violet–magenta streak gradient; closer dark charcoal.

## Pacing & rhythm
- Average section ≈ 2.0 s (opener 1.4, cards 1.8, orb 1.4, offer 2.4, Creative 1.9, Agents 1.5, API 1.5, Reader 1.5, CTA 1.2). Never fully static: constant drift.
- Build: abstract → gather → hero object → the actual offer (the big payoff, held longest at 5.4–7.4) → rapid feature carousel (each ~1.5 s) → CTA.
- Ending: dark slab, URL + reason to act, fade out with music.

## Reusable recipes
1. **Slab wipe with persistent text (measured)**: gradient slab right edge x (as % of width): 100→81→63→49→36→26→17→8→1 over 8 f — starts at full speed (19%/f) and decelerates steadily = ease-out cubic-bezier(0.25,0.6,0.4,1) (NOT ease-in-out; there's no acceleration phase, the cut-in is the 'whip'); starts on an onset (1.44 s); text sits above, use two copies of text: white copy clipped to slab rect, black copy clipped to remainder (clip-path driven by slab x).
2. **Parallax whip pan (measured)**: it's an exit-accelerate + cut + enter-decelerate, not one continuous move: outgoing layout slides left accelerating over 14 f (orb x per frame ≈ −0.5, −1, −2, −3, −5, −7, −10 px…, ease-in cubic-bezier(0.55,0,1,0.45)), foreground blob exits faster (gone by f9); at f14 cut; new elements enter from the right edge as slivers and decelerate in 4–6 f (ease-out cubic-bezier(0,0.55,0.45,1)). Implementation: section container x: 0→−W over 10 f, bezier(.65,0,.35,1); children have speed factor k∈{0.6,1,1.3,1.6}: childX = baseX − k·progress·W; next section enters with same curve from +W.
3. **Gather & morph (measured)**: 3 cards converge in 7 f (f5→f12) with ease-in-out, a 4th (hero) card appears on top already in place at f6; the under-cards then tuck behind the hero (offset 10→0 px) over ~10 f; hero scale 1→1.3 in 6 f; on f8 of the morph it cuts to a circle at 363 px diameter which grows to 515 px over 24 f: 44% at f4, 68% at f8, 82% at f12, 92% at f16, settled f24 → cubic-bezier(0.22,1,0.36,1). Morph lands ~2 f after strong hit 3.78 s.
4. **Zoom-out reveal with incoming text (measured)**: hero diameter 515→239 px over 14 f (4.75→5.20 s): per-frame shrink 3,4,8,9,12,15,21,24,33,43,52,36,14 px — accelerates for 10 f then brakes hard in 3 f → cubic-bezier(0.7,0,0.2,1) (expo-in-out), then a slow tail 239→~210 over ~15 f; text blocks start at scale 2.5 positioned at 2.5× their final offset from centre and interpolate on the same curve (they behave as if on the same plane).
5. **DOF foreground orbs**: 1–2 large circles (radial gradient), filter: blur(24–32px), opacity .9, partly off-frame; drift at 1.6× camera speed.
6. **Two-tone label + type-on product name**: prefix "Answer it in" in #8A8A8A weight 300; product in #111 weight 400 typed at 1 char / 1.5 f with no cursor.
7. **Scatter exit = virtual dolly push (measured)**: elements move radially away from the frame centre (text up-left, label down-right, card scales 1→1.1) — accelerating over 9 f (ease-in, cubic-bezier(0.5,0,0.75,0)), then hard cut to the next section 2 f before the beat (11.17 vs beat 11.23). Implement as one parent scale 1→1.6 about the centre + per-child extra outward offset; no opacity fade needed.
8. **Crossing layers entrance**: photo from x −W→finalX, UI column from +W→finalX, both 14 f spring(damping 20, stiffness 140); photo z-index above so it slides over the UI while crossing.
9. **Dark CTA card (measured)**: hard cut; #1C1C1C + 6% white SVG tile pattern; text scale ~1.2→1.0 over 8 f (≈55% of the shrink in f1, 85% by f3) → cubic-bezier(0.16,1,0.3,1); hold ~20 f; music fades out from 14.2 s; fade to black 12 f.

## Saved key frames
- /tmp/claude-0/-home-user/fcc2596b-9e93-59c3-8571-0f8d02d480d4/scratchpad/video/a3/ref08_f0.8.png — opener: streak gradient, wordmark + headline
- /tmp/claude-0/-home-user/fcc2596b-9e93-59c3-8571-0f8d02d480d4/scratchpad/video/a3/ref08_f2.5.png — headline with floating parallax cards on off-white
- /tmp/claude-0/-home-user/fcc2596b-9e93-59c3-8571-0f8d02d480d4/scratchpad/video/a3/ref08_f6.png — offer layout: orb + two text blocks + blurred foreground orbs
- /tmp/claude-0/-home-user/fcc2596b-9e93-59c3-8571-0f8d02d480d4/scratchpad/video/a3/ref08_f8.5.png — two-tone "Make it ElevenCreative" + UI card trio
- /tmp/claude-0/-home-user/fcc2596b-9e93-59c3-8571-0f8d02d480d4/scratchpad/video/a3/ref08_f11.8.png — crossing layers: photo + API cards
- /tmp/claude-0/-home-user/fcc2596b-9e93-59c3-8571-0f8d02d480d4/scratchpad/video/a3/ref08_f14.5.png — dark CTA end card
- Composite: ref08_tri.png; dense strips: ref08_s0.png, ref08_s1.4.png, ref08_s3.6.png, ref08_s5.png, ref08_s7.4.png, ref08_s9.2.png, ref08_s11.png, ref08_s12.4.png (same folder)

## Motion measurements (native 30 fps, per frame)
| move | frames | progress profile | easing verdict |
|---|---|---|---|
| Slab wipe (1.447 s) | 8 | edge 100→81→63→49→36→26→17→8→1 % | ease-out from full speed, cubic-bezier(0.25,0.6,0.4,1) |
| Card gather (3.07 s) | 7 converge + ~10 tuck | | ease-in-out, no overshoot |
| Card→circle (3.867 s) | cut + 24 grow | 363→515 px: 44% f4, 68% f8, 82% f12, 92% f16 | cubic-bezier(0.22,1,0.36,1) |
| Zoom-out (4.75 s) | 14 (+15 tail) | 515→239 px; per-frame shrink grows 3→52 px then brakes in 3 f | expo-in-out cubic-bezier(0.7,0,0.2,1) |
| Section exit (7.35 s) | 14 then cut | accelerating drift; foreground blob exits by f9 (1.6× speed) | ease-in |
| New section entry | 4–6 | slivers from right edge, decelerating | ease-out |
| Scatter/push exit (10.87 s) | 9 then cut | radial outward, accelerating | ease-in |
| End text settle (14.117 s) | 8 | scale ~1.2→1 | cubic-bezier(0.16,1,0.3,1) |
Constant drift between moves: 10–40 px/s depending on layer depth. No rendered motion blur.

## Sound & sync
- **Music**: 117 BPM (beat = 0.512 s = **15.4 f @30 fps**), warm bass-forward bed, continuous (−11…−19 dB, never drops out) with crisp percussive ticks (vertical lines in the spectrogram around 3.6–4.9 s, under the gather/morph/zoom). Fades out 14.2–15.0 s.
- **VO**: a single narrator (formant bands in the spectrogram) speaking in three phrases: ≈0.0–2.3 s ("Introducing ElevenLabs for students…" — matches the on-screen headline), **music-only 2.6–5.3 s** (while cards gather, morph to the orb and zoom out — the visuals carry this stretch alone), ≈5.3–8.0 s (offer / ElevenCreative; the transcript is too rough to recover wording), ≈9.0–13.7 s (Agents / API / Reader). The ASR transcript is unreliable; treat lines as approximate.
- **Strong hits** (s): 0.26, 0.70, 1.73, 3.62, 3.78, 4.13, 4.64, 4.90, 5.63, 8.45, 8.70, 10.21, 10.72, 12.35, 13.57.
- **Cut-on-beat ratio**: low, about 3/8 within ±2 f: slab 1.447 (onset 1.44 ✓, but the beat is 1.60), morph 3.867 (hit 3.78, 2.6 f ≈), zoom-out 4.75 (beat 4.64 / hit 4.90, ✗), section 7.82 (beat 7.68, 4 f ✗), Agents 9.5 (✗), API 11.17 (beat 11.23 ✓), Reader 12.6 (hit 12.35 ✗), CTA 14.117 (✗). The edit follows the **VO phrasing and its own constant drift**, with music as a smooth bed — transitions fall between VO phrases rather than on downbeats.
- **Sync rules to reuse**: (1) the opening hit (0.0, −4.6 dB transient) + the wordmark type-on start together; (2) leave a 2.5 s VO-free window for the most "visual" sequence (gather → orb → zoom) and fill it with percussive ticks; (3) start each feature label's type-on as the narrator names the feature; (4) CTA lands as the music fades — no final hit.

## Saved key frames (additions)
- /tmp/claude-0/-home-user/fcc2596b-9e93-59c3-8571-0f8d02d480d4/scratchpad/video/a3/ref08_n1.38.png — native: slab wipe, 15 frames
- /tmp/claude-0/-home-user/fcc2596b-9e93-59c3-8571-0f8d02d480d4/scratchpad/video/a3/ref08_n2.9.png — native: gather & stack
- /tmp/claude-0/-home-user/fcc2596b-9e93-59c3-8571-0f8d02d480d4/scratchpad/video/a3/ref08_n7.35.png — native: accelerate-out + sliver-in section change
- /tmp/claude-0/-home-user/fcc2596b-9e93-59c3-8571-0f8d02d480d4/scratchpad/video/a3/ref08_n10.5.png — native: scatter/push exit + crossing-layers entry
