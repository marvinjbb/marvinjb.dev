import type { Metadata } from "next";
import Link from "next/link";

import { SiteHeader } from "../../SiteHeader";
import { IncidentDemo } from "./IncidentDemo";

const title = "Incident Investigation Agent — Live Demo | Marvin";
const description = "Trigger a controlled production incident, inspect an evidence-backed AI investigation, and approve a bounded remediation.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "https://marvinjb.dev/demo/incident-investigation" },
  openGraph: { title, description, type: "website", images: [] },
  twitter: { card: "summary", title, description, images: [] },
};

const proof = [
  ["Restricted diagnostics", "Eight allowlisted tools"],
  ["Evidence grounded", "Exact citation validation"],
  ["Human controlled", "Approval before execution"],
  ["Production deployed", "FastAPI · PostgreSQL · Docker"],
];

const safety = [
  ["Progressive tool selection", "The investigator chooses only the bounded diagnostics relevant to the incident instead of querying every source."],
  ["Strict evidence grounding", "Every cited ID must exist in the evidence collected during that investigation. Unknown evidence and runbooks fail validation."],
  ["Human approval boundary", "Investigation can recommend an action, but only an explicit session-owned approval can authorize execution."],
  ["Safe execution", "Allowlisted actions revalidate ownership and live conditions immediately before mutation, then verify recovery afterward."],
  ["Public demo controls", "Session isolation, bounded lifetimes, request limits, and automatic recovery keep the synthetic lab constrained."],
  ["Prompt boundary", "Tools accept typed identifiers—not arbitrary SQL, shell commands, filesystem paths, or infrastructure targets."],
];

export default function IncidentInvestigationPage() {
  return (
    <main id="top" className="project-case-study incident-case-study">
      <SiteHeader />
      <div className="project-page">
        <section className="project-hero incident-project-hero" id="overview">
          <div className="project-hero-copy">
            <p className="overline">LIVE AI SYSTEM · INCIDENT INVESTIGATION AGENT</p>
            <h1>Investigate failure. Prove the cause. Approve the fix.</h1>
            <p className="lead">Trigger a safe demo failure, let the AI investigate what happened, inspect the evidence behind its conclusion, and decide whether to approve the recommended fix. Nothing changes without human approval.</p>
            <div className="project-hero-actions">
              <a className="primary-button" href="#incident-demo">Run a controlled incident</a>
              <a className="secondary-button" href="#architecture">Inspect the architecture</a>
            </div>
          </div>
          <div className="project-live-mark" aria-label="Live production system"><span aria-hidden="true" /><strong>LIVE</strong><small>CONTROLLED LAB</small></div>
        </section>

        <div className="project-proof" aria-label="Incident Agent system properties">
          {proof.map(([label, value], index) => <div key={label}><span>0{index + 1}</span><small>{label}</small><strong>{value}</strong></div>)}
        </div>
        <nav className="project-nav" aria-label="Incident Agent project navigation">
          <a href="#incident-demo">Live demo</a><a href="#architecture">Architecture</a><a href="#safety">Safety</a><a href="#production">Production</a>
        </nav>

        <section className="project-section project-demo-section" id="incident-demo">
          <header className="project-section-heading">
            <p className="overline">01 · CONTROLLED INCIDENT LAB</p>
            <h2>Watch evidence—not intuition—drive the response.</h2>
            <p>Choose one genuine synthetic failure. The investigation normally takes 15–30 seconds while the AI selects restricted diagnostic tools; the result appears only after the backend validates its report.</p>
          </header>
          <IncidentDemo />
        </section>

        <section className="project-section" id="architecture">
          <header className="project-section-heading">
            <p className="overline">02 · SYSTEM ARCHITECTURE</p>
            <h2>Read-only diagnosis first. Controlled mutation last.</h2>
            <p>The model never receives unrestricted database, shell, filesystem, or infrastructure access.</p>
          </header>
          <div className="incident-system-map" aria-label="Incident Investigation Agent architecture">
            <div className="system-node"><span>DETECT</span><strong>Alert / incident</strong></div><i aria-hidden="true">→</i>
            <div className="system-node"><span>REASON</span><strong>AI investigator</strong></div><i aria-hidden="true">→</i>
            <div className="incident-tool-node"><span>RESTRICTED TOOLS</span><div><strong>PostgreSQL</strong><strong>App logs</strong><strong>Pool state</strong><strong>Deployments</strong><strong>Runbooks</strong></div></div><i aria-hidden="true">→</i>
            <div className="system-node"><span>GROUND</span><strong>Evidence-backed report</strong></div><i aria-hidden="true">→</i>
            <div className="system-node"><span>APPROVE</span><strong>Human decision</strong></div><i aria-hidden="true">→</i>
            <div className="system-node system-node-output"><span>VERIFY</span><strong>Allowlisted remediation</strong></div>
          </div>
        </section>

        <section className="project-section" id="safety">
          <header className="project-section-heading">
            <p className="overline">03 · ENGINEERING + SAFETY</p>
            <h2>The agent can investigate broadly without acting broadly.</h2>
          </header>
          <div className="decision-grid incident-safety-grid">
            {safety.map(([heading, copy], index) => <article key={heading}><span>{String(index + 1).padStart(2, "0")}</span><h3>{heading}</h3><p>{copy}</p></article>)}
          </div>
        </section>

        <section className="project-section reliability-section" id="production">
          <header className="project-section-heading">
            <p className="overline">04 · PRODUCTION BOUNDARIES</p>
            <h2>A real lab with deliberately narrow permissions.</h2>
            <p>FastAPI and PostgreSQL run as isolated Docker services behind Nginx and HTTPS. The public workflow is rate-limited, session-owned, single-worker, and automatically recovers abandoned incidents after 120 seconds.</p>
          </header>
          <div className="reliability-list">
            <article><h3>No arbitrary administration</h3><p>No caller-supplied SQL, PIDs, deployment versions, shell commands, or file paths.</p></article>
            <article><h3>TOCTOU revalidation</h3><p>Ownership and live technical preconditions are checked again immediately before execution.</p></article>
            <article><h3>Post-action proof</h3><p>Execution is not success until the workload, incident state, and scenario-specific recovery condition validate.</p></article>
            <article><h3>Honest scaling boundary</h3><p>One Uvicorn worker owns the genuine process-local pool experiment; horizontal scaling requires a dedicated lab coordinator.</p></article>
          </div>
        </section>

        <footer className="project-footer"><div><strong>marvinjb.dev</strong><span>AI engineering, projects, and field notes.</span></div><div><Link href="/#projects">Selected work</Link><Link href="/#connect">Let&apos;s Connect</Link></div><span>© 2026 Marvin</span></footer>
      </div>
    </main>
  );
}
