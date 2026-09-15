import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "../../SiteHeader";
import { ExtractionDemo } from "./ExtractionDemo";

const repositoryUrl = "https://github.com/marvinjbb/extraction-agent";
const title = "Extraction Agent — Live Demo | Marvin";
const description = "Upload an invoice, turn it into structured data, and ask questions in plain English.";

export const metadata: Metadata = {
  title, description,
  alternates: { canonical: "https://marvinjb.dev/demo/extraction" },
  openGraph: { title, description, type: "website", images: [] },
  twitter: { card: "summary", title, description, images: [] },
};

const proof = [
  ["Multimodal input", "PDF · JPG · PNG"], ["Structured output", "Pydantic validation"],
  ["Document intelligence", "Extraction + Q&A"], ["Production deployment", "FastAPI · Docker · Nginx"],
];
const decisions = [
  ["Input-aware routing", "Text PDFs use direct parsing while scanned PDFs and images follow a bounded vision path."],
  ["One output contract", "Every supported document path ends at the same application-owned Pydantic invoice schema."],
  ["Structured Outputs", "The provider returns schema-constrained data instead of prose that the frontend must interpret."],
  ["Separate Q&A", "Invoice extraction and document questions remain distinct requests with explicit validated inputs."],
];
const reliability = [
  ["File validation", "The browser rejects empty, unsupported, and larger-than-5-MiB files before submission."],
  ["Response validation", "Malformed extraction and Q&A responses do not silently become usable application data."],
  ["Explicit errors", "Upload, extraction, timeout, network, and document-question failures stay visible to the user."],
  ["Regression coverage", "Frontend behavior, API handling, document routing, and structured contracts are tested."],
];

export default function ExtractionDemoPage() {
  return <main id="top" className="project-case-study extraction-case-study">
    <SiteHeader />
    <div className="project-page">
      <section className="project-hero" id="overview">
        <div className="project-hero-copy"><p className="overline">LIVE AI SYSTEM · EXTRACTION AGENT</p><h1>Turn unstructured invoices into validated data.</h1><p className="lead">Upload a PDF or image of an invoice. The AI finds the vendor, dates, totals, and line items, checks the result against a fixed format, and lets you ask questions about it.</p><div className="project-hero-actions"><a className="primary-button" href="#upload">Try the live demo</a><a className="secondary-button" href={repositoryUrl} target="_blank" rel="noopener noreferrer">View backend repository ↗</a></div></div>
        <div className="project-live-mark" aria-label="Live system"><span aria-hidden="true" /><strong>LIVE</strong><small>PUBLIC DEMO</small></div>
      </section>
      <div className="project-proof" aria-label="Extraction Agent system properties">{proof.map(([label, value], index) => <div key={label}><span>0{index + 1}</span><small>{label}</small><strong>{value}</strong></div>)}</div>
      <nav className="project-nav" aria-label="Extraction Agent project navigation"><a href="#upload">Demo</a><a href="#project">How it works</a><a href="#engineering">Engineering</a><a href="#reliability">Reliability</a><a href={repositoryUrl} target="_blank" rel="noopener noreferrer">Repository ↗</a></nav>

      <section className="project-section project-demo-section" id="upload">
        <header className="project-section-heading"><p className="overline">01 · LIVE DEMO</p><h2>Upload one invoice. Inspect structured data.</h2><p>Use a PDF, scanned PDF, JPG, or PNG up to 5 MiB. The frontend does not store your file.</p></header>
        <ol className="demo-steps" aria-label="Extraction demo steps"><li><span>01</span>Upload invoice</li><li><span>02</span>Extract data</li><li><span>03</span>Inspect Table / JSON</li><li><span>04</span>Ask questions</li></ol>
        <ExtractionDemo />
      </section>

      <section className="project-section" id="project">
        <header className="project-section-heading"><p className="overline">02 · HOW IT WORKS</p><h2>One interface, two document-reading paths.</h2><p>Input routing changes how the document is read; every path converges on one validated invoice contract.</p></header>
        <div className="extraction-system-map" aria-label="Extraction Agent architecture"><div className="system-node"><span>INPUT</span><strong>PDF / Image</strong></div><i aria-hidden="true">→</i><div className="system-node"><span>ROUTE</span><strong>Input routing</strong></div><i aria-hidden="true">→</i><div className="extraction-paths"><div><span>TEXT</span><strong>pypdf</strong></div><div><span>VISION</span><strong>Image path</strong></div></div><i aria-hidden="true">→</i><div className="system-node"><span>EXTRACT</span><strong>OpenAI Structured Outputs</strong></div><i aria-hidden="true">→</i><div className="system-node"><span>VALIDATE</span><strong>Pydantic</strong></div><i aria-hidden="true">→</i><div className="system-node system-node-output"><span>OUTPUT</span><strong>Structured invoice</strong><b aria-hidden="true">↓</b><strong>Document Q&amp;A</strong></div></div>
      </section>

      <section className="project-section" id="engineering"><header className="project-section-heading"><p className="overline">03 · ENGINEERING DECISIONS</p><h2>Different inputs, one dependable result shape.</h2></header><div className="decision-grid">{decisions.map(([heading, copy], index) => <article key={heading}><span>0{index + 1}</span><h3>{heading}</h3><p>{copy}</p></article>)}</div></section>
      <section className="project-section reliability-section" id="reliability"><header className="project-section-heading"><p className="overline">04 · RELIABILITY</p><h2>Invalid input and output fail clearly.</h2><p>Validation protects both sides of the provider call, and errors remain actionable in the interface.</p></header><div className="reliability-list">{reliability.map(([heading, copy]) => <article key={heading}><h3>{heading}</h3><p>{copy}</p></article>)}</div></section>
      <section className="project-section stack-section" id="stack"><p className="overline">05 · TECHNOLOGY STACK</p><div><strong>Interface</strong><span>React · TypeScript</span></div><div><strong>Application</strong><span>Python · FastAPI · Pydantic · pypdf</span></div><div><strong>AI</strong><span>OpenAI Structured Outputs · multimodal vision</span></div><div><strong>Production</strong><span>Docker · Nginx · Ubuntu VPS · HTTPS · health checks</span></div></section>
      <section className="project-repository" id="repository"><div><p className="overline">INSPECT THE IMPLEMENTATION</p><h2>See the routing, schemas, tests, and deployment design.</h2></div><a className="primary-button" href={repositoryUrl} target="_blank" rel="noopener noreferrer">View backend repository ↗</a></section>
      <footer className="project-footer"><div><strong>marvinjb.dev</strong><span>AI engineering, projects, and field notes.</span></div><div><Link href="/#projects">Selected work</Link><Link href="/#connect">Let&apos;s Connect</Link></div><span>© 2026 Marvin</span></footer>
    </div>
  </main>;
}
