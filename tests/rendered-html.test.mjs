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
  assert.match(html, /<title>Marvin — AI Engineer \| Backend &amp; Production Systems<\/title>/i);
  assert.match(html, /AI Engineer \| Backend &amp; Production Systems/);
  assert.match(html, /production-oriented AI systems with Python, FastAPI, LLMs, structured outputs, agent orchestration, web search, grounding, Docker, and production infrastructure/i);
  assert.match(html, /Production database &amp; data engineering → Python &amp; backend engineering → production AI systems/);
  assert.match(html, /Hire Marvin/);
  assert.match(html, /jbmarvin21@gmail\.com/);
  assert.match(html, /Extraction Agent/);
  assert.match(html, /href="\/demo\/extraction"/);
  assert.match(html, /Try Live Demo/);
  assert.match(html, /View Project/);
  assert.match(html, /View Backend Repository/);
  assert.match(html, /https:\/\/github\.com\/marvinjbb\/extraction-agent/);
  assert.match(html, /Research Agent/);
  assert.match(html, /planner dynamically creates 2–5 focused assignments/i);
  assert.match(html, /Application-owned evidence IDs/);
  assert.match(html, /deterministic aggregation/);
  assert.match(html, /TAVILY/);
  assert.match(html, /RATE LIMITING/);
  assert.match(html, /href="\/demo\/research"/);
  assert.match(html, /https:\/\/github\.com\/marvinjbb\/research-agent/);
  assert.match(html, /multimodal invoice pipeline processes PDFs and images/i);
  assert.match(html, /PYPDF/);
  assert.match(html, /Diplomatic Solutions Corporation/);
  assert.match(html, /Senior SQL Server DBA/);
  assert.match(html, /SEPT 2019–PRESENT/);
  assert.match(html, /50\+ instances, 200\+ databases/);
  assert.match(html, /Emitek/);
  assert.match(html, /JULY 2018–AUG 2019/);
  assert.match(html, /Microsoft Certified: Azure Database Administrator Associate \(DP-300\)/);
  assert.match(html, /CompTIA Security\+/);
  assert.match(html, /CURRENTLY STUDYING/);
  assert.match(html, /Claude Certified Associate – Foundations/);
  assert.match(html, /Bachelor of Science in Information Technology/);
  assert.match(html, /Western Governors University/);
  assert.match(html, /EXPECTED 2026/);
  assert.match(html, /Montgomery College/);
  for (const skill of ["AI Engineering", "Backend Engineering", "Production &amp; Infrastructure", "Data Engineering", "Production Systems"]) assert.match(html, new RegExp(skill));
  assert.doesNotMatch(html, /Project links, screenshots, repositories, and verified results will replace these structured placeholders/);
  assert.doesNotMatch(html, /Your flagship project will live here/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|Building your site/i);
});

test("renders the portfolio navigation and main sections", async () => {
  const html = await (await render()).text();
  for (const anchor of ["map", "projects", "skills", "experience", "credentials", "education", "blog", "contact"]) assert.match(html, new RegExp(`id=["']${anchor}["']`));
  for (const label of ["Projects", "Skills", "Experience", "Credentials", "LinkedIn"]) assert.match(html, new RegExp(label));
  assert.match(html, /https:\/\/www\.linkedin\.com\/in\/marvin-jbb/);
  assert.match(html, /marvin-portrait\.jpg/);
});

test("server-renders the extraction demo route", async () => {
  const response = await render("/demo/extraction");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /<title>Extraction Agent — Live Demo \| Marvin<\/title>/i);
  assert.match(html, /Turn invoices into answers\./);
  assert.match(html, /Upload an invoice and let AI extract the important details/);
  assert.match(html, /Add a PDF, JPG, PNG, or scanned invoice/);
  assert.match(html, /AI Extracts/);
  assert.match(html, /AI reads and structures the invoice/);
  assert.match(html, /Review extracted information in Table or JSON/);
  assert.match(html, /Ask questions about the invoice in plain English/);
  assert.match(html, /Drag and drop your invoice here\./);
  assert.match(html, /Browse files/);
  assert.match(html, /Extract invoice/);
  assert.match(html, /Table/);
  assert.match(html, /JSON/);
  assert.match(html, /Upload → AI Extracts → Explore → Ask/);
  assert.match(html, /FastAPI · Docker · Nginx · VPS/);
  assert.match(html, /OpenAI · vision routing · Pydantic/);
  assert.match(html, /5 MiB/);
  assert.doesNotMatch(html, /Ask this invoice/);
  assert.doesNotMatch(html, /OPENAI_API_KEY|api\.openai\.com/i);
});

test("server-renders the research demo route", async () => {
  const response = await render("/demo/research");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<title>Research Agent — Live Demo \| Marvin<\/title>/i);
  assert.match(html, /From one question to a grounded report\./);
  assert.match(html, /What should the team investigate\?/);
  assert.match(html, /Research question/);
  assert.match(html, /Start Research/);
  assert.match(html, /Question/);
  assert.match(html, /Research Plan/);
  assert.match(html, /2–5 Workers/);
  for (const description of [
    "User submits a research question and selects the research depth.",
    "The planner breaks the question into focused research assignments.",
    "Independent workers research their assignments in parallel using web search.",
    "Findings are grounded to validated source evidence and citations.",
    "Results are combined, compared, and checked for conflicts and uncertainty.",
    "A grounded research report is returned with findings, guidance, and sources.",
  ]) {
    assert.ok(html.includes(description));
  }
  assert.match(html, /Grounding is an application rule\./);
  assert.match(html, /Application-owned evidence IDs/);
  assert.match(html, /Strict citation grounding/);
  assert.match(html, /https:\/\/github\.com\/marvinjbb\/research-agent/);
  assert.doesNotMatch(html, /OPENAI_API_KEY|TAVILY_API_KEY|api\.openai\.com/i);
});
