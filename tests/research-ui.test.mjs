import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import {
  classifySourceForPresentation,
  excludeDisplayedClaims,
  fullReportCitationCounts,
  rankTopSources,
  sourceDisplayLabel,
  sourcePresentationLabel,
} from "../app/demo/research/researchPresentation.ts";

const componentPath = new URL("../app/demo/research/ResearchDemo.tsx", import.meta.url);

test("research UI exposes the approved question and depth controls", async () => {
  const source = await readFile(componentPath, "utf8");
  assert.match(source, /Research question/);
  assert.match(source, /"quick", "deep"/);
  assert.match(source, /Start Research/);
  assert.match(source, /maxLength=\{2_000\}/);
  assert.match(source, /EXAMPLE_RESEARCH_QUESTIONS/);
  assert.match(source, /TRY AN EXAMPLE/);
  assert.match(source, /Focused search for a concise report/);
  assert.match(source, /Broader search with more coverage/);
});

test("progress is explicitly honest about completed-response API behavior", async () => {
  const source = await readFile(componentPath, "utf8");
  assert.match(source, /Estimated phase · the API returns one completed report, not live events/);
  assert.match(source, /Analyzing research question/);
  assert.match(source, /Final report ready/);
});

test("primary report follows a human-first answer hierarchy", async () => {
  const source = await readFile(componentPath, "utf8");
  for (const label of ["Research complete.", "ORIGINAL QUESTION", "01 · ANSWER", "02 · WHAT THE RESEARCH FOUND", "03 · KEY FINDINGS", "04 · PRACTICAL TAKEAWAY", "05 · RESEARCH CONFIDENCE", "06 · SOURCES USED IN THIS REPORT"]) {
    assert.match(source, new RegExp(label.replaceAll("+", "\\+")));
  }
  assert.match(source, /report\.conflicts\.length > 0/);
  assert.match(source, /report\.evidence_claims\.length/);
  assert.match(source, /report\.sources\.length/);
  assert.match(source, /report\.executive_summary\.slice\(0, 3\)/);
  assert.match(source, /The major themes that support the answer\./);
  assert.match(source, /Specific evidence-backed findings discovered during the research\./);
  assert.match(source, /DIFFERING PERSPECTIVES/);
  assert.doesNotMatch(source, />Conflicting evidence</);
  assert.match(source, /What these findings mean in practice\./);
  assert.match(source, /How confident should I be in this research\?/);
  assert.match(source, /View detailed limitations/);
  const primaryReport = source.slice(
    source.indexOf('<div className="report-question">'),
    source.indexOf('<details\n        className="advanced-research-details"'),
  );
  assert.doesNotMatch(primaryReport, /worker_ids|worker_id/);
});

test("advanced research details are collapsed initially and can be expanded", async () => {
  const source = await readFile(componentPath, "utf8");
  assert.match(source, /useState\(false\)/);
  assert.match(source, /className="advanced-research-details"/);
  assert.match(source, /open=\{detailsOpen\}/);
  assert.match(source, /onToggle=.*setDetailsOpen/);
  assert.match(source, /View research details/);
  for (const label of ["RESEARCH PLAN", "CLAIM-TO-SOURCE MAPPING", "GROUNDED EVIDENCE CATALOG · ALL CLAIMS", "DETAILED LIMITATIONS · WORKER PROVENANCE", "COMPLETE SOURCES + CITATIONS", "PARTIAL WORKER FAILURES", "Worker provenance"]) {
    assert.ok(source.includes(label));
  }
  assert.match(source, /<h3>Objective<\/h3><p>\{report\.objective\}<\/p>/);
  assert.match(source, /<h3>Strategy<\/h3><p>\{report\.strategy\}<\/p>/);
  for (const target of ["research-plan", "claim-source-mapping", "evidence-catalog", "research-limitations", "partial-worker-failures", "source-catalog"]) {
    assert.match(source, new RegExp(`(?:href=\\"#|id=\\")${target}`));
  }
  assert.match(source, /aria-label="Research details sections"/);
});

