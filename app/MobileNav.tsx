"use client";
import { useState } from "react";
const links = [["Map", "/#map"], ["Skills", "/#skills"], ["Projects", "/#projects"], ["Blog", "/#blog"], ["LinkedIn", "https://www.linkedin.com/in/marvin-jbb"], ["Résumé", "/#resume"]];
export function MobileNav() {
  const [open, setOpen] = useState(false);
  return <div className="mobile-menu"><button type="button" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? "Close" : "Menu"}</button>{open && <nav aria-label="Mobile navigation">{links.map(([label,href]) => <a href={href} key={href} onClick={() => setOpen(false)}>{label}</a>)}<a href="mailto:jbmarvin21@gmail.com">Hire Marvin</a></nav>}</div>;
}
