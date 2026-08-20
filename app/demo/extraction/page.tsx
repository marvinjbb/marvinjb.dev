import type { Metadata } from "next";

import { SiteHeader } from "../../SiteHeader";
import { ExtractionDemo } from "./ExtractionDemo";

const title = "Document Extraction Agent Demo — Marvin";
const description =
  "Upload a text-based invoice PDF and preview structured extraction results.";

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
          <strong>Focused MVP</strong>
          <p>One text-based invoice PDF, up to 5 MiB. OCR is not included yet.</p>
          <a href="#upload">Try the demo</a>
        </div>
      </aside>

      <div className="page-content demo-page">
        <section className="map-section demo-hero" id="overview">
          <p className="overline">LIVE DEMO · DOCUMENT EXTRACTION</p>
          <h1>Turn an invoice into structured data.</h1>
          <p className="lead">
            Upload one text-based PDF and inspect the invoice fields an extraction
            agent would return. This Phase 2 interface uses a local mocked result;
            backend integration comes next.
          </p>
          <nav className="question-map demo-facts" aria-label="Demo scope">
            <div><span>INPUT</span><strong>Invoice PDF</strong><i>01</i></div>
            <div><span>LIMIT</span><strong>5 MiB</strong><i>02</i></div>
            <div><span>OUTPUT</span><strong>Table + JSON</strong><i>03</i></div>
            <div><span>MODE</span><strong>Local mock</strong><i>04</i></div>
          </nav>
        </section>

        <section className="content-section demo-workspace" id="upload">
          <p className="overline">01 · UPLOAD</p>
          <h2>Choose an invoice.</h2>
          <p className="section-intro">
            Use a PDF with selectable text. Your file stays in this browser during
            this mocked UI phase and is not sent to a backend.
          </p>
          <ExtractionDemo />
        </section>

        <footer>
          <div>
            <strong>marvinjb.dev</strong>
            <span>AI engineering, projects, and field notes.</span>
          </div>
          <div>
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href="/#projects">Selected work</a>
            <a href="https://github.com/marvinjbb/extraction-agent">Backend code</a>
            <a href="mailto:jbmarvin21@gmail.com">Hire Marvin</a>
          </div>
          <span>© 2026 Marvin</span>
        </footer>
      </div>
    </main>
  );
}