test("top sources stay concise while all safe source links remain available", async () => {
  const source = await readFile(componentPath, "utf8");
  assert.match(source, /rankTopSources\(report\)/);
  assert.match(source, /href=\{`#source-detail-/);
  assert.match(source, /setDetailsOpen\(true\)/);
  assert.doesNotMatch(source, /topSourceIds\.has/);
  assert.match(source, /target\?\.focus/);
  assert.match(source, /window\.history\.replaceState/);
  assert.match(source, /safeSourceUrl/);
  assert.match(source, /noopener noreferrer/);
  assert.match(source, /Sources:/);
  assert.match(source, /Source \{sourceNumber\}/);
  assert.match(source, /View source \$\{sourceNumber\} in research details/);
  assert.match(source, /Referenced \$\{count\} \$\{count === 1 \? "time" : "times"\} across the full report/);
  assert.match(source, /sourceDisplayLabel\(source\)/);
  assert.match(source, /sourcePresentationLabel\(category\)/);
});

test("normal report suppresses only exact normalized claim duplicates", () => {
  const answer = [{ statement: "  Shared   grounded statement. ", claim_ids: ["claim-1"], citations: [] }];
  const claims = [
    { statement: "shared grounded STATEMENT.", claim_ids: ["claim-2"], citations: [] },
    { statement: "A distinct evidence-backed finding.", claim_ids: ["claim-3"], citations: [] },
    { statement: "A semantically similar but textually different grounded statement.", claim_ids: ["claim-4"], citations: [] },
  ];
  const before = structuredClone(claims);
  const visible = excludeDisplayedClaims(claims, answer);

  assert.deepEqual(visible.map((claim) => claim.claim_ids), [["claim-3"], ["claim-4"]]);
  assert.deepEqual(claims, before, "presentation filtering must not alter underlying claims");
});

test("source labels prefer publisher, then safe hostname, then Web source", () => {
  const base = { source_id: "source-1", title: "Source", snippets: ["snippet"], validated_excerpts: [], provenance: [{ worker_id: "worker-1", worker_source_id: "worker-source-1" }] };
  assert.equal(sourceDisplayLabel({ ...base, publisher: "Anthropic", url: "https://example.com/a" }), "Anthropic");
  assert.equal(sourceDisplayLabel({ ...base, publisher: null, url: "https://www.anthropic.com/research" }), "anthropic.com");
  assert.equal(sourceDisplayLabel({ ...base, publisher: null, url: "javascript:alert(1)" }), "Web source");
  assert.equal(sourceDisplayLabel({ ...base, publisher: null, url: "not a URL" }), "Web source");
});

test("source counts include citation references across the full report", () => {
  const citation = { evidence_id: "evidence-1", source_id: "source-1", evidence: "Exact evidence" };
  const claim = { statement: "Grounded claim", claim_ids: ["claim-1"], citations: [citation] };
  const report = {
    executive_summary: [claim],
    key_findings: [claim],
    important_claims: [claim],
    conflicts: [{ summary: "Different perspectives", positions: [claim, claim] }],
    recommendations: [{ guidance: "Guidance", rationale: "Rationale", citations: [citation] }],
  };
  assert.equal(fullReportCitationCounts(report).get("source-1"), 6);
});

function source(id, url, title = id) {
  return {
    source_id: id,
    title,
    url,
    publisher: null,
    snippets: ["Exact snippet"],
    validated_excerpts: [],
    provenance: [{ worker_id: "worker-1", worker_source_id: id }],
  };
}

function reportWithSources(sources, counts = {}) {
  const executive_summary = Object.entries(counts).flatMap(([sourceId, count]) =>
    Array.from({ length: count }, (_, index) => ({
      statement: `Claim ${sourceId}-${index}`,
      claim_ids: [`claim-${sourceId}-${index}`],
      citations: [{ source_id: sourceId, evidence_id: `evidence-${sourceId}`, evidence: "Exact snippet" }],
    })),
  );
  return { sources, executive_summary, key_findings: [], important_claims: [], conflicts: [], recommendations: [] };
}

test("cited official source ranks before similarly cited promotional source", () => {
  const report = reportWithSources([
    source("vendor", "https://example.com/solutions/agents", "Vendor solutions"),
    source("official", "https://agency.gov/research/agents", "Agency research"),
  ], { vendor: 2, official: 2 });
  assert.deepEqual(rankTopSources(report).map((item) => item.source.source_id), ["official", "vendor"]);
  assert.equal(classifySourceForPresentation(report.sources[0]), "promotional");
  assert.equal(sourcePresentationLabel("promotional"), "Promotional source");
  assert.equal(classifySourceForPresentation(report.sources[1]), "official");
});

test("cited promotional source stays above an uncited official source", () => {
  const report = reportWithSources([
    source("official", "https://agency.gov/research/agents"),
    source("vendor", "https://example.com/pricing/agents"),
  ], { vendor: 8 });
  assert.deepEqual(rankTopSources(report).map((item) => item.source.source_id), ["vendor", "official"]);
});

test("top sources prefer at most two per hostname when other cited hosts exist", () => {
  const sources = [
    source("same-1", "https://www.reuters.com/one"),
    source("same-2", "https://reuters.com/two"),
    source("same-3", "https://reuters.com/three"),
    source("other-1", "https://apnews.com/one"),
    source("other-2", "https://agency.gov/two"),
  ];
  const ranked = rankTopSources(reportWithSources(sources, {
    "same-1": 4, "same-2": 4, "same-3": 4, "other-1": 4, "other-2": 4,
  }));
  const ids = ranked.map((item) => item.source.source_id);
  assert.equal(ids.length, 5);
  assert.ok(ids.indexOf("same-3") > ids.indexOf("other-1"));
  assert.ok(ids.indexOf("same-3") > ids.indexOf("other-2"));
});

test("same-host sources fill the top five when alternatives are insufficient", () => {
  const sources = Array.from({ length: 5 }, (_, index) =>
    source(`same-${index + 1}`, `https://example.com/article-${index + 1}`),
  );
  const ranked = rankTopSources(reportWithSources(sources, {
    "same-1": 1, "same-2": 1, "same-3": 1, "same-4": 1, "same-5": 1,
  }));
  assert.deepEqual(ranked.map((item) => item.source.source_id), sources.map((item) => item.source_id));
});

test("unknown sources receive no authority label and lookalike domains stay unknown", () => {
  for (const url of [
    "https://example.org/analysis",
    "https://university.edu/article",
    "https://agency.gov.example.com/report",
    "https://example.com/blog/technical-analysis",
  ]) {
    const category = classifySourceForPresentation(source("unknown", url));
    assert.equal(category, "unknown");
    assert.equal(sourcePresentationLabel(category), null);
  }
  assert.equal(classifySourceForPresentation(source("sponsored", "https://reuters.com/sponsored/agents")), "promotional");
});

test("presentation ranking does not alter the complete backend source catalog", async () => {
  const sources = [
    source("promotional", "https://example.com/solutions/agents"),
    source("official", "https://agency.gov/report"),
  ];
  const report = reportWithSources(sources, { promotional: 1, official: 1 });
  const original = structuredClone(report);
  rankTopSources(report);
  assert.deepEqual(report, original);
  assert.deepEqual(report.sources.map((item) => item.source_id), ["promotional", "official"]);
  const component = await readFile(componentPath, "utf8");
  assert.match(component, /report\.sources\.map\(\(source, index\) => \{/);
});

test("ranked cards retain the original report-wide source indices", () => {
  const report = reportWithSources([
    source("first", "https://example.com/solutions/agents"),
    source("second", "https://agency.gov/report"),
  ], { first: 1, second: 1 });
  assert.deepEqual(rankTopSources(report).map(({ source: item, index }) => [item.source_id, index + 1]), [
    ["second", 2], ["first", 1],
  ]);
});

test("completed research moves accessible focus to the report", async () => {
  const source = await readFile(componentPath, "utf8");
  assert.match(source, /reportRef\.current\?\.focus\(\{ preventScroll: true \}\)/);
  assert.match(source, /reportRef\.current\?\.scrollIntoView/);
  assert.match(source, /aria-labelledby="report-title" tabIndex=\{-1\}/);
});
