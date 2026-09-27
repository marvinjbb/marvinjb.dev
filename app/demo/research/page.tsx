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
  ["Research tasks", "Breaks the question into 2–5 research tasks"],
  ["Evidence tracking", "Tracks the evidence behind each claim"],
  ["Final report", "Returns a structured research report"],
  ["Production deployed", "FastAPI · Docker · Nginx"],
];
const decisions = [
  ["Limited research tasks", "The system creates only 2–5 focused research tasks so the process stays controlled."],
  ["Evidence cannot be changed", "The AI selects evidence that the application already collected instead of inventing its own evidence."],
  ["Results are combined by the application", "The system combines the research results using fixed rules instead of letting the AI freely merge everything."],
  ["Final report uses validated evidence", "The AI writes the report using only approved claims, evidence, and uncertainties."],
];
const reliability = [
  ["Invalid evidence is rejected", "Claims or evidence that do not match the collected research are not accepted."],
  ["Successful research can still continue", "If one research task fails, the others can still contribute to the final report."],
  ["Usage is limited", "The system limits workers, searches, and requests so cost and load stay controlled."],
  ["Errors stay clear", "Timeouts, provider failures, bad outputs, and complete research failure are reported separately instead of being hidden."],
];

export default function ResearchDemoPage() {
  return <main id="top" className="project-case-study research-case-study">
    <SiteHeader />
    <div className="project-page">
      <section className="project-hero" id="overview">
        <div className="project-hero-copy">
          <p className="overline">LIVE AI SYSTEM · RESEARCH AGENT</p>
          <h1>Turn one question into a clear, cited research report.</h1>
          <p className="lead">Ask one question. The AI breaks it into smaller research tasks, searches multiple sources at the same time, compares the findings, and returns one report with evidence and citations.</p>
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
        <header className="project-section-heading"><p className="overline">01 · LIVE DEMO</p><h2>Ask one question. The system does the research.</h2><p>Ask one question. The AI breaks it into smaller research tasks, searches multiple sources, and combines the findings into one cited report.</p></header>
        <p className="project-section-note">Choose a quick or deeper search. The system breaks the question into focused research tasks, searches multiple sources, and shows progress until the final report is ready.</p>
        <ResearchDemo />
      </section>

      <section className="project-section" id="project">
        <header className="project-section-heading"><p className="overline">02 · HOW IT WORKS</p><h2>How the research process works</h2><p>The AI breaks one question into smaller research tasks, searches multiple sources, keeps track of the evidence, and combines everything into one cited report.</p></header>
        <p className="project-section-note">Several research tasks run at the same time, then their results are combined only after the evidence is checked.</p>
        <div className="research-system-map" aria-label="Research Agent architecture">
          <div className="system-node"><span>QUESTION</span><strong>Question</strong></div><i aria-hidden="true">→</i>
          <div className="system-node"><span>PLAN</span><strong>Break into research tasks</strong></div><i aria-hidden="true">→</i>
          <div className="system-node"><span>SEARCH</span><strong>Search multiple sources</strong></div><i aria-hidden="true">→</i>
          <div className="system-node"><span>EVIDENCE</span><strong>Collect evidence</strong></div><i aria-hidden="true">→</i>
          <div className="system-node"><span>COMBINE</span><strong>Combine findings</strong></div><i aria-hidden="true">→</i>
          <div className="system-node"><span>WRITE</span><strong>Write final report</strong></div><i aria-hidden="true">→</i>
          <div className="system-node system-node-output"><span>REPORT</span><strong>Cited research report</strong></div>
        </div>
      </section>

      <section className="project-section" id="engineering">
        <header className="project-section-heading"><p className="overline">03 · ENGINEERING DECISIONS</p><h2>How the system keeps research reliable</h2><p>The AI helps research and write the report, but the application controls the evidence, validates the results, and keeps the final report tied to real sources.</p></header>
        <div className="decision-grid">{decisions.map(([heading, copy], index) => <article key={heading}><span>0{index + 1}</span><h3>{heading}</h3><p>{copy}</p></article>)}</div>
      </section>

      <section className="project-section reliability-section" id="reliability">
        <header className="project-section-heading"><p className="overline">04 · RELIABILITY</p><h2>What happens when research fails</h2><p>The system does not hide errors. If a search or research task fails, successful work can still continue when it is safe to do so, and the final result shows what failed.</p></header>
        <div className="reliability-list">{reliability.map(([heading, copy]) => <article key={heading}><h3>{heading}</h3><p>{copy}</p></article>)}</div>
      </section>

      <section className="project-section stack-section" id="stack">
        <p className="overline">05 · TECHNOLOGY STACK</p>
        <div><strong>Frontend</strong><span>React · TypeScript</span></div><div><strong>Backend</strong><span>Python · FastAPI · Pydantic · asyncio</span></div><div><strong>AI &amp; Search</strong><span>OpenAI Structured Outputs · Tavily Basic Search</span></div><div><strong>Deployment</strong><span>Docker · Nginx · Ubuntu VPS · health checks · CORS · rate limiting</span></div>
      </section>

      <section className="project-repository" id="repository"><div><p className="overline">INSPECT THE IMPLEMENTATION</p><h2>See how it was built</h2><p>Explore the backend code, tests, and architecture behind the Research Agent.</p></div><a className="primary-button" href={repositoryUrl} target="_blank" rel="noopener noreferrer">View GitHub Repository</a></section>
      <footer className="project-footer"><div><strong>marvinjb.dev</strong><span>AI engineering, projects, and field notes.</span></div><div><Link href="/#projects">Selected work</Link><Link href="/#connect">Let&apos;s Connect</Link></div><span>© 2026 Marvin</span></footer>
    </div>
  </main>;
}
