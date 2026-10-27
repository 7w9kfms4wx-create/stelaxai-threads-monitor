#!/usr/bin/env node
// Prompt bench: plays each scenario against the assistant, simulates the client, asks a judge to grade.
//
//   OPENAI_API_KEY=… node bench/run.mjs                       # all UK scenarios, prompt v2
//   node bench/run.mjs --ids C001,H019 --verbose              # a few scenarios
//   node bench/run.mjs --suite core --limit 20                # first 20 core scenarios
//   node bench/run.mjs --version current --current-prompts p.json   # current production prompt (see README)
//   node bench/run.mjs --dry --ids C001                       # print assembled prompt, no API calls
import { mkdirSync, writeFileSync, readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { loadJsonl, loadFixtures, ukPrompt, buildV2Messages, TOOL_DEFS, runTool, markers, parseOwnerSettings, DEFAULT_NOW } from "./lib.mjs";
import { chat } from "./openai.mjs";
import { judge } from "./judge.mjs";
import { report } from "./report.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const args = Object.fromEntries(process.argv.slice(2).reduce((acc, a, i, all) => {
  if (a.startsWith("--")) acc.push([a.slice(2), all[i + 1] && !all[i + 1].startsWith("--") ? all[i + 1] : true]);
  return acc;
}, []));

const PROMPT_DIR = args["prompt-dir"] || join(ROOT, "prompts/beauty-uk");
const TEST_DIR = join(PROMPT_DIR, "tests");
const MODEL = process.env.BENCH_MODEL || "gpt-5.6-luna";
const SIM_MODEL = process.env.BENCH_SIM_MODEL || "gpt-5.6-luna";
const JUDGE_MODEL = process.env.BENCH_JUDGE_MODEL || "gpt-5.6-terra";
const VERSION = args.version || "v2";
const SIM_TURNS = +(args["sim-turns"] ?? 2);
const CONCURRENCY = +(args.concurrency || 4);
const MAX_TOOL_ROUNDS = 5;

const fixtures = loadFixtures(join(TEST_DIR, "fixtures.md"));
let scenarios = [];
if (args.suite !== "hard") scenarios.push(...loadJsonl(join(TEST_DIR, "scenarios-core.jsonl")));
if (args.suite !== "core") scenarios.push(...loadJsonl(join(TEST_DIR, "scenarios-hard.jsonl")));
if (args.ids) { const ids = new Set(String(args.ids).split(",")); scenarios = scenarios.filter(s => ids.has(s.id)); }
if (args.limit) scenarios = scenarios.slice(0, +args.limit);

const P = ukPrompt(PROMPT_DIR);
const currentPrompts = VERSION === "current" ? JSON.parse(readFileSync(args["current-prompts"], "utf8")) : null;

function systemFor(s) {
  const salon = fixtures[s.salon];
  if (!salon) throw new Error(`${s.id}: unknown salon ${s.salon}`);
  if (VERSION === "v2") {
    const sys = buildV2Messages({ P, salon, scenario: s });
    return { pre: sys.slice(0, -1), post: sys.slice(-1), salon };
  }
  const c = currentPrompts[s.id];
  if (!c) throw new Error(`${s.id}: no current prompt — rebuild prompts.json with bench/contexts.mjs`);
  return { pre: c.pre.map(content => ({ role: "system", content })), post: c.post.map(content => ({ role: "system", content })), salon };
}

// One assistant turn: may call booking tools (mode C) several times.
async function assistantTurn(s, salon, pre, post, dialog) {
  const mode = s.mode || salon.mode;
  const useTools = mode === "C";
  const lastUser = dialog.length - [...dialog].reverse().findIndex(m => m.role !== "user");
  const convo = [...pre, ...dialog.slice(0, lastUser), ...post, ...dialog.slice(lastUser)];
  const toolLog = [];
  for (let round = 0; round <= MAX_TOOL_ROUNDS; round++) {
    const { message } = await chat({
      model: MODEL, messages: convo,
      tools: useTools && round < MAX_TOOL_ROUNDS ? TOOL_DEFS : undefined,
      reasoningEffort: useTools ? "none" : "low",
    });
    if (message.tool_calls?.length) {
      convo.push({ role: "assistant", content: message.content || null, tool_calls: message.tool_calls });
      for (const call of message.tool_calls) {
        let a = {}; try { a = JSON.parse(call.function.arguments || "{}"); } catch {}
        const result = runTool(salon, s, call.function.name, a);
        toolLog.push({ tool: call.function.name, args: a, result: result.slice(0, 1500) });
        convo.push({ role: "tool", tool_call_id: call.id, content: result });
      }
      continue;
    }
    return { text: (message.content || "").trim(), tools: toolLog };
  }
  return { text: "", tools: toolLog };
}

