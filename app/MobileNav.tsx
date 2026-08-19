"use client";

import { useState } from "react";

const links = [
  ["Work", "#work"],
  ["Expertise", "#expertise"],
  ["Notes", "#notes"],
  ["Profile", "#profile"],
];

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className={`mobile-menu${open ? " is-open" : ""}`}>
      <button type="button" aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>
        {open ? "Close" : "Menu"}
      </button>
      {open && (
        <nav id="mobile-navigation" aria-label="Mobile navigation">
          {links.map(([label, href]) => <a href={href} key={href} onClick={() => setOpen(false)}>{label}</a>)}
          <a href="mailto:jbmarvin21@gmail.com" onClick={() => setOpen(false)}>Email Marvin ↗</a>
        </nav>
      )}
    </div>
  );
}
