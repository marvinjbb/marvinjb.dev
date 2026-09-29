import type { Metadata } from "next";
/* eslint-disable @next/next/no-html-link-for-pages -- Vinext production navigation requires native anchors. */
import { SiteHeader } from "../../SiteHeader";

const productUrl = "https://marvodyn.com";
const title = "MARVODYN — Product Case Study | Marvin";
const description = "A product-engineering case study about MARVODYN, Marvin's live financial guidance product for immigrants navigating money in America.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "https://marvinjb.dev/products/marvodyn" },
  openGraph: {
    title,
    description,
    type: "website",
    url: "https://marvinjb.dev/products/marvodyn",
    images: [{
      url: "/marvodyn/marvodyn-stacked.png",
      width: 1254,
      height: 1254,
      alt: "MARVODYN logo",
    }],
  },
  twitter: {
    card: "summary",
    title,
    description,
    images: ["/marvodyn/marvodyn-stacked.png"],
  },
};

const proof = [
  ["Status", "Live Product"],
  ["Role", "Founder & Product Engineer"],
  ["Built for", "Immigrants navigating money in America"],
  ["Public experience", "Education · Research · Comparisons"],
];

const responsibilities = [
  ["Product direction", "Define the product's purpose, audience, and priorities around clearer financial navigation."],
  ["Public product", "Build and evolve the experience people use to discover guides and financial-product information."],
  ["Information architecture", "Organize complex financial topics so newcomers can find a practical starting point."],
  ["Research and content systems", "Shape how financial information is researched, qualified, organized, and presented."],
  ["Production operation", "Operate the live product and continue improving its public experience."],
];

const liveAreas = [
  {
    label: "START HERE",
    title: "Beginner financial guides",
    copy: "Entry points for learning how common parts of the U.S. financial system work.",
    topics: ["Credit", "Banking", "Taxes", "Saving"],
  },
  {
    label: "UNDERSTAND",
    title: "Practical financial education",
    copy: "Plain-language guidance organized around decisions newcomers regularly encounter.",
    topics: ["Everyday money", "Documentation", "Students"],
  },
  {
    label: "COMPARE",
    title: "Financial products and options",
    copy: "Comparison content that keeps important requirements, fees, minimums, and qualifications visible.",
    topics: ["Accounts", "Loans", "Investing"],
  },
  {
    label: "EXPAND",
    title: "A broader financial life",
    copy: "Guidance for decisions beyond the first account or credit question.",
    topics: ["Investing", "Loans", "International money"],
  },
];

const trustPrinciples = [
  ["Educate before directing", "Explain the underlying financial concept so a reader can understand the decision, not just see a product name."],
  ["Keep qualifications visible", "Terms such as “up to,” regional availability, fee waivers, and documentation conditions should remain attached to the claim."],
  ["Acknowledge change", "Financial-product requirements can change and vary by institution or location, so readers are encouraged to confirm current details."],
  ["Avoid guaranteed outcomes", "General information and comparisons do not guarantee approval, eligibility, or a particular financial result."],
  ["Separate information from advice", "The public experience is educational and does not present general content as individualized financial advice."],
];

