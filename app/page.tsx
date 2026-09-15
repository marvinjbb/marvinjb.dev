import { SiteHeader } from "./SiteHeader";

const capabilities = [
  {
    title: "AI Systems",
    description: "Bounded agent workflows with explicit contracts, traceable evidence, and validated model output.",
    strengths: ["LLM APIs", "Agent workflows", "Structured Outputs", "Tool Calling", "Grounding / RAG", "Evaluation"],
  },
  {
    title: "Backend Engineering",
    description: "Typed API services that keep provider integrations separate from application behavior.",
    strengths: ["Python", "FastAPI", "Pydantic", "REST APIs", "asyncio", "pytest"],
  },
  {
    title: "Production & Infrastructure",
    description: "Deploying and operating services with practical safeguards, monitoring, and failure handling.",
    strengths: ["Docker", "Linux", "Nginx", "CI/CD", "Monitoring", "Azure / VPS", "Reliability"],
  },
  {
    title: "Data Foundation",
    description: "Production database and pipeline experience that informs reliable AI and backend systems.",
    strengths: ["SQL Server", "ETL", "Pandas", "Data validation", "Performance engineering", "HA/DR"],
  },
];

const projects = [
  {
    label: "LIVE · INCIDENT INVESTIGATION AGENT",
    title: "Incident Investigation Agent",
    description: "A production-backed AI operations system that investigates real synthetic application and PostgreSQL failures through restricted diagnostic tools, then requires human approval before remediation.",
    outcome: "An evidence-backed root-cause report, bounded remediation proposal, human approval gate, audit trail, and verified recovery.",
    proof: ["Progressive diagnostic tool selection", "Strict evidence citation validation", "Allowlisted human-approved remediation"],
    tags: "PYTHON · FASTAPI · OPENAI · POSTGRESQL · DOCKER · NGINX",
    flow: ["Controlled incident", "Restricted diagnostics", "Evidence-backed report", "Human approval", "Recovery verification"],
    deliverables: ["Root cause", "Validated evidence", "Audited recovery"],
    flowLabel: "INCIDENT → EVIDENCE → RECOVERY",
    previewKind: "incident",
    demo: "/demo/incident-investigation",
    repository: null,
  },
  {
    label: "LIVE · RESEARCH AGENT",
    title: "Research Agent",
    description: "A research system that breaks complex questions into focused assignments, researches them in parallel, and produces a grounded report with traceable evidence and citations.",
    outcome: "A validated research report with findings, conflicts, uncertainties, decision guidance, and source-level citations.",
    proof: ["Dynamic 2–5 worker planning", "Parallel, grounded research", "Application-owned evidence IDs"],
    tags: "PYTHON · FASTAPI · OPENAI · TAVILY · ASYNCIO · DOCKER",
    flow: ["User question", "Planner", "2–5 research workers", "Evidence + sources", "Grounded report"],
    deliverables: ["Executive summary", "Cited findings", "Conflicts + uncertainties"],
    flowLabel: "QUESTION → RESEARCH → REPORT",
    previewKind: "research",
    demo: "/demo/research",
    repository: "https://github.com/marvinjbb/research-agent",
  },
  {
    label: "LIVE · EXTRACTION AGENT",
    title: "Extraction Agent",
    description: "A multimodal document system that turns invoices from PDFs and images into validated structured data and supports questions over the extracted document.",
    outcome: "Validated invoice fields, line items, confidence-aware warnings, JSON output, and document Q&A.",
    proof: ["PDF and image input", "Text and vision routing", "Pydantic-validated output"],
    tags: "PYTHON · FASTAPI · OPENAI · PYDANTIC · PYPDF · VISION · DOCKER",
    flow: ["PDF / image", "Input routing", "Extraction", "Pydantic validation", "Structured invoice data", "Document Q&A"],
    deliverables: ["Invoice fields", "Line items", "Validated JSON"],
    flowLabel: "DOCUMENT → DATA → ANSWERS",
    previewKind: "extraction",
    demo: "/demo/extraction",
    repository: "https://github.com/marvinjbb/extraction-agent",
  },
];

