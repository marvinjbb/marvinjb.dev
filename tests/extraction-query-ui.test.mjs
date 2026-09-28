import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const componentPath = new URL(
  "../app/demo/extraction/ExtractionDemo.tsx",
  import.meta.url,
);
const stylesPath = new URL("../app/globals.css", import.meta.url);

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

test("upload UI accepts the approved invoice media formats", async () => {
  const source = await readFile(componentPath, "utf8");

  assert.match(source, /application\/pdf,image\/jpeg,image\/png/);
  assert.match(source, /\.pdf,\.jpg,\.jpeg,\.png/);
  assert.match(source, /PDF, scanned PDF, JPG, or PNG/);
});

test("completed extraction moves accessible focus to the human-readable result", async () => {
  const source = await readFile(componentPath, "utf8");
  assert.match(source, /resultsRef\.current\?\.focus\(\{ preventScroll: true \}\)/);
  assert.match(source, /resultsRef\.current\?\.scrollIntoView/);
  assert.match(source, /aria-labelledby="results-title" tabIndex=\{-1\}/);
  assert.match(source, /aria-selected=\{view === "table"\}/);
});

test("completed extraction uses labeled mobile line-item cards without duplicating result data", async () => {
  const [source, styles] = await Promise.all([
    readFile(componentPath, "utf8"),
    readFile(stylesPath, "utf8"),
  ]);

  for (const label of ["Description", "Quantity", "Unit price", "Line total"]) {
    assert.match(source, new RegExp(`data-label="${label}"`));
  }
  assert.match(styles, /@media\(max-width:700px\).*?\.line-items table\{min-width:0/s);
  assert.match(styles, /\.line-items td::before\{content:attr\(data-label\)/);
  assert.match(styles, /\.line-items thead\{position:absolute/);
});

test("mobile JSON remains exact while wrapping within the result panel", async () => {
  const [source, styles] = await Promise.all([
    readFile(componentPath, "utf8"),
    readFile(stylesPath, "utf8"),
  ]);

  assert.match(source, /JSON\.stringify\(result, null, 2\)/);
  assert.match(styles, /\.json-view\{padding:20px 17px;overflow-x:hidden;white-space:pre-wrap;overflow-wrap:anywhere/);
  assert.match(source, /aria-controls="table-result-panel"/);
  assert.match(source, /aria-controls="json-result-panel"/);
  assert.match(styles, /\.view-tabs button:focus-visible\{[^}]*outline:2px solid var\(--accent\)/);
});
