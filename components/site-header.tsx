"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { primaryCtaLabel } from "@/lib/subscription";

const links = [
  ["Home", "/"],
  ["About Me", "/about"],
  ["Learning & Blog", "/learning"],
  ["Services", "/services"],
  ["Contact", "/contact"],
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const frame = requestAnimationFrame(() => setDark(document.documentElement.dataset.theme === "dark"));
    return () => cancelAnimationFrame(frame);
  }, []);
  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next ? "dark" : "light";
    localStorage.setItem("leg-theme", next ? "dark" : "light");
  }
  return <header className="site-header">
    <div className="shell nav-row">
      <Link className="brand logo-brand" href="/" aria-label="LEARNINGEVERGROW home"><Image className="logo-image" src="/brand/learningevergrow-logo.png" alt="LEARNINGEVERGROW" width={2170} height={430} priority /></Link>
      <nav className="desktop-nav" aria-label="Main navigation">
        {links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
        <button className="icon-btn" onClick={toggleTheme} aria-label={`Use ${dark ? "light" : "dark"} theme`}>{dark ? "☀" : "◐"}</button>
        <Link className="btn small accent" href="/#subscribe">{primaryCtaLabel}</Link>
      </nav>
      <div className="cluster">
        <button className="icon-btn menu-btn" onClick={toggleTheme} aria-label={`Use ${dark ? "light" : "dark"} theme`}>{dark ? "☀" : "◐"}</button>
        <button className="icon-btn menu-btn" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu" aria-label="Toggle navigation">{open ? "×" : "☰"}</button>
      </div>
    </div>
    <nav id="mobile-menu" className={`mobile-nav shell ${open ? "open" : ""}`} aria-label="Mobile navigation">
      {links.map(([label, href]) => <Link onClick={() => setOpen(false)} key={href} href={href}>{label}</Link>)}
      <Link className="btn small accent" onClick={() => setOpen(false)} href="/#subscribe">{primaryCtaLabel}</Link>
    </nav>
  </header>;
}