const experience = [
  {
    company: "Diplomatic Solutions Corporation",
    role: "Senior SQL Server DBA",
    dates: "SEPT 2019–PRESENT",
    summary: "Production ownership across on-prem and Azure SQL Server environments: 50+ instances, 200+ databases, and multi-terabyte, high-concurrency workloads.",
    details: [
      "HA/DR, Always On Availability Groups, failovers, backup and recovery, and P1/P2 incident response",
      "Performance engineering across blocking, deadlocks, Query Store, execution plans, waits, I/O, and TempDB",
      "Automation with PowerShell, T-SQL, and Python; Azure migrations and CI/CD database deployment workflows",
      "Monitoring, runbooks, operational standards, and production reliability",
    ],
  },
  {
    company: "Emitek",
    role: "ETL Engineer / SQL Server DBA",
    dates: "JULY 2018–AUG 2019",
    summary: "Built and supported data pipelines across SQL Server, APIs, XML, and flat-file sources.",
    details: [
      "Python data workflows using Pandas and NumPy",
      "Incremental loads, CDC, automation, monitoring, and data validation",
      "SQL query and database performance tuning",
    ],
  },
];

const posts = [
  { label: "AI AGENTS · SECURITY", status: "PUBLISHED", title: "We're Giving AI Agents Tools, Memory, and Permissions. What Could Go Wrong?", description: "A practical look at the security risks that emerge when AI agents are given tools, memory, and permission to act.", href: "https://medium.com/@jbmarvin21/were-giving-ai-agents-tools-memory-and-permissions-what-could-go-wrong-630294132412?sharedUserId=jbmarvin21" },
  { label: "CLAUDE · CERTIFICATION", status: "PUBLISHED", title: "The AI Study Loop I Used to Pass the Claude Certified Associate Exam", description: "How I used Anthropic’s official material, ChatGPT, NotebookLM, and practice questions to understand the concepts instead of just memorizing them.", href: "https://medium.com/@jbmarvin21/the-ai-study-loop-i-used-to-pass-the-claude-certified-associate-exam-7d7ad25361a9" },
  { label: "LAB NOTE · PLANNED", title: "What makes an agent trustworthy?", description: "The product decisions that matter more than choosing an orchestration framework." },
  { label: "SYSTEM NOTE · PLANNED", title: "The small model gateway I keep rebuilding", description: "A practical architecture for routing, fallbacks, usage data, and provider independence." },
];

function MediumMark() {
  return <svg viewBox="0 0 48 28" role="img" aria-label="Medium"><path d="M2 4.5 8.2 9v12.3L2 25.5V27h16v-1.5l-5.9-4.2V10.6L21.3 27h2.3l8-16.4v13.2l-4.5 1.7V27H46v-1.5l-4.1-1.7V6.2L46 4.5V3H33.1l-7.5 15.4L17 3H2v1.5Z" /></svg>;
}

function ArticleMark() {
  return <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M8 3.5h11l5 5V28.5H8zM19 3.5v6h5M12 14h8M12 18h8M12 22h6" /></svg>;
}

function ProjectPreview({ project }: { project: (typeof projects)[number] }) {
  return <div className={`system-preview ${project.previewKind}-system-preview`}>
    <span className="preview-flow-label">{project.flowLabel}</span>
    {project.previewKind === "research" ? <div className="research-preview-flow" aria-label="Research Agent parallel workflow">
      <div className="preview-node"><span>01</span><strong>User question</strong></div>
      <i aria-hidden="true">↓</i>
      <div className="preview-node"><span>02</span><strong>Planner</strong></div>
      <i aria-hidden="true">↓</i>
      <div className="research-workers"><b aria-hidden="true" /><div><span>W1</span><span>W2</span><span>W3–5</span></div><strong>2–5 parallel research workers</strong></div>
      <i aria-hidden="true">↓</i>
      <div className="preview-node"><span>04</span><strong>Evidence + sources</strong></div>
      <i aria-hidden="true">↓</i>
      <div className="preview-node preview-final-node"><span>05</span><strong>Grounded report</strong></div>
    </div> : <ol className="extraction-pipeline" aria-label={`${project.title} linear workflow`}>{project.flow.map((step, stepIndex) => <li key={step}><span>{String(stepIndex + 1).padStart(2, "0")}</span><strong>{step}</strong></li>)}</ol>}
    <div className="preview-deliverables"><span>VALIDATED OUTPUT</span><ul>{project.deliverables.map((item) => <li key={item}>{item}</li>)}</ul></div>
    <a href={project.demo}>Open live interface →</a>
  </div>;
}

