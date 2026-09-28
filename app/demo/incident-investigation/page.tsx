import type { Metadata } from "next";
/* eslint-disable @next/next/no-html-link-for-pages -- Vinext production navigation requires native anchors for these homepage hash links. */

import { SiteHeader } from "../../SiteHeader";
import { IncidentDemo } from "./IncidentDemo";

const repositoryUrl = "https://github.com/marvinjbb/incident-investigation-agent";
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
  ["Create incident", "Choose one of the three controlled failure scenarios."],
  ["Investigate", "The AI uses approved diagnostic tools to gather evidence."],
  ["Find root cause", "The system produces a report backed by real evidence."],
  ["Approve fix", "A human reviews and approves the recommended action."],
  ["Fix & verify", "The system performs the approved action and confirms recovery."],
];

const safety = [
  ["Uses approved tools only", "The AI can only use the diagnostic tools built into the system."],
  ["Backs conclusions with evidence", "The AI must support its findings with evidence collected during the investigation."],
  ["Human approval before fixes", "The AI can recommend an action, but a person must approve it first."],
  ["Rechecks before making changes", "Before a fix runs, the system confirms the action is still safe and valid."],
  ["Public demo limits", "Sessions, time limits, and request limits help keep the demo controlled."],
  ["No unrestricted commands", "The AI cannot run arbitrary SQL, shell commands, file paths, or infrastructure commands."],
];

const diagnosticCapabilities = [
  "Incident details",
  "Incident timeline",
  "Application logs",
  "Database blocking",
  "Database connection usage",
  "Application connection pool",
  "Recent deployments",
  "Approved runbook",
];

const process = [
  ["Incident happens", "A controlled problem is created."],
  ["AI investigates", "The AI looks at approved system information."],
  ["AI gathers evidence", "It checks things like database activity, logs, connection pool state, deployments, and runbooks."],
  ["AI explains the cause", "It produces a report showing what likely caused the problem and the evidence behind it."],
  ["Human reviews the fix", "The system recommends a safe action, but does nothing yet."],
  ["Human approves", "A person decides whether the action should run."],
  ["System fixes & verifies", "The approved action runs, then the system checks that the problem is actually resolved."],
];

