// Turns judged results into a markdown report with the four bench metrics.
export function summarise(results) {
  const ok = results.filter(r => r.verdict && !r.verdict.error && !r.error);
  const pct = (a, b) => (b ? Math.round((100 * a) / b) : 0);
  const passed = r => (r.verdict.must || []).every(m => m.pass) && !(r.verdict.must_not || []).some(m => m.violated);
  const conv = ok.filter(r => r.verdict.conversion !== "n/a");
  return {
    total: results.length,
    graded: ok.length,
    errors: results.length - ok.length,
    scenarioPass: pct(ok.filter(passed).length, ok.length),
    checksPass: pct(ok.reduce((n, r) => n + (r.verdict.must || []).filter(m => m.pass).length + (r.verdict.must_not || []).filter(m => !m.violated).length, 0),
      ok.reduce((n, r) => n + (r.verdict.must || []).length + (r.verdict.must_not || []).length, 0)),
    hallucinations: ok.reduce((n, r) => n + (r.verdict.hallucinations || []).length, 0),
    hallucinationFree: pct(ok.filter(r => !(r.verdict.hallucinations || []).length).length, ok.length),
    unnecessaryHandoff: pct(ok.filter(r => r.verdict.unnecessary_handoff).length, ok.length),
    toneOk: pct(ok.filter(r => r.verdict.tone_ok).length, ok.length),
    conversion: pct(conv.filter(r => r.verdict.conversion === "yes").length, conv.length),
    score: ok.length ? Math.round(ok.reduce((n, r) => n + (+r.verdict.score || 0), 0) / ok.length) : 0,
    passed,
  };
}

export function report(results, meta) {
  const s = summarise(results);
  const by = key => {
    const groups = {};
    for (const r of results) if (r.verdict && !r.verdict.error) (groups[r[key]] ||= []).push(r);
    return Object.entries(groups).sort().map(([k, rs]) => {
      const x = summarise(rs);
      return `| ${k} | ${rs.length} | ${x.scenarioPass}% | ${x.hallucinations} | ${x.unnecessaryHandoff}% | ${x.toneOk}% | ${x.conversion}% | ${x.score} |`;
    }).join("\n");
  };
  const head = "| | Scenarios | Fully passed | Hallucinations | Unneeded handoff | Tone OK | Conversion | Score |\n|---|---|---|---|---|---|---|---|";
  let md = `# Bench report — prompt ${meta.version}

Assistant: ${meta.model} · judge: ${meta.judge} · ${new Date().toISOString().slice(0, 16)}Z

| Metric | Value |
|---|---|
| Scenarios graded | ${s.graded} of ${s.total}${s.errors ? ` (${s.errors} errors)` : ""} |
| Scenarios fully passed | **${s.scenarioPass}%** |
| Individual checks passed | ${s.checksPass}% |
| Hallucinated salon facts (total) | **${s.hallucinations}** |
| Scenarios without hallucinations | ${s.hallucinationFree}% |
| Unnecessary handoffs | ${s.unnecessaryHandoff}% |
| Tone OK | ${s.toneOk}% |
| Conversion (where booking was the goal) | ${s.conversion}% |
| Average score | ${s.score}/100 |

## By area
${head}
${by("area")}

## By booking mode
${head}
${by("mode")}

## By category
${head}
${by("category")}

## Failures
`;
  for (const r of results) {
    if (r.error || r.verdict?.error) { md += `\n### ${r.id} — ${r.title}\nError: ${r.error || r.verdict.error}\n`; continue; }
    const v = r.verdict;
    const bad = [...(v.must || []).filter(m => !m.pass).map(m => `- MUST ✗ ${m.item} — ${m.why}`),
      ...(v.must_not || []).filter(m => m.violated).map(m => `- MUST NOT ✗ ${m.item} — ${m.why}`),
      ...(v.hallucinations || []).map(h => `- HALLUCINATION «${h.quote}» — ${h.why}`),
      ...(v.unnecessary_handoff ? [`- UNNEEDED HANDOFF — ${v.handoff_why || ""}`] : []),
      ...(!v.tone_ok ? [`- TONE — ${(v.tone_issues || []).join("; ")}`] : [])];
    if (!bad.length) continue;
    md += `\n### ${r.id} — ${r.title} (score ${v.score})\n${bad.join("\n")}\n\n<details><summary>Transcript</summary>\n\n${r.transcript.map(t => `**${t.role === "client" ? "Client" : "Assistant"}:** ${t.text.replace(/\n/g, "  \n")}`).join("\n\n")}\n\n</details>\n`;
  }
  return md;
}