export default function Home() {
  return <main id="top" className="home-page">
    <SiteHeader />

    <aside className="sidebar" aria-label="Explore">
      <div className="side-group"><p>EXPLORE</p><a href="#projects">Projects</a><a href="#experience">Experience</a><a href="#skills">Capabilities</a><a href="#credentials">Credentials</a><a href="#blog">Articles</a></div>
      <div className="side-group side-current"><p>CURRENTLY</p><div>Building <strong>Production AI systems</strong></div><div>Studying <strong>Claude Developer &amp; Architect</strong></div></div>
      <a className="side-resume" href="/resume/Marvin-Joseph-Bogere-Resume.pdf" download>Download Résumé <span>↓</span></a>
    </aside>

    <div className="page-content">
      <section className="map-section" id="map">
        <div className="personal-intro">
          <img src="/marvin-portrait.jpg" alt="Portrait of Marvin" />
          <div>
            <p className="overline">MARVIN · AI ENGINEERING</p>
            <h1>AI Engineer building production systems, not prototypes.</h1>
            <p className="intro-role">I&apos;m Marvin — a production database administrator turned AI engineer, building reliable AI systems with Python, FastAPI, LLMs, agent workflows, and real deployment infrastructure.</p>
            <div className="hero-actions"><a className="primary-button" href="#projects">View Projects</a><a className="secondary-button" href="/resume/Marvin-Joseph-Bogere-Resume.pdf" download>Download Résumé</a></div>
            <ul className="hero-proof" aria-label="Engineering highlights"><li>Production systems experience</li><li>Python / FastAPI</li><li>Live AI projects</li></ul>
          </div>
        </div>
      </section>

      <section className="content-section flagship-section" id="projects">
        <p className="overline">01 · FLAGSHIP AI PROJECTS</p><h2>Built to work beyond the prompt.</h2>
        <p className="section-intro">Three live AI systems that demonstrate orchestration, validation, grounding, backend engineering, and production deployment.</p>
        <div className="flagship-list">{projects.map((project, index) => <article className={`flagship-project${index % 2 ? " flagship-project-reverse" : ""}`} key={project.title}><div className="flagship-copy"><div className="project-status"><span aria-hidden="true" />{project.label}</div><h3>{project.title}</h3><p>{project.description}</p><div className="project-outcome"><span>OUTPUT</span><strong>{project.outcome}</strong></div><ul>{project.proof.map((item) => <li key={item}>{item}</li>)}</ul><small>{project.tags}</small><div className="project-actions"><a className="primary-button" href={project.demo}>Try Live Demo</a><a className="secondary-button" href={`${project.demo}${project.previewKind === "incident" ? "#architecture" : "#project"}`}>View Project</a>{project.repository && <a className="text-link" href={project.repository} target="_blank" rel="noopener noreferrer">GitHub ↗</a>}</div></div><div className="project-preview"><div className="preview-bar"><span>SYSTEM PREVIEW</span><i aria-hidden="true" /></div><ProjectPreview project={project} /></div></article>)}</div>
        <article className="voice-next"><div><span>COMING NEXT</span><h3>Voice Agent</h3><p>A real-time AI voice agent designed to listen, reason, use tools, and respond naturally.</p></div><small>PLANNED · PYTHON · STREAMING · SPEECH-TO-TEXT · TOOL CALLING · TEXT-TO-SPEECH</small></article>
      </section>

      <section className="content-section engineering-story" id="story">
        <p className="overline">02 · PRODUCTION ADVANTAGE</p>
        <h2>Production experience is the foundation.</h2>
        <p className="section-intro">My approach to AI comes from operating database and data systems where reliability, incident response, automation, performance, deployment, and failure handling mattered every day.</p>
        <p className="story-path">Production database &amp; data engineering <span>→</span> Python &amp; backend engineering <span>→</span> Production AI systems</p>
      </section>

      <section className="content-section" id="experience">
        <p className="overline">03 · EXPERIENCE</p><h2>Systems people can count on.</h2>
        <p className="section-intro">Production ownership across databases, data pipelines, automation, performance, and operational reliability.</p>
        <div className="card-list experience-list">{experience.map((item) => <article className="info-card experience-card" key={item.company}><div className="card-icon">WORK</div><div><p>{item.dates}</p><h3>{item.company}</h3><strong>{item.role}</strong><span>{item.summary}</span><ul>{item.details.map((detail) => <li key={detail}>{detail}</li>)}</ul></div></article>)}</div>
      </section>

      <section className="content-section" id="skills">
        <p className="overline">04 · CAPABILITIES</p><h2>AI systems, backed by production discipline.</h2>
        <p className="section-intro">Four connected strengths for building AI services that work reliably outside a development environment.</p>
        <div className="capability-grid">{capabilities.map((capability) => <article key={capability.title}><h3>{capability.title}</h3><p>{capability.description}</p><p className="capability-strengths">{capability.strengths.join(" · ")}</p></article>)}</div>
      </section>

      <section className="content-section" id="credentials">
        <p className="overline">05 · CREDENTIALS</p><h2>Completed and in progress.</h2>
        <div className="credential-grid">
          <article className="credential-earned"><p className="overline">EARNED CERTIFICATIONS</p><h3>Earned certifications</h3><div className="credential-feature"><a className="credential-badge-link" href="https://www.credly.com/badges/34471933-cede-4253-813c-044842b7fc6a/public_url" target="_blank" rel="noopener noreferrer" aria-label="Verify Claude Certified Associate – Foundations credential on Credly"><img src="/credentials/claude-certified-associate-foundations.png" alt="Official Claude Certified Associate – Foundations badge" /></a><div><span>EARNED</span><h4>Claude Certified Associate – Foundations</h4><a href="https://www.credly.com/badges/34471933-cede-4253-813c-044842b7fc6a/public_url" target="_blank" rel="noopener noreferrer">Verify credential ↗</a></div></div><ul><li>Microsoft Certified: Azure Database Administrator Associate (DP-300)</li><li>CompTIA Security+</li></ul></article>
          <article><p className="overline">CURRENTLY STUDYING</p><h3>Claude foundations</h3><ul><li>Claude Certified Developer – Foundations</li><li>Claude Certified Architect – Foundations</li></ul></article>
        </div>
      </section>

      <section className="content-section" id="education">
        <p className="overline">06 · EDUCATION</p><h2>Formal education.</h2>
        <div className="card-list education-list">
          <article className="info-card"><div className="card-icon">BS</div><div><p>EXPECTED 2026</p><h3>Bachelor of Science in Information Technology</h3><span>Western Governors University</span></div></article>
          <article className="info-card"><div className="card-icon">AS</div><div><p>2021</p><h3>Associate Degree</h3><span>Montgomery College</span></div></article>
        </div>
      </section>

      <section className="content-section" id="blog"><p className="overline">07 · ARTICLES</p><h2>Articles on what I&apos;m learning and building.</h2><p className="section-intro">Notes on AI engineering, production systems, certifications, and the lessons I pick up while building.</p><div className="card-list">{posts.map((post) => <article className={`info-card post${post.href ? " post-live" : " post-planned"}`} key={post.title}><div className="card-icon article-icon">{post.href ? <MediumMark /> : <ArticleMark />}</div><div><p>{post.label}</p><h3>{post.title}</h3><span>{post.description}</span>{post.href && <div className="post-published"><small>{post.status}</small><a href={post.href} target="_blank" rel="noopener noreferrer">Read on Medium ↗</a></div>}</div></article>)}</div></section>

      <section className="contact-section" id="connect"><p className="overline">CONNECT</p><h2>Let&apos;s build something useful.</h2><p>Have an AI engineering role, a backend challenge, or a production system worth improving?</p><div className="contact-links"><a href="mailto:jbmarvin21@gmail.com">Email</a><a href="https://www.linkedin.com/in/marvin-jbb" target="_blank" rel="noopener noreferrer">LinkedIn</a><a href="https://github.com/marvinjbb" target="_blank" rel="noopener noreferrer">GitHub</a></div></section>
      <footer><div><strong>marvinjb.dev</strong><span>AI engineering, backend systems, and production infrastructure.</span></div><div id="linkedin"><a href="https://www.linkedin.com/in/marvin-jbb" target="_blank" rel="noreferrer">LinkedIn</a><a href="#experience">Experience</a><a href="#connect">Let&apos;s Connect</a></div><span>© 2026 Marvin</span></footer>
    </div>
  </main>;
}
