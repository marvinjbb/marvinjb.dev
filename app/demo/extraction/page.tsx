import type { Metadata } from "next";

import { SiteHeader } from "../../SiteHeader";
import { ExtractionDemo } from "./ExtractionDemo";

const title = "Extraction Agent — Live Demo | Marvin";
const description =
  "Upload an invoice, turn it into structured data, and ask questions in plain English.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "https://marvinjb.dev/demo/extraction" },
  openGraph: { title, description, type: "website", images: [] },
  twitter: { card: "summary", title, description, images: [] },
};

export default function ExtractionDemoPage() {
  return (
    <main id="top">
      <SiteHeader />

      <aside className="sidebar demo-sidebar" aria-label="Extraction demo">
        <div className="side-group">
          <p>DEMO</p>
          <a href="#overview"><span>01</span> Overview</a>
          <a href="#upload"><span>02</span> Upload</a>
          <a href="#results"><span>03</span> Results</a>
          <a href="#project"><span>04</span> Project</a>
        </div>
        <div className="side-group topics">
          <p>PROJECT</p>
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a href="/#projects">Selected work <span>›</span></a>
          <a
            href="https://github.com/marvinjbb/extraction-agent"
            target="_blank"
            rel="noreferrer"
          >
            Backend repository <span>↗</span>
          </a>
        </div>
        <div className="side-help">
          <strong>Live project</strong>
          <p>One PDF, scanned PDF, JPG, or PNG invoice, up to 5 MiB.</p>
          <a href="#upload">Try the demo</a>
        </div>
      </aside>

      <div className="page-content demo-page">
        <section className="map-section demo-hero" id="overview">
          <p className="overline">LIVE DEMO · DOCUMENT EXTRACTION</p>
          <h1>Turn invoices into answers.</h1>
          <p className="lead">
            Upload an invoice and let AI extract the important details into structured
            data. Then ask questions about it in plain English—find totals, vendors,
            line items, dates, or get a quick summary without digging through the
            document yourself.
          </p>
          <nav className="question-map demo-facts" aria-label="Demo scope">
            <div><span>01</span><strong>Upload</strong><i>Add a PDF, JPG, PNG, or scanned invoice</i></div>
            <div><span>02</span><strong>AI Extracts</strong><i>AI reads and structures the invoice</i></div>
            <div><span>03</span><strong>Explore</strong><i>Review extracted information in Table or JSON</i></div>
            <div><span>04</span><strong>Ask</strong><i>Ask questions about the invoice in plain English</i></div>
          </nav>
        </section>

        <section className="content-section demo-workspace" id="upload">
          <p className="overline">01 · UPLOAD</p>
          <h2>Choose an invoice.</h2>
          <p className="section-intro">
            Upload one PDF, scanned PDF, JPG, or PNG invoice up to 5 MiB. The
            frontend does not store your file.
          </p>
          <ExtractionDemo />
        </section>

        <section className="content-section" id="project">
          <p className="overline">PROJECT · HOW IT WORKS</p>
          <h2>One interface. Two document paths.</h2>
          <p className="section-intro">
            The React demo sends files to a Dockerized FastAPI service through
            api.marvinjb.dev. Text PDFs use pypdf; scanned PDFs and images use a
            bounded vision route. OpenAI structured extraction finishes at the same
            Pydantic invoice schema before results reach the browser.
          </p>
          <div className="card-list">
            <article className="info-card project">
              <div className="card-icon">API</div>
              <div><p>DELIVERY</p><h3>FastAPI · Docker · Nginx · VPS</h3><span>A separately deployable backend keeps provider credentials and document processing outside the portfolio frontend.</span></div>
              <i>→</i>
            </article>
            <article className="info-card project">
              <div className="card-icon">AI</div>
              <div><p>VALIDATED OUTPUT</p><h3>OpenAI · vision routing · Pydantic</h3><span>Every supported input follows the appropriate reading path and ends at one application-owned structured invoice contract.</span></div>
              <i>→</i>
            </article>
          </div>
        </section>

        <footer>
          <div>
            <strong>marvinjb.dev</strong>
            <span>AI engineering, projects, and field notes.</span>
          </div>
          <div>
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href="/#projects">Selected work</a>
            <a href="https://github.com/marvinjbb/extraction-agent">View Backend Repository</a>
            <a href="mailto:jbmarvin21@gmail.com">Hire Marvin</a>
          </div>
          <span>© 2026 Marvin</span>
        </footer>
      </div>
    </main>
  );
}
