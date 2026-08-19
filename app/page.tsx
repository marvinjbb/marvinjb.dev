import { MobileNav } from "./MobileNav";

const projects = [
  {
    number: "01",
    status: "CASE STUDY · PLACEHOLDER",
    title: "Knowledge Retrieval Engine",
    description: "A grounded answer system built around hybrid search, source-aware synthesis, and evaluations that expose where retrieval breaks.",
    tags: ["RAG", "Python", "Evals"],
    result: "Outcome metrics coming with the case study",
    tone: "lime",
  },
  {
    number: "02",
    status: "LIVE SYSTEM · PLACEHOLDER",
    title: "Operations Agent",
    description: "A tool-using agent that turns messy requests into observable workflows—with explicit approvals at the moments that matter.",
    tags: ["Agents", "Tool calling", "MCP"],
    result: "Outcome metrics coming with the case study",
    tone: "orange",
  },
  {
    number: "03",
    status: "PLATFORM · PLACEHOLDER",
    title: "Unified Model Gateway",
    description: "One resilient interface across model providers, with routing, cost controls, structured telemetry, and graceful fallbacks.",
    tags: ["TypeScript", "APIs", "Observability"],
    result: "Outcome metrics coming with the case study",
    tone: "blue",
  },
];

const capabilities = [
  ["01", "RAG + retrieval", "Grounded systems built from careful chunking, hybrid search, reranking, and measurable relevance."],
  ["02", "Agents + tools", "Bounded autonomy, dependable tool interfaces, human approvals, and workflows that recover well."],
  ["03", "Evaluation", "Test sets, trace review, task metrics, and feedback loops that turn vibes into engineering signals."],
  ["04", "AI platforms", "Model gateways, APIs, queues, storage, observability, and the backend systems that keep AI useful."],
  ["05", "MCP + integrations", "Interoperable tools and context layers that connect models to the systems where work happens."],
  ["06", "Product engineering", "Clear user flows, fast prototypes, production-minded implementation, and honest trade-offs."],
];

const notes = [
  ["01", "FIELD NOTE · 6 MIN", "Retrieval quality starts before the vector database", "A practical look at why content boundaries, metadata, and evaluation questions shape everything downstream."],
  ["02", "LAB NOTE · 4 MIN", "What makes an agent trustworthy?", "Five product decisions that matter more than choosing an orchestration framework."],
  ["03", "SYSTEM NOTE · 8 MIN", "The small model gateway I keep rebuilding", "A compact architecture for routing, fallbacks, usage data, and provider independence."],
];

