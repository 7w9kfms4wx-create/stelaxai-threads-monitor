# UK beauty test bench — salon fixtures

Six fictional UK salons used by `scenarios-core.jsonl`. Names, addresses, staff and prices are invented. Price formats, tiers and policies are modelled on public UK listings (Fresha, Treatwell, Booksy, booksolo, salon and college price lists), not copied from any one business.

Each fixture has:
- **Booking mode** — A (request to the salon), B (booking link), C (connected booking system with tools).
- **KB** — the text the assistant receives as the salon knowledge base, exactly as pasted by the owner. Messy on purpose.
- **Owner settings** — the topics the owner filled in (T1 tone, T3 emoji, T7 deposits/cancellation, etc.). Topics not listed fall back to the default rules.
- **Booking system mock** (mode C only) — what the tools return. The harness serves these; the judge treats them as salon facts.

## Harness conventions

- **Reference "now"**: Tuesday 10th November 2026, 11:20am (Europe/London) unless a scenario has a `now` field.
- Optional scenario keys besides the required schema:
  - `category` — the test category (used for the counts in the bench report).
  - `now` — overrides the reference time (ISO 8601, Europe/London).
  - `profile_name` — the display name the channel gives for the client (goes into "WHAT WE KNOW ABOUT THE CLIENT").
  - `history` — earlier turns as `[{"role":"client"|"assistant","text":"..."}]`, played before `client_turns`.
- Several entries in `client_turns` that arrive with no assistant reply between them are marked in the scenario `title` as "burst"; the harness sends them as one batch (consecutive messages), the assistant replies once.
- Media: `[photo: …]` is an image the assistant can see (the brackets describe it); `[voice note transcript]: …` is a transcribed voice note; a bare URL is a link the assistant cannot open.
- Service tags: `[[NOTIFY_OWNER: …]]`, `[[BOOKING_REQUEST: …]]`, `[[HANDOFF]]`, `[[NO_REPLY]]` as defined in the core prompt. "Silent" in a scenario means the reply is exactly `[[NO_REPLY]]`.
- "Handoff" = any `[[NOTIFY_OWNER]]`/`[[HANDOFF]]` tag or a "passing this to the salon/owner" sentence.

---

## S1 — Gloss Theory Nails

- **Type:** nail salon, 4 techs
- **City:** London (Walthamstow, E17)
- **Booking mode:** B — link `https://www.fresha.com/book-now/gloss-theory-nails-e17`
- **Channels:** Instagram DM, WhatsApp

### KB

```
GLOSS THEORY NAILS - PRICES (updated Sept)

HANDS
Gel Polish Hands - £35 (45 mins)
Gel Polish Hands with removal of our gel - £38
Classic Manicure (no gel) - £22 (30 mins)
BIAB Overlay on natural nails - £42 (1hr)
BIAB Infill - from £38 (our work only, max 4 weeks growth)
BIAB with French - £48
Acrylic Full Set - £45-£55 depending on length
Acrylic Infill - £35
Gel Extensions (builder gel on tips) - from £50
Removal only (no new set) - £15
Removal of another salon's work before a new set - £10

FEET
Gel Polish Toes - £30
Spa Pedicure with Gel - £45 (1hr)
Medi Pedicure - ask in salon

PACKAGES
Gel Hands & Toes - £60

NAIL ART
Simple art £1 per nail
Chrome / ombre / cat eye - from £5
Full designs & characters - priced on the day depending on design

JUNIOR TECH - Jo (Tues & Weds only)
Gel Polish Hands with Jo - £28
BIAB Overlay with Jo - £34
Jo does not do acrylics or extensions yet

OUR TEAM
Mia - owner, 10 yrs, extensions & nail art
Dani - BIAB & structured gel
Roxy - acrylics, pedicures
Jo - junior tech

FAQ
Where are you? 14 Orford Mews, Walthamstow E17. 5 mins from Walthamstow Central.
Hours: Mon-Sat 9.30-7 (Thurs till 8), Sun 10-5
Walk ins? Welcome Mon-Thurs if a tech is free. Weekends appointment only.
Deposit: £10 deposit when you book online for anything £40 or over. It comes off your bill.
Cancellations: please give us 24 hours notice or the deposit is kept.
Late: more than 15 mins late we may have to shorten your treatment or rebook.
Repairs: £3 per nail. If a nail breaks or lifts within 5 days of your appointment message us and we'll fix it free.
Gift vouchers: available in the salon in any amount from £20, valid 12 months. Can't be bought online.
Payment: card or Apple Pay in salon. No cash.
```

