import type { Metadata } from "next";
/* eslint-disable @next/next/no-html-link-for-pages -- Vinext production navigation requires native anchors for these homepage hash links. */
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
  ["PDF & image input", "Accepts PDF, JPG, and PNG invoices"], ["Validated structured data", "Extracts invoice fields and checks the result"],
  ["Invoice Q&A", "Lets users ask questions about the extracted document"], ["Production deployed", "FastAPI · Docker · Nginx"],
];
const decisions = [
  ["Chooses the right reading method", "Text PDFs are read directly, while scanned PDFs and images use the image-processing path."],
  ["Returns the same invoice format", "Every supported document ends as the same structured invoice result."],
  ["AI returns structured data", "The model returns specific invoice fields instead of free-form text."],
  ["Invoice Q&A is separate", "Extracting the invoice and asking questions about it are handled as separate requests."],
];
const reliability = [
  ["Checks files before upload", "Empty, unsupported, or oversized files are rejected."],
  ["Checks AI results", "Invalid extraction or Q&A responses are not shown as valid data."],
  ["Shows clear errors", "Upload, extraction, timeout, network, and question failures stay visible to the user."],
  ["Tested for regressions", "File handling, API behavior, document routing, and structured outputs are covered by tests."],
];

export default function ExtractionDemoPage() {
  return <main id="top" className="project-case-study extraction-case-study">
    <SiteHeader />
    <div className="project-page">
      <section className="project-hero" id="overview">
        <div className="project-hero-copy"><p className="overline">LIVE AI SYSTEM · EXTRACTION AGENT</p><h1>Turn unstructured invoices into validated data.</h1><p className="lead">Upload a PDF or image of an invoice. The AI extracts the vendor, dates, totals, and line items, validates the result, and lets you ask questions about the document.</p><div className="project-hero-actions"><a className="primary-button" href="#upload">Try the live demo</a><a className="secondary-button" href={repositoryUrl} target="_blank" rel="noopener noreferrer">View backend repository ↗</a></div></div>
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
        <header className="project-section-heading"><p className="overline">02 · HOW IT WORKS</p><h2>The AI chooses the right way to read each invoice.</h2><p>Text-based PDFs are read directly. Scanned PDFs and images are processed visually. Both paths produce the same validated invoice data.</p></header>
        <div className="extraction-system-map" aria-label="Extraction Agent architecture"><div className="system-node"><span>INPUT</span><strong>PDF or image</strong></div><i aria-hidden="true">→</i><div className="system-node"><span>DETECT</span><strong>Detect document type</strong></div><i aria-hidden="true">→</i><div className="system-node"><span>READ</span><strong>Read text or image</strong></div><i aria-hidden="true">→</i><div className="system-node"><span>EXTRACT</span><strong>Extract invoice details</strong></div><i aria-hidden="true">→</i><div className="system-node"><span>VALIDATE</span><strong>Validate the result</strong></div><i aria-hidden="true">→</i><div className="system-node system-node-output"><span>OUTPUT</span><strong>Invoice data + Q&amp;A</strong></div></div>
      </section>

      <section className="project-section" id="engineering"><header className="project-section-heading"><p className="overline">03 · ENGINEERING DECISIONS</p><h2>How the extraction stays consistent</h2><p>The system can read different invoice formats, but every document is converted into the same validated invoice structure before it is returned.</p></header><div className="decision-grid">{decisions.map(([heading, copy], index) => <article key={heading}><span>0{index + 1}</span><h3>{heading}</h3><p>{copy}</p></article>)}</div></section>
      <section className="project-section reliability-section" id="reliability"><header className="project-section-heading"><p className="overline">04 · RELIABILITY</p><h2>What happens when something goes wrong</h2><p>The system checks files before processing them, validates the AI result before showing it, and gives the user a clear error when something fails.</p></header><div className="reliability-list">{reliability.map(([heading, copy]) => <article key={heading}><h3>{heading}</h3><p>{copy}</p></article>)}</div></section>
      <section className="project-section stack-section" id="stack"><p className="overline">05 · TECHNOLOGY STACK</p><div><strong>Frontend</strong><span>React · TypeScript</span></div><div><strong>Backend</strong><span>Python · FastAPI · Pydantic · pypdf</span></div><div><strong>AI &amp; Document Processing</strong><span>OpenAI Structured Outputs · multimodal vision</span></div><div><strong>Deployment</strong><span>Docker · Nginx · Ubuntu VPS · HTTPS · health checks</span></div></section>
      <section className="project-repository" id="repository"><div><p className="overline">INSPECT THE IMPLEMENTATION</p><h2>See how it was built</h2><p>Explore the API flow, validation, tests, and deployment setup behind the Extraction Agent.</p></div><a className="primary-button" href={repositoryUrl} target="_blank" rel="noopener noreferrer">View GitHub Repository</a></section>
      <footer className="project-footer"><div><strong>marvinjb.dev</strong><span>AI engineering, projects, and field notes.</span></div><div><a href="/#projects">Selected work</a><a href="/#connect">Let&apos;s Connect</a></div><span>© 2026 Marvin</span></footer>
    </div>
  </main>;
}
