import type { Metadata } from "next";

import { SiteHeader } from "../../SiteHeader";
import { ResearchDemo } from "./ResearchDemo";

const title = "Research Agent — Live Demo | Marvin";
const description =
  "Ask one question and receive a source-grounded report from a bounded multi-agent research workflow.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "https://marvinjb.dev/demo/research" },
  openGraph: { title, description, type: "website", images: [] },
  twitter: { card: "summary", title, description, images: [] },
};

export default function ResearchDemoPage() {
  return (
    <main id="top">
      <SiteHeader />

      <aside className="sidebar demo-sidebar" aria-label="Research demo">
        <div className="side-group">
          <p>DEMO</p>
          <a href="#overview"><span>01</span> Overview</a>
          <a href="#research"><span>02</span> Research</a>
          <a href="#report"><span>03</span> Report</a>
          <a href="#project"><span>04</span> Architecture</a>
        </div>
        <div className="side-group topics">
          <p>PROJECT</p>
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a href="/#projects">Selected work <span>›</span></a>
          <a href="https://github.com/marvinjbb/research-agent" target="_blank" rel="noreferrer">
            Backend repository <span>↗</span>
          </a>
        </div>
        <div className="side-help">
          <strong>Bounded research</strong>
          <p>One question. A plan of 2–5 focused workers. One cited report.</p>
          <a href="#research">Start researching</a>
        </div>
      </aside>

      <div className="page-content demo-page research-page">
        <section className="map-section demo-hero" id="overview">
          <p className="overline">LIVE DEMO · MULTI-AGENT RESEARCH</p>
          <h1>From one question to a grounded report.</h1>
          <p className="lead">
            The system analyzes your question, creates a bounded research plan,
            assigns focused workers, searches the web, grounds every factual claim,
            and synthesizes the validated evidence into a cited report.
          </p>
          <nav className="question-map research-flow" aria-label="Research workflow">
            {[
              ["01", "Question", "User submits a research question and selects the research depth."],
              ["02", "Research Plan", "The planner breaks the question into focused research assignments."],
              ["03", "2–5 Workers", "Independent workers research their assignments in parallel using web search."],
              ["04", "Evidence", "Findings are grounded to validated source evidence and citations."],
              ["05", "Synthesis", "Results are combined, compared, and checked for conflicts and uncertainty."],
              ["06", "Final Report", "A grounded research report is returned with findings, guidance, and sources."],
            ].map(([number, label, description]) => (
              <div key={label}>
                <span>{number}</span>
                <strong>{label}</strong>
                <p>{description}</p>
                <i>→</i>
              </div>
            ))}
          </nav>
        </section>

        <section className="content-section demo-workspace" id="research">
          <p className="overline">01 · RESEARCH QUESTION</p>
          <h2>What should the team investigate?</h2>
          <p className="section-intro">
            Quick keeps the plan focused; Deep asks the planner for broader coverage.
            The orchestrator—not the browser—chooses between two and five workers.
          </p>
          <ResearchDemo />
        </section>

        <section className="content-section" id="project">
          <p className="overline">PROJECT · HOW IT WORKS</p>
          <h2>Grounding is an application rule.</h2>
          <p className="section-intro">
            React/TypeScript → FastAPI → Research Planner → 2–5 Parallel Workers →
            Tavily → Grounded Evidence → Aggregation → OpenAI Synthesis → Cited Report
          </p>
          <div className="card-list architecture-list">
            {[
              ["BOUND", "2–5 parallel workers", "The planner assigns focused responsibilities; async execution stays bounded inside one Python service."],
              ["EVID", "Application-owned evidence IDs", "Models select immutable IDs while application code resolves exact evidence, sources, claims, and uncertainties."],
              ["FAIL", "Ordered partial success", "Successful grounded results continue to synthesis when one worker fails; failed-worker metadata stays visible."],
              ["AGGR", "Deterministic aggregation", "Identical URLs and exact-normalized claims are combined without embeddings or fuzzy semantic merging."],
              ["BOUND", "Provider boundaries", "Tavily and OpenAI adapters sit behind application-owned interfaces, keeping SDK calls outside workflow logic."],
              ["CITE", "Strict citation grounding", "Unknown claims, evidence IDs, sources, and unsupported factual statements fail validation before the report is returned."],
            ].map(([icon, heading, copy]) => (
              <article className="info-card project static-summary" key={heading}>
                <div className="card-icon">{icon}</div>
                <div><p>ENGINEERING DECISION</p><h3>{heading}</h3><span>{copy}</span></div>
              </article>
            ))}
          </div>
        </section>

        <footer>
          <div><strong>marvinjb.dev</strong><span>AI engineering, projects, and field notes.</span></div>
          <div>
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href="/#projects">Selected work</a>
            <a href="https://github.com/marvinjbb/research-agent">View Backend Repository</a>
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href="/#connect">Let&apos;s Connect</a>
          </div>
          <span>© 2026 Marvin</span>
        </footer>
      </div>
    </main>
  );
}