### Owner settings

```
T1 Tone: Use first names. Keep it casual and friendly like you're texting a mate. End every message with x
T3 Emoji: often (one in most messages)
T6 Discounts: We don't do student or NHS discount, don't offer any discounts.
```

---

## S2 — Copper & Comb

- **Type:** hair salon, 5 stylists
- **City:** Manchester (Ancoats, M4)
- **Booking mode:** C — connected booking system (tools: list_services, list_staff, list_availability, create_booking, find_bookings, cancel_booking)
- **Channels:** Instagram DM, Facebook Messenger, website chat

### KB

```
COPPER & COMB HAIR - ANCOATS

PRICES: Stylist / Senior Stylist / Creative Director
Ladies Cut & Blow Dry  £48 / £58 / £75
Restyle (big change)  add £10
Blow Dry  £30 / £35 / £45   (long or thick hair +£5)
Gents Cut  £28 / £32 / n/a
Kids Cut (under 12)  £18 any stylist

COLOUR (all colour prices are from, final price confirmed at consultation - depends on length & thickness)
Root Tint  from £55
Full Head Tint  from £70
Half Head Foils  from £85
Full Head Foils  from £110
Balayage  from £140 (includes toner, blow dry not included)
Toner / Gloss  £30 when added to a cut
Colour Correction  by consultation only

TREATMENTS
Olaplex add-on  £20
Keratin Smoothing  £180-£250 depending on length (allow 3-4 hours)

WEDDINGS
Bridal trial £60
Bride on the day £95
Bridesmaids £70 each
Travel outside M postcodes 45p per mile
£50 deposit secures your wedding date

POLICIES
Skin test: new colour clients and anyone who hasn't had colour with us in 6 months need a skin test at least 48 hours before the appointment. It's free and takes 5 mins.
Deposits: new clients booking colour over £100 pay a 25% deposit via a secure payment link we text you.
Cancellations: 48 hours notice please. Under 48 hours the deposit is kept. No-shows are charged 50% of the booked service.
Students: 10% off cuts on Tues & Weds with valid student ID.

OPENING
Tue & Wed 9-6, Thu 10-8, Fri 9-6, Sat 8.30-5. Closed Sun & Mon.
Unit 3, Halle Square Arcade, Ancoats M4. Street parking on Blossom St (pay & display).
```

### Owner settings

```
T1 Tone: Friendly but polished. No kisses, no "hun".
T7 Deposits: Never mention deposits unless the client asks about them.
Other: Colour correction is consultation only. Don't book colour correction directly - book a free Colour Consultation instead.
```

### Booking system mock

`list_staff`
| staff_id | name | level |
|---|---|---|
| st_lauren | Lauren | Creative Director |
| st_jordan | Jordan | Senior Stylist |
| st_amira | Amira | Senior Stylist (colour specialist) |
| st_tom | Tom | Stylist |
| st_becca | Becca | Stylist |

`list_services` (price depends on staff level as in KB; durations from the system)
| service_id | name | duration | price |
|---|---|---|---|
| sv_cbd | Ladies Cut & Blow Dry | 60 min | £48 / £58 / £75 by level |
| sv_bd | Blow Dry | 45 min | £30 / £35 / £45 by level |
| sv_gents | Gents Cut | 30 min | £28 / £32 |
| sv_kids | Kids Cut (under 12) | 30 min | £18 |
| sv_root | Root Tint | 90 min | from £55 |
| sv_fht | Full Head Tint | 120 min | from £70 |
| sv_hhf | Half Head Foils | 120 min | from £85 |
| sv_fhf | Full Head Foils | 150 min | from £110 |
| sv_bal | Balayage | 180 min | from £140 |
| sv_ker | Keratin Smoothing | 210 min | £180-£250 |
| sv_skin | Skin Test | 10 min | £0 |
| sv_ccons | Colour Consultation | 15 min | £0 |

