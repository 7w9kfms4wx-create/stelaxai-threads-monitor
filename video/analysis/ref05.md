# ref05 — ElevenLabs "Music / SFX for video" promo: upload a clip → prompt → generated soundtrack + SFX on a timeline (light UI + cinematic footage, 16:9)

## Format
- 1276×718 (≈16:9), 30 fps, 30.0 s (901 frames). H.264 + AAC 44.1 kHz stereo.
- Audio: **no voice-over** (transcript is noise). Sound = diegetic footage ambience (wind/surf broadband noise 0.9–4.5 s) + a sparse, chopped music bed at **144 bpm** that drops to **digital silence 13.9–15.2 s**, then the "generated" track slams in at 15.3 s (−7…−9 dB, loudest part), then SFX-led section, tail-out after 28.6 s.
- Scene detector finds only 2 cuts (13.9 playhead match-cut, 28.13 split) → otherwise a continuous camera.

## Timeline
| Time | On screen | How it animates | Why it works |
|---|---|---|---|
| 0.00–0.33 | Logo mark (two bars) centre on #F5F4F6 | Static, slight breathing | Instant brand |
| 0.33–0.73 | Bars grow tall | Bar height 48→170 px (@640w) ×3.5 in 12 f, ease-in-out | Bars become "curtains/frame" |
| 0.80–1.50 | Bars part like curtains; a video window grows between them from a dot | Bars x: main move 0.93–1.27 s (10 f covering ~80%), expo in-out cubic-bezier(0.8,0,0.2,1), then slow linear drift outward (~2–6 px/f). Window (rounded r≈12) grows from 9×5 px dot to ~410×235 px, edges trailing the bars by ~50 px | The logo literally "opens" onto the product's subject (footage) |
| 1.50–2.10 | Window → full-bleed | Window keeps scaling until full frame at 2.10, bars pushed off-screen; corners go 12→0 | Seamless entry into footage |
| 2.1–4.3 | Full-bleed beach footage (people running) | Footage plays with a slow push-in (~1.02×/s); real ambient sound audible | Emotional hook before any UI |
| 4.33–4.57 | Footage → upload thumbnail | Corners round at f11 (4.37), then **scale 1→~0.4 in 7 f** fast ease-out, travelling to the thumbnail slot top-left; upload card (filename "…mp4 / Analyzing video…") fades in around it | Shared-element: the clip IS the uploaded file |
| 4.57–5.8 | Upload card + prompt line | Camera continues pulling back (≈18 f slow ease-out), prompt text already typed in grey; "v2.5" chip, "No Finetune" | Context in one glance |
| 5.8–6.6 | Pan to send button | Fast camera pan down-right (~10 f) to the round black arrow button; zoom ≈1.4× | Guides the eye to the action |
| 6.6–7.0 | Button press | Button greys (#000→#5A5A5A) for ~4 f, background begins to tint pale blue | Click feedback without a cursor |
| 7.0–8.3 | **Anchored button morph** | Button stays locked at frame centre while the surrounding UI is replaced: blue gradient wash → result card; arrow icon dissolves into a play triangle, button fill goes black→grey gradient→light grey; title "Chic Brilliance" + waveform bars grow in from the right | The pressed button becomes the play button of the result = cause→effect in one object |
| 8.3–9.3 | Camera pull-back + lateral pan along the waveform | Zoom 1.5×→1×, pan right ~0.4 frame widths in ~20 f, ease-in-out; waveform reveals progressively | Shows the generated track list |
| 9.3–10.9 | List of results (Edit Song, star, download) | Slow drift; filter chips "Created after / before / Source" | Product breadth |
| 10.9–11.4 | List → blurred footage backdrop | List slides up/out; **a blurred, vertically-streaked version of the footage** becomes the background plate | Keeps the footage present without competing with UI |
| 11.4–13.1 | "Music V2" chip + "Generate music" pill on blurred plate; model dropdown opens | Dropdown height grows ~10 f ease-out; options listed; highlight row moves to "Music V2.5" | Feature detail |
| 13.1–13.8 | Push-in on "Generate music" | Camera scale ~1→1.5 over ~20 f; button press = grey for 5 f, then back to white | Build-up to payoff |
| 13.77–13.90 | **Giant playhead wipe** | A huge black timeline playhead (pin + line) swings in from left, covering ~55% width in 4 f (fast, linear-ish) | Transition device taken from the product's own UI |
| 13.90 | **Match cut** to timeline editor | Same playhead now small in the timeline; continues scrubbing left→right at constant speed (~3% frame width/f) | The wipe-object becomes the next scene's object |
| 13.9–15.2 | Timeline: video strip, "Generating music" shimmer bar, "Initializing SFX" skeleton chips | Shimmer gradient sweeps across the skeleton bars; **audio is silent** | Silence = suspense / "computing" |
| 15.2–15.4 | Skeletons resolve into real waveform + SFX chips (Footstep on sand / Wind gushing / Whoosh / Camera click) | Crossfade 6 f; music track starts at full volume (strong hit 15.26) | The payoff: you HEAR the generated result |
| 15.4–19.0 | Zoom out to full editor (left panel, preview video) then back in | Camera pull-out ~20 f, hold, push back ~20 f | Context then detail |
| 19.0–21.5 | Cursor drags waveform end handle to extend clip | Selection turns light blue (#CFE6FF), handle follows cursor; linear | Shows editability |
| 21.5–24.8 | Cursor clicks "Camera click" chip (turns blue), drags SFX chips along track; "Wind gushing" chip widens | Each interaction ~0.5–1 s, cursor moves with ease-in-out | SFX are objects you can place |
| 24.9–25.8 | Camera pushes into the video strip until a thumbnail frame becomes full-bleed footage | Strip height 87→285 px in ~28 f at nearly constant velocity (~7 px/f @640w), then cut-free into full footage | Returns to the cinema with the new soundtrack |
| 25.8–28.1 | Full-bleed footage: group posing on dunes, sunset; then wide with camera on tripod | Natural footage, slow push | Emotional resolution |
| 28.17–28.50 | Split | A thin white vertical line appears at centre (1 f), footage splits into two halves | Sets up logo |
| 28.50–29.17 | Two footage halves shrink into the two logo bars | Width 633→57 px, height 356→95 px over 20 f: slow 2 f start, fastest at f4–6, long ease-out, ≈cubic-bezier(0.6,0,0.15,1); footage stays visible inside the bars, then bars fill to black | Bookend: logo opened onto footage, footage closes into logo |
| 29.2–30.0 | Logo mark | Hold; audio tail | End |

## Animation architecture
- **Layers**: (1) background: light canvas #F5F4F6 or a heavily blurred/streaked footage plate (vertical-motion-blur look); (2) UI cards/fragments (white, r≈16–20 px, hairline #E6E6E6 border, very soft shadow); (3) full-bleed footage as its own "world"; (4) interaction layer: cursor, pressed-state, selection highlights; (5) oversized UI objects used as transitions (giant playhead).
- **Camera**: one virtual 2D camera that zooms 1×–2.5× into UI regions and pans between them; edges of UI are always cropped by the frame (we never see the whole app at once until the pull-out at 15.4 s). Moves are 15–25 f ease-in-out; very little idle time without movement.
- **Transition vocabulary**: logo-curtain open; footage→thumbnail shared element; anchored-object morph (button stays fixed, world changes around it); slide-up reveal of blurred plate; giant UI-object wipe + match cut (playhead); push-through a filmstrip thumbnail into full-bleed; split-into-logo outro.
- **Typography**: system grotesk (SF/Inter-like) regular/medium; product text sizes appear 2–3× real size due to zoom (e.g. "Generate music" ≈ 4.5% frame height when pushed in). No headline/kinetic text at all — the UI text IS the copy.
- **UI simulation**: pressed states (fill darkens ~35% for 4–5 f then releases), skeleton shimmer for generating, dropdown expand, cursor drags with handles, chips turning light-blue when selected, constant-speed playhead scrub.
- **Depth/lighting/colour**: neutral light UI + warm golden-hour footage; one accent: pale blue (#CFE3F7/#9EC3EA) for active/generating states. No grain; footage provides texture.

## Pacing & rhythm
- Shots/ideas every ~1.3–2 s in the UI section; footage sections longer (2–3 s).
- Structure: brand open (2 s) → footage hook (2.2 s) → upload/prompt (2.5 s) → result card (3.5 s) → model choice (3 s) → **silence + generating (1.3 s)** → payoff music + timeline editing (9.5 s) → footage resolution (3 s) → logo close (1.5 s).
- Tension device: music thins out during the UI setup (gaps, −25 to −30 dB), then full silence, then the loudest moment of the film when the generated music arrives. Visual payoff (waveform appears) and audio payoff are simultaneous.
- Ending: no text CTA, just the logo built out of the footage.

## Measured motion (30 fps frame-by-frame)
| Move | Frames | Profile |
|---|---|---|
| Logo bars grow taller ×3.5 | 12 | ease-in-out |
| Bars part (main) | 10 (+ ~20 f slow drift) | f2 5%, f4 30%, f6 65%, f8 85%, f10 95% → cubic-bezier(0.8,0,0.2,1) then linear drift |
| Footage→thumbnail | 7 fast + 18 slow | ease-out; corners round 1 f before shrinking |
| Playhead wipe | 4 | near-linear, fast (≈14% frame width per frame) |
| Filmstrip push-in | 28 | constant velocity (linear), slight ease-in at start |
| Split → logo bars | 20 | f1 4%, f2 11%, f3 20%, f4 34%, f5 51%, f6 58%, f10 ~80%, f20 100% → cubic-bezier(0.6,0,0.15,1) |
- No springs/overshoot anywhere. Pressed-state colour changes are 1-frame steps, releases 4–5 f.

## Sound & sync
- **Music**: 144 bpm (beat = 12.5 f) chopped lo-fi/hip-hop-ish groove whose stabs are separated by gaps (spectrum shows short vertical blocks with silence in between, 4.5–13.9 s) — feels like the track is "assembling". After the silence it plays fully (dense spectrum, 15.3–28.6 s).
- **Diegetic audio**: beach wind/surf noise under the opening footage (0.9–4.5 s), stops exactly when the footage becomes a UI thumbnail (4.4 s) → sound tells you "we left the footage world".
- **Silence drop**: 13.9 s (match cut) → −55…−113 dB until 15.2 s. Music re-enters on strong hit 15.26 s exactly when skeletons resolve to waveform/SFX chips.
- **Cut-on-beat**: 0/2 scene cuts on beat (13.9 is −4.5 f before a beat — it's a cut INTO silence, deliberately off-grid). Of 21 animation starts, 5 within ±2 f, but most others start **3–6 frames before a beat** (0.33 −3.6 f, 2.0 −3.3, 6.1 −3.3, 9.0 −2.7, 19.0 −4.2, 24.9 −3.6) → motion is launched early so its fastest part/landing hits the beat. Strong hits coincide with UI arrivals: 4.93 (upload card settles), 8.19/8.64 (result card + waveform), 15.26 (payoff), 21.31 (SFX chip click).
- **SFX**: the SFX in the product demo ("Camera click", "Whoosh", "Footstep on sand", "Wind gushing") are audible as the cursor interacts with those chips (onsets ~21–24 s) → diegetic UI sound design.
- **Sync rules**: (1) let ambient/natural sound carry footage, (2) strip music down during setup, (3) total silence for ~1.3 s (≈ 3 beats) before the reveal, (4) the reveal frame = the loudest audio frame, (5) start motions ~4 f (≈⅓ beat) before the beat.

## Reusable recipes
1. **Logo curtain open**: two logo bars grow height ×3.5 over 12 f (ease-in-out), then translate apart ±40% frame width over 10 f cubic-bezier(0.8,0,0.2,1) + 20 f linear drift of 3 px/f; a rounded rect (r 12) grows from 0 to fill between them (its width = barGap − 2×24 px) and finally scales to full-bleed by frame 54 while corner radius → 0.
2. **Footage → UI thumbnail**: at T, borderRadius 0→16 in 1 f, then transform the full-bleed clip to the thumbnail rect in 7 f easeOutCubic, UI card opacity 0→1 over the same 7 f, then camera scale 1.25→1 over 18 f easeOutQuad.
3. **Anchored-button morph**: keep the button at a fixed screen position for 40 f; t0–4: pressed (fill #000→#5A5A5A); t4–20: background crossfades to new screen (blue wash then result card), icon crossfades arrow→play (opacity + rotate 90°→0 over 8 f), fill → #E6E6E6; new card contents slide in from right 24 px, 12 f stagger 3 f.
4. **Giant UI-object wipe + match cut**: render the product's own UI object (playhead / cursor / bubble) at 6× size crossing the frame in 4 f (linear), cut on the frame where it covers centre to the next scene where the same object at 1× continues the motion at constant speed.
5. **Silence-then-slam reveal**: generating skeletons with a shimmer (linear-gradient 120°, white 40% band moving 100% width per 30 f) for 36–40 f (≈3 beats at 144 bpm) with audio muted; on the reveal frame crossfade skeleton→content in 6 f and start the music at full level.
6. **Push through filmstrip**: scale the timeline so a single thumbnail grows to full-bleed over 28 f, linear velocity, swapping the thumbnail for the live video at ≥80% coverage.
7. **Split-into-logo outro**: draw a 2 px white line at centre for 1 f, then split the footage into two masked halves, each shrinking toward its logo bar rect over 20 f cubic-bezier(0.6,0,0.15,1); last 6 f crossfade footage fill → solid black.
8. **Pressed state**: fill darkens 35% instantly (1 f), holds 3–5 f, releases over 5 f ease-out; no scale change (or ≤3%).
9. **Beat-anticipation rule**: start every transition `round(beatFrames/3)` (≈4 f at 144 bpm) before the beat so the 50% point lands on the beat.

## Saved key frames
- /tmp/claude-0/-home-user/fcc2596b-9e93-59c3-8571-0f8d02d480d4/scratchpad/video/a2/ref05_kf_logo_window.png — logo bars parting with the video window growing between them
- /tmp/claude-0/-home-user/fcc2596b-9e93-59c3-8571-0f8d02d480d4/scratchpad/video/a2/ref05_kf_anchor_button.png — anchored button mid-morph (send → play)
- /tmp/claude-0/-home-user/fcc2596b-9e93-59c3-8571-0f8d02d480d4/scratchpad/video/a2/ref05_kf_blur_plate_dropdown.png — UI pills + dropdown over blurred footage plate
- /tmp/claude-0/-home-user/fcc2596b-9e93-59c3-8571-0f8d02d480d4/scratchpad/video/a2/ref05_kf_timeline.png — timeline editor with SFX chips
- /tmp/claude-0/-home-user/fcc2596b-9e93-59c3-8571-0f8d02d480d4/scratchpad/video/a2/ref05_kf_split_to_logo.png — footage split line before collapsing into the logo
- Native-30fps strips: a2/ref05_n30_shrink.png (footage→thumbnail), a2/ref05_n30_playhead.png (playhead wipe + match cut); sparse strips a2/ref05_[a-j].png
