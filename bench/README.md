# Prompt bench

Runs the UK test scenarios against the assistant prompt, plays the client with a second model, grades every conversation with a judge model and writes a report with four metrics: hallucinated salon facts, unnecessary handoffs, tone, conversion.

No dependencies — Node 18+ only.

## Run

```bash
export OPENAI_API_KEY=sk-...            # needs access to gpt-5.6-luna and gpt-5.6-terra
node bench/run.mjs                       # all 170 UK scenarios, prompt v2
node bench/run.mjs --suite core          # only the 90 core scenarios (or --suite hard)
node bench/run.mjs --ids C001,H019       # a few scenarios
node bench/run.mjs --dry --ids C001      # print the assembled prompt, no API calls (--full for full text)
```

Results go to `bench/results/<time>-<version>/`: `report.md` (summary, breakdowns, every failure with its transcript) and `results.json`.

Options: `--concurrency 4`, `--sim-turns 2` (extra simulated client turns after the scripted ones), `--limit N`, `--out DIR`.
Models: `BENCH_MODEL` (assistant, default `gpt-5.6-luna` — what clients get), `BENCH_SIM_MODEL` (client, default luna), `BENCH_JUDGE_MODEL` (default `gpt-5.6-terra`). `OPENAI_BASE_URL` to point elsewhere.

Cost guide: one full run ≈ 170 conversations × ~4 assistant turns with a ~12k-token prompt (mostly cached) + 170 judge calls.

## Compare with the current production prompt

The current prompt is built straight from the StelaxAI code, so this runs where the StelaxAI repo has its dependencies installed (e.g. the server):

```bash
node bench/run.mjs --write-contexts /tmp/contexts.json
cd /var/www/stelaxai && npx tsx /path/to/bench/current-prompt.ts < /tmp/contexts.json > /tmp/current-prompts.json
cd - && node bench/run.mjs --version current --current-prompts /tmp/current-prompts.json
```

Then compare the two `report.md` files.

Limits of the comparison: the current prompt gets the owner settings as its free-text persona; the question-cadence note and conversation memory are not simulated for either version.

## How it works

| File | Role |
|---|---|
| `run.mjs` | loads scenarios and fixtures, builds the prompt, plays the conversation, calls the judge, writes the report |
| `lib.mjs` | prompt assembly (core + examples + craft card + booking mode + salon settings + KB + time), fixture parsing, booking-system mock |
| `judge.mjs` | grading rubric |
| `report.mjs` | metrics and the markdown report |
| `current-prompt.ts` | builds the current production prompt from the StelaxAI code |

Booking mode C uses a mock booking system from `prompts/beauty-uk/tests/fixtures.md` (staff, services, free times, existing bookings, one "slot taken" trap). Hard-case scenarios carry their own facts.
