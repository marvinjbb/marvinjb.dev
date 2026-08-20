import type { Metadata } from "next";

import { SiteHeader } from "../../SiteHeader";
import { ExtractionDemo } from "./ExtractionDemo";

const title = "Document Extraction Agent Demo — Marvin";
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
            <div><span>01</span><strong>Upload</strong><i>PDF · JPG · PNG</i></div>
            <div><span>02</span><strong>AI Extracts</strong><i>Invoice details</i></div>
            <div><span>03</span><strong>Explore</strong><i>Table + JSON</i></div>
            <div><span>04</span><strong>Ask</strong><i>Plain English</i></div>
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
