import assert from "node:assert/strict";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
}

test("server-renders the Marvin portfolio map", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /<title>Marvin — AI Engineer<\/title>/i);
  assert.match(html, /Hey, I(?:&#x27;|')m Marvin\./);
  assert.match(html, /AI Engineer with a background in SQL Server database systems and production infrastructure\./);
  assert.match(html, /Microsoft SQL Server in production environments/);
  assert.match(html, /What would you like to know about me\?/);
  assert.match(html, /Who am I\?/);
  assert.match(html, /What have I built\?/);
  assert.match(html, /How do I think\?/);
  assert.match(html, /Hire Marvin/);
  assert.match(html, /jbmarvin21@gmail\.com/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|Building your site/i);
});

test("renders the portfolio navigation and main sections", async () => {
  const html = await (await render()).text();
  for (const anchor of ["map", "skills", "projects", "blog", "contact"]) assert.match(html, new RegExp(`id=["']${anchor}["']`));
  for (const label of ["Projects", "Blog", "LinkedIn", "Résumé"]) assert.match(html, new RegExp(label));
  assert.match(html, /https:\/\/www\.linkedin\.com\/in\/marvin-jbb/);
  assert.match(html, /marvin-portrait\.jpg/);
});

test("server-renders the extraction demo route", async () => {
  const response = await render("/demo/extraction");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /<title>Document Extraction Agent Demo — Marvin<\/title>/i);
  assert.match(html, /Turn invoices into answers\./);
  assert.match(html, /Upload an invoice and let AI extract the important details/);
  assert.match(html, /PDF · JPG · PNG/);
  assert.match(html, /AI Extracts/);
  assert.match(html, /Explore/);
  assert.match(html, /Drag and drop your invoice here\./);
  assert.match(html, /Browse files/);
  assert.match(html, /Extract invoice/);
  assert.match(html, /Table/);
  assert.match(html, /JSON/);
  assert.match(html, /Upload → AI Extracts → Explore → Ask/);
  assert.match(html, /5 MiB/);
  assert.doesNotMatch(html, /Ask this invoice/);
  assert.doesNotMatch(html, /OPENAI_API_KEY|api\.openai\.com/i);
});