export default function MarvodynProductPage() {
  return <main id="top" className="project-case-study marvodyn-case-study">
    <SiteHeader />
    <div className="project-page">
      <section className="project-hero marvodyn-project-hero" id="overview">
        <div className="project-hero-copy">
          <p className="overline">FOUNDER-BUILT PRODUCT <span className="marvodyn-mobile-live-status">LIVE PRODUCT</span></p>
          {/* eslint-disable-next-line @next/next/no-img-element -- supplied transparent brand asset */}
          <img className="marvodyn-hero-logo" src="/marvodyn/marvodyn-horizontal.png" alt="MARVODYN logo" width="2172" height="724" />
          <h1>Financial guidance for immigrants navigating money in America.</h1>
          <p className="lead">MARVODYN is an independently operated, live product that brings together beginner education, financial-product research, and comparison content across the decisions newcomers face in the United States.</p>
          <p className="marvodyn-hero-role"><strong>Founder &amp; Product Engineer</strong><span>Product direction · public experience · production operation</span></p>
          <div className="project-hero-actions">
            <a className="primary-button" href={productUrl} target="_blank" rel="noopener noreferrer">Visit MARVODYN ↗</a>
            <a className="secondary-button" href="/#projects">Back to Portfolio</a>
          </div>
        </div>
        <div className="marvodyn-live-mark" aria-label="MARVODYN is a live product"><span aria-hidden="true" /><strong>LIVE</strong><small>INDEPENDENT PRODUCT</small></div>
      </section>

      <div className="project-proof" aria-label="MARVODYN product facts">
        {proof.map(([label, value], index) => <div key={label}><span>0{index + 1}</span><small>{label}</small><strong>{value}</strong></div>)}
      </div>

      <nav className="project-nav" aria-label="MARVODYN case study navigation">
        <a href="#problem">Problem</a><a href="#role">My Role</a><a href="#live-product">What&apos;s Live</a><a href="#trust">Trust</a><a href={productUrl} target="_blank" rel="noopener noreferrer">Visit Product ↗</a>
      </nav>

      <section className="project-section" id="problem">
        <header className="project-section-heading"><p className="overline">01 · THE PROBLEM</p><h2>A new financial system comes with unfamiliar rules.</h2><p>People entering the U.S. financial system may need to understand banking, credit, taxes, saving, investing, borrowing, documentation requirements, and international money movement—often without guidance designed around that transition.</p></header>
        <div className="marvodyn-problem-map" aria-label="Financial topics MARVODYN helps readers understand">
          {['Banking', 'Credit', 'Taxes', 'Saving', 'Investing', 'Borrowing', 'Documentation', 'International money'].map((topic, index) => <span key={topic}><b>{String(index + 1).padStart(2, '0')}</b>{topic}</span>)}
        </div>
      </section>

      <section className="project-section marvodyn-origin-section" id="origin">
        <header className="project-section-heading"><p className="overline">02 · WHY I BUILT IT</p><h2>The product grew from a problem I experienced myself.</h2><p>As an immigrant navigating the American financial system, I found clear, relevant information difficult to locate and piece together. MARVODYN began as a way to create the kind of understandable starting point I had been looking for.</p></header>
        <blockquote>Build a clearer path into the financial system—without pretending that one answer fits every person.</blockquote>
      </section>

      <section className="project-section" id="role">
        <header className="project-section-heading"><p className="overline">03 · MY ROLE</p><h2>Founder &amp; Product Engineer</h2><p>I own the product direction and the work of turning a broad user problem into a live, useful public experience.</p></header>
        <div className="marvodyn-role-grid">{responsibilities.map(([heading, copy], index) => <article key={heading}><span>0{index + 1}</span><h3>{heading}</h3><p>{copy}</p></article>)}</div>
      </section>

      <section className="project-section" id="live-product">
        <header className="project-section-heading"><p className="overline">04 · WHAT&apos;S LIVE</p><h2>More than a single landing page.</h2><p>The public product gives readers multiple ways to start learning, understand unfamiliar topics, and compare financial options while keeping important qualifications visible.</p></header>
        <div className="marvodyn-live-grid">{liveAreas.map((area) => <article key={area.label}><span>{area.label}</span><h3>{area.title}</h3><p>{area.copy}</p><ul>{area.topics.map((topic) => <li key={topic}>{topic}</li>)}</ul></article>)}</div>
        <div className="marvodyn-case-journey" aria-label="Conceptual MARVODYN product journey"><strong>Learn</strong><i aria-hidden="true">→</i><strong>Compare</strong><i aria-hidden="true">→</i><strong>Make a more informed decision</strong></div>
      </section>

      <section className="project-section" id="information">
        <header className="project-section-heading"><p className="overline">05 · PRODUCT INFORMATION PHILOSOPHY</p><h2>Financial details need their qualifications.</h2><p>Requirements, fees, minimums, availability, and documentation can differ between institutions, locations, products, and individual circumstances. MARVODYN uses qualified language and encourages readers to confirm details that can change.</p></header>
        <div className="marvodyn-qualification-example">
          <div><span>INCOMPLETE</span><s>Available to everyone</s></div>
          <i aria-hidden="true">→</i>
          <div><span>QUALIFIED</span><strong>Availability and requirements may vary. Confirm current details with the provider.</strong></div>
        </div>
        <p className="project-section-note">This is a public product and content principle. It is not a claim that an automated eligibility or verification system currently enforces these rules.</p>
      </section>

      <section className="project-section" id="trust">
        <header className="project-section-heading"><p className="overline">06 · BUILDING TRUST</p><h2>Clarity matters when the subject is money.</h2><p>The product is designed to help readers understand their options while remaining honest about changing requirements, individual circumstances, and the limits of general information.</p></header>
        <div className="marvodyn-trust-list">{trustPrinciples.map(([heading, copy]) => <article key={heading}><h3>{heading}</h3><p>{copy}</p></article>)}</div>
      </section>

      <section className="project-section marvodyn-live-today" id="evolution">
        <header className="project-section-heading"><p className="overline">07 · PRODUCT EVOLUTION</p><h2>Live today</h2><p>This case study describes the product that is publicly available now. It does not present unconfirmed roadmap ideas as finished features.</p></header>
        <ul><li>Financial education</li><li>Beginner guides</li><li>Product research and comparisons</li><li>Immigrant-focused financial navigation</li></ul>
      </section>

      <section className="project-repository marvodyn-final-cta" id="visit"><div><p className="overline">MARVODYN IS LIVE</p><h2>Explore the public product.</h2><p>Visit MARVODYN to see the current guides, financial topics, and comparison content available to readers.</p></div><div className="marvodyn-final-actions"><a className="primary-button" href={productUrl} target="_blank" rel="noopener noreferrer">Visit MARVODYN ↗</a><a href="/#projects">Back to Portfolio</a></div></section>

      <footer className="project-footer"><div><strong>marvinjb.dev</strong><span>AI engineering, products, and production systems.</span></div><div><a href="/#projects">Selected work</a><a href="/#connect">Let&apos;s Connect</a></div><span>© 2026 Marvin</span></footer>
    </div>
  </main>;
}
