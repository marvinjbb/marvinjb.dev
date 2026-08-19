import assert from "node:assert/strict";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request("http://localhost/", { headers: { accept: "text/html" } }), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
}

test("server-renders the Marvin portfolio map", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /<title>Marvin — AI Engineer<\/title>/i);
  assert.match(html, /I build reliable AI systems\./);
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
  assert.match(html, /marvin-portrait\.jpg/);
});
