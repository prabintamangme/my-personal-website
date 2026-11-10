import type { Metadata } from "next";
import { Suspense } from "react";
import { ContentBrowser } from "@/components/content-browser";
import { getPublishedContent } from "@/lib/data";

export const metadata: Metadata = {
  title: "Learning & Blog",
  description: "Articles, research, and resources about finance, economics, current events, and learning.",
};

const sections = ["Finance", "Economics", "Current Events Explained", "Learning Resources", "Recommended Reading"];

export default async function LearningPage() {
  const items = (await getPublishedContent()).filter(item => !item.demo);
  return <>
    <section className="page-hero"><div className="shell stack">
      <span className="eyebrow">Learning & Blog</span>
      <h1>Learn something useful today.</h1>
      <p className="lede">Explore articles, research, and resources that help you understand finance, economics, and the world around you.</p>
      <div className="cluster" aria-label="Topics">{sections.map(section => <span className="pill" key={section}>{section}</span>)}</div>
    </div></section>
    <section className="section"><div className="shell stack" style={{gap: "2rem"}}>
      <div className="section-head"><div><span className="eyebrow">Browse the library</span><h2>Articles, research, and recommended reading.</h2><p className="muted">Use search and topic filters to find a useful place to begin. Work by other authors is clearly labelled and linked to its original source.</p></div></div>
      <Suspense fallback={<div className="empty">Loading the content library…</div>}><ContentBrowser items={items} /></Suspense>
    </div></section>
  </>;
}
