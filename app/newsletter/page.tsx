import type { Metadata } from "next";
import { NewsletterForm } from "@/components/newsletter-form";
import { freePdf } from "@/lib/subscription";

export const metadata: Metadata = {
  title: "Learning Updates",
  description: "Subscribe to LEARNINGEVERGROW articles and learning resources.",
};

export default function NewsletterPage() {
  return <>
    <section className="page-hero"><div className="shell stack">
      <span className="eyebrow">Learning updates</span>
      <h1>Keep your curiosity growing.</h1>
      <p className="lede">{freePdf ? "Get new articles, learning resources, and selected updates in your inbox. Subscribe to access the free PDF and continue learning with LEARNINGEVERGROW." : "Get new articles, learning resources, and selected updates in your inbox. Subscribe and continue learning with LEARNINGEVERGROW."}</p>
    </div></section>
    <section className="section" id="subscribe"><div className="narrow card"><NewsletterForm /></div></section>
  </>;
}
