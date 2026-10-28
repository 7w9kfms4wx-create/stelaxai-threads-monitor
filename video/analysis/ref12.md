# ref12 — "Eleven Creative · Avatars" 16:9 promo: a gradient orb becomes a portrait, then a minimal UI flow (Script + Avatar → consistent identity → prompt → lip-sync + TTS nodes), ending with two portraits that turn into the "II" logo mark

## Format
- 1276×718 (≈16:9), 30 fps, 52.1 s (≈1562 frames), stereo AAC 44.1 kHz.
- Audio: music bed + VO (see Sound & sync), music steady −13…−17 dB with regular dips. Notable: low-end swell at 2.2 s (orb→image zoom-through) and 7.1 s (logo reveal); a near-silent **break at 25.0–25.6 s** (−49 dB) right before the "Start frame / End frame" macro UI section — a musical pause used as a scene reset; fade-out from 49 s.
- Hard cuts only at 24.07 s and 26.0 s; everything else is morph/zoom continuity.

## Timeline
| time | on screen | how it animates | why it works |
|---|---|---|---|
| 0–1.9 | Off-white (#F2EFEE) bg with thin layout grid lines (1 px, ~6% black); small iridescent orb (orange/pink/lilac, 6→28 px) at centre | Orb grows from a dot (spring with small overshoot ~8f), slowly shimmers; grid lines **re-flow** — they snap to the orb's bounding box and shift as camera drifts. | "Design-tool" blueprint feel; one tiny hero object. |
| 1.9–2.4 | Orb → portrait tile | Orb morphs into a rounded square (radius ~10% of size) containing a portrait, starting fully tinted peach/pink and clearing to true colour; size 30→115 px in ~10f, ease-out; grid lines follow the tile edges. | The person is "generated" from the orb. |
| 2.4–3.3 | Portrait hold | Slow push (scale 1→1.1 over 25f). | |
| 3.3–3.8 | **Zoom-through** | Portrait scales ×1→×8 in ~15f (ease-in), tint returns (pink/orange gradient-map), blur 0→40 px; becomes a full-frame soft gradient. Bass swell. | Image dissolves into the brand atmosphere. |
| 3.8–5.2 | "Avatars" title | White, ≈20 px, regular, centre; fades in 12f over the moving pastel gradient bg. | Section/product label. |
| 5.2–5.6 | Title → caret | Letters erase from both ends toward a caret (≈8f). | Caret device again. |
| 5.6–7.3 | Logo build | Caret becomes "I"→"II" mark; the wordmark "Eleven Creative" (Eleven bold, Creative regular, ≈14 px, black) builds out letter by letter while bg fades from pastel to off-white. | Early logo, then straight into product. |
| 7.3–7.8 | Logo → pill → icon tile | Wordmark fades L→R into a peach gradient pill which contracts into a white squircle tile (≈60 px) containing a "script +" icon; icon flicks dark→brand red (#C0392B-ish). Soft shadow appears under tile. | Logo literally becomes the first UI object. |
| 7.8–9.5 | Tile → "Script" button | Tile widens to a pill-button (icon + "Script" label, label fades in with a pink→black colour settle); camera eases down/left. | |
| 9.5–10.5 | Second button "Avatar" | Slides in from the right (≈40 px, spring, ~10f) next to "Script"; an avatar thumbnail grows out from behind it and replaces the label. | Building blocks appear one by one. |
| 10.5–12 | "Create" tooltip button pops under, gets "clicked" (darkens → brand red flash 4f, then fades), Script chip slides behind the avatar, avatar enlarges to a video tile | Click = colour flash + scale 0.95→1. | |
| 12–14 | Generated talking-head video tile | Tile appears tinted pink/orange → clears (12f); slow push-in; grid lines reappear around it. | |
| 14–16 | **Grid build** | The tile spawns neighbours: a 2×3 then 5×3 grid of variations slides out from behind the centre tile (each tile from centre to its slot, ~10f, stagger ~2f), camera zooms out to fit. | Shows "many takes of the same person". |
| 16–17 | Grid collapse | Rows squash vertically into a single line (scaleY→0 per row, ~8f), then horizontally into one thin column → disappears. | Clean "close" transition. |
| 17–18.5 | Upload | Upload icon button appears in grid cell; a stack of 3 photos slides out from it (offset 6 px each, spring); button greys (pressed state). | |
| 18.5–20 | Stack → scatter | Stack is tinted pink/orange (generation tint), then cards **burst outward radially** to ~10 positions around the centre (ease-out, ~15f, slight rotation 0), tints clear one by one; headline "Consistent identity" fades in centre (accent colour → black). Cards keep drifting slowly (parallax). | Idea + proof in one composition. |
| 20.5–23 | **Coverflow carousel** | Cards gather into a horizontal row; centre card scale 1.25 and in front, neighbours 0.85 behind with 30% overlap; carousel advances every ~0.5 s (spring, ~10f each); stops on one; a check badge pops (scale 0→1, overshoot); neighbours fade/blur out. | Selection without a cursor. |
| 23–24 | Prompt typed under the selected card ("Hand raised, speaking to camera.") with send button | Typewriter ~2f/char. | |
| 24.07 (cut) –25 | Generation of that prompt | Card shows solid peach silhouette (gradient-mapped), then silhouette → red-tinted → natural video over ~25f (tint layers: lilac → orange → red → none). Soft radial pink glow behind card. | Signature "generation" look: gradient-map that fades. |
| 25–26 | (music break) Macro UI | Extreme close-up of composer UI (scale ≈3): "Start frame", "End frame" buttons, prompt "S|"→"Show @Jack" typed, @-mention dropdown with avatar "Jack" pops. | Macro = readable UI, zero clutter. |
| 26 (cut) –27 | Pull out | Cut to the full composer panel small (scale 1) with reference image row on top; images fill left→right (placeholder grey → tinted → clear). | |
| 27–29 | Macro again | Push-in (scale ≈2.5): prompt continues "talking in a park, wearing sunglasses."; send button pressed (black → peach, scale 0.9, fades). | |
| 29–31 | Result carousel | Horizontal infinite strip of portrait video tiles scrolling left (~250 px/s), items fading in from placeholders; one tile (sunglasses guy) is picked: neighbours fade, tile scales to centre and to 16:9 (aspect morph ~15f). Meta row (16:9 · 1920×1080 · 8s) under it; one chip flashes orange. | |
| 31–33 | Result → generation of next step | Tile tint-flashes (orange gradient-map) → becomes 3D-ish orange/pink "depth map" silhouette (lip-sync processing) → resolves into new video. | |
| 33–40 | **Node graph** | Pale dotted canvas (dot grid 16 px, ~8% black). "Jack" image node; coloured port dots (blue image, pink audio, purple video) with bezier wires drawing; "AI Lip Sync" node builds (placeholder → peach tint → video); "Text to Speech · Eleven v3" node: waveform appears, text typed ("So I just discovered this amazing new platform called ElevenCreative."), counter 0:09. Camera pans between nodes, then zooms out to show all three wired together. | The full pipeline in one view. |
| 40.5–42 | Port dot → orb conveyor | Output port dot slides right along a hairline; becomes an orb in an infinite horizontal **conveyor of iridescent orbs** (~40 px, 70 px spacing) scrolling left; orbs gently vary size (breathing). | Returns to the opening motif. |
| 42–45 | Orbs → portraits | One orb morphs into a rounded portrait tile (orb→squircle→portrait 3:4, ~10f), conveyor thins out to two portraits flanking the centre, conveyor stops; they slowly grow (push-in). | |
| 45.9–46.8 | **Portraits → logo mark** | Both portraits blur (0→20 px), stretch vertically to 1:3 tall bars, desaturate → mid-grey → near-black (~15f), sliding toward each other; they become the "II" mark at large size (~100 px tall). | Content becomes the logo. |
| 46.8–47.6 | Mark shrinks | Scale ×1 → ×0.16 over ~20f ease-in-out. | |
| 47.6–48.4 | Wordmark reveal | "Eleven Creative" letters reveal next to the mark (wipe across, ~1f/letter, slight blur). | |
| 48.4–52 | Logo hold | Static; music fades. | |

## Animation architecture
- **Layers**: (1) off-white bg + **layout grid lines** that track the hero element (a "Figma guides" layer); or pale dotted canvas for the node graph; or pastel gradient for title cards; (2) hero object (orb → tile → card → button); (3) UI chrome (buttons, prompt bar, chips, dropdowns) with soft shadows; (4) colour-tint overlay used for "generation" (gradient map that fades out).
- **Camera**: 2D only; constant slow push (1–2%/s); macro push-ins on UI (×2.5–3) alternating with pull-outs; zoom-through an image to transition; pans along a node graph; horizontal conveyors for abundance.
- **Transition vocabulary**: morph (orb↔tile↔button↔bars), zoom-through with blur, slit-collapse (rows squash), radial scatter/gather, coverflow advance, conveyor scroll, gradient-map generation tint, two hard cuts around a music break.
- **Typography**: tiny UI labels (10–14 px), section words ≈20 px, macro UI ≈28 px when zoomed. Typewriter with caret for prompts; @mention in blue (#2F5BEA) with dropdown; headline colour settles accent→black.
- **UI simulation**: buttons that morph out of each other, click = colour flash + scale dip, check badges, mention dropdown, placeholder → tinted → real media, node ports + bezier wires, waveform + time counter.
- **Depth/lighting**: very soft shadows (0 6 20 rgba(0,0,0,.06)), rounded corners ~12–16 px, radial pastel glow behind important tiles, no grain (cleaner than ref11).
- **Colour**: off-white base, iridescent pastel (peach #F8C9A0, pink #F3A6C8, lilac #B9A7F5, orange #F28C4B), a deep brand red for icons/clicks; everything else monochrome.

## Pacing & rhythm
- 52 s; new UI state every ~1.5–2.5 s (much faster than ref10). Only 2 hard cuts, both around a silent music break at 25 s that splits the film into Act 1 (avatars & identity) and Act 2 (prompting & pipeline).
- Early logo (5–7 s) then product; recurring motif (orb) opens and closes the film.
- Payoff: node graph zoom-out (40 s) showing the full pipeline → orbs → portraits → logo mark.
- Ending: content morphs into logo (≈2.5 s), 3.5 s hold. No CTA text.

## Frame-accurate motion measurements (native 30 fps)
| animation | frames | progress samples | verdict → implementation |
|---|---|---|---|
| Orb appear (0.03–0.37 s), 0→103 px | 10f | f2 16%, f4 46%, f6 75%, f8 91%, f10 98%; no overshoot | `cubic-bezier(0.33,1,0.68,1)` (easeOutCubic) 10f. |
| Orb → portrait tile (1.83–2.57 s) | 9f + 1f + 12f | anticipation: 107→205 px accelerating (ease-in, 9f); **1-frame shape swap** at 2.15 s (205→313 incl. tint glow); settle 313→449 decelerating (f2 47%, f4 70%, f8 90%, f12 100%) | 3-stage: `cubic-bezier(0.5,0,1,0.5)` 9f → hard swap → `cubic-bezier(0.16,1,0.3,1)` 12f. Tint overlay clears over the next ~15f. Starts on beat 1.98 (−2.4 f). |
| Stack → radial scatter (18.4–19.2 s) | ~24f | thumbnail shuffles images every 1–2f (6 images in 8f); stack builds +1 card / 2f; burst outward ~10f with expo-out; headline fades in during burst (~10f); tint clears per card 2–3f staggered after landing | Burst `cubic-bezier(0.16,1,0.3,1)` 10f, stagger 1f; starts on beat & strong hit 18.43 (+2.1 f). |
| Coverflow (20.5–23 s) | continuous | not stepped: the row pans left at ~7 px/f (1276 w); a card's scale is a function of its x — centre 1.3×, edges 0.85×; front/back handoff takes ~5f | Drive `x = x0 − 7·frame`; `scale = interpolate(|x−cx|,[0,180,400],[1.3,1,0.85])`; zIndex by distance. Starts on beat 20.58 (−2.4 f). |
| Portraits → "II" bars → shrink (45.9–47.67 s) | ~15f morph + 24f shrink | bar height 362→30 px: f2 6%, f4 20%, f6 40%, f8 60%, f10 75%, f14 90%, f20 98%, f24 100% | `cubic-bezier(0.45,0,0.2,1)` 24f. Shrink starts on beat 46.82 (−0.6 f); wordmark starts 47.49 beat (+3.3 f). |
| Zoom-through to "Avatars" (3.3–3.8 s) | ~15f | scale accelerates, blur ramps to ~40 px | ease-in 15f; starts exactly on beat+strong hit 3.33 (−0.9 f). |

## Sound & sync
- **Music**: warm, mid-tempo pop/electronic bed, **89.3 BPM** (1 beat = **20.2 frames**, 1 bar = 81 f). Even loudness −13…−17 dB with regular short dips every ~2 bars (6.1, 10.2, 15.9, 22.5 s), a **hard musical break 25.0–25.9 s** (−50…−57 dB, near silence), fade-out from 49 s.
- **Voice**: a VO runs under the music (speech formants visible in spectrogram; ASR rough). Gist with timestamps: 0.2 s "Every great voice…/[intro]"; 3.2 s "…**Avatars**…" (as the "Avatars" title appears at 3.8 s); 8.0 s line about scripts/avatars (Script + Avatar buttons 7.8–10.5 s); 10.8 s "…**talking head**…" (talking-head video at 12 s); 13.6–25 s "…generated together … from just a few photos create a **consistent** character … particular style/angle…" (grid + "Consistent identity" 14–20 s); **25–26 s VO and music pause**; 26–49 s "…turn it into … social content … across languages … **Eleven Creative** … only on Eleven Creative" (closing brand line over the logo at ~47–49 s).
- **Cut-on-beat ratio**: 2/2 hard cuts within ±2 f of a beat (24.07 s −1.0 f; 26.00 s −1.5 f, also a strong hit — the cut that *ends* the silence). Animation starts within ±3 f of a beat: 9 of 13 measured (orb→tile, zoom-through, icon tile, Avatar button, scatter, coverflow, mark shrink, wordmark, the second cut). This film is cut "to the grid": every new UI state starts on a beat; ~2 beats (40 f) per state.
- **SFX**: subtle UI ticks/whooshes are embedded on onsets (e.g. 8.06 click on the icon tile, 21.18–23.04 cluster of hits during coverflow advances = each card handoff gets a tick).
- **Sync rules**: (1) the VO names a concept within ~0.5 s *before* the matching visual appears (word leads picture); (2) one silence (1 beat + ~10 f) used as a scene reset before the second act, cut back in on the downbeat with a hit; (3) every UI state change on a beat, motion durations ≈ 0.5–1.2 beats (10–24 f); (4) brand line spoken over the logo reveal.

## Reusable recipes
1. **Orb → media tile**: orb 28px circle (iridescent radial gradients) → over 10f spring(damping 16, stiffness 180): size → 115×115, borderRadius 50% → 14px; image layer opacity 0→1 under a gradient-map tint (peach→pink) whose opacity 1→0 over the next 14f.
2. **Tracking layout grid**: 4 lines (1px, rgba(0,0,0,.06)) extending to frame edges, positioned at the hero's left/right/top/bottom bounds each frame (lerp with 0.25 smoothing so they lag slightly). Cheap, very "product/design".
3. **Zoom-through transition**: scale 1→8 over 15f `Easing.in(Easing.quad)`, blur 0→40px, gradient-map tint 0→1; underneath, the next scene's bg (pastel mesh) is already playing; cross at f12.
4. **Generation tint reveal**: stack media + overlay with `mix-blend-mode: color` (or pre-made gradient map); animate overlay colour lilac→orange→red and opacity 1→0 over 25f; add blur 10→0 in first 10f. Use for every "AI made this" moment.
5. **Radial scatter**: N=10 cards start stacked at center (offset 4px, rotation ±3°); target positions on an ellipse (rx 300, ry 180) with jitter; animate with spring(damping 20, stiffness 120), stagger 2f; then perpetual drift ±6px sin(t·0.6 + i). Headline in center fades in at f+8.
6. **Coverflow carousel**: index advances every 15f; for each card d = i − index: x = d·150px, scale = d==0 ? 1.25 : 0.85, zIndex = −|d|, opacity = |d|>2 ? 0 : 1; animate with spring(damping 22, stiffness 200). On select: check badge scale 0→1.15→1 (8f), neighbours opacity→0 & blur 8px over 10f.
7. **Macro push into UI**: wrap the composer in a camera group; cut/ease between scale 1 and 2.8 centred on the text caret (24f `bezier(0.65,0,0.35,1)`); type in macro, pull out to show context, push in again for the send click.
8. **Two items → logo mark**: two portraits; over 15f: blur 0→20px, scaleY 1→1.6 & scaleX 1→0.35 (to tall bars), saturate 1→0, brightness →0.2, x gap closes to the mark's gap; then whole mark scale 1→0.16 over 20f ease-in-out; wordmark letters reveal 1f each with opacity+blur 4→0.
9. **Click feedback**: button scale 1→0.94→1 (6f), bg black→brand accent for 4f, then button fades out 8f.
10. **Beat-locked timing at 89 BPM (beat = 20.2 f)**: one UI state per 2 beats (≈40 f); every transition starts on a beat; entrance motion 10–12 f (≈0.5 beat), morphs 20–24 f (≈1 beat), zoom-through 15 f ending on the next beat; one full silence of ~1.5 beats before the last act, re-enter with a hard cut on the downbeat.

## Saved key frames
- /tmp/claude-0/-home-user/fcc2596b-9e93-59c3-8571-0f8d02d480d4/scratchpad/video/a4/key_ref12_orbcard.png — orb-born portrait tile with tracking grid lines.
- /tmp/claude-0/-home-user/fcc2596b-9e93-59c3-8571-0f8d02d480d4/scratchpad/video/a4/key_ref12_coverflow.png — coverflow selection.
- /tmp/claude-0/-home-user/fcc2596b-9e93-59c3-8571-0f8d02d480d4/scratchpad/video/a4/key_ref12_macroui.png — macro composer with @mention.
- /tmp/claude-0/-home-user/fcc2596b-9e93-59c3-8571-0f8d02d480d4/scratchpad/video/a4/key_ref12_nodes.png — node graph (image → lip sync ← TTS).
- /tmp/claude-0/-home-user/fcc2596b-9e93-59c3-8571-0f8d02d480d4/scratchpad/video/a4/key_ref12_bars.png — portraits turned into the "II" logo bars.
- Strips: a4/r12_open.png (12 fps orb→tile→zoom-through), a4/r12_logo.png (10 fps portraits→logo), a4/r12_s0…s44.png (4 fps every 4 s).
