/**
 * Single-cycle version for GitHub Actions.
 * Reads seen IDs from a Gist, runs one scan cycle, writes state back.
 */
import { chromium, type BrowserContext, type Page } from "playwright";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_THREADS_KEY, timeout: 30_000 });
const TG_TOKEN  = process.env.TELEGRAM_BOT_TOKEN!;
const TG_CHAT   = process.env.TELEGRAM_CHAT_ID!;
const GIST_ID   = process.env.GIST_ID!;
const GH_TOKEN  = process.env.GH_TOKEN!;

const SEARCH_TERMS = [
  "бот", "автоматизация", "нейросеть", "чатбот",
  "chatbot", "automation", "ai assistant",
];

// ── state (Gist) ──────────────────────────────────────────────────────────────

async function loadSeen(): Promise<Set<string>> {
  try {
    const res = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
      headers: { Authorization: `token ${GH_TOKEN}`, "User-Agent": "threads-monitor" },
    });
    const data = await res.json() as { files?: Record<string, { content: string }> };
    const content = data.files?.["seen.json"]?.content ?? "[]";
    return new Set(JSON.parse(content));
  } catch {
    return new Set();
  }
}

async function saveSeen(seen: Set<string>) {
  await fetch(`https://api.github.com/gists/${GIST_ID}`, {
    method: "PATCH",
    headers: {
      Authorization: `token ${GH_TOKEN}`,
      "Content-Type": "application/json",
      "User-Agent": "threads-monitor",
    },
    body: JSON.stringify({
      files: { "seen.json": { content: JSON.stringify([...seen].slice(-30000)) } },
    }),
  });
}

// ── telegram ──────────────────────────────────────────────────────────────────

async function sendTelegram(text: string) {
  const res = await fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: TG_CHAT, text, parse_mode: "HTML" }),
  });
  if (!res.ok) console.error("Telegram error:", await res.text());
}

// ── AI filter ─────────────────────────────────────────────────────────────────

interface FilterResult {
  match: boolean;
  reason: string;
  contact: string | null;
}

async function analyzePost(text: string): Promise<FilterResult> {
  const res = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    max_tokens: 120,
    temperature: 0,
    messages: [{
      role: "user",
      content: `Analyze this Threads post. Does this person want to ORDER or HIRE someone to build ANY of these FOR THEM: Telegram bot, WhatsApp bot, chatbot, AI assistant, AI automation, business automation, autoresponder, CRM bot?

They must be a BUYER who wants someone ELSE to create/set up something. AI keyword NOT required — "нужен бот для телеграм", "сделайте чат бота", "нужен автоответчик" are all valid matches.

NOT a match: sharing AI tools, discussing AI, tutorial posts, asking how to learn coding, AI-generated content, general AI discussion.

YES: "нужен чат бот телеграм", "кто сделает бота?", "ищу разработчика ботов", "хочу заказать автоматизацию", "нужен бот для бизнеса", "who can build me a chatbot", "looking for bot developer", "need Telegram bot"

Post text: "${text.slice(0, 500)}"

Reply JSON only:
{"match": true/false, "reason": "one short sentence", "contact": "@telegram_username or phone number found in text, or null"}`,
    }],
  });

  try {
    const raw = res.choices[0]?.message?.content ?? "{}";
    const json = raw.match(/\{[\s\S]*?\}/)?.[0] ?? "{}";
    return JSON.parse(json);
  } catch {
    return { match: false, reason: "parse error", contact: null };
  }
}

// ── scraper ───────────────────────────────────────────────────────────────────

interface Post {
  id: string;
  text: string;
  url: string;
  author: string;
}

async function scrapeSearch(page: Page, term: string): Promise<Post[]> {
  try {
    const url = `https://www.threads.net/search?q=${encodeURIComponent(term)}&serp_type=recent`;
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 25_000 });
    await page.waitForTimeout(2500);

    return await page.evaluate(() => {
      const results: Post[] = [];
      const seen = new Set<string>();

      document.querySelectorAll('a[href*="/post/"]').forEach(link => {
        const href = (link as HTMLAnchorElement).href;
        if (href.includes("/media")) return;
        const m = href.match(/@([\w.]+)\/post\/([\w-]+)/);
        if (!m) return;
        const [, author, postId] = m;
        if (seen.has(postId)) return;
        seen.add(postId);

        let el: Element | null = link;
        for (let i = 0; i < 15; i++) {
          el = el?.parentElement ?? null;
          if (!el) break;
          const text = el.textContent?.trim() ?? "";
          if (text.length > 40 && text.length < 3000) {
            results.push({ id: postId, text: text.slice(0, 600), url: href, author: `@${author}` });
            break;
          }
        }
      });

      return results.slice(0, 30) as Post[];
    });
  } catch (e) {
    console.error(`Search error "${term}":`, String(e).slice(0, 100));
    return [];
  }
}

// ── main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`[${new Date().toISOString()}] Threads Monitor CI — starting cycle`);

  const seen = await loadSeen();
  console.log(`Seen: ${seen.size}`);

  const browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-dev-shm-usage", "--disable-blink-features=AutomationControlled"],
  });

  const context = await browser.newContext({
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    locale: "ru-RU",
    viewport: { width: 1280, height: 900 },
  });

  try {
    const pages = await Promise.all(SEARCH_TERMS.map(() => context.newPage()));
    const allResults = await Promise.all(
      SEARCH_TERMS.map((term, i) => scrapeSearch(pages[i], term))
    );
    await Promise.all(pages.map(p => p.close().catch(() => {})));

    const newPosts: Post[] = [];
    const roundSeen = new Set<string>();

    for (const posts of allResults) {
      for (const post of posts) {
        if (!seen.has(post.id) && !roundSeen.has(post.id)) {
          roundSeen.add(post.id);
          seen.add(post.id);
          newPosts.push(post);
        }
      }
    }

    console.log(`New posts: ${newPosts.length}`);

    const BATCH = 5;
    let notified = 0;

    for (let i = 0; i < newPosts.length; i += BATCH) {
      const batch = newPosts.slice(i, i + BATCH);
      const results = await Promise.all(
        batch.map(p => analyzePost(p.text).catch((): FilterResult => ({ match: false, reason: "error", contact: null })))
      );

      for (let j = 0; j < batch.length; j++) {
        const post   = batch[j];
        const result = results[j];
        if (!result.match) {
          console.log(`SKIP: ${post.author} — ${result.reason.slice(0, 80)}`);
          continue;
        }

        console.log(`🔥 MATCH: ${post.author} — ${post.url}`);

        const snippet = post.text.replace(/\s+/g, " ").slice(0, 300);
        const lines = [
          `🔥 <b>Потенциальный клиент — Threads</b>`,
          ``,
          `👤 <b>Автор:</b> ${post.author}`,
          `📝 <b>Пост:</b>`,
          snippet,
        ];
        if (result.contact) lines.push(``, `📞 <b>Контакт:</b> ${result.contact}`);
        lines.push(``, `🔗 ${post.url}`);

        await sendTelegram(lines.join("\n"));
        notified++;
      }
    }

    console.log(`Done. Notified: ${notified}`);
    await saveSeen(seen);

  } finally {
    await browser.close();
  }
}

main().catch(e => { console.error("Fatal:", e); process.exit(1); });
