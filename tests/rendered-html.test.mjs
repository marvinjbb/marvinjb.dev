import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
}

test("ships a real downloadable resume PDF", async () => {
  const resume = await readFile(new URL("../public/resume/Marvin-Joseph-Bogere-Resume.pdf", import.meta.url));
  assert.equal(resume.subarray(0, 5).toString("ascii"), "%PDF-");
  assert.ok(resume.length > 5_000);
});

test("server-renders the Marvin portfolio map", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /<title>Marvin — AI Engineer \| Backend &amp; Production Systems<\/title>/i);
  assert.match(html, /AI Engineer \| Backend &amp; Production Systems/);
  assert.match(html, /I build production-ready AI systems and backend services with Python, FastAPI, LLMs, and agentic workflows\./);
  assert.match(html, /My background in production database and data engineering helps me build systems that are reliable, secure, and built to scale\./);
  assert.match(html, /href="\/resume\/Marvin-Joseph-Bogere-Resume\.pdf" download="">Download Résumé<\/a>/);
  assert.match(html, /Production database &amp; data engineering → Python &amp; backend engineering → production AI systems/);
  assert.match(html, /Featured AI Work/);
  assert.match(html, /Projects I(?:&#x27;|')ve built and deployed\./);
  assert.match(html, /Technologies and tools I work with\./);
  assert.match(html, /Where I(?:&#x27;|')ve worked and what I delivered\./);
  assert.match(html, /Certifications and education\./);
  assert.match(html, /I build systems people can count on\./);
  assert.match(html, /I(?:&#x27;|')ve spent years working with databases, data pipelines, and production systems\./);
  assert.match(html, /Let(?:&#x27;|')s Connect/);
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
  assert.match(html, /Voice Agent/);
  assert.match(html, /COMING NEXT/);
  assert.match(html, /A real-time AI voice agent designed to listen, reason, use tools, and respond naturally\./);
  assert.match(html, /PLANNED ARCHITECTURE · Voice → Speech Recognition → Agent → Tools → LLM → Speech Response/);
  assert.match(html, /PLANNED TECHNOLOGIES · Python · Streaming · Speech-to-Text · LLMs · Tool Calling · Text-to-Speech/);
  assert.doesNotMatch(html, /Operations Agent/);
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
  for (const anchor of ["map", "projects", "skills", "experience", "credentials", "education", "blog", "connect"]) assert.match(html, new RegExp(`id=["']${anchor}["']`));
  for (const label of ["Projects", "Skills", "Experience", "Credentials", "LinkedIn"]) assert.match(html, new RegExp(label));
  assert.match(html, /https:\/\/www\.linkedin\.com\/in\/marvin-jbb/);
  assert.match(html, /marvin-portrait\.jpg/);
  for (const step of ["01", "Production Data Systems", "02", "Backend Engineering", "03", "AI Engineering", "NOW"]) assert.match(html, new RegExp(step));
  assert.match(html, /href="\/demo\/extraction"[^>]*>Extraction Agent<\/a>/);
  assert.match(html, /href="\/demo\/research"[^>]*>Research Agent<\/a>/);
  assert.match(html, /Voice Agent <small>COMING NEXT<\/small>/);
  assert.match(html, /Building <strong>Production AI systems<\/strong>/);
  assert.match(html, /Studying <strong>Claude Foundations<\/strong>/);
  assert.match(html, /<strong>Let(?:&#x27;|')s connect<\/strong>/);
  assert.match(html, /Open to AI engineering opportunities, conversations, and collaboration\./);
  assert.match(html, /<nav aria-label="Connect">/);
  assert.match(html, /href="https:\/\/github\.com\/marvinjbb" target="_blank" rel="noopener noreferrer">GitHub<\/a>/);
  assert.match(html, /href="https:\/\/www\.linkedin\.com\/in\/marvin-jbb" target="_blank" rel="noopener noreferrer">LinkedIn<\/a>/);
  assert.match(html, /href="mailto:jbmarvin21@gmail\.com">Email<\/a>/);
  assert.match(html, /href="\/#connect">Let(?:&#x27;|')s Connect<\/a>/);
  assert.match(html, /href="\/resume\/Marvin-Joseph-Bogere-Resume\.pdf" download="">Résumé<\/a>/);
  assert.doesNotMatch(html, /<p>TOPICS<\/p>/);
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
