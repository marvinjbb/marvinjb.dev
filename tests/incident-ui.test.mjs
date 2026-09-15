import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const componentPath = new URL("../app/demo/incident-investigation/IncidentDemo.tsx", import.meta.url);
const pagePath = new URL("../app/demo/incident-investigation/page.tsx", import.meta.url);

test("offers only the three allowlisted incident scenarios", async () => {
  const source = await readFile(componentPath, "utf8");
  for (const scenario of ["blocked_query", "connection_exhaustion", "bad_deployment"]) {
    assert.match(source, new RegExp(`id: "${scenario}"`));
  }
  assert.equal(source.match(/Run Incident/g)?.length, 1);
  assert.doesNotMatch(source, /arbitrary SQL|custom query/i);
});

test("renders actual investigation evidence and selected tool activity", async () => {
  const source = await readFile(componentPath, "utf8");
  assert.match(source, /report\.activity\.map/);
  assert.match(source, /report\.evidence\.map/);
  assert.match(source, /Only tools selected during this investigation are shown/);
  assert.match(source, /primary_hypothesis\.evidence_ids\.every/);
  assert.doesNotMatch(source, /fake percentage|chain-of-thought/i);
});

test("uses the real approval sequence and represents automatic recovery", async () => {
  const source = await readFile(componentPath, "utf8");
  const approval = source.indexOf("approveRemediation(remediation.proposal_id)");
  const execution = source.indexOf("executeRemediation(remediation.proposal_id)");
  assert.ok(approval > 0 && execution > approval);
  assert.match(source, /Human approval required/);
  assert.match(source, /Human approval recorded/);
  assert.match(source, /No execution — automatically recovered/);
  assert.match(source, /automatically recovered before remediation was executed/);
  assert.doesNotMatch(source, /Reject Remediation/);
});

test("documents the restricted architecture and production safety boundary", async () => {
  const source = await readFile(pagePath, "utf8");
  for (const value of ["Restricted Diagnostic Tools", "Human decision", "TOCTOU revalidation", "No arbitrary administration", "automatically recovers abandoned incidents after 120 seconds"]) {
    assert.match(source, new RegExp(value, "i"));
  }
});

test("includes explicit mobile layout rules for the incident workspace", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(css, /@media\(max-width:700px\)[\s\S]*\.incident-metadata\{grid-template-columns:1fr 1fr\}/);
  assert.match(css, /\.incident-system-map\{flex-direction:column\}/);
});