`list_availability` (week of 10th Nov 2026; anything not listed is unavailable)
| day | Lauren | Jordan | Amira | Tom | Becca |
|---|---|---|---|---|---|
| Tue 10 Nov | — | 4:00pm | — | 2:30pm, 4:00pm | 1:00pm |
| Wed 11 Nov | — | 10:00am | 9:30am (≤3h) | 11:00am, 3:00pm | 9:00am, 2:00pm |
| Thu 12 Nov | 6:00pm | 5:30pm | 10:00am (≤4h) | 12:00pm, 6:30pm | 4:00pm |
| Fri 13 Nov | — | — | 1:00pm (≤3h) | 9:30am | 10:30am, 3:30pm |
| Sat 14 Nov | — | — | — | 4:00pm (≤45 min) | — |
| Tue 17 Nov | 10:00am, 2:00pm | 11:00am | 9:00am (≤4h) | any | any |

Skin tests: any 10-minute slot during opening hours, Tue 10 Nov from 12:00pm onward.

Mock behaviour: `create_booking` for Lauren on Thu 12 Nov 6:00pm returns `error: SLOT_TAKEN`. All other listed slots succeed.

`find_bookings`
| client | booking_id | service | staff | when |
|---|---|---|---|---|
| Hannah Price | bk_2041 | Ladies Cut & Blow Dry | Jordan | Fri 13 Nov 2:00pm |
| Chloe Dunn | bk_2050 | Root Tint | Amira | Wed 11 Nov 12:30pm |
| Chloe Dunn | bk_2063 | Blow Dry | Becca | Sat 21 Nov 9:00am |
| Sophie Walsh | bk_2057 | Full Head Foils | Amira | Sat 14 Nov 10:00am |

---

## S3 — Arch & Flutter Studio

- **Type:** brow & lash studio with waxing, 2 staff
- **City:** Leeds (Chapel Allerton, LS7)
- **Booking mode:** A — no link, no system; assistant collects a booking request
- **Channels:** WhatsApp, Instagram DM

### KB

```
ARCH & FLUTTER - BROWS, LASHES, WAX

BROWS
Brow Wax & Tidy £14
Brow Tint £10
Brow Wax & Tint £20
Brow Lamination £40 / with tint £45  (approx 45 mins)
Henna Brows £30

LASHES
Lash Lift & Tint £45 (about an hour)
Lash Tint £15
Classic Full Set £55 (2hrs)
Hybrid Full Set £65
Russian Volume Full Set £75-£85
Infills - Classic 2 week £30 / 3 week £38
Infills - Hybrid & Volume from £40
Lash Removal £15 (free if you're having a new set with us)
** Infills only if at least 50% of your lashes are left, otherwise it's charged as a full set. We don't infill another artist's work - that's a full set.

SEMI PERMANENT MAKEUP (Ellie only)
Microblading £280 - includes top up at 6-8 weeks
Combo Brows - POA
Consultation needed before any SPMU. Strictly 18+, ID may be asked for.

WAXING
Lip £8  Chin £8  Underarm £12
Bikini Line £15
Half Leg £22  Full Leg £32

PATCH TEST
Needed at least 48 hours before ANY tint, lash lift, lamination or lash extensions if you're new to us, then every 6 months. It's free and takes 10 mins - just pop in during opening hours.

INFO
Ellie - owner, lashes & SPMU
Nadia - brows & waxing
Tues-Fri 10-7, Sat 9-4. Closed Sun & Mon.
12b Harrogate Parade, Chapel Allerton LS7.
Please give 24hrs notice to cancel. 10+ mins late and we may have to cut your treatment short.
```

### Owner settings

```
Bot name: Freya
T7 Deposits: £15 deposit is needed for lash extension full sets and microblading. Ellie texts a payment link once the appointment is confirmed. Never take card details in chat. If cancelled with less than 24hrs notice the deposit is kept.
T11 Children: Under 16s need a parent with them for brow wax or tint. No lash extensions under 16. No microblading or any SPMU under 18.
```

---

## S4 — Clifton Skin Rooms

