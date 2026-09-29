import { SiteHeader } from "./SiteHeader";

const capabilities = [
  {
    title: "AI Applications & Backends",
    description: "FastAPI services, structured outputs, request validation, provider integrations, typed schemas, and production-ready API design.",
  },
  {
    title: "Agent Workflows",
    description: "Planning, tool use, orchestration, evidence handling, human approval, and controlled multi-step AI workflows.",
  },
  {
    title: "Reliability & Evaluation",
    description: "Testing, logging, observability, failure handling, CI/CD, evaluation, rollback thinking, and production-safe design.",
  },
  {
    title: "Databases & Production Systems",
    description: "SQL Server, PostgreSQL, performance troubleshooting, incident response, automation, HA/DR, and production reliability.",
  },
];

const projects = [
  {
    label: "LIVE · INCIDENT INVESTIGATION AGENT",
    title: "Incident Investigation Agent",
    description: "I built a real working AI system that creates safe, controlled failures in an application or database, investigates them using only approved tools, and does not fix anything automatically without human approval.",
    outcome: "A clear report showing what caused the problem, a safe recommended fix, human approval before action, a record of what happened, and proof that the system recovered.",
    proof: ["Step-by-step investigation", "Conclusions backed by real evidence", "Only approved fixes, with human approval"],
    tags: "PYTHON · FASTAPI · OPENAI · POSTGRESQL · DOCKER · NGINX",
    flow: ["Controlled incident", "Restricted diagnostics", "Evidence-backed report", "Human approval", "Recovery verification"],
    deliverables: ["Root cause", "Validated evidence", "Audited recovery"],
    flowLabel: "INCIDENT → EVIDENCE → RECOVERY",
    previewKind: "incident",
    demo: "/demo/incident-investigation",
    repository: "https://github.com/marvinjbb/incident-investigation-agent",
  },
  {
    label: "LIVE · RESEARCH AGENT",
    title: "Research Agent",
    description: "I built this tool to take a broad question, break it into smaller research tasks, search multiple sources at the same time, and produce one clear report with evidence and citations.",
    outcome: "A clear research report with findings, disagreements, uncertainties, and source citations.",
    proof: ["Breaks questions into 2–5 research tasks", "Researches multiple sources in parallel", "Tracks evidence behind every claim"],
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
    description: "I built this tool to turn invoices from PDFs and images into clean, structured data. It reads the document, extracts key invoice details, validates the result, and lets the user ask questions about the invoice.",
    outcome: "Structured invoice data, line items, validation warnings, JSON output, and document Q&A.",
    proof: ["Works with PDFs and images", "Handles text and scanned documents", "Validates extracted invoice data"],
    tags: "PYTHON · FASTAPI · OPENAI · PYDANTIC · PYPDF · VISION · DOCKER",
    flow: ["PDF / image", "Input routing", "Extraction", "Pydantic validation", "Structured invoice data", "Document Q&A"],
    deliverables: ["Invoice fields", "Line items", "Validated JSON"],
    flowLabel: "DOCUMENT → DATA → ANSWERS",
    previewKind: "extraction",
    demo: "/demo/extraction",
    repository: "https://github.com/marvinjbb/extraction-agent",
  },
];

type ExperienceSection = {
  title: string;
  summary: string;
  details: string[];
};

type ExperienceItem = {
  company: string;
  role: string;
  dates: string;
  summary?: string;
  details?: string[];
  sections?: ExperienceSection[];
};

