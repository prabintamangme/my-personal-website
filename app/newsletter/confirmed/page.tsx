import type { Metadata } from "next";
import Link from "next/link";
import { getD1 } from "@/lib/data";
import { freePdf } from "@/lib/subscription";

export const metadata: Metadata = {title: "Confirm subscription", robots: {index: false, follow: false}};
export const dynamic = "force-dynamic";

export default async function ConfirmedPage({searchParams}: {searchParams: Promise<{receipt?: string}>}) {
  const {receipt} = await searchParams;
  const verifyUrl = process.env.NEWSLETTER_PROVIDER_VERIFY_URL;
  const token = process.env.NEWSLETTER_PROVIDER_TOKEN;
  let confirmed = false;
  let failed = false;
  if (receipt && verifyUrl && token) {
    try {
      const url = new URL(verifyUrl); url.searchParams.set("receipt", receipt);
      const response = await fetch(url, {headers: {authorization: `Bearer ${token}`}, cache: "no-store"});
      const result = await response.json() as {confirmed?: boolean; email?: string};
      confirmed = response.ok && result.confirmed === true;
      if (confirmed && result.email) {
        try {
          const db = getD1();
          await db?.prepare("UPDATE subscribers SET status = 'active', updated_at = ? WHERE email = ?")
            .bind(new Date().toISOString(), result.email.trim().toLowerCase()).run();
        } catch { /* The provider confirmation remains authoritative if local status sync is temporarily unavailable. */ }
      }
      failed = !confirmed;
    } catch { failed = true; }
  }
  return <section className="section"><div className="narrow card stack">
    {confirmed ? <><span className="eyebrow">Email confirmed</span><h1>You’re subscribed. {freePdf ? "Your guide is ready." : "Welcome to LEARNINGEVERGROW."}</h1><p className="lede">{freePdf ? `Download your copy of ${freePdf.title} and start learning.` : "You’ll receive new articles and learning resources by email."}</p>{freePdf && <a className="btn accent" href={freePdf.url}>Download PDF</a>}<Link className="btn secondary" href="/learning">Explore articles</Link></> : <><span className="eyebrow">Confirmation required</span><h1>{failed ? "We couldn’t verify that confirmation." : "Check your confirmation link."}</h1><p className="lede">{failed ? "The email provider could not confirm this receipt. Retry the link from your inbox or request a new confirmation email." : "Open the confirmation link sent by the configured email provider. A download is never shown until that provider confirms your subscription."}</p><Link className="btn" href="/newsletter#subscribe">Retry subscription</Link></>}
  </div></section>;
}
