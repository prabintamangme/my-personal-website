import type { Metadata } from "next";
import Link from "next/link";
import { getPublishedServices } from "@/lib/data";

export const metadata: Metadata = {
  title: "Services",
  description: "Discuss educational content, research support, or a learning collaboration with Prabin Tamang.",
};

export default async function ServicesPage() {
  const services = await getPublishedServices();
  return <>
    <section className="page-hero"><div className="shell stack">
      <span className="eyebrow">Services</span>
      <h1>Let’s make knowledge more accessible.</h1>
      <p className="lede">Interested in educational content, research support, or a learning collaboration? Get in touch to discuss your goals.</p>
      <div><Link className="btn accent" href="/contact">Discuss a Collaboration</Link></div>
    </div></section>
    <section className="section"><div className="shell">
      {services.length ? <div className="grid-3">{services.map(service => <article className="card stack" key={service.id}><h2 style={{fontSize: "2rem"}}>{service.title}</h2><p>{service.description}</p><p className="muted"><strong>For:</strong> {service.audience}</p></article>)}</div> : <div className="empty"><h2 style={{fontSize: "2rem"}}>No confirmed services have been published yet.</h2><p>Service ideas remain private drafts until Prabin confirms that they are available.</p></div>}
    </div></section>
  </>;
}