const experience: ExperienceItem[] = [
  {
    company: "Diplomatic Solutions Corporation",
    role: "Senior Production SQL Server DBA",
    dates: "September 2022–Present",
    sections: [
      {
        title: "Internal Assignment — Applied AI Engineer, Incident Automation",
        summary: "Built the SQL Server investigation path for an internal AI-assisted incident platform, translating production incident-response procedures into restricted Python diagnostics, FastAPI components, Pydantic evidence contracts, and bounded LLM tool-calling workflows.",
        details: [
          "Developed restricted diagnostic operations for SQL Server blocking, active requests, connection pressure, and database health.",
          "Designed application-controlled evidence records with verified identifiers and provenance so generated reports reference collected evidence instead of unsupported model claims.",
          "Integrated database diagnostics into a bounded AI workflow where the model selects approved tools while application code controls execution, permissions, validation, usage limits, and failure handling.",
          "Added safeguards including strict tool schemas, bounded tool/model usage, human approval, current-state revalidation, and post-action recovery verification.",
        ],
      },
      {
        title: "Production Database Engineering",
        summary: "Support 24x7 mission-critical SQL Server environments across on-premises and Azure infrastructure, including 50+ SQL Server instances, 200+ databases, and databases up to 4 TB.",
        details: [
          "Serve as a senior database escalation resource during P1/P2 incidents involving database failures, application connectivity, performance degradation, resource pressure, and service availability.",
          "Perform root-cause analysis for blocking chains, deadlocks, long-running queries, CPU and I/O pressure, TempDB contention, connection exhaustion, wait statistics, and execution-plan regressions.",
          "Manage Always On Availability Groups, backup and recovery, failovers, HA/DR, monitoring, and recovery operations.",
          "Automate operational workflows using PowerShell and T-SQL with GitHub, Azure DevOps, CI/CD, and Octopus Deploy.",
        ],
      },
    ],
  },
  {
    company: "Emitek",
    role: "ETL Engineer / SQL Server DBA",
    dates: "July 2021–August 2022",
    summary: "Built and supported Python and SSIS ETL pipelines integrating SQL Server, structured files, XML, APIs, and other business data sources.",
    details: [
      "Python and Pandas data-processing workflows.",
      "Query tuning, indexing, execution-plan analysis, and database optimization.",
      "Python, SQL Server Agent, and T-SQL scheduling/monitoring, including troubleshooting pipeline failures, API issues, and data inconsistencies.",
    ],
  },
];

const posts = [
  { label: "AI AGENTS · SECURITY", status: "PUBLISHED", title: "We're Giving AI Agents Tools, Memory, and Permissions. What Could Go Wrong?", description: "A practical look at the security risks that emerge when AI agents are given tools, memory, and permission to act.", href: "https://medium.com/@jbmarvin21/were-giving-ai-agents-tools-memory-and-permissions-what-could-go-wrong-630294132412?sharedUserId=jbmarvin21" },
  { label: "CLAUDE · CERTIFICATION", status: "PUBLISHED", title: "The AI Study Loop I Used to Pass the Claude Certified Associate Exam", description: "How I used Anthropic’s official material, ChatGPT, NotebookLM, and practice questions to understand the concepts instead of just memorizing them.", href: "https://medium.com/@jbmarvin21/the-ai-study-loop-i-used-to-pass-the-claude-certified-associate-exam-7d7ad25361a9" },
];

