// Shared helpers for the prompt bench: loading prompts, fixtures and scenarios, building messages.
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

export const read = p => readFileSync(p, "utf8");
export const codeBlocks = md => [...md.matchAll(/```[a-z]*\n([\s\S]*?)```/g)].map(m => m[1].trim());

export function loadJsonl(path) {
  return read(path).split("\n").filter(l => l.trim()).map((l, i) => {
    try { return JSON.parse(l); } catch (e) { throw new Error(`${path}:${i + 1} ${e.message}`); }
  });
}

// ---- fixtures -------------------------------------------------------------

export function loadFixtures(path) {
  const md = read(path);
  const salons = {};
  const parts = md.split(/\n## (?=S\d+ — )/).slice(1);
  for (const part of parts) {
    const id = part.match(/^(S\d+)/)[1];
    const name = part.match(/^S\d+ — (.+)/)[1].trim();
    const mode = (part.match(/\*\*Booking mode:\*\*\s*([ABC])/) || [])[1];
    const link = (part.match(/\*\*Booking mode:\*\*[^\n]*?`(https?:[^`]+)`/) || [])[1] || "";
    const section = h => {
      const m = part.match(new RegExp(`### ${h}\\n([\\s\\S]*?)(?=\\n### |\\n---|$)`));
      return m ? m[1].trim() : "";
    };
    const kb = (codeBlocks(section("KB"))[0] || "").trim();
    const owner = (codeBlocks(section("Owner settings"))[0] || "").trim();
    const bookingMock = section("Booking system mock");
    salons[id] = { id, name, mode, link, kb, owner, bookingMock };
  }
  // Hard-case salons: facts come from each scenario.
  const hs = md.split("# Hard-case salons")[1] || "";
  for (const m of hs.matchAll(/\| (HS\d) \| ([^|]+) \| ([ABC]) /g)) {
    salons[m[1]] = { id: m[1], name: m[2].trim(), mode: m[3], link: "https://example-booking.link/" + m[1].toLowerCase(), kb: null, owner: "", bookingMock: "" };
  }
  return salons;
}

// "T1 Tone: …" lines → { topics: {T1: "…"}, other: "…", botName }
export function parseOwnerSettings(text) {
  const topics = {};
  let other = "";
  let botName = "";
  let cur = null;
  for (const raw of text.split("\n")) {
    const line = raw.trim();
    if (!line) continue;
    const t = line.match(/^(T\d{1,2})\b[^:]*:\s*(.*)$/);
    const o = line.match(/^Other\b[^:]*:\s*(.*)$/i);
    const b = line.match(/^Bot name\b[^:]*:\s*(.*)$/i);
    if (t) { cur = t[1]; topics[cur] = (topics[cur] ? topics[cur] + "\n" : "") + t[2]; }
    else if (o) { cur = "other"; other += (other ? "\n" : "") + o[1]; }
    else if (b) { botName = b[1].trim(); cur = null; }
    else if (cur === "other") other += "\n" + line;
    else if (cur) topics[cur] += "\n" + line;
    else other += (other ? "\n" : "") + line;
  }
  return { topics, other, botName };
}

// ---- prompt assembly ------------------------------------------------------

const AREA_CARD = { nails: "nails", hair: "hair", brows_lashes: "brows-lashes", brows: "brows-lashes", lashes: "brows-lashes", skin: "aesthetics", aesthetics: "aesthetics", massage: "massage" };

