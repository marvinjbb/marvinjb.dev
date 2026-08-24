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

test("report UI covers grounding, conflicts, failures, and safe sources", async () => {
  const source = await readFile(componentPath, "utf8");
  for (const label of ["EXECUTIVE SUMMARY", "KEY FINDINGS", "IMPORTANT EVIDENCE", "CONFLICTING EVIDENCE", "DECISION GUIDANCE", "UNCERTAINTIES + LIMITATIONS", "GROUNDED EVIDENCE CATALOG", "SOURCES + CITATIONS", "PARTIAL WORKER FAILURES"]) {
    assert.match(source, new RegExp(label.replaceAll("+", "\\+")));
  }
  assert.match(source, /safeSourceUrl/);
  assert.match(source, /noopener noreferrer/);
});
