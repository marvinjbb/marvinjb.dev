import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const componentPath = new URL("../app/demo/research/ResearchDemo.tsx", import.meta.url);

test("research UI exposes the approved question and depth controls", async () => {
  const source = await readFile(componentPath, "utf8");
  assert.match(source, /Research question/);
  assert.match(source, /"quick", "deep"/);
  assert.match(source, /Start Research/);
  assert.match(source, /maxLength=\{2_000\}/);
});

test("progress is explicitly honest about completed-response API behavior", async () => {
  const source = await readFile(componentPath, "utf8");
  assert.match(source, /Estimated phase · the API returns one completed report, not live events/);
  assert.match(source, /Analyzing research question/);
  assert.match(source, /Final report ready/);
});

test("primary report keeps the concise decision sections visible", async () => {
  const source = await readFile(componentPath, "utf8");
  for (const label of ["Research complete.", "ORIGINAL QUESTION", "EXECUTIVE SUMMARY", "KEY FINDINGS", "CONFLICTING EVIDENCE", "DECISION GUIDANCE", "UNCERTAINTIES + LIMITATIONS", "TOP SOURCES"]) {
    assert.match(source, new RegExp(label.replaceAll("+", "\\+")));
  }
  assert.match(source, /report\.conflicts\.length > 0/);
  assert.match(source, /report\.evidence_claims\.length/);
  assert.match(source, /report\.sources\.length/);
});

test("advanced research details are collapsed initially and can be expanded", async () => {
  const source = await readFile(componentPath, "utf8");
  assert.match(source, /useState\(false\)/);
  assert.match(source, /className="advanced-research-details"/);
  assert.match(source, /open=\{detailsOpen\}/);
  assert.match(source, /onToggle=.*setDetailsOpen/);
  assert.match(source, /View research details/);
  for (const label of ["GROUNDED EVIDENCE CATALOG · ALL CLAIMS", "COMPLETE SOURCES + CITATIONS", "PARTIAL WORKER FAILURES", "Worker provenance"]) {
    assert.ok(source.includes(label));
  }
});

test("top sources stay concise while all safe source links remain available", async () => {
  const source = await readFile(componentPath, "utf8");
  assert.match(source, /\.slice\(0, 5\)/);
  assert.match(source, /href=\{`#source-detail-/);
  assert.match(source, /setDetailsOpen\(true\)/);
  assert.doesNotMatch(source, /topSourceIds\.has/);
  assert.match(source, /target\?\.focus/);
  assert.match(source, /window\.history\.replaceState/);
  assert.match(source, /safeSourceUrl/);
  assert.match(source, /noopener noreferrer/);
});
