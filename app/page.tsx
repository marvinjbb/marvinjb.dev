import { MobileNav } from "./MobileNav";

const skills = [
  ["CORE", "Python + TypeScript", "The languages I use to build AI services, interfaces, and production workflows."],
  ["AI SYSTEMS", "LLM applications", "Prompt design, structured outputs, tool calling, and reliable model integrations."],
  ["RETRIEVAL", "RAG + search", "Grounded answers built with thoughtful chunking, retrieval, reranking, and evaluation."],
  ["AGENTS", "Agentic workflows", "Human-aware systems that plan, use tools, recover from failure, and stay observable."],
  ["PROTOCOLS", "MCP + integrations", "Connecting intelligent applications to the real tools and data they need."],
  ["DELIVERY", "Product engineering", "Turning uncertain ideas into focused, testable software people can actually use."],
];
const projects = [
  ["PROJECT · CASE STUDY COMING", "Knowledge Retrieval Engine", "A source-aware research system built around hybrid retrieval, grounded synthesis, and measurable relevance.", "RAG · PYTHON · EVALS"],
  ["PROJECT · CASE STUDY COMING", "Operations Agent", "A tool-using agent that turns messy requests into visible workflows with approvals at the right moments.", "AGENTS · MCP · TOOL CALLING"],
  ["PROJECT · CASE STUDY COMING", "Unified Model Gateway", "A resilient model interface with routing, usage controls, structured telemetry, and provider fallbacks.", "TYPESCRIPT · APIS · OBSERVABILITY"],
];
const posts = [
  ["FIELD NOTE · PLANNED", "Retrieval quality starts before the vector database", "Why content boundaries and evaluation questions shape everything downstream."],
  ["LAB NOTE · PLANNED", "What makes an agent trustworthy?", "The product decisions that matter more than choosing an orchestration framework."],
  ["SYSTEM NOTE · PLANNED", "The small model gateway I keep rebuilding", "A practical architecture for routing, fallbacks, usage data, and provider independence."],
];

export default function Home() {
  return <main id="top">
    <header className="topbar">
      <a className="identity" href="#top"><img src="/marvin-portrait.jpg" alt="Marvin" /><span>marvinjb.dev</span></a>
      <nav className="topnav" aria-label="Primary navigation"><a href="#projects">Projects</a><a href="#blog">Blog</a><a href="#linkedin">LinkedIn</a><a href="#resume">Résumé</a><a className="hire-link" href="mailto:jbmarvin21@gmail.com">Hire Marvin</a></nav>
      <MobileNav />
    </header>

    <aside className="sidebar" aria-label="Explore">
      <div className="side-group"><p>EXPLORE</p><a href="#map"><span>⌘</span> Map</a><a href="#skills"><span>◆</span> Skills</a><a href="#projects"><span>↗</span> Projects</a></div>
      <div className="side-group"><p>WHAT&apos;S NEW</p><a href="#blog">How this site works</a><a href="#blog">Hello, world</a><a className="side-all" href="#blog">All →</a></div>
      <div className="side-group topics"><p>TOPICS</p><a href="#blog">Think Like an AI Engineer <span>›</span></a><a href="#blog">Learn How LLMs Think <span>›</span></a><a href="#blog">Setting Up Agents <span>›</span></a><a href="#blog">RAG + Retrieval <span>›</span></a><a href="#blog">Agent Systems <span>›</span></a></div>
      <div className="side-help"><strong>Not sure where to start?</strong><p>Ask Marvin directly. A real conversation beats guessing.</p><a href="mailto:jbmarvin21@gmail.com">Email Marvin</a></div>
    </aside>

    <div className="page-content">
      <section className="map-section" id="map">
        <p className="overline">THE MAP</p><h1>What would you like to know about Marvin?</h1><p className="lead">Pick the question that sounds like you. Each path opens onto the skills, projects, and notes that answer it.</p>
        <nav className="question-map" aria-label="On this page"><a href="#skills"><span>01</span><strong>Who is Marvin?</strong><i>↓</i></a><a href="#projects"><span>02</span><strong>What has Marvin built?</strong><i>↓</i></a><a href="#blog"><span>03</span><strong>How does Marvin think?</strong><i>↓</i></a><a href="#contact"><span>04</span><strong>How can we work together?</strong><i>↓</i></a></nav>
        <div className="intro-card"><img src="/marvin-portrait.jpg" alt="Portrait of Marvin" /><div><span>AI ENGINEER · BUILDER</span><h2>Building useful intelligence, one dependable system at a time.</h2><a href="mailto:jbmarvin21@gmail.com">Start a conversation →</a></div></div>
      </section>

      <section className="content-section" id="skills"><p className="overline">01 · PROFILE + SKILLS</p><h2>Who is Marvin?</h2><p className="section-intro">An AI engineer focused on turning ambitious ideas into useful systems—fundamentals first, frameworks second. These are the capabilities I take from idea to production.</p><div className="card-list">{skills.map(([label,title,description]) => <article className="info-card" key={title}><div className="card-icon">SKILL</div><div><p>{label}</p><h3>{title}</h3><span>{description}</span></div><i>→</i></article>)}</div><div className="inline-callout" id="resume"><div><strong>Want the formal version?</strong><span>Work history and experience will be added here.</span></div><a href="#resume">Résumé coming soon</a></div></section>

      <section className="content-section" id="projects"><p className="overline">02 · SELECTED WORK</p><h2>What has Marvin built?</h2><p className="section-intro">Real systems, clearly explained. Project links, screenshots, repositories, and verified results will replace these structured placeholders.</p><div className="card-list">{projects.map(([label,title,description,tags]) => <article className="info-card project" key={title}><div className="card-icon">DEMO</div><div><p>{label}</p><h3>{title}</h3><span>{description}</span><small>{tags}</small></div><i>→</i></article>)}</div><div className="feature-callout"><span>TRY THIS FIRST</span><strong>Your flagship project will live here.</strong><p>Visitors will be able to open the demo, read the case study, and inspect the code.</p><i>→</i></div></section>

      <section className="content-section" id="blog"><p className="overline">03 · NOTES + BLOG</p><h2>How does Marvin think?</h2><p className="section-intro">The blog will organize practical lessons from building AI systems into useful trails—not disconnected posts.</p><div className="card-list">{posts.map(([label,title,description]) => <article className="info-card post" key={title}><div className="card-icon">POST</div><div><p>{label}</p><h3>{title}</h3><span>{description}</span></div><i>→</i></article>)}</div></section>

      <section className="contact-section" id="contact"><p className="overline">04 · CONTACT</p><h2>Let&apos;s build something useful.</h2><p>Have an AI problem, a role, or an idea worth testing? Send Marvin a note.</p><a href="mailto:jbmarvin21@gmail.com">jbmarvin21@gmail.com →</a></section>
      <footer><div><strong>marvinjb.dev</strong><span>AI engineering, projects, and field notes.</span></div><div id="linkedin"><a href="#linkedin">LinkedIn placeholder</a><a href="#resume">Résumé placeholder</a><a href="mailto:jbmarvin21@gmail.com">Hire Marvin</a></div><span>© 2026 Marvin</span></footer>
    </div>
  </main>;
}