const architecture = [
  ["Browser + demo", "The portfolio presents the three controlled scenarios."],
  ["Incident API", "FastAPI receives the session-bound request behind Nginx."],
  ["Approved tools", "The AI can inspect PostgreSQL, application state, logs, deployments, and runbooks."],
  ["AI investigation", "OpenAI selects bounded diagnostic tools and produces an evidence-backed report."],
  ["Fix proposal", "The application validates a permitted action against current incident evidence."],
  ["Human approval", "A person approves the proposal before any remediation runs."],
  ["Recovery + audit", "The application rechecks ownership, runs the approved action, verifies recovery, and records the result."],
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
            <p className="lead">Trigger a safe demo failure, let the AI investigate what happened, inspect the evidence behind its conclusion, and decide whether to approve the recommended fix. Nothing changes without human approval. Built from my production database incident-response experience.</p>
            <div className="project-hero-actions">
              <a className="primary-button" href="#live-demo">Start Live Demo ↓</a>
              <a className="secondary-button" href="#how-it-works">How It Works</a>
            </div>
          </div>
          <div className="project-live-mark" aria-label="Live production system"><span aria-hidden="true" /><strong>LIVE</strong><small>CONTROLLED LAB</small></div>
        </section>

        <nav className="project-nav" aria-label="Incident Agent project navigation">
          <a href="#live-demo">Live demo</a><a href="#how-it-works">How it works</a><a href="#safety">Safety</a><a href="#architecture">Architecture</a><a href={repositoryUrl} target="_blank" rel="noopener noreferrer">Repository ↗</a>
        </nav>

        <section className="project-section project-demo-section" id="live-demo">
          <header className="project-section-heading">
            <p className="overline">01 · CONTROLLED INCIDENT LAB</p>
            <h2>Choose an incident to investigate</h2>
            <p>Each scenario creates a safe, controlled failure. The AI investigates it using approved diagnostic tools, shows the evidence behind its conclusion, and asks for human approval before any fix runs.</p>
          </header>
          <IncidentDemo />
        </section>

        <section className="project-section" id="diagnostics" aria-labelledby="incident-capabilities-title">
          <div className="incident-capabilities">
            <div>
              <p className="overline">02 · RESTRICTED DIAGNOSTICS</p>
              <h2 id="incident-capabilities-title">WHAT THE AI CAN INSPECT</h2>
              <p>After you click Run Incident, the AI starts with incident details and chooses from eight approved diagnostic tools.</p>
            </div>
            <ul>
              {diagnosticCapabilities.map((capability) => <li key={capability}>{capability}</li>)}
            </ul>
            <p>The AI can only investigate using these eight approved diagnostic tools. It cannot run arbitrary SQL, shell commands, or infrastructure actions.</p>
          </div>
        </section>

        <section className="project-section" id="how-it-works">
          <header className="project-section-heading">
            <p className="overline">03 · INVESTIGATION PROCESS</p>
            <h2>What happens after you click Run Incident</h2>
            <p>A controlled incident leads to an evidence-backed report and a proposed fix. The application waits for human approval, then verifies recovery after any approved action.</p>
          </header>
          <div className="project-proof incident-workflow-proof" aria-label="Incident Agent workflow">
            {proof.map(([label, value], index) => <div key={label}><span>0{index + 1}</span><small>{label}</small><strong>{value}</strong></div>)}
          </div>
          <div className="incident-system-map" aria-label="Incident investigation and approval sequence">
            {process.map(([heading, copy], index) => (
              <div className={index === process.length - 1 ? "system-node system-node-output" : "system-node"} key={heading}>
                <span>0{index + 1}</span>
                <strong>{heading}</strong>
                <p>{copy}</p>
              </div>
            )).flatMap((node, index) => index === process.length - 1 ? [node] : [node, <i aria-hidden="true" key={`process-arrow-${index}`}>→</i>])}
          </div>
        </section>

        <section className="project-section incident-rationale" id="why">
          <header className="project-section-heading">
            <div>
              <p className="overline">04 · WHY I BUILT THIS</p>
              <h2>Why I built this</h2>
            </div>
            <div className="incident-rationale-copy">
              <p>I come from a production database background, where incident response means gathering evidence, identifying the root cause, choosing a safe next step, and verifying recovery. I built this demo to show how AI could assist that process without giving the model unrestricted access to production systems.</p>
              <p>The public version uses intentionally synthetic PostgreSQL and application failures so the investigation and remediation workflow can be demonstrated safely. The application behavior, AI investigation, evidence validation, human approval, remediation, and recovery checks are real.</p>
            </div>
          </header>
        </section>

        <section className="project-section" id="safety">
          <header className="project-section-heading">
            <p className="overline">05 · ENGINEERING + SAFETY</p>
            <h2>How the AI stays safe</h2>
            <p>The AI can investigate using approved information, but it cannot freely control the system. Its conclusions must be backed by evidence, and any fix requires human approval.</p>
          </header>
          <div className="decision-grid incident-safety-grid">
            {safety.map(([heading, copy], index) => <article key={heading}><span>{String(index + 1).padStart(2, "0")}</span><h3>{heading}</h3><p>{copy}</p></article>)}
          </div>
        </section>

        <section className="project-section" id="architecture">
          <header className="project-section-heading">
            <p className="overline">06 · SYSTEM ARCHITECTURE</p>
            <h2>Production architecture</h2>
            <p>The browser calls the Incident API. The AI uses restricted tools to inspect the controlled lab, while the application owns approval, remediation, and verification.</p>
          </header>
          <div className="incident-system-map" aria-label="Incident Investigation Agent architecture">
            {architecture.map(([heading, copy], index) => (
              <div className={index === architecture.length - 1 ? "system-node system-node-output" : "system-node"} key={heading}>
                <span>0{index + 1}</span>
                <strong>{heading}</strong>
                <p>{copy}</p>
              </div>
            )).flatMap((node, index) => index === architecture.length - 1 ? [node] : [node, <i aria-hidden="true" key={`architecture-arrow-${index}`}>→</i>])}
          </div>
        </section>

        <section className="project-section reliability-section" id="production">
          <header className="project-section-heading">
            <p className="overline">07 · PRODUCTION BOUNDARIES</p>
            <h2>Production safety and limits</h2>
            <p>This is a real deployed system, but it is intentionally restricted so the AI cannot make unsafe or uncontrolled changes.</p>
          </header>
          <div className="reliability-list">
            <article><h3>No unrestricted commands</h3><p>The AI cannot run any SQL, shell command, file path, or deployment action it wants.</p></article>
            <article><h3>Recheck before action</h3><p>Before a fix runs, the system confirms the action is still safe and valid.</p></article>
            <article><h3>Verify the recovery</h3><p>A fix is only successful after the system confirms the incident is resolved.</p></article>
            <article><h3>Controlled public demo</h3><p>The demo uses sessions, rate limits, time limits, and a single worker to keep everything contained.</p></article>
            <article><h3>Audit trail</h3><p>The system records the investigation, approval, action, and verification outcome.</p></article>
          </div>
        </section>

        <section className="project-section stack-section" id="stack">
          <h2 className="overline">08 · TECHNOLOGY STACK</h2>
          <div><strong>Frontend</strong><span>React · TypeScript</span></div>
          <div><strong>Backend</strong><span>Python · FastAPI · PostgreSQL</span></div>
          <div><strong>AI workflow</strong><span>OpenAI tool calling · restricted diagnostics · evidence validation</span></div>
          <div><strong>Deployment</strong><span>Docker · Nginx · Ubuntu VPS · sessions · rate limits · health checks</span></div>
        </section>

        <section className="project-repository" aria-labelledby="incident-repository-title">
          <div>
            <p className="overline">INSPECT THE IMPLEMENTATION</p>
            <h2 id="incident-repository-title">See how it was built</h2>
            <p>Explore the incident workflow, evidence grounding, approval controls, remediation logic, tests, and production deployment.</p>
          </div>
          <a className="primary-button" href={repositoryUrl} target="_blank" rel="noopener noreferrer">View GitHub Repository</a>
        </section>

        <footer className="project-footer"><div><strong>marvinjb.dev</strong><span>AI engineering, projects, and field notes.</span></div><div><a href="/#projects">Selected work</a><a href="/#connect">Let&apos;s Connect</a></div><span>© 2026 Marvin</span></footer>
      </div>
    </main>
  );
}
