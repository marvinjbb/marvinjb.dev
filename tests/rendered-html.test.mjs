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
  assert.match(html, /AI Engineer building production systems, not prototypes\./);
  assert.match(html, /I(?:&#x27;|')m Marvin — a production database administrator turned AI engineer, building reliable AI systems with Python, FastAPI, LLMs, agent workflows, and real deployment infrastructure\./);
  for (const [anchor, item] of [["projects", "Projects"], ["experience", "Experience"], ["skills", "Capabilities"], ["credentials", "Credentials"], ["blog", "Articles"]]) assert.match(html, new RegExp(`href="#${anchor}">${item}</a>`));
  const sidebar = html.match(/<aside class="sidebar"[\s\S]*?<\/aside>/)?.[0] ?? "";
  assert.ok(sidebar);
  for (const icon of ["↗", "▣", "⌘", "✓", "¶"]) assert.doesNotMatch(sidebar, new RegExp(icon));
  assert.match(html, /Production systems experience/);
  assert.match(html, /Python \/ FastAPI/);
  assert.match(html, /Live AI projects/);
  assert.match(html, /Three live AI systems/);
  assert.match(html, /href="#projects">View Projects<\/a>/);
  assert.match(html, /href="\/resume\/Marvin-Joseph-Bogere-Resume\.pdf" download="">Download Résumé<\/a>/);
  assert.match(html, /Production database &amp; data engineering.*Python &amp; backend engineering.*Production AI systems/);
  assert.match(html, /Production experience is the foundation\./);
  assert.doesNotMatch(html, /Featured AI Work/);
  assert.doesNotMatch(html, /Projects I(?:&#x27;|')ve built and deployed\./);
  assert.match(html, /07 · ARTICLES/);
  assert.match(html, /Articles on what I(?:&#x27;|')m learning and building\./);
  assert.match(html, /Notes on AI engineering, production systems, certifications, and the lessons I pick up while building\./);
  assert.match(html, /CLAUDE · CERTIFICATION/);
  assert.equal((html.match(/<small>PUBLISHED<\/small>/g) ?? []).length, 2);
  const newArticleTitle = "We(?:&#x27;|')re Giving AI Agents Tools, Memory, and Permissions\\. What Could Go Wrong\\?";
  assert.match(html, new RegExp(newArticleTitle));
  assert.match(html, /AI AGENTS · SECURITY/);
  assert.match(html, /A practical look at the security risks that emerge when AI agents are given tools, memory, and permission to act\./);
  assert.match(html, /href="https:\/\/medium\.com\/@jbmarvin21\/were-giving-ai-agents-tools-memory-and-permissions-what-could-go-wrong-630294132412\?sharedUserId=jbmarvin21" target="_blank" rel="noopener noreferrer">Read on Medium ↗<\/a>/);
  assert.match(html, /The AI Study Loop I Used to Pass the Claude Certified Associate Exam/);
  assert.match(html, /How I used Anthropic’s official material, ChatGPT, NotebookLM, and practice questions to understand the concepts instead of just memorizing them\./);
  assert.match(html, /href="https:\/\/medium\.com\/@jbmarvin21\/the-ai-study-loop-i-used-to-pass-the-claude-certified-associate-exam-7d7ad25361a9" target="_blank" rel="noopener noreferrer">Read on Medium ↗<\/a>/);
  assert.ok(html.search(new RegExp(newArticleTitle)) < html.indexOf("The AI Study Loop I Used to Pass the Claude Certified Associate Exam"));
  assert.equal((html.match(/aria-label="Medium"/g) ?? []).length, 2);
  assert.doesNotMatch(html, />POST<\/div>/);
  assert.doesNotMatch(html, /What makes an agent trustworthy\?|The small model gateway I keep rebuilding/);
  assert.doesNotMatch(html, /Retrieval quality starts before the vector database/);
  assert.match(html, /Let(?:&#x27;|')s Connect/);
  assert.match(html, /jbmarvin21@gmail\.com/);
  assert.match(html, /Extraction Agent/);
  assert.match(html, /href="\/demo\/extraction"/);
  assert.match(html, /Try Live Demo/);
  assert.match(html, /View Project/);
  assert.match(html, /GitHub ↗/);
  assert.match(html, /https:\/\/github\.com\/marvinjbb\/extraction-agent/);
  assert.match(html, /Research Agent/);
  assert.match(html, /breaks complex questions into focused assignments, researches them in parallel/i);
  assert.match(html, /Application-owned evidence IDs/);
  assert.match(html, /TAVILY/);
  assert.match(html, /ASYNCIO/);
  assert.match(html, /href="\/demo\/research"/);
  assert.match(html, /https:\/\/github\.com\/marvinjbb\/research-agent/);
  assert.match(html, /Incident Investigation Agent/);
  assert.match(html, /href="\/demo\/incident-investigation"/);
  assert.match(html, /https:\/\/github\.com\/marvinjbb\/incident-investigation-agent/);
  assert.match(html, /Progressive diagnostic tool selection/);
  assert.match(html, /multimodal document system that turns invoices from PDFs and images/i);
  assert.match(html, /PYPDF/);
  assert.match(html, /Voice Agent/);
  assert.match(html, /COMING NEXT/);
  assert.match(html, /A real-time AI voice agent designed to listen, reason, use tools, and respond naturally\./);
  assert.match(html, /PLANNED · PYTHON · STREAMING · SPEECH-TO-TEXT · TOOL CALLING · TEXT-TO-SPEECH/);
  assert.doesNotMatch(html, /Operations Agent/);
  assert.match(html, /Diplomatic Solutions Corporation/);
  assert.match(html, /Senior SQL Server DBA/);
  assert.match(html, /SEPT 2019–PRESENT/);
  assert.match(html, /50\+ instances, 200\+ databases/);
  assert.match(html, /Emitek/);
  assert.match(html, /JULY 2018–AUG 2019/);
  assert.match(html, /Microsoft Certified: Azure Database Administrator Associate \(DP-300\)/);
  assert.match(html, /CompTIA Security\+/);
  assert.match(html, /EARNED CERTIFICATIONS/);
  assert.match(html, /<span>EARNED<\/span><h4>Claude Certified Associate – Foundations<\/h4>/);
  assert.match(html, /src="\/credentials\/claude-certified-associate-foundations\.png" alt="Official Claude Certified Associate – Foundations badge"/);
  assert.match(html, /href="https:\/\/www\.credly\.com\/badges\/34471933-cede-4253-813c-044842b7fc6a\/public_url" target="_blank" rel="noopener noreferrer"/);
  assert.match(html, /CURRENTLY STUDYING/);
  const studying = html.match(/<p class="overline">CURRENTLY STUDYING<\/p><h3>Claude foundations<\/h3><ul>(.*?)<\/ul>/)?.[1] ?? "";
  assert.doesNotMatch(studying, /Claude Certified Associate – Foundations/);
  assert.match(studying, /Claude Certified Developer – Foundations/);
  assert.match(studying, /Claude Certified Architect – Foundations/);
  assert.match(html, /Bachelor of Science in Information Technology/);
  assert.match(html, /Western Governors University/);
  assert.match(html, /EXPECTED 2026/);
  assert.match(html, /Montgomery College/);
  for (const capability of ["AI Systems", "Backend", "Production &amp; Infrastructure", "Data Foundation"]) assert.match(html, new RegExp(capability));
  assert.doesNotMatch(html, /Project links, screenshots, repositories, and verified results will replace these structured placeholders/);
  assert.doesNotMatch(html, /Your flagship project will live here/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|Building your site/i);
});

test("renders the portfolio navigation and main sections", async () => {
  const html = await (await render()).text();
  for (const anchor of ["map", "projects", "skills", "experience", "credentials", "education", "blog", "connect"]) assert.match(html, new RegExp(`id=["']${anchor}["']`));
  for (const label of ["Projects", "Capabilities", "Experience", "Credentials", "Articles", "LinkedIn"]) assert.match(html, new RegExp(label));
  assert.match(html, /https:\/\/www\.linkedin\.com\/in\/marvin-jbb/);
  assert.match(html, /marvin-portrait\.jpg/);
  assert.doesNotMatch(html, /ENGINEERING PATH/);
  assert.doesNotMatch(html, /<p>PROJECTS<\/p><a href="\/demo\/extraction">/);
  assert.match(html, /<span>COMING NEXT<\/span><h3>Voice Agent<\/h3>/);
  assert.match(html, /Building <strong>Production AI systems<\/strong>/);
  assert.match(html, /Studying <strong>Claude Developer &amp; Architect<\/strong>/);
  assert.doesNotMatch(html, /<nav aria-label="Connect">/);
  assert.match(html, /href="\/#connect">Let(?:&#x27;|')s Connect<\/a>/);
  assert.match(html, /href="\/resume\/Marvin-Joseph-Bogere-Resume\.pdf" download="">Download Résumé/);
  assert.match(html, /FLAGSHIP AI PROJECTS/);
  assert.match(html, /SYSTEM PREVIEW/);
  assert.match(html, /Open live interface →/);
  for (const step of ["User question", "Planner", "2–5 parallel research workers", "Grounded report", "PDF / image", "Input routing", "Extraction", "Pydantic validation", "Structured invoice data", "Document Q&amp;A"]) assert.ok(html.includes(step));
  assert.match(html, /Evidence \+ sources/);
  assert.match(html, /class="research-preview-flow" aria-label="Research Agent parallel workflow"/);
  assert.match(html, /class="extraction-pipeline" aria-label="Extraction Agent linear workflow"/);
  for (const capability of ["AI Systems", "Backend Engineering", "Production &amp; Infrastructure", "Data Foundation"]) assert.match(html, new RegExp(`<h3>${capability}<\\/h3>`));
  assert.match(html, /class="capability-strengths">LLM APIs · Agent workflows · Structured Outputs/);
  assert.doesNotMatch(html, /<p>TOPICS<\/p>/);
  assert.doesNotMatch(html, />Writing<\/a>/);
});

test("server-renders the extraction demo route", async () => {
  const response = await render("/demo/extraction");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /<title>Extraction Agent — Live Demo \| Marvin<\/title>/i);
  assert.match(html, /Turn unstructured invoices into validated data\./);
  assert.match(html, /Upload a PDF or image of an invoice\. The AI finds the vendor, dates, totals, and line items/);
  assert.match(html, /LIVE AI SYSTEM · EXTRACTION AGENT/);
  assert.match(html, /Upload one invoice\. Inspect structured data\./);
  assert.match(html, /Upload invoice/);
  assert.match(html, /Inspect Table \/ JSON/);
  assert.match(html, /Ask questions/);
  assert.match(html, /Drag and drop your invoice here\./);
  assert.match(html, /Browse files/);
  assert.match(html, /Extract invoice/);
  assert.match(html, /Table/);
  assert.match(html, /JSON/);
  assert.match(html, /One interface, two document-reading paths\./);
  assert.match(html, /Input-aware routing/);
  assert.match(html, /OpenAI Structured Outputs/);
  assert.match(html, /Invalid input and output fail clearly\./);
  assert.match(html, /FastAPI · Docker · Nginx/);
  assert.match(html, /5 MiB/);
  assert.doesNotMatch(html, /Ask this invoice/);
  assert.doesNotMatch(html, /OPENAI_API_KEY|api\.openai\.com/i);
});

test("server-renders the research demo route", async () => {
  const response = await render("/demo/research");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<title>Research Agent — Live Demo \| Marvin<\/title>/i);
  assert.match(html, /Grounded research with parallel AI workers\./);
  assert.match(html, /Ask one question\. The AI divides the work, researches multiple sources in parallel/);
  assert.match(html, /LIVE AI SYSTEM · RESEARCH AGENT/);
  assert.match(html, /Give the research team one question\./);
  assert.match(html, /Research question/);
  assert.match(html, /Start Research/);
  assert.match(html, /2–5 research workers/);
  assert.match(html, /Evidence stays traceable from search to report\./);
  assert.match(html, /Worker 01/);
  assert.match(html, /Deterministic aggregation/);
  assert.match(html, /Claim-bound synthesis/);
  assert.match(html, /Application-owned evidence IDs/);
  assert.match(html, /Failure is bounded and visible\./);
  assert.match(html, /https:\/\/github\.com\/marvinjbb\/research-agent/);
  assert.doesNotMatch(html, /OPENAI_API_KEY|TAVILY_API_KEY|api\.openai\.com/i);
});

test("server-renders the incident investigation demo route", async () => {
  const response = await render("/demo/incident-investigation");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<title>Incident Investigation Agent — Live Demo \| Marvin<\/title>/i);
  assert.match(html, /Investigate failure\. Prove the cause\. Approve the fix\./);
  assert.match(html, /Trigger a safe demo failure, let the AI investigate what happened/);
  assert.match(html, /Blocked PostgreSQL Query/);
  assert.match(html, /Connection Pool Exhaustion/);
  assert.match(html, /Failing Application Deployment/);
  assert.match(html, /Run Incident/);
  assert.match(html, /Restricted diagnostics/);
  assert.match(html, /Human approval/);
  assert.match(html, /Allowlisted remediation/);
  assert.match(html, /href="https:\/\/github\.com\/marvinjbb\/incident-investigation-agent" target="_blank" rel="noopener noreferrer"/);
  assert.doesNotMatch(html, /OPENAI_API_KEY|POSTGRES_PASSWORD|api\.openai\.com/i);
});

test("keeps portfolio project and article links complete and safe", async () => {
  const homepage = await (await render()).text();
  const routes = [
    "/demo/incident-investigation",
    "/demo/research",
    "/demo/extraction",
  ];
  const repositories = [
    "https://github.com/marvinjbb/incident-investigation-agent",
    "https://github.com/marvinjbb/research-agent",
    "https://github.com/marvinjbb/extraction-agent",
  ];

  for (const route of routes) assert.match(homepage, new RegExp(`href="${route}"`));
  for (const repository of repositories) {
    const escaped = repository.replaceAll("/", "\\/").replaceAll(".", "\\.");
    assert.match(
      homepage,
      new RegExp(`href="${escaped}" target="_blank" rel="noopener noreferrer"`),
    );
  }
  assert.equal((homepage.match(/<small>PUBLISHED<\/small>/g) ?? []).length, 2);

  const apiSources = await Promise.all(
    [
      "../app/demo/extraction/extractionApi.ts",
      "../app/demo/research/researchApi.ts",
      "../app/demo/incident-investigation/incidentApi.ts",
    ].map((path) => readFile(new URL(path, import.meta.url), "utf8")),
  );
  assert.doesNotMatch(
    apiSources.join("\n"),
    /https?:\/\/(?:localhost|127\.0\.0\.1):\d+/,
  );
});