async function simulateClient(s, transcript) {
  const sys = `You are role-playing a CLIENT texting a UK beauty salon. Stay in character.
Scenario: ${s.title}
How you behave: ${s.simulator_brief || "Reply naturally and briefly."}
Write ONE short message the way real UK clients text (lowercase, abbreviations, occasional typos). If your goal is reached or the conversation has naturally ended, reply with exactly [END].`;
  const convo = transcript.map(t => `${t.role === "client" ? "YOU" : "SALON"}: ${t.text}`).join("\n");
  const { message } = await chat({ model: SIM_MODEL, messages: [{ role: "system", content: sys }, { role: "user", content: `Conversation so far:\n${convo}\n\nYour next message:` }], reasoningEffort: "low" });
  const text = (message.content || "").trim();
  return /^\[END\]$/i.test(text) ? null : text;
}

async function runScenario(s) {
  const { pre, post, salon } = systemFor(s);
  const transcript = [];
  const dialog = [];
  for (const h of s.history || []) {
    dialog.push({ role: h.role === "client" ? "user" : "assistant", content: h.text });
    transcript.push({ role: h.role === "client" ? "client" : "assistant", text: h.text, history: true });
  }
  const burst = /burst/i.test(s.title);
  const turns = burst ? [s.client_turns] : s.client_turns.map(t => [t]);
  const sendAndReply = async msgs => {
    for (const m of msgs) { dialog.push({ role: "user", content: m }); transcript.push({ role: "client", text: m }); }
    const r = await assistantTurn(s, salon, pre, post, dialog);
    dialog.push({ role: "assistant", content: r.text });
    transcript.push({ role: "assistant", text: r.text, tools: r.tools, markers: markers(r.text) });
    return r;
  };
  for (const t of turns) await sendAndReply(t);
  for (let i = 0; i < SIM_TURNS; i++) {
    const next = await simulateClient(s, transcript.filter(t => !t.history));
    if (!next) break;
    await sendAndReply([next]);
  }
  const facts = s.facts || [salon.kb, salon.owner && "OWNER SETTINGS:\n" + salon.owner, salon.bookingMock && "BOOKING SYSTEM DATA:\n" + salon.bookingMock].filter(Boolean).join("\n\n");
  const verdict = await judge({ model: JUDGE_MODEL, scenario: s, facts, mode: s.mode || salon.mode, now: s.now || DEFAULT_NOW, transcript });
  return { id: s.id, title: s.title, area: s.area, mode: s.mode || salon.mode, salon: s.salon, category: s.category || (s.id.startsWith("H") ? "hard" : "core"), transcript, verdict };
}

async function pool(items, n, fn) {
  const out = new Array(items.length);
  let i = 0;
  await Promise.all(Array.from({ length: n }, async () => {
    while (i < items.length) {
      const k = i++;
      try { out[k] = await fn(items[k]); }
      catch (e) { out[k] = { id: items[k].id, title: items[k].title, error: String(e.message || e) }; }
      process.stderr.write(`${out[k].error ? "✗" : "✓"} ${items[k].id}${out[k].error ? " " + out[k].error.slice(0, 120) : ""}\n`);
    }
  }));
  return out;
}

if (args["write-contexts"]) {
  const ctx = scenarios.map(s => {
    const salon = fixtures[s.salon];
    const o = parseOwnerSettings(salon.owner || "");
    return { key: s.id, kb: s.facts || salon.kb || "", owner: salon.owner || "", botName: o.botName, mode: s.mode || salon.mode, link: salon.link, now: s.now || DEFAULT_NOW };
  });
  writeFileSync(args["write-contexts"], JSON.stringify(ctx));
  console.error(`Wrote ${ctx.length} contexts → ${args["write-contexts"]}`);
  process.exit(0);
}

if (args.dry) {
  for (const s of scenarios) {
    const { pre, post } = systemFor(s);
    console.log(`\n===== ${s.id} ${s.title} (salon ${s.salon}, mode ${s.mode || fixtures[s.salon].mode}) =====`);
    for (const m of [...pre, ...post]) console.log(`--- system (${m.content.length} chars) ---\n${args.full ? m.content : m.content.slice(0, 400) + (m.content.length > 400 ? " …" : "")}`);
    console.log("--- client:", JSON.stringify(s.client_turns));
    console.log("--- owner parsed:", JSON.stringify(parseOwnerSettings(fixtures[s.salon].owner || "")));
  }
  process.exit(0);
}

const stamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
const outDir = args.out || join(ROOT, "bench/results", `${stamp}-${VERSION}`);
mkdirSync(outDir, { recursive: true });
console.error(`Bench: ${scenarios.length} scenarios · prompt ${VERSION} · assistant ${MODEL} · judge ${JUDGE_MODEL} → ${outDir}`);
const results = await pool(scenarios, CONCURRENCY, runScenario);
writeFileSync(join(outDir, "results.json"), JSON.stringify({ version: VERSION, model: MODEL, judge: JUDGE_MODEL, at: new Date().toISOString(), results }, null, 2));
const md = report(results, { version: VERSION, model: MODEL, judge: JUDGE_MODEL });
writeFileSync(join(outDir, "report.md"), md);
console.log(md.split("\n").slice(0, 40).join("\n"));
console.error(`\nFull report: ${join(outDir, "report.md")}`);
if (args.verbose) for (const r of results) console.log(JSON.stringify(r, null, 2));