export function ukPrompt(promptDir) {
  const core = codeBlocks(read(join(promptDir, "01-core.md")))[0];
  const examples = codeBlocks(read(join(promptDir, "04-examples.md")))[0];
  const booking = codeBlocks(read(join(promptDir, "02-booking-modes.md")));
  const card = area => {
    const f = join(promptDir, "knowledge", (AREA_CARD[area] || area) + ".md");
    if (!existsSync(f)) return "";
    // Sources are for humans, not for the model.
    return read(f).replace(/\n## Sources[\s\S]*$/, "").trim();
  };
  return { core, examples, booking: { A: booking[0], B: booking[1], C: booking[2], cNoWrite: booking[3] }, card };
}

const TOPIC_NAMES = {
  T1: "Tone", T2: "Length and format", T3: "Emoji", T4: "Greeting, client's name, goodbye", T5: "Prices",
  T6: "Offers, gift vouchers, packages, courses", T7: "Deposits, cancellations, rescheduling, lateness, no-shows",
  T8: "Moving towards a booking", T9: "Complaints, redos, refunds, disputes", T10: "Health", T11: "Under 18s and children",
  T12: "Add-ons", T13: "When to bring in the team", T14: "Off-topic and rudeness", T15: "Staff", T16: "Out of hours",
};

export function settingsBlock({ topics, other, botName }) {
  const ids = Object.keys(topics).sort((a, b) => +a.slice(1) - +b.slice(1));
  let s = `# SALON SETTINGS\n\n${botName ? `Your name is ${botName}.\n\n` : ""}`;
  if (!ids.length && !other) return s + "The owner hasn't filled in any topics — the default rules apply.";
  s += `The owner has filled in these topics: ${ids.join(", ") || "none"}.\n`;
  s += "On these topics the owner's text comes first: follow it word for word, and wherever it directly contradicts a default rule, it wins. The rest of the default rule keeps applying. Core C1–C3 always applies.\n";
  s += "Details in the owner's texts (prices, offers, policies, staff names, address) are salon facts.\n";
  for (const id of ids) s += `\n## ${id}. ${TOPIC_NAMES[id] || ""}\n${topics[id]}\n`;
  if (other) s += `\n## Other\n${other}\n`;
  return s.trim();
}

export function kbBlock(kb, hasBooking) {
  if (kb && kb.trim()) return `# SALON KNOWLEDGE BASE\n${kb.trim()}`;
  return hasBooking
    ? "# SALON KNOWLEDGE BASE\nThis salon hasn't filled in its knowledge base yet. Salon facts come only from the salon settings and the booking system. Explain the craft in general, take booking requests, pass questions about facts on per T13."
    : "# SALON KNOWLEDGE BASE\nThis salon hasn't filled in its knowledge base yet. Salon facts come only from the salon settings. Explain the craft in general, take booking requests, pass questions about facts on per T13.";
}

export function nowLine(iso) {
  const d = new Date(iso);
  const day = d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "Europe/London" });
  const time = d.toLocaleTimeString("en-GB", { hour: "numeric", minute: "2-digit", hour12: true, timeZone: "Europe/London" }).replace(" ", "");
  return `It's now ${day}, ${time} UK time (Europe/London). Use only this line for the current date and time.`;
}

export const DEFAULT_NOW = "2026-11-10T11:20:00Z"; // Tue 10 Nov 2026, 11:20am London (GMT)

// Build the system messages for the v2 UK prompt.
export function buildV2Messages({ P, salon, scenario, canWrite = true }) {
  const facts = scenario.facts ? scenario.facts : salon.kb;
  const owner = parseOwnerSettings(salon.owner || "");
  const mode = scenario.mode || salon.mode;
  const sys = [P.core, P.examples];
  const card = P.card(scenario.area);
  if (card) sys.push(card);
  if (mode === "A") sys.push(P.booking.A);
  if (mode === "B") sys.push(P.booking.B.replaceAll("{bookingLink}", salon.link || "https://example-booking.link"));
  if (mode === "C") sys.push(P.booking.C + (canWrite ? "" : "\n\n" + P.booking.cNoWrite));
  const client = `# WHAT WE KNOW ABOUT THE CLIENT (use naturally, don't recite)\nProfile name: ${scenario.profile_name || "(not shown)"}`;
  sys.push([settingsBlock(owner), kbBlock(facts, mode === "C"), client, nowLine(scenario.now || DEFAULT_NOW)].join("\n\n"));
  sys.push("Reply in the language the client writes in. Default: British English.");
  return sys.map(content => ({ role: "system", content }));
}

// ---- booking tools mock ---------------------------------------------------

