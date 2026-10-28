<inputs>
Ask me for:
1. Salon data for the personalised version: owner first name, salon name, staff member, main service with price and duration, add-on service with price, appointment day and time, finish time, and booking target: "fresha" (connected calendar) or "phone" (no booking system — the request goes to the owner's phone).
2. Five voice-over files (ElevenLabs), one per line: "Every missed message is a client booking elsewhere." / "Nearly eleven at night. She asks — and she's answered in seconds." / "It doesn't just answer. It upsells, recalculates, and gets her booked in." / "Booked straight into your diary — automatically." / "Five days free. Start now at stelaxai dot com."
3. A royalty-free track at 120 BPM, light minimal electronic, no vocals (e.g. Mixkit, free for commercial use).
4. The Stelax logo as SVG and the brand accent colour.
</inputs>

<direction>
ElevenLabs-level product film. One world, one camera, never cut until the end card: scenes flow into each other through the camera and through objects turning into the next object.
The hero is the Stelax dot. It is the same element from first frame to last: it becomes the typing indicator, the reply grows out of it, the confirmation becomes the appointment, the appointment collapses back into the dot, the dot becomes the logo.
Every result grows out of the action that caused it. A message is typed in the composer and lifts into the thread; the reply grows out of the typing indicator; the receipt unfolds out of the reply; the confirmation bubble detaches and flies into the calendar slot.
The camera works for meaning: it pushes in when something important happens (price, total, slot), pulls back to show the bigger picture, and flies into the dot to change worlds.
Warm light canvas (#F4F2EE) with a slowly drifting blurred gradient of the brand colour and 3–4% animated monochrome grain at the start and the end; neutral surfaces in the middle. A minimal line-art phone (no real device model). WhatsApp-like chat built from scratch (outgoing #D9FDD3, incoming #FFFFFF, chat bg #EFEAE2, radius 18) and a Fresha-like day calendar built from scratch — no real logos, screenshots or sounds of WhatsApp or Fresha. One UI font: Geist (Semibold 600 for titles, tracking −2%; Regular 400 for text). One accent: the brand colour, used only for "smart" moments (the dot, highlights, rings). Chat text 40–44 px at 1080 width so it reads on a phone. One idea on screen at a time.
Never static: during holds everything drifts slightly (phone rotateY −4°→0°, background blobs 10–20 px/s).
Banned: bouncy easing, typewriter on incoming messages (they arrive whole), crossfade or blur-dissolve as a scene transition, particle bursts, lens flares, gradients on UI chrome, mismatched icon strokes, dead time, anything that looks like a template.
</direction>

<structure>
1080x1920, 120 BPM, beat = 0.5 s, bar = 2 s, 13 bars = 26 s. Something happens on every beat. Big transitions sit in the gaps between voice-over lines; the visual a line talks about appears 0–6 frames before the word. Only the biggest moments land their peak velocity on a beat; motions start about a third of a beat early so they land on it.

Bar 1 (VO1 starts at 0.0 s) — "Made for", "{owner}", "{salon}" rise word by word on beats 1–3. Top right, an unread badge pops in and its number rolls 1 → 3 → 7 on beats 2–4.
Bar 2 — words exit upward in reverse order. Only the Stelax dot stays. The camera flies into the dot (dot scale ×60 over 20 frames) and its colour fills the frame and becomes the chat background. The phone settles out of it by beat 4. Giant "22:41" macro type sits behind the phone at 6% opacity.
Bar 3 (VO2 starts at 3.2 s) — The client's message types in the composer, send tap on beat 1, the bubble lifts from the composer into the thread on beat 2, ticks turn blue on beat 3, the Stelax dot splits into three typing dots on beat 4.
Bar 4 — The reply grows out of the typing indicator on beat 1 ("Hi {owner}! Saturday 2pm with {staff} is free — {service}, {duration}, {price}"). The camera pushes in ×1.28 on beat 2. A highlight sweeps under "2pm", "{duration}", "{price}" on beats 3–4. A small satellite chip "replied in 4 s" pops beside the bubble.
Bar 5 — Hold with drift. The camera returns to ×1 on beat 3. The thread scrolls by the reply's height on beat 4.
Bar 6 (VO3 starts at 11.0 s) — "Can I add a trim too?" is typed and sent on beats 1–2. The typing dots run on beats 3–4.
Bar 7 — The reply grows on beat 1. A receipt unfolds out of the reply's bottom edge on beat 2. Line items drop with accelerating spacing on beats 3–4.
Bar 8 — The total rolls {price} → {total} with a soft chime on beat 1, and the camera pushes in on the total. The chip "done by {endTime}" slides in on beat 2. "Shall I book it in?" arrives on beat 3. "Yes please" is typed and sent on beat 4.
Bar 9 — The typing dots run on beat 1. The confirmation "Booked ✓ Saturday 2pm with {staff}" grows out of them on beat 2. The camera pushes in on it on beat 3. Music drops to silence on beat 4 (reverb tail only).
Bar 10 (VO4 starts at 19.0 s) — In silence, the confirmation bubble detaches from the thread and flies (24 frames). The camera pulls back ×0.76. The phone slides left into a rack-focus blur (0 → 24 px). The Saturday day view of the calendar builds column by column with {staff}'s column highlighted.
Bar 11 — On the downbeat the bubble lands in the 2:00–6:00 pm slot and becomes the appointment block. The music slams back at full level with a soft "thock" and shimmer, and a ring expands from the slot. The check draws on beat 2. "Synced with your calendar" rises word by word on beats 3–4.
   If booking target = "phone": the bubble instead becomes a lock-screen notification "New booking — {service}, Sat 2pm" landing on the owner's phone, and VO4 is replaced by "Every booking request — straight to your phone."
Bar 12 (VO5 starts at 21.7 s) — The appointment block collapses into the Stelax dot on beats 1–2 (blur 0 → 20 px, stretch, then scale 1 → 0.16). The dot opens into the logo on beat 3. "£0" pulls back from scale 3 to 1 on beat 4.
Bar 13 — "for 5 days" rises on beat 1. "stelaxai.com" rises on beat 2 with an underline drawing beneath it. Hold on beats 3–4 with only the background breathing. The music ends on its final chord or chime.
</structure>

<motion>
Use these measured curves (cubic-bezier unless a spring is named):
- Soft pop (messages, chips): scale 0.92→1 from the bubble's tail corner, y +24→0, opacity 0→1, blur 8→0, 14 frames, (0.22,1,0.36,1).
- Word rise: y +30→0, opacity 0.5→1, blur 8→0, 7 frames, (0.16,1,0.3,1), 4-frame stagger.
- Word exit: y 0→−30, opacity → 0, blur → 8, 10 frames, (0.7,0,0.84,0), 2-frame stagger in reverse.
- Grow-from (typing → reply, reply → receipt): FLIP between the two rects with border-radius interpolated, spring(damping 20, stiffness 170). Text inside enters line by line, 3-frame stagger, after 60% of the morph.
- Push-in: scale ×1→×1.28 over 16 frames, (0.45,0,0.15,1). Pull-back: 14 frames, (0.65,0,0.35,1).
- Fly-into-dot: dot scale ×60 over 20 frames, (0.7,0,0.2,1).
- Flight to the calendar: 24 frames, (0.3,0,0,1), with motion blur from subframes.
- Slot landing: scale 1.06→1, spring(damping 18, stiffness 160), at most a 3% overshoot.
- Collapse to logo: blur 0→20 and stretch over 15 frames, then scale 1→0.16 over 24 frames, (0.45,0,0.2,1).
- Macro type pull-back ("£0"): scale 3→1, blur 12→0, 30 frames, (0.65,0,0.35,1).
- Number roll: each digit column scrolls, 18 frames, (0.22,1,0.36,1), tabular numerals.
- Typing dots: each scales 1→1.35→1, period 18 frames, phase offset 6 frames.
</motion>

<build>
1. One HTML file, 1080x1920. Every style is computed from time inside seek(t): no CSS transitions, no timers, no state carried between frames. All salon data comes from a CONFIG object, so the same file renders any salon.
2. Springs are closed-form step responses. A value that changes target many times is the sum of one spring per change, so it stays a pure function of time.
3. One camera: a single world container whose translate/scale/rotate is a pure function of t built from keyframes on the beat grid. No element animates its own position to fake a camera move.
4. Shared elements are real: the dot, the typing indicator, the reply, the confirmation bubble and the appointment block are one DOM element changing rect, radius, colour and content. Never swap in a lookalike.
5. Analyze the song with numpy for the beat grid and start on a downbeat. Place every sound (pop, tick, chime, whoosh 6–8 frames before camera flights, thock + shimmer, logo chime) by its measured peak. Mix: VO on top; music ducked −8 dB under each VO line; full silence for one beat before the slot landing; SFX at −18 to −24 dB.
6. Render with Playwright: 4 subframes per frame, blended with ffmpeg tmix for motion blur at 60 fps; mux audio with ffmpeg.
7. Render one frame per beat (52 stills) as a contact sheet before the full render. Fix anything off the grid, cramped, or hard to read at 360 px wide (phone in an email).
8. Add a batch script: CSV of salons → one MP4 per salon named after the salon.
</build>

<gotchas>
Never put will-change on anything the camera scales or the text renders blurry. Text that swaps inside a morphing container needs its own enter and exit timing or it overlaps. Incoming messages never type letter by letter; only the client's own composer types. Keep the phone's chat text ≥ 40 px at 1080 width. Long names and prices from CONFIG must not break bubble layout — test with the longest realistic values. The final hold must be calm: no motion except the background.
</gotchas>

<start>
Ask me for the inputs, then show me the bar-by-bar beat grid with the VO line timings and four key stills (bar 2 dot fly-in, bar 4 push-in on the price, bar 11 slot landing, bar 13 end card) before you write the full film.
</start>
