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
        <a href="https://github.com/marvinjbb" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/marvin-jbb"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a className="hire-link" href="/#connect">
          Let&apos;s Connect
        </a>
      </nav>
      <MobileNav />
    </header>
  );
}