export default function Home() {
  return (
    <main id="top">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Marvin home"><span className="brand-mark">M</span><span>marvinjb.dev</span></a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#work">Work</a><a href="#expertise">Expertise</a><a href="#notes">Notes</a><a href="#profile">Profile</a>
        </nav>
        <a className="header-cta" href="mailto:jbmarvin21@gmail.com">Let&apos;s talk <span aria-hidden="true">↗</span></a>
        <MobileNav />
      </header>

      <section className="hero">
        <div className="hero-grid" aria-hidden="true" />
        <div className="eyebrow"><span /> Available for ambitious AI work</div>
        <h1>I design AI systems<span>that earn their place.</span></h1>
        <div className="hero-bottom">
          <p>Marvin is an AI engineer turning uncertain ideas into useful, observable products—from retrieval and agents to the APIs beneath them.</p>
          <div className="hero-actions"><a className="primary-button" href="#work">Explore selected work <span>↓</span></a><a className="text-link" href="#profile">Meet Marvin <span>→</span></a></div>
        </div>
      </section>

      <section className="proof-bar" aria-label="Portfolio highlights">
        <p className="proof-intro">BUILDING AT THE EDGE OF<br />SOFTWARE + INTELLIGENCE</p>
        <div className="proof-item"><strong>03</strong><span>systems highlighted</span></div>
        <div className="proof-item"><strong>06</strong><span>AI capabilities</span></div>
        <div className="proof-item"><strong>01</strong><span>clear point of view</span></div>
        <div className="scroll-note"><span>SCROLL TO EXPLORE</span><i /></div>
      </section>

      <section className="pathfinder section-shell" aria-labelledby="pathfinder-title">
        <div><p className="section-kicker">START WHERE YOU ARE</p><h2 id="pathfinder-title">What would you like to know?</h2></div>
        <div className="path-grid">
          <a href="#work"><span>01</span><strong>What has Marvin built?</strong><i>Selected systems and case studies ↓</i></a>
          <a href="#expertise"><span>02</span><strong>What can Marvin engineer?</strong><i>Capabilities across the AI stack ↓</i></a>
          <a href="#notes"><span>03</span><strong>How does Marvin think?</strong><i>Field notes and engineering ideas ↓</i></a>
          <a href="#profile"><span>04</span><strong>Who is Marvin?</strong><i>Background, résumé, and contact ↓</i></a>
        </div>
      </section>

      <section className="intro section-shell">
        <p className="section-kicker">01 / THE POINT OF VIEW</p>
        <div className="intro-statement"><span className="annotation">NOT AI FOR AI&apos;S SAKE</span><h2>Useful intelligence is a systems problem.</h2><p>The model is only one component. The real work is shaping context, tools, feedback, interfaces, and failure paths into something people can depend on.</p></div>
        <div className="principles" aria-label="Engineering principles"><span>Outcome first</span><span>Evidence over demos</span><span>Humans stay in control</span></div>
      </section>

      <section className="work section-shell dark-section" id="work">
        <div className="section-head inverse"><div><p className="section-kicker">02 / SELECTED WORK</p><h2>Systems, not slides.</h2></div><p>Representative placeholders today. Each will become an evidence-rich case study with real architecture, decisions, and results.</p></div>
        <div className="project-list">
          {projects.map((project) => (
            <article className={`project-card ${project.tone}`} key={project.number}>
              <div className="project-number">{project.number}</div>
              <div className="project-content"><p className="meta">{project.status}</p><h3>{project.title}</h3><p>{project.description}</p><div className="tag-list">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div>
              <div className="project-result"><span>{project.result}</span><span className="coming-soon" aria-label={`${project.title} case study coming soon`}>Soon</span></div>
            </article>
          ))}
        </div>
        <p className="placeholder-note"><span>*</span> Placeholder claims are intentionally labeled and will be replaced with verified project evidence.</p>
      </section>

      <section className="expertise section-shell" id="expertise">
        <div className="section-head"><div><p className="section-kicker">03 / ENGINEERING RANGE</p><h2>The systems behind the intelligence.</h2></div><p>From the first retrieval experiment to the platform that keeps it observable in production.</p></div>
        <div className="capability-grid">
          {capabilities.map(([number,title,copy]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p><i aria-hidden="true">↗</i></article>)}
        </div>
      </section>

      <section className="method section-shell">
        <div className="method-title"><p className="section-kicker">04 / HOW I WORK</p><h2>A disciplined path through uncertain problems.</h2></div>
        <ol className="method-list">
          <li><span>01</span><div><h3>Frame the outcome</h3><p>Define what good looks like before picking models or frameworks.</p></div></li>
          <li><span>02</span><div><h3>Ship a thin slice</h3><p>Build the smallest end-to-end system that exposes the real risks.</p></div></li>
          <li><span>03</span><div><h3>Measure reality</h3><p>Create evals and traces around actual user tasks and failure modes.</p></div></li>
          <li><span>04</span><div><h3>Earn complexity</h3><p>Add autonomy, memory, and scale only when the evidence asks for them.</p></div></li>
        </ol>
      </section>

      <section className="notes section-shell" id="notes">
        <div className="section-head"><div><p className="section-kicker">05 / FROM THE NOTEBOOK</p><h2>Thinking in public.</h2></div><p>Placeholder articles for the ideas, implementation notes, and lessons that will grow alongside the work.</p></div>
        <div className="note-list">
          {notes.map(([number,meta,title,copy]) => <article key={number}><span className="note-number">{number}</span><div><p className="meta">PLANNED · {meta}</p><h3>{title}</h3><p>{copy}</p></div><span className="planned-label">Planned</span></article>)}
        </div>
      </section>

      <section className="profile section-shell dark-section" id="profile">
        <figure className="portrait-card"><img src="/marvin-portrait.jpg" alt="Portrait of Marvin" /><figcaption>MARVIN<br />AI ENGINEER</figcaption></figure>
        <div className="profile-copy"><p className="section-kicker">06 / ABOUT MARVIN</p><h2>Engineer. Builder.<br />Persistent question-asker.</h2><p>This biography is a placeholder for the story behind the work: experience, technical background, the problems Marvin cares about, and the kind of team where he does his best work.</p><div className="profile-links"><a href="#contact">Résumé placeholder <span>↗</span></a><a href="#contact">GitHub placeholder <span>↗</span></a><a href="#contact">LinkedIn placeholder <span>↗</span></a></div></div>
      </section>

      <section className="contact section-shell" id="contact">
        <p className="section-kicker">07 / START A CONVERSATION</p>
        <h2>Have a hard AI problem?<br /><span>Let&apos;s make it tractable.</span></h2>
        <div className="contact-row"><p>Project inquiry, technical collaboration, or simply comparing notes—send a signal.</p><a className="contact-button" href="mailto:jbmarvin21@gmail.com">jbmarvin21@gmail.com <span>↗</span></a></div>
      </section>

      <footer><a className="brand" href="#top"><span className="brand-mark">M</span><span>marvinjb.dev</span></a><p>AI engineering, systems, and notes.<br />Built with care. Content placeholders for now.</p><div><a href="#work">Work</a><a href="#expertise">Expertise</a><a href="#notes">Notes</a><a href="#profile">Profile</a></div><a className="back-top" href="#top">Back to top ↑</a></footer>
    </main>
  );
}