function MediumMark() {
  return <svg viewBox="0 0 48 28" role="img" aria-label="Medium"><path d="M2 4.5 8.2 9v12.3L2 25.5V27h16v-1.5l-5.9-4.2V10.6L21.3 27h2.3l8-16.4v13.2l-4.5 1.7V27H46v-1.5l-4.1-1.7V6.2L46 4.5V3H33.1l-7.5 15.4L17 3H2v1.5Z" /></svg>;
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
      <div className="side-group"><p>EXPLORE</p><a href="#projects">Projects</a><a href="#marvodyn">MARVODYN</a><a href="#experience">Experience</a><a href="#what-i-build">What I Build</a><a href="#credentials">Credentials</a><a href="#education">Education</a><a href="#articles">Articles</a></div>
      <div className="side-group side-current"><p>CURRENTLY</p><div>Building <strong>Production AI systems</strong></div><div>Studying <strong>Claude Developer &amp; Architect</strong></div></div>
      <a className="side-resume" href="/resume/Marvin-Joseph-Resume.pdf" download>Download Résumé <span>↓</span></a>
    </aside>

    <div className="page-content">
      <section className="map-section" id="map">
        <div className="personal-intro">
          <img src="/marvin-portrait.jpg" alt="Portrait of Marvin" />
          <div>
            <p className="overline">MARVIN · AI ENGINEERING</p>
            <h1>I build reliable AI systems, shaped by years of production database work.</h1>
            <p className="intro-role">I started in production database operations, where reliability, incident response, automation, and failure handling mattered every day. Now I bring that same mindset to AI systems built with Python, FastAPI, LLMs, and agent workflows.</p>
            <div className="hero-actions"><a className="primary-button" href="#projects">View Projects</a><a className="secondary-button" href="https://github.com/marvinjbb" target="_blank" rel="noopener noreferrer">GitHub ↗</a><a className="secondary-button" href="/resume/Marvin-Joseph-Resume.pdf" download>Download Résumé</a></div>
            <ul className="hero-proof" aria-label="Engineering highlights"><li>Production systems experience</li><li>Python / FastAPI</li><li>Live AI projects</li></ul>
          </div>
        </div>
      </section>

      <section className="content-section flagship-section" id="projects">
        <p className="overline">01 · PROJECTS</p><h2>AI systems I built to solve real engineering problems.</h2>
        <p className="section-intro">These projects are public, production-minded versions of the kinds of AI systems I want to build professionally—systems with clear workflows, strong validation, observable behavior, and deliberate failure handling.</p>
        <div className="flagship-list">{projects.map((project, index) => <article className={`flagship-project${index % 2 ? " flagship-project-reverse" : ""}`} key={project.title}><div className="flagship-copy"><div className="project-status"><span aria-hidden="true" />{project.label}</div><h3>{project.title}</h3><p>{project.description}</p><div className="project-outcome"><span>OUTPUT</span><strong>{project.outcome}</strong></div><ul>{project.proof.map((item) => <li key={item}>{item}</li>)}</ul><small>{project.tags}</small><div className="project-actions"><a className="primary-button" href={project.demo}>Try Live Demo</a><a className="secondary-button" href={`${project.demo}${project.previewKind === "incident" ? "#architecture" : "#project"}`}>{project.previewKind === "incident" ? "View Project" : "How It Works"}</a>{project.repository && <a className="text-link" href={project.repository} target="_blank" rel="noopener noreferrer">{project.previewKind === "incident" ? "GitHub ↗" : "View GitHub"}</a>}</div></div><div className="project-preview"><div className="preview-bar"><span>SYSTEM PREVIEW</span><i aria-hidden="true" /></div><ProjectPreview project={project} /></div></article>)}</div>
        <section className="marvodyn-feature" id="marvodyn" aria-labelledby="marvodyn-title">
          <div className="marvodyn-feature-copy">
            <p className="overline">02 · FOUNDER-BUILT PRODUCT</p>
            {/* eslint-disable-next-line @next/next/no-img-element -- supplied transparent brand asset */}
            <img className="marvodyn-wordmark" src="/marvodyn/marvodyn-horizontal.png" alt="MARVODYN" width="2172" height="724" loading="lazy" decoding="async" />
            <h2 id="marvodyn-title">Financial guidance built around the immigrant experience.</h2>
            <p>I founded MARVODYN to make the U.S. financial system easier to understand and navigate for immigrants. The live product brings together beginner education, financial-product research, and comparison content across banking, credit, taxes, saving, investing, loans, and international money.</p>
            <strong className="marvodyn-role">Founder &amp; Product Engineer</strong>
            <ul className="marvodyn-proof">
              <li>Beginner financial guides</li>
              <li>Financial-product comparisons</li>
              <li>Qualified guidance for changing requirements</li>
            </ul>
            <div className="marvodyn-actions">
              <a className="primary-button" href="https://marvodyn.com" target="_blank" rel="noopener noreferrer">Visit Live Product ↗</a>
              <a className="secondary-button" href="/products/marvodyn">View Product Case Study →</a>
            </div>
          </div>
          <div className="marvodyn-product-preview" aria-label="Overview of MARVODYN's public financial guidance areas">
            <div className="marvodyn-preview-header"><span>LIVE PUBLIC PRODUCT</span><strong>START HERE</strong></div>
            <div className="marvodyn-topic-grid">
              {['Credit', 'Banking', 'Taxes', 'Saving', 'Investing', 'Loans', 'International Money'].map((topic, index) => <span key={topic}><b>{String(index + 1).padStart(2, '0')}</b>{topic}</span>)}
            </div>
            <div className="marvodyn-product-journey"><strong>Learn</strong><i aria-hidden="true">→</i><strong>Compare</strong><i aria-hidden="true">→</i><strong>Make a more informed decision</strong></div>
          </div>
        </section>
        <article className="voice-next"><div><span>COMING NEXT</span><h3>Voice Agent</h3><p>A real-time AI voice agent designed to listen, reason, use tools, and respond naturally.</p></div><small>PLANNED · PYTHON · STREAMING · SPEECH-TO-TEXT · TOOL CALLING · TEXT-TO-SPEECH</small></article>
      </section>

      <section className="content-section engineering-story" id="story">
        <p className="overline">03 · PRODUCTION ENGINEERING → APPLIED AI</p>
        <h2>From production databases to AI systems</h2>
        <p className="section-intro">I started in production database engineering, where reliability, incident response, automation, performance, and safe change management were part of the job. That experience now shapes how I build AI systems: with clear boundaries, observable behavior, validation, and production reliability in mind.</p>
        <p className="story-path">Production DBA <span>→</span> Backend &amp; Automation <span>→</span> Applied AI Engineering</p>
      </section>

      <section className="content-section" id="experience">
        <p className="overline">04 · EXPERIENCE</p><h2>The work that shaped how I build.</h2>
        <p className="section-intro">Before moving into AI engineering, I spent years working in production database environments—handling incidents, performance problems, automation, deployments, and reliability. That experience now shapes how I build and operate AI systems.</p>
        <div className="card-list experience-list">{experience.map((item) => <article className="info-card experience-card" key={item.company}><div className="card-icon">WORK</div><div><p>{item.dates}</p><h3>{item.company}</h3><strong>{item.role}</strong>{item.sections ? <div className="experience-subsections">{item.sections.map((section) => <section className="experience-subsection" key={section.title}><h4>{section.title}</h4><span>{section.summary}</span><ul>{section.details.map((detail) => <li key={detail}>{detail}</li>)}</ul></section>)}</div> : <><span>{item.summary}</span><ul>{item.details?.map((detail) => <li key={detail}>{detail}</li>)}</ul></>}</div></article>)}</div>
      </section>

      <section className="content-section" id="what-i-build">
        <p className="overline">05 · WHAT I BUILD</p><h2>What I build and how I think about it.</h2>
        <p className="section-intro">I build AI applications, backend services, agent workflows, and reliable production systems. My focus is not just getting a model to respond—it is building the surrounding system so the result can be tested, validated, monitored, and safely operated.</p>
        <div className="capability-grid">{capabilities.map((capability) => <article key={capability.title}><h3>{capability.title}</h3><p>{capability.description}</p></article>)}</div>
      </section>

      <section className="content-section" id="credentials">
        <p className="overline">06 · CREDENTIALS</p><h2>Credentials that support the work.</h2>
        <p className="section-intro">Focused certifications that reinforce my AI, cloud database, and security foundations.</p>
        <div className="credential-grid">
          <article className="credential-earned"><p className="overline">EARNED CERTIFICATIONS</p><h3>Earned certifications</h3><div className="credential-feature"><a className="credential-badge-link" href="https://www.credly.com/badges/34471933-cede-4253-813c-044842b7fc6a/public_url" target="_blank" rel="noopener noreferrer" aria-label="Verify Claude Certified Associate – Foundations credential on Credly"><img src="/credentials/claude-certified-associate-foundations.png" alt="Official Claude Certified Associate – Foundations badge" /></a><div><span>EARNED</span><h4>Claude Certified Associate – Foundations</h4><p className="credential-issuer">Anthropic</p><p className="credential-description">Demonstrates practical understanding of Claude workflows, prompting, configuration, tool use, and responsible AI system usage.</p><a href="https://www.credly.com/badges/34471933-cede-4253-813c-044842b7fc6a/public_url" target="_blank" rel="noopener noreferrer">Verify credential ↗</a></div></div><div className="credential-records"><div><h4>Microsoft Certified: Azure Database Administrator Associate (DP-300)</h4><p>Microsoft</p><span>Validates administration of SQL Server and Azure SQL solutions across security, performance, availability, and migration.</span><a href="https://learn.microsoft.com/en-us/credentials/certifications/azure-database-administrator-associate/" target="_blank" rel="noopener noreferrer">View certification ↗</a></div><div><h4>CompTIA Security+</h4><p>CompTIA</p><span>Validates foundational cybersecurity knowledge across threats, architecture, operations, and risk.</span><a href="https://www.comptia.org/en-us/certifications/security/" target="_blank" rel="noopener noreferrer">View certification ↗</a></div></div></article>
          <article><p className="overline">CURRENTLY STUDYING</p><h3>Claude foundations</h3><ul><li>Claude Certified Developer – Foundations</li><li>Claude Certified Architect – Foundations</li></ul></article>
        </div>
      </section>

      <section className="content-section" id="education">
        <p className="overline">07 · EDUCATION</p><h2>Formal education.</h2>
        <div className="card-list education-list">
          <article className="info-card">
            <div className="education-logo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/education/western-governors-university.jpg" alt="Western Governors University" />
            </div>
            <div><p>2026</p><h3>Bachelor of Science in Information Technology</h3><span>Western Governors University</span></div>
          </article>
          <article className="info-card">
            <div className="education-logo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/education/montgomery-college.jpg" alt="Montgomery College" />
            </div>
            <div><p>2021</p><h3>Associate Degree</h3><span>Montgomery College</span></div>
          </article>
        </div>
      </section>

      <section className="content-section" id="articles"><p className="overline">08 · ARTICLES</p><h2>What I&apos;m learning, testing, and thinking about.</h2><p className="section-intro">I write about the questions I run into while learning and building AI systems—from security and agent design to the way I study new tools and technologies.</p><div className="card-list">{posts.map((post) => <article className="info-card post post-live" key={post.title}><div className="card-icon article-icon"><MediumMark /></div><div><p>{post.label}</p><h3>{post.title}</h3><span>{post.description}</span><div className="post-published"><small>{post.status}</small><a href={post.href} target="_blank" rel="noopener noreferrer">Read on Medium ↗</a></div></div></article>)}</div></section>

      <section className="contact-section" id="connect"><p className="overline">CONNECT</p><h2>Let&apos;s connect.</h2><p>I&apos;m currently focused on AI and Generative AI engineering roles where production experience, backend systems, and reliable AI application design matter.</p><div className="contact-links"><a href="https://www.linkedin.com/in/marvin-jbb" target="_blank" rel="noopener noreferrer">LinkedIn</a><a href="https://github.com/marvinjbb" target="_blank" rel="noopener noreferrer">GitHub</a><a href="mailto:jbmarvin21@gmail.com">Let&apos;s Connect</a></div></section>
      <footer><div><strong>marvinjb.dev</strong><span>AI engineering, backend systems, and production infrastructure.</span></div><div id="linkedin"><a href="https://www.linkedin.com/in/marvin-jbb" target="_blank" rel="noreferrer">LinkedIn</a><a href="#experience">Experience</a><a href="#connect">Let&apos;s Connect</a></div><span>© 2026 Marvin</span></footer>
    </div>
  </main>;
}
