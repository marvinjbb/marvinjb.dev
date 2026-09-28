import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const pagePath = new URL("../app/demo/extraction/page.tsx", import.meta.url);

test("keeps the Extraction demo action first with native hero anchors", async () => {
  const source = await readFile(pagePath, "utf8");

  assert.match(source, /href="#live-demo">Start Live Demo ↓<\/a>/);
  assert.match(source, /href="#how-it-works">How It Works<\/a>/);
  assert.doesNotMatch(source, /next\/link|<Link\b/);

  const order = ["live-demo", "how-it-works", "engineering", "reliability", "stack", "repository"]
    .map((id) => source.indexOf(`id="${id}"`));
  assert.ok(order.every((position) => position >= 0));
  assert.deepEqual(order, [...order].sort((a, b) => a - b));
  assert.ok(source.indexOf("<ExtractionDemo />") < source.indexOf('id="how-it-works"'));
});

test("retains the demo guide, proof strip, stack, and repository CTA", async () => {
  const source = await readFile(pagePath, "utf8");

  for (const step of ["Upload invoice", "Extract data", "Review Table or JSON", "Ask questions"]) {
    assert.match(source, new RegExp(step));
  }
  for (const proof of ["PDF & image input", "Validated structured data", "Invoice Q&A", "Production deployed"]) {
    assert.match(source, new RegExp(proof));
  }
  assert.match(source, /05 · TECHNOLOGY STACK/);
  assert.match(source, /See how it was built/);
  assert.match(source, /https:\/\/github\.com\/marvinjbb\/extraction-agent/);
});
