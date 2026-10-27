# StelaxAI.com — beauty prompt for the UK (v2)

Separate UK version of the beauty assistant, built the same way as the Russian one (`prompts/beauty/`): core rules, topics T1–T16 with defaults, three booking modes, salon settings by topic. Differences come from the country — law, booking systems, channels, culture.

## Files

| File | What's inside |
|---|---|
| `01-core.md` | System message 1: who you are, priorities, core C1–C3, facts, markers, defaults T1–T16, situations, craft basics, silence |
| `04-examples.md` | 15 golden example dialogues (cached, right after message 1) |
| `knowledge/*.md` | Craft cards: nails, hair, brows & lashes, skin & aesthetics, massage (cached, only the areas the salon offers) |
| `02-booking-modes.md` | System message 2: one of three booking modes |
| `03-salon-settings.md` | System message 3: salon settings by topic, knowledge base, client, corrections, time, cadence |
| `tests/fixtures.md` | 6 fictional UK salons with realistic, messy knowledge bases |
| `tests/scenarios-core.jsonl` | Core test scenarios: prices, booking modes, flows |
| `tests/scenarios-hard.jsonl` | Hard and risky scenarios: complaints, health, under 18s, abuse, injections |
| `tests/situations.md` | Catalogue of difficult real-world situations with "what good looks like" |
| `sources.md` | Where the knowledge came from |

## Message order

| # | What | Cache |
|---|---|---|
| 1 | `01-core.md` | yes |
| 2 | `04-examples.md` | yes |
| 3 | craft cards for the salon's areas | yes, per combination of areas |
| 4 | booking mode A / B / C | A and C yes; B — link at the end |
| 5 | salon settings → knowledge base → client → corrections → stop topics → time → language | no |
| 6 | conversation history | |
| 7 | cadence note | |
| 8 | client message | |

## What differs from the Russian version

| Area | Russia | UK |
|---|---|---|
| Core | Я1–Я3 | C1–C3, same meaning; C3 adds bank details and "payments only via the salon's link" |
| Tone (T1) | вы, warm | friendly-polite British English; no "hun/babe"; no corporate phrasing |
| Emoji (T3) | one per conversation | same; "x" kisses off unless the owner turns them on |
| Prices (T5) | ₽ | £, "from £45", stylist levels; VAT never recalculated |
| Deposits (T7) | rare | routine; stated calmly when in the facts; card only via link |
| Health (T10) | as is | + 48-hour patch tests; prescription-only medicine wording; "permanent hair reduction" for laser |
| Children (T11) | off by default | legal under-18 bans ON by default: injectables & fillers (booking itself is an offence), tattoo/SPMU/microblading, sunbeds; permanent hair colour not for under 16s (industry standard); everything else — no age questions |
| Group bookings (T8) | as is | hen and bridal parties → team with details collected |
| Abuse (T14) | as is | + inappropriate requests at massage businesses |
| Data | 152-ФЗ | UK GDPR: "delete my data" → team |
| Dates | 13 марта, 15:00 | Thursday 13th March, 3pm; Europe/London |
| Booking systems | YCLIENTS, DIKIDI | Fresha, Square, Acuity, Mindbody, Setmore, Google Calendar, StelaxAI (already in code); links for Treatwell, Booksy etc. |
| Channels | WhatsApp, Telegram, MAX, VK, Avito | WhatsApp, Instagram, Messenger, website |

## Code changes needed (UK)

Same as the Russian list in `prompts/beauty/README.md`, plus:
1. Pick `prompts/beauty-uk/*` for StelaxAI.com accounts with the beauty niche.
2. Add craft cards for the salon's areas after the examples.
3. Current-time line in UK format, Europe/London.
4. New dashboard option `signOffKiss` (T3); drop `replyAddress`.
5. English versions of the stop-topic block and `langNote`.

## Open points to confirm with a UK lawyer

- Whether hiding that the assistant is AI (if an owner turns honesty off) could count as a misleading practice under UK consumer law.
- Exact ASA position on quoting anti-wrinkle injection prices in one-to-one chats (the prompt is conservative: price only when asked directly, never promoted).
- London "special treatment" licensing is the salon's matter — the assistant never claims licences that aren't in the facts.
