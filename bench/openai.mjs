// Minimal OpenAI chat-completions client (no dependencies). Retries on 429/5xx.
const BASE = (process.env.OPENAI_BASE_URL || "https://api.openai.com/v1").replace(/\/$/, "");

export async function chat({ model, messages, tools, reasoningEffort, maxTokens = 932, json = false, timeoutMs = 60_000 }) {
  const key = process.env.OPENAI_API_KEY;
  if (!key) throw new Error("OPENAI_API_KEY is not set");
  const body = { model, messages, max_completion_tokens: maxTokens };
  if (tools) body.tools = tools;
  if (reasoningEffort) body.reasoning_effort = reasoningEffort;
  if (json) body.response_format = { type: "json_object" };
  for (let attempt = 0; attempt < 5; attempt++) {
    const ctl = new AbortController();
    const timer = setTimeout(() => ctl.abort(), timeoutMs);
    try {
      const res = await fetch(`${BASE}/chat/completions`, {
        method: "POST",
        headers: { "content-type": "application/json", authorization: `Bearer ${key}` },
        body: JSON.stringify(body),
        signal: ctl.signal,
      });
      if (res.status === 429 || res.status >= 500) { await sleep(2000 * 2 ** attempt); continue; }
      const data = await res.json();
      if (!res.ok) throw new Error(`OpenAI ${res.status}: ${JSON.stringify(data.error || data).slice(0, 400)}`);
      return { message: data.choices[0].message, usage: data.usage };
    } catch (e) {
      if (e.name === "AbortError" && attempt < 4) continue;
      if (attempt === 4 || !/fetch failed|ECONNRESET|AbortError/.test(String(e))) throw e;
      await sleep(2000 * 2 ** attempt);
    } finally { clearTimeout(timer); }
  }
  throw new Error("OpenAI: out of retries");
}

const sleep = ms => new Promise(r => setTimeout(r, ms));