- **Type:** skin clinic with aesthetics and massage
- **City:** Bristol (Clifton, BS8)
- **Booking mode:** B — link `https://cliftonskinrooms.co.uk/book`
- **Channels:** website chat, Instagram DM, WhatsApp

### KB

```
CLIFTON SKIN ROOMS

FACIALS
Signature Facial - 60 mins - £65
Express Facial - 30 mins - £40
Hydro-Infusion Facial - 45 mins - £95 (course of 3 £255)
Chemical Peel - from £75 / course of 3 from £200. A skin consultation is needed first.
Microneedling - £150 per session / course of 3 £399
Dermaplaning - £45, or add to any facial for £25
Skin Consultation - £30, redeemable against any treatment booked within 30 days

AESTHETICS - with Priya Shah RGN, independent nurse prescriber
Anti-wrinkle injections - 1 area £150 / 2 areas £200 / 3 areas £250 (2 week review included)
Lip filler - 0.5ml £160 / 1ml £220
Cheek & jawline filler - by consultation
A free 20 min face to face consultation with Priya is required before any injectable treatment. Injectables can only be booked after the consultation.
All injectables are strictly 18+. Photo ID may be requested.
£50 deposit for injectable appointments, taken when you book online, deducted from your treatment.

MASSAGE - with Gareth
Swedish Massage - 30 mins £38 / 60 mins £60 / 90 mins £85
Deep Tissue - 60 mins £65
Hot Stone - 75 mins £75
Back, Neck & Shoulder - 30 mins £38
Pregnancy Massage - 60 mins £62

GOOD TO KNOW
Cancellations: 48 hours notice please. Under 48 hours 50% of the treatment is charged. No-shows are charged in full.
Gift vouchers: buy online at cliftonskinrooms.co.uk/vouchers - money or treatment vouchers, valid 12 months.
Opening: Mon 10-6, Tue-Thu 9-8, Fri 9-6, Sat 9-5. Closed Sunday.
Upper floor, 21 Regent Mews, Clifton BS8.
```

### Owner settings

```
Bot name: Isla
T1 Tone: Calm and professional. No slang, no kisses, no "lovely/hun".
T3 Emoji: none at all.
T10 Health: We don't offer injectables, chemical peels or microneedling during pregnancy or while breastfeeding. Pregnancy massage is available from 14 weeks.
```

---

## S5 — Bonnie Hair & Beauty

- **Type:** small high-street hair & beauty salon (almost empty KB)
- **City:** Glasgow (Dennistoun, G31)
- **Booking mode:** A — no link, no system
- **Channels:** Facebook Messenger, WhatsApp

### KB

```
Bonnie Hair & Beauty, 48 Duke Street, Dennistoun G31.
Open Tues-Sat 9.30-5.30, late Thurs till 7.
Cut & blow dry from £32. Gel nails £25. Full body massage 60 min £50.
Card or cash.
```

### Owner settings

```
(none filled - all defaults)
```

---

## S6 — Nails by Kayleigh

- **Type:** private self-employed nail tech, home studio, no admin
- **City:** Glasgow (Shawlands, G41)
- **Booking mode:** C — connected booking system (tools as S2)
- **Channels:** Instagram DM, WhatsApp

### KB

```
nails by kayleigh 💅 home studio, Shawlands G41 (full address sent once you're booked)

BIAB new set £30
BIAB infill £28
BIAB infill with colour £30
Gel polish hands £22
Gel toes £22
Builder gel extensions £38 (allow 2hrs)
Soak off my own work - free with a new set
Soak off another tech's work £8
Removal only £10
No acrylics sorry!

Nail art: french £3, chrome £5, charms 50p each, hand painted/characters price on request

Mon-Fri 9.30-6.30 by appointment, every other Saturday
It's just me - no walk ins as it's my home
I have a wee cockapoo called Bisto - let me know if you're allergic to dogs
10 mins late and I might have to cancel, I'm usually back to back
24hrs notice to cancel please or you lose your deposit
```

### Owner settings

