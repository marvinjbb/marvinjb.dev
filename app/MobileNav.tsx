"use client";
/* eslint-disable @next/next/no-html-link-for-pages -- vinext shared hash navigation uses native anchors. */
import { useState } from "react";
const links = [["About", "/#map"], ["Projects", "/#projects"], ["Skills", "/#skills"], ["Experience", "/#experience"], ["Credentials", "/#credentials"], ["LinkedIn", "https://www.linkedin.com/in/marvin-jbb"]];
export function MobileNav() {
  const [open, setOpen] = useState(false);
  return <div className="mobile-menu"><button type="button" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? "Close" : "Menu"}</button>{open && <nav aria-label="Mobile navigation">{links.map(([label,href]) => <a href={href} key={href} onClick={() => setOpen(false)}>{label}</a>)}<a href="/#connect" onClick={() => setOpen(false)}>Let&apos;s Connect</a></nav>}</div>;
}
