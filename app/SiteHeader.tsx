import { MobileNav } from "./MobileNav";

export function SiteHeader() {
  return (
    <header className="topbar">
      {/* vinext currently hydrates next/link unreliably in this shared header. */}
      {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
      <a className="identity" href="/">
        <img src="/marvin-portrait.jpg" alt="Marvin" />
        <span>marvinjb.dev</span>
      </a>
      <nav className="topnav" aria-label="Primary navigation">
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/#projects">Projects</a>
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/#skills">Skills</a>
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/#experience">Experience</a>
        <a
          href="https://www.linkedin.com/in/marvin-jbb"
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn
        </a>
        <a className="hire-link" href="mailto:jbmarvin21@gmail.com">
          Hire Marvin
        </a>
      </nav>
      <MobileNav />
    </header>
  );
}
