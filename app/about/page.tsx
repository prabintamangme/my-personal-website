import type { Metadata } from "next";
import Link from "next/link";
import { ProfilePortrait } from "@/components/profile-portrait";
import { primaryCtaLabel } from "@/lib/subscription";

export const metadata: Metadata = {title: "About Me", description: "About Prabin Tamang, founder of LEARNINGEVERGROW and a master's graduate in Finance and Economics."};
export default function AboutPage() {
  return <><section className="page-hero"><div className="shell stack"><span className="eyebrow">About Me</span><h1>Making finance, economics, and learning easier to explore.</h1><p className="lede">I’m Prabin Tamang, a master’s graduate in Finance and Economics and the founder of LEARNINGEVERGROW.</p></div></section><section className="section"><div className="shell about-story"><ProfilePortrait variant="about" /><div className="stack" style={{gap: "1.6rem"}}><span className="eyebrow">My purpose</span><p className="lede">I created this platform to share what I learn and make useful knowledge more accessible. Here, you’ll find my writing, learning resources, and selected work from other authors, with clear attribution.</p><p>Whether you’re exploring a new concept or trying to understand a current event, I hope this space helps you take your next step.</p><div className="cluster"><Link className="btn" href="/learning">Explore My Work</Link><Link className="rule-link" href="/#subscribe">{primaryCtaLabel}</Link></div></div></div></section></>;
}