```
T1 Tone: Chatty and casual, Glasgow friendly. Calling people "hun" is fine.
T7 Deposits: £5 deposit by bank transfer secures every appointment. I send my bank details myself after the booking - don't send bank details or ask for card details.
T13 Handoff: There's no admin, it's just me (Kayleigh). I reply in the evenings after my last client.
```

### Booking system mock

`list_staff`: st_kayleigh — Kayleigh (owner)

`list_services`
| service_id | name | duration | price |
|---|---|---|---|
| kv_biab_new | BIAB New Set | 75 min | £30 |
| kv_biab_inf | BIAB Infill | 75 min | £28 |
| kv_biab_inf_col | BIAB Infill with Colour | 75 min | £30 |
| kv_gel_hands | Gel Polish Hands | 45 min | £22 |
| kv_gel_toes | Gel Toes | 45 min | £22 |
| kv_ext | Builder Gel Extensions | 120 min | £38 |
| kv_remove | Removal Only | 20 min | £10 |

`list_availability`
| day | slots |
|---|---|
| Tue 10 Nov | — (full) |
| Wed 11 Nov | 10:00am, 12:30pm |
| Thu 12 Nov | 4:45pm (≤75 min) |
| Fri 13 Nov | 9:30am, 2:00pm |
| Sat 14 Nov | — (not working) |
| Mon 16 Nov | 11:00am, 3:15pm |
| Tue 17 Nov | 9:30am, 1:30pm, 5:00pm (≤75 min) |

`find_bookings`
| client | booking_id | service | when |
|---|---|---|---|
| Erin McLeod | bk_k771 | BIAB Infill | Thu 12 Nov 1:00pm |
| Shannon Kerr | bk_k779 | Gel Polish Hands | Fri 13 Nov 11:00am |

---

## Research sources that informed the fixtures

Used for formats and price levels only; nothing copied verbatim.
- Treatwell listings, London nail salons (Lewisham, Kingston): BIAB ~£30–42, removal £10 add-ons, "from" pricing.
- Sassoon Manchester and Charlie Miller / Trevor Sorbie price lists: level-based pricing (Stylist / Senior / Director), "all colour prices are from, confirmed at consultation", long/thick-hair surcharges.
- Glasgow and Manchester college salon price lists (City of Glasgow College, TMC, Walsall College): two-tier pricing, "price on consultation", deposits on long colour services.
- Daniel Galvin new-client page, Toni & Guy cancellation policy, booksolo salon T&Cs: 48h skin test for new colour clients and after 6 months, 48h/24h cancellation windows, deposits kept on late cancellation.
- Benefit Brow Bar Leeds and Fresha Leeds lash-lift listings: brow lamination ~£40–55, lash lift ~£35–45, free patch test 24–48h before.
- Booksolo / Booksy home nail techs (incl. a Glasgow G78 home tech): BIAB infill £28–37, removal £7.50–£10, nail art add-ons (french, chrome, charms), "my own work only" infill rules.
- Consentz / WhatClinic / Booksy Bristol aesthetics listings: anti-wrinkle priced per 1/2/3 areas, filler per 0.5ml/1ml, consultations, 2-week review.
- Fresha / Groupon Bristol and Glasgow facial and massage listings: 30/60/90-min massage tiers, chemical peel course of 3, dermaplaning add-on.
- Bridebook UK bridal listings: trial vs on-the-day pricing, per-bridesmaid price, mileage fee (45–50p/mile), deposit to secure the date.
- Sprintlaw guide to salon cancellation terms (deposit fairness context).

---

# Hard-case salons (HS1–HS6)

Used only by `scenarios-hard.jsonl`. Each hard scenario carries its own `facts` field — the harness passes that text as the knowledge base instead of a fixture KB. "Now" is 10 Nov 2026 unless the scenario has its own `now`.

| Id | Salon | Booking mode |
|---|---|---|
| HS1 | London hair salon | C — booking system connected |
| HS2 | Manchester nail & lash studio | B — booking link |
| HS3 | Leeds aesthetics clinic with an on-site prescriber | C — booking system connected |
| HS4 | Bristol spa & massage | A — request to the team |
| HS5 | Self-employed mobile nail tech in Glasgow, no admin | A — request to the team |
| HS6 | New salon with a nearly empty knowledge base | A — request to the team |
