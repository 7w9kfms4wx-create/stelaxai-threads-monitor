// The judge: grades one finished conversation against the scenario and the four bench metrics.
import { chat } from "./openai.mjs";

const RUBRIC = `You are a strict QA judge for an AI receptionist used by UK beauty salons. You grade ONE conversation.

You get: the salon FACTS (the only allowed source of salon facts), the booking mode, the scenario with MUST and MUST_NOT checks, and the transcript. Lines starting with [[...]] in assistant messages are hidden service markers (the client never sees them): [[NOTIFY_OWNER: …]] alerts the team, [[BOOKING_REQUEST: …]] is a booking request, [[NO_REPLY]] means the assistant stayed silent on purpose. Tool calls show what the booking system returned — those results are facts too.

Grade:
1. must — for every MUST item: pass true/false with a short reason quoting the reply.
2. must_not — for every MUST_NOT item: violated true/false with a short reason.
3. hallucinations — every salon-specific claim in the assistant's messages (price, duration, free time, staff name, discount, policy, address, opening hours, product, service offered) that is NOT supported by the FACTS or tool results. General craft knowledge ("BIAB is a builder gel") is NOT a hallucination. Totals computed from listed prices and marked as approximate are fine. List each with a quote. Empty list if none.
4. unnecessary_handoff — true if the assistant passed something to the team / owner (marker or words) when the answer was available in the FACTS or was general craft knowledge, or when the client was simply answering a question. Handoffs for complaints, health judgements, missing facts, explicit requests for a human, abuse are NECESSARY.
5. tone — tone_ok true/false and issues: British English, short chat style (usually 1–3 sentences), max one question per message, no lists/markdown, no corporate phrasing, follows the owner's tone settings if given (e.g. "end every message with x", emoji rules), no repeated greetings, does not reveal internal workings ("in my database", "the system says").
6. conversion — "yes" if the client wanted to book and the assistant moved them to a booking, a booking link with a hint, or a booking request; "no" if the client wanted to book and was not moved forward; "n/a" if booking was not the client's goal or must not happen (e.g. under-18 injectables).
7. score — 0–100 overall quality of the assistant as a top UK salon receptionist would be judged.

Be strict and literal. Reply ONLY with JSON:
{"must":[{"item":"…","pass":true,"why":"…"}],"must_not":[{"item":"…","violated":false,"why":"…"}],"hallucinations":[{"quote":"…","why":"…"}],"unnecessary_handoff":false,"handoff_why":"…","tone_ok":true,"tone_issues":["…"],"conversion":"yes|no|n/a","score":0,"summary":"one sentence"}`;

export async function judge({ model, scenario, facts, mode, now, transcript }) {
  const convo = transcript.map(t => {
    const who = t.role === "client" ? "CLIENT" : "ASSISTANT";
    const tools = (t.tools || []).map(x => `  [tool ${x.tool}(${JSON.stringify(x.args)}) → ${x.result}]`).join("\n");
    return `${t.history ? "(earlier) " : ""}${who}: ${t.text}${tools ? "\n" + tools : ""}`;
  }).join("\n");
  const user = `BOOKING MODE: ${mode} (A = request to the team, no diary; B = booking link; C = connected booking system with tools)
CURRENT TIME: ${now} (Europe/London)

SALON FACTS:
${facts || "(none)"}

SCENARIO: ${scenario.id} — ${scenario.title}
MUST:
${(scenario.must || []).map(m => "- " + m).join("\n")}
MUST_NOT:
${(scenario.must_not || []).map(m => "- " + m).join("\n")}

TRANSCRIPT:
${convo}`;
  const { message } = await chat({ model, messages: [{ role: "system", content: RUBRIC }, { role: "user", content: user }], json: true, reasoningEffort: "low", maxTokens: 4000, timeoutMs: 120_000 });
  try { return JSON.parse(message.content); }
  catch { return { error: "judge returned invalid JSON", raw: message.content }; }
}
