import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const componentPath = new URL(
  "../app/demo/extraction/ExtractionDemo.tsx",
  import.meta.url,
);

test("query UI remains scoped to successful extraction state", async () => {
  const source = await readFile(componentPath, "utf8");

  assert.match(source, /const showResults = state === "success" && result !== null/);
  assert.match(source, /\{showResults && \(/);
  assert.match(source, /Ask this invoice/);
});

test("query UI includes loading, answer, error, and repeat-question states", async () => {
  const source = await readFile(componentPath, "utf8");

  assert.match(source, /queryState === "querying"/);
  assert.match(source, /queryState === "answered"/);
  assert.match(source, /queryState === "error"/);
  assert.match(source, /setQuestion\(""\)/);
  assert.match(source, /onSubmit=\{askInvoice\}/);
});