export const TOOL_DEFS = [
  { type: "function", function: { name: "list_services", description: "List the salon's services with prices and durations.", parameters: { type: "object", properties: {} } } },
  { type: "function", function: { name: "list_staff", description: "List the salon's staff.", parameters: { type: "object", properties: {} } } },
  { type: "function", function: { name: "list_availability", description: "Free appointment times. Returns the nearest available dates.", parameters: { type: "object", properties: { service_id: { type: "string" }, staff_id: { type: "string" }, date_from: { type: "string", description: "YYYY-MM-DD" } } } } },
  { type: "function", function: { name: "create_booking", description: "Create an appointment.", parameters: { type: "object", properties: { service_id: { type: "string" }, staff_id: { type: "string" }, start_at: { type: "string" }, client_name: { type: "string" } }, required: ["service_id", "start_at", "client_name"] } } },
  { type: "function", function: { name: "find_bookings", description: "Find the client's existing appointments.", parameters: { type: "object", properties: { client_name: { type: "string" } } } } },
  { type: "function", function: { name: "cancel_booking", description: "Cancel an appointment by id.", parameters: { type: "object", properties: { booking_id: { type: "string" } }, required: ["booking_id"] } } },
];

function mockSection(mock, name) {
  const m = mock.match(new RegExp("`" + name + "`[^\\n]*\\n([\\s\\S]*?)(?=\\n`[a-z_]+`|\\nMock behaviour|$)"));
  return m ? m[1].trim() : "";
}

export function runTool(salon, scenario, name, args) {
  const mock = salon.bookingMock || "";
  const facts = scenario.facts || "";
  const fromMock = sec => mockSection(mock, sec) || facts || "No data.";
  switch (name) {
    case "list_services": return fromMock("list_services");
    case "list_staff": return mockSection(mock, "list_staff") || (mock.match(/`list_staff`:\s*(.+)/) || [])[1] || facts || "No data.";
    case "list_availability": {
      const av = mockSection(mock, "list_availability") || facts || "No free times.";
      const extra = (mock.match(/\n(Skin tests:[^\n]+)/) || [])[1] || "";
      return av + (extra ? "\n" + extra : "");
    }
    case "create_booking": {
      const trap = mock.match(/`create_booking` for (\w+) on ([^`]+?) returns `error: (\w+)`/);
      if (trap) {
        const [, who, when, err] = trap;
        const blob = JSON.stringify(args).toLowerCase();
        const time = (when.match(/(\d{1,2}):?(\d{2})?\s*(am|pm)/i) || []);
        let hh = time[1] ? +time[1] % 12 + (/pm/i.test(time[3] || "") ? 12 : 0) : -1;
        const day = (when.match(/\b(\d{1,2}) (Nov|Dec|Oct)/) || [])[1];
        const hit = blob.includes(who.toLowerCase().slice(0, 4)) && (hh < 0 || blob.includes(`${String(hh).padStart(2, "0")}:`) || blob.includes(`t${hh}:`)) && (!day || blob.includes(`-${day.padStart(2, "0")}`) || blob.includes(` ${day}`));
        if (hit) return JSON.stringify({ ok: false, error: err });
      }
      return JSON.stringify({ ok: true, booking_id: "bk_test_" + Math.random().toString(36).slice(2, 7), ...args });
    }
    case "find_bookings": return fromMock("find_bookings");
    case "cancel_booking": return JSON.stringify({ ok: true, cancelled: args.booking_id });
    default: return JSON.stringify({ ok: false, error: "UNKNOWN_TOOL" });
  }
}

// ---- markers --------------------------------------------------------------

export function markers(text) {
  return {
    notify: [...text.matchAll(/\[\[\s*NOTIFY_OWNER:([^\]]*)\]\]/g)].map(m => m[1].trim()),
    booking: [...text.matchAll(/\[\[\s*BOOKING_REQUEST:([^\]]*)\]\]/g)].map(m => m[1].trim()),
    handoff: /\[\[\s*HANDOFF\s*\]\]/.test(text),
    noReply: /^\s*\[\[\s*NO_REPLY\s*\]\]\s*$/.test(text),
  };
}
