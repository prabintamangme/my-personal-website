import Link from "next/link";
import { ContentCard } from "@/components/content-card";
import { NewsletterForm } from "@/components/newsletter-form";
import { ProfilePortrait } from "@/components/profile-portrait";
import { getPublishedContent } from "@/lib/data";
import { freePdf, primaryCtaLabel } from "@/lib/subscription";

const latestCutoff = Date.now() - 180 * 24 * 60 * 60 * 1000;

const benefits = [
  ["Understand finance and economics", "Explore important concepts through straightforward explanations and practical examples."],
  ["Follow the events that matter", "Learn what is happening, why it matters, and how it connects to the wider economy."],
  ["Build your knowledge", "Read articles, explore research, and download resources you can study at your own pace."],
] as const;

export default async function Home() {
  const content = await getPublishedContent();
  const real = content.filter(item => !item.demo);
  const articles = real.slice(0, 3);
  const hasLatest = real.some(item => new Date(item.publishedAt ?? item.updatedAt).getTime() >= latestCutoff);
  return <>
    <section className="hero"><div className="shell hero-grid"><div className="hero-copy"><span className="eyebrow">Finance · Economics · Current events · Learning</span><h1>Keep learning. <span>Make sense of a changing world.</span></h1><p className="lede">Explore finance, economics, and current events through clear articles, research, and practical learning resources. Join LEARNINGEVERGROW and keep building your knowledge, one idea at a time.</p><div className="cluster"><Link className="btn accent" href="#subscribe">{primaryCtaLabel}</Link><Link className="btn secondary" href="/learning">Explore Articles</Link></div><p className="muted">Learning resources and updates, delivered to your inbox. Unsubscribe at any time.</p></div><ProfilePortrait variant="hero" priority /></div></section>
    <section className="section"><div className="shell"><div className="section-head"><div><span className="eyebrow">What you’ll find here</span><h2>Clear ideas. Useful resources. More ways to learn.</h2></div></div><div className="grid-3">{benefits.map(([title, body], index) => <article className="card stack" key={title}><span className="hero-number" style={{fontSize: "2rem"}}>0{index + 1}</span><h3>{title}</h3><p className="muted">{body}</p></article>)}</div></div></section>
    <section className="section" style={{background: "var(--paper-2)"}}><div className="shell"><div className="section-head"><div><span className="eyebrow">{hasLatest ? "Latest articles and updates" : "Articles and updates"}</span><h2>A fresh perspective starts with a good read.</h2><p className="lede">{real.length ? "Explore writing on finance, economics, learning, and current events." : "Published articles will appear here with their dates and source links."}</p></div><Link className="rule-link" href="/learning">Browse All Articles</Link></div>{articles.length ? <div className="grid-3">{articles.map(item => <ContentCard item={item} key={item.id} />)}</div> : <div className="empty">No articles have been published yet.</div>}</div></section>
    {freePdf && <section className="section"><div className="shell newsletter-box"><div className="stack"><span className="eyebrow">Free PDF resource</span><h2>Take your next learning step.</h2><p className="lede">Subscribe to receive <strong>{freePdf.title}</strong> and future learning updates.</p></div><Link className="btn accent" href="#subscribe">Subscribe & Download the PDF</Link></div></section>}
    <section className="section band"><div className="shell about-preview"><ProfilePortrait variant="compact" /><div><span className="eyebrow" style={{color: "var(--gold)"}}>About</span><h2 style={{marginTop: "1rem"}}>Hi, I’m Prabin Tamang.</h2></div><div className="stack"><p className="lede" style={{color: "inherit"}}>I’m a master’s graduate in Finance and Economics and the creator of LEARNINGEVERGROW. I share learning resources to help make complex topics easier to understand.</p><p style={{opacity: .8}}>My goal is to create a space where curious people can learn, ask questions, and stay informed.</p><Link className="rule-link" href="/about" style={{color: "var(--gold)", justifySelf: "start"}}>More About Me</Link></div></div></section>
    <section className="section" id="subscribe"><div className="shell newsletter-box"><div className="stack"><span className="eyebrow">Keep your curiosity growing</span><h2>Keep your curiosity growing.</h2><p className="lede">{freePdf ? "Get new articles, learning resources, and selected updates in your inbox. Subscribe to access the free PDF and continue learning with LEARNINGEVERGROW." : "Get new articles, learning resources, and selected updates in your inbox. Subscribe and continue learning with LEARNINGEVERGROW."}</p></div><NewsletterForm /></div></section>
  </>;
}
