import { SiteHeader } from "./SiteHeader";

const skills = [
  ["AI", "AI Engineering", "LLM APIs · Agentic Systems · Multi-Agent Orchestration · Structured Outputs · Tool Calling · Grounding & Citations · RAG Concepts · Prompt Engineering · LLM Evaluation"],
  ["BACKEND", "Backend Engineering", "Python · FastAPI · Pydantic · REST APIs · asyncio · API integration · error handling · pytest"],
  ["INFRA", "Production & Infrastructure", "Docker · Linux · Nginx · VPS · HTTPS · environment/secret management · CORS · rate limiting · health checks · Git/GitHub · CI/CD"],
  ["DATA", "Data Engineering", "SQL · SQL Server · ETL · Pandas · NumPy · SSIS · CDC · data validation"],
  ["OPS", "Production Systems", "Monitoring · incident response · performance engineering · HA/DR · automation · reliability engineering · Azure"],
];

const projects = [
  {
    label: "LIVE PROJECT · RESEARCH AGENT",
    title: "Research Agent",
    description: "A planner dynamically creates 2–5 focused assignments, then bounded async workers research them in parallel with Tavily. Application-owned evidence IDs, strict citation grounding, deterministic aggregation, explicit conflicts and uncertainties, and OpenAI synthesis produce a validated report.",
    tags: "PYTHON · FASTAPI · OPENAI · TAVILY · DOCKER · NGINX · UBUNTU VPS · CORS · RATE LIMITING · HEALTH CHECKS",
    live: true,
    demo: "/demo/research",
    repository: "https://github.com/marvinjbb/research-agent",
  },
  {
    label: "LIVE PROJECT · EXTRACTION AGENT",
    title: "Extraction Agent",
    description: "A multimodal invoice pipeline processes PDFs and images through pypdf or vision routing, returns OpenAI Structured Outputs, and validates every response with Pydantic. Production debugging and regression tests protect the FastAPI service through Docker, Nginx, and VPS deployment.",
    tags: "PYTHON · FASTAPI · OPENAI · PYDANTIC · PYPDF · VISION · DOCKER · NGINX · VPS",
    live: true,
    demo: "/demo/extraction",
    repository: "https://github.com/marvinjbb/extraction-agent",
  },
  {
    label: "PROJECT · CASE STUDY COMING",
    title: "Operations Agent",
    description: "A future tool-using agent concept for turning operational requests into visible workflows with approvals at the right moments.",
    tags: "AGENTS · MCP · TOOL CALLING",
    live: false,
    demo: "",
    repository: "",
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
  ["FIELD NOTE · PLANNED", "Retrieval quality starts before the vector database", "Why content boundaries and evaluation questions shape everything downstream."],
  ["LAB NOTE · PLANNED", "What makes an agent trustworthy?", "The product decisions that matter more than choosing an orchestration framework."],
  ["SYSTEM NOTE · PLANNED", "The small model gateway I keep rebuilding", "A practical architecture for routing, fallbacks, usage data, and provider independence."],
];

export default function Home() {
  return <main id="top">
    <SiteHeader />

    <aside className="sidebar" aria-label="Explore">
      <div className="side-group"><p>EXPLORE</p><a href="#map"><span>⌘</span> About</a><a href="#projects"><span>↗</span> Projects</a><a href="#skills"><span>◆</span> Skills</a><a href="#experience"><span>▣</span> Experience</a><a href="#credentials"><span>✓</span> Credentials</a></div>
      <div className="side-group"><p>ENGINEERING PATH</p><a href="#map">Production data systems</a><a href="#projects">Backend + AI systems</a><a className="side-all" href="#contact">Connect →</a></div>
      <div className="side-group topics"><p>TOPICS</p><a href="#blog">Think Like an AI Engineer <span>›</span></a><a href="#blog">Production AI Systems <span>›</span></a><a href="#blog">Grounded Agents <span>›</span></a></div>
      <div className="side-help"><strong>Interested in the work?</strong><p>Explore the live systems or get in touch directly.</p><a href="mailto:jbmarvin21@gmail.com">Email Marvin</a></div>
    </aside>

    <div className="page-content">
      <section className="map-section" id="map">
        <div className="personal-intro">
          <img src="/marvin-portrait.jpg" alt="Portrait of Marvin" />
          <div>
            <p className="overline">MARVIN · ENGINEERING PORTFOLIO</p>
            <h1>AI Engineer | Backend &amp; Production Systems</h1>
            <p className="intro-role">I build production-oriented AI systems with Python, FastAPI, LLMs, structured outputs, agent orchestration, web search, grounding, Docker, and production infrastructure.</p>
            <p>My path into AI engineering began with production SQL Server and data engineering, then expanded into Python and backend services. I now apply that operational foundation to AI systems designed for validation, failure handling, observability, and dependable delivery.</p>
          </div>
        </div>
        <div className="personal-map engineering-story">
          <p className="overline">ENGINEERING STORY</p>
          <h2>Production foundations, applied to AI.</h2>
          <p className="lead">Production database &amp; data engineering → Python &amp; backend engineering → production AI systems</p>
        </div>
        <nav className="question-map" aria-label="On this page"><a href="#projects"><span>01</span><strong>Featured AI work</strong><i>↓</i></a><a href="#skills"><span>02</span><strong>Engineering skills</strong><i>↓</i></a><a href="#experience"><span>03</span><strong>Production experience</strong><i>↓</i></a><a href="#credentials"><span>04</span><strong>Credentials</strong><i>↓</i></a></nav>
      </section>

      <section className="content-section" id="projects">
        <p className="overline">01 · FEATURED AI PROJECTS</p><h2>Proof through working systems.</h2>
        <p className="section-intro">Live, production-minded AI services with inspectable architecture, strict validation, and deployment-focused engineering.</p>
        <div className="card-list">{projects.map((project) => <article className="info-card project" key={project.title}><div className="card-icon">{project.live ? "LIVE" : "NEXT"}</div><div><p>{project.label}</p><h3>{project.title}</h3><span>{project.description}</span><small>{project.tags}</small>{project.live && <div className="project-actions"><a className="primary-button" href={project.demo}>Try Live Demo</a><a className="secondary-button" href={`${project.demo}#project`}>View Project</a><a className="secondary-button" href={project.repository} target="_blank" rel="noreferrer">View Backend Repository</a></div>}</div><i>→</i></article>)}</div>
      </section>

      <section className="content-section" id="skills">
        <p className="overline">02 · ENGINEERING SKILLS</p><h2>AI systems, backed by production discipline.</h2>
        <p className="section-intro">A practical stack spanning model integration, backend contracts, deployment infrastructure, data workflows, and operating production systems.</p>
        <div className="card-list skill-groups">{skills.map(([label, title, description]) => <article className="info-card" key={title}><div className="card-icon">{label}</div><div><h3>{title}</h3><span>{description}</span></div><i>→</i></article>)}</div>
      </section>

      <section className="content-section" id="experience">
        <p className="overline">03 · PROFESSIONAL EXPERIENCE</p><h2>Operating systems where reliability matters.</h2>
        <p className="section-intro">Production database and data engineering experience that now informs how I build, debug, and operate backend and AI services.</p>
        <div className="card-list experience-list">{experience.map((item) => <article className="info-card experience-card" key={item.company}><div className="card-icon">WORK</div><div><p>{item.dates}</p><h3>{item.company}</h3><strong>{item.role}</strong><span>{item.summary}</span><ul>{item.details.map((detail) => <li key={detail}>{detail}</li>)}</ul></div></article>)}</div>
      </section>

      <section className="content-section" id="credentials">
        <p className="overline">04 · CERTIFICATIONS</p><h2>Completed and in progress.</h2>
        <div className="credential-grid">
          <article><p className="overline">COMPLETED</p><h3>Earned certifications</h3><ul><li>Microsoft Certified: Azure Database Administrator Associate (DP-300)</li><li>CompTIA Security+</li></ul></article>
          <article><p className="overline">CURRENTLY STUDYING</p><h3>Claude foundations</h3><ul><li>Claude Certified Associate – Foundations</li><li>Claude Certified Developer – Foundations</li><li>Claude Certified Architect – Foundations</li></ul></article>
        </div>
      </section>

      <section className="content-section" id="education">
        <p className="overline">05 · EDUCATION</p><h2>Formal education.</h2>
        <div className="card-list education-list">
          <article className="info-card"><div className="card-icon">BS</div><div><p>EXPECTED 2026</p><h3>Bachelor of Science in Information Technology</h3><span>Western Governors University</span></div></article>
          <article className="info-card"><div className="card-icon">AS</div><div><p>2021</p><h3>Associate Degree</h3><span>Montgomery College</span></div></article>
        </div>
      </section>

      <section className="content-section" id="blog"><p className="overline">06 · NOTES + BLOG</p><h2>Engineering notes in progress.</h2><p className="section-intro">Planned writing on the decisions behind reliable AI systems, retrieval, and agent behavior.</p><div className="card-list">{posts.map(([label, title, description]) => <article className="info-card post" key={title}><div className="card-icon">POST</div><div><p>{label}</p><h3>{title}</h3><span>{description}</span></div><i>→</i></article>)}</div></section>

      <section className="contact-section" id="contact"><p className="overline">CONTACT</p><h2>Let&apos;s build something useful.</h2><p>Have an AI engineering role, a backend challenge, or a production system worth improving?</p><a href="mailto:jbmarvin21@gmail.com">jbmarvin21@gmail.com →</a></section>
      <footer><div><strong>marvinjb.dev</strong><span>AI engineering, backend systems, and production infrastructure.</span></div><div id="linkedin"><a href="https://www.linkedin.com/in/marvin-jbb" target="_blank" rel="noreferrer">LinkedIn</a><a href="#experience">Experience</a><a href="mailto:jbmarvin21@gmail.com">Hire Marvin</a></div><span>© 2026 Marvin</span></footer>
    </div>
  </main>;
}
