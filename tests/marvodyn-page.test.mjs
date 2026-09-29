import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${Math.random()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("ships only the selected official MARVODYN logo variants", async () => {
  for (const asset of ["marvodyn-horizontal.png", "marvodyn-stacked.png"]) {
    const source = await readFile(new URL(`../public/marvodyn/${asset}`, import.meta.url));
    const built = await readFile(new URL(`../dist/client/marvodyn/${asset}`, import.meta.url));
    assert.deepEqual([...source.subarray(0, 8)], [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
    assert.deepEqual(built, source);
  }
});

test("places MARVODYN after the three flagship AI systems and before Voice Agent", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();

  const incident = html.indexOf("Incident Investigation Agent");
  const research = html.indexOf("Research Agent", incident + 1);
  const extraction = html.indexOf("Extraction Agent", research + 1);
  const marvodyn = html.indexOf('id="marvodyn"', extraction + 1);
  const voice = html.indexOf("Voice Agent", marvodyn + 1);
  assert.ok([incident, research, extraction, marvodyn, voice].every((position) => position >= 0));
  assert.deepEqual([incident, research, extraction, marvodyn, voice], [...[incident, research, extraction, marvodyn, voice]].sort((a, b) => a - b));

  assert.match(html, /02 · FOUNDER-BUILT PRODUCT/);
  assert.match(html, /src="\/marvodyn\/marvodyn-horizontal\.png" alt="MARVODYN"/);
  assert.match(html, /Founder &amp; Product Engineer/);
  assert.match(html, /href="https:\/\/marvodyn\.com" target="_blank" rel="noopener noreferrer">Visit Live Product ↗<\/a>/);
  assert.match(html, /href="\/products\/marvodyn">View Product Case Study →<\/a>/);
  assert.match(html, /href="#marvodyn">MARVODYN<\/a>/);
  assert.doesNotMatch(html, /AI-powered MARVODYN|eligibility engine/i);
});

test("mobile navigation includes the MARVODYN homepage destination", async () => {
  const source = await readFile(new URL("../app/MobileNav.tsx", import.meta.url), "utf8");
  assert.match(source, /\["MARVODYN", "\/#marvodyn"\]/);
});

test("server-renders the grounded MARVODYN product case study", async () => {
  const response = await render("/products/marvodyn");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();

  assert.match(html, /<title>MARVODYN — Product Case Study \| Marvin<\/title>/);
  assert.match(html, /src="\/marvodyn\/marvodyn-horizontal\.png" alt="MARVODYN logo"/);
  assert.match(html, /FOUNDER-BUILT PRODUCT/);
  assert.match(html, /class="marvodyn-mobile-live-status">LIVE PRODUCT<\/span>/);
  assert.match(html, /Founder &amp; Product Engineer/);
  assert.match(html, /LIVE PRODUCT|Live Product/);
  assert.match(html, /Financial guidance for immigrants navigating money in America\./);
  assert.match(html, /href="https:\/\/marvodyn\.com" target="_blank" rel="noopener noreferrer">Visit MARVODYN ↗<\/a>/);
  assert.match(html, /href="\/#projects">Back to Portfolio<\/a>/);

  for (const section of ["problem", "origin", "role", "live-product", "information", "trust", "evolution", "visit"]) {
    assert.match(html, new RegExp(`id="${section}"`));
  }
  for (const liveArea of ["Beginner financial guides", "Practical financial education", "Financial products and options", "A broader financial life"]) {
    assert.match(html, new RegExp(liveArea));
  }
  assert.match(html, /This is a public product and content principle\. It is not a claim that an automated eligibility or verification system currently enforces these rules\./);
  assert.match(html, /This case study describes the product that is publicly available now\. It does not present unconfirmed roadmap ideas as finished features\./);
  assert.doesNotMatch(html, /AI-powered|eligibility engine|recommendation algorithm|automated evidence pipeline|financial-product database/i);
  assert.doesNotMatch(html, /github\.com\/[^"']*marvodyn/i);
});
