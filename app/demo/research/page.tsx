import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "../../SiteHeader";
import { ResearchDemo } from "./ResearchDemo";

const repositoryUrl = "https://github.com/marvinjbb/research-agent";
const title = "Research Agent — Live Demo | Marvin";
const description = "Ask one question and receive a source-grounded report from a bounded multi-agent research workflow.";

export const metadata: Metadata = {
  title, description,
  alternates: { canonical: "https://marvinjb.dev/demo/research" },
  openGraph: { title, description, type: "website", images: [] },
  twitter: { card: "summary", title, description, images: [] },
};

const proof = [
  ["Dynamic planning", "2–5 research workers"],
  ["Grounded evidence", "Application-owned evidence IDs"],
  ["Validated output", "Structured report contract"],
  ["Production deployment", "FastAPI · Docker · Nginx"],
];
const decisions = [
  ["Bounded parallelism", "The planner creates two to five focused assignments, then async workers execute concurrently inside one service."],
  ["Immutable evidence", "Models select application-owned evidence IDs; application code resolves the exact source text and provenance."],
  ["Deterministic aggregation", "Exact URLs and normalized claims are combined without embeddings, fuzzy matching, or model-led deduplication."],
  ["Claim-bound synthesis", "The synthesis model selects validated claim, evidence, and uncertainty IDs instead of rewriting factual records."],
];
const reliability = [
  ["Strict grounding", "Unknown claims, evidence IDs, source IDs, and unsupported factual statements fail validation."],
  ["Ordered partial success", "Successful worker results can continue to synthesis while failed-worker metadata remains visible."],
  ["Bounded cost", "Worker count, searches per worker, concurrent requests, and public request volume are constrained."],
  ["Explicit failure mapping", "Configuration, provider, timeout, structured-output, and all-workers-failed errors stay distinguishable."],
];

export default function ResearchDemoPage() {
  return <main id="top" className="project-case-study research-case-study">
    <SiteHeader />
    <div className="project-page">
      <section className="project-hero" id="overview">
        <div className="project-hero-copy">
          <p className="overline">LIVE AI SYSTEM · RESEARCH AGENT</p>
          <h1>Grounded research with parallel AI workers.</h1>
          <p className="lead">A production-oriented research system that decomposes complex questions into focused assignments, researches them in parallel, builds an evidence catalog, and synthesizes a grounded report with traceable citations.</p>
          <div className="project-hero-actions">
            <a className="primary-button" href="#research">Try the live demo</a>
            <a className="secondary-button" href={repositoryUrl} target="_blank" rel="noopener noreferrer">View backend repository ↗</a>
          </div>
        </div>
        <div className="project-live-mark" aria-label="Live system"><span aria-hidden="true" /><strong>LIVE</strong><small>PUBLIC DEMO</small></div>
      </section>

      <div className="project-proof" aria-label="Research Agent system properties">
        {proof.map(([label, value], index) => <div key={label}><span>0{index + 1}</span><small>{label}</small><strong>{value}</strong></div>)}
      </div>
      <nav className="project-nav" aria-label="Research Agent project navigation">
        <a href="#research">Demo</a><a href="#project">How it works</a><a href="#engineering">Engineering</a><a href="#reliability">Reliability</a><a href={repositoryUrl} target="_blank" rel="noopener noreferrer">Repository ↗</a>
      </nav>

      <section className="project-section project-demo-section" id="research">
        <header className="project-section-heading"><p className="overline">01 · LIVE DEMO</p><h2>Give the research team one question.</h2><p>Quick favors a tighter plan; Deep asks the planner for broader coverage. Progress below is an honest estimate while the completed report is produced.</p></header>
        <ResearchDemo />
      </section>

      <section className="project-section" id="project">
        <header className="project-section-heading"><p className="overline">02 · HOW IT WORKS</p><h2>Evidence stays traceable from search to report.</h2><p>The workflow branches for parallel research, then converges only after each worker returns a validated result.</p></header>
        <div className="research-system-map" aria-label="Research Agent architecture">
          <div className="system-node"><span>INPUT</span><strong>Question</strong></div><i aria-hidden="true">→</i>
          <div className="system-node"><span>PLAN</span><strong>Planner</strong></div><i aria-hidden="true">→</i>
          <div className="system-branch"><span>PARALLEL</span><div><strong>Worker 01</strong><strong>Worker 02</strong><strong>Worker 03–05</strong></div></div><i aria-hidden="true">→</i>
          <div className="system-node"><span>GROUND</span><strong>Evidence catalog</strong></div><i aria-hidden="true">→</i>
          <div className="system-node"><span>COMBINE</span><strong>Deterministic aggregation</strong></div><i aria-hidden="true">→</i>
          <div className="system-node"><span>SYNTHESIZE</span><strong>OpenAI synthesis</strong></div><i aria-hidden="true">→</i>
          <div className="system-node system-node-output"><span>OUTPUT</span><strong>Grounded report</strong></div>
        </div>
      </section>

      <section className="project-section" id="engineering">
        <header className="project-section-heading"><p className="overline">03 · ENGINEERING DECISIONS</p><h2>Application rules—not model confidence—create trust.</h2></header>
        <div className="decision-grid">{decisions.map(([heading, copy], index) => <article key={heading}><span>0{index + 1}</span><h3>{heading}</h3><p>{copy}</p></article>)}</div>
      </section>

      <section className="project-section reliability-section" id="reliability">
        <header className="project-section-heading"><p className="overline">04 · RELIABILITY</p><h2>Failure is bounded and visible.</h2><p>The public workflow keeps provider failures explicit while preserving every grounding invariant.</p></header>
        <div className="reliability-list">{reliability.map(([heading, copy]) => <article key={heading}><h3>{heading}</h3><p>{copy}</p></article>)}</div>
      </section>

      <section className="project-section stack-section" id="stack">
        <p className="overline">05 · TECHNOLOGY STACK</p>
        <div><strong>Interface</strong><span>React · TypeScript</span></div><div><strong>Application</strong><span>Python · FastAPI · Pydantic · asyncio</span></div><div><strong>Providers</strong><span>OpenAI Structured Outputs · Tavily Basic Search</span></div><div><strong>Production</strong><span>Docker · Nginx · Ubuntu VPS · health checks · CORS · rate limiting</span></div>
      </section>

      <section className="project-repository" id="repository"><div><p className="overline">INSPECT THE IMPLEMENTATION</p><h2>See the contracts, tests, and architecture decisions.</h2></div><a className="primary-button" href={repositoryUrl} target="_blank" rel="noopener noreferrer">View backend repository ↗</a></section>
      <footer className="project-footer"><div><strong>marvinjb.dev</strong><span>AI engineering, projects, and field notes.</span></div><div><Link href="/#projects">Selected work</Link><Link href="/#connect">Let&apos;s Connect</Link></div><span>© 2026 Marvin</span></footer>
    </div>
  </main>;
}
