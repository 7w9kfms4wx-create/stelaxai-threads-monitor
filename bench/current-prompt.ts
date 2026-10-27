// Builds the CURRENT production prompt (from the StelaxAI repo) for bench scenarios, for side-by-side comparison.
// Run inside a StelaxAI checkout with dependencies installed:
//   cd /var/www/stelaxai && npx tsx /path/to/bench/current-prompt.ts < contexts.json > prompts.json
// Input: [{ key, kb, owner, botName, mode, link }]. Output: { [key]: { pre: string[], post: string[] } }.
import { join } from "node:path";
import { pathToFileURL } from "node:url";

// Modules are loaded from the StelaxAI checkout you run this from (the current directory).
const from = (p: string) => import(pathToFileURL(join(process.cwd(), p)).href);

type Ctx = { key: string; kb: string; owner: string; botName: string; mode: "A" | "B" | "C"; link: string; now: string };

async function main() {
  const { buildUniversalPrompt } = await from("lib/assistant-reply.ts");
  const { nichePrompt } = await from("lib/niche-prompts.ts");
  const { BOOKING_PROMPT } = await from("lib/booking/tools.ts");
  const { langInstruction } = await from("lib/reply-language.ts");
  const chunks: Buffer[] = [];
  for await (const c of process.stdin) chunks.push(c as Buffer);
  const input: Ctx[] = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  const out: Record<string, { pre: string[]; post: string[] }> = {};
  for (const c of input) {
    const canBook = c.mode === "C";
    const { common, userSpecific } = buildUniversalPrompt({
      botName: c.botName, ownerPersona: c.owner, knowledgeContext: c.kb || "",
      managerContact: "", contactContext: "", correctionsCtx: "", handoffTopics: [], canBook,
    });
    const niche = [nichePrompt("beauty") || "", c.mode === "B" && c.link ? `Ссылка на онлайн-запись: ${c.link}. Давай её, когда клиент готов записаться.` : ""].filter(Boolean).join("\n\n");
    const pre = [common, userSpecific, niche];
    if (canBook) pre.push([BOOKING_PROMPT, `Today is ${c.now.slice(0, 10)}.`].join("\n"));
    out[c.key] = { pre: pre.filter(Boolean), post: [langInstruction("en")] };
  }
  process.stdout.write(JSON.stringify(out));
}
main().catch(e => { console.error(e); process.exit(1); });
