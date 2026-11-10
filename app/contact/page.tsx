import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Prabin Tamang with a question, topic suggestion, or collaboration idea.",
};

export default function ContactPage() {
  return <>
    <section className="page-hero"><div className="shell stack">
      <span className="eyebrow">Contact</span>
      <h1>Let’s connect.</h1>
      <p className="lede">Have a question, a topic suggestion, or an idea for working together? I’d like to hear from you.</p>
    </div></section>
    <section className="section"><div className="shell grid-2">
      <div className="stack"><h2>Send a message.</h2><p className="lede">Contact enquiries are kept separate from newsletter subscriptions. Sending a message will not subscribe you.</p><p><strong>Email</strong><br /><a className="rule-link" href="mailto:prabintamangme@gmail.com">prabintamangme@gmail.com</a></p></div>
      <div className="card"><ContactForm /></div>
    </div></section>
  </>;
}
