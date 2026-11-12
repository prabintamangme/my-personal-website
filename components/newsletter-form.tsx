"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { freePdf, phoneUpdatesAvailable } from "@/lib/subscription";

type FormErrors = Partial<Record<"name" | "email" | "phone" | "consent", string>>;
const formSubmitEndpoint = "https://formsubmit.co/ajax/prabintamangme@gmail.com";

export function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<{kind: "success" | "error"; message: string} | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [pending, setPending] = useState(false);
  const prefix = compact ? "newsletter-compact" : "newsletter";

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const nextErrors: FormErrors = {};
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const phoneCountryCode = String(data.get("phoneCountryCode") ?? "+977");
    const emailConsent = data.get("emailConsent") === "on";
    const messagingConsent = data.get("messagingConsent") === "on";
    const website = String(data.get("website") ?? "").trim();
    if (name.length < 2) nextErrors.name = "Enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(email)) nextErrors.email = "Enter a valid email address.";
    if (!emailConsent) nextErrors.consent = "You must agree to receive email updates before subscribing.";
    if (messagingConsent && !phone) nextErrors.phone = "Enter a phone number to request phone updates.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    if (website) return;

    setPending(true); setStatus(null);
    try {
      const response = await fetch(formSubmitEndpoint, {
        method: "POST",
        headers: {"content-type": "application/json", accept: "application/json"},
        body: JSON.stringify({
          name,
          email,
          phone: phone ? `${phoneCountryCode} ${phone}` : "Not provided",
          emailConsent: emailConsent ? "Agreed to receive learning resources and email updates" : "Not agreed",
          messagingConsent: messagingConsent ? "Agreed to SMS or WhatsApp updates" : "Not requested",
          requestType: "LEARNINGEVERGROW subscription request",
          _replyto: email,
          _subject: `New LEARNINGEVERGROW subscription: ${name}`,
          _template: "table",
          _honey: website,
          _url: "https://www.prabintamang7.com.np/newsletter",
        }),
      });
      const result = await response.json().catch(() => ({})) as {success?: boolean | string; message?: string};
      const accepted = response.ok && result.success !== false && result.success !== "false";
      setStatus({
        kind: accepted ? "success" : "error",
        message: accepted
          ? "Your subscription request has been sent. Thank you—LEARNINGEVERGROW has received your details for future email updates."
          : result.message ?? "Your subscription request could not be sent. Please try again or email directly.",
      });
      if (accepted) form.reset();
    } catch {
      setStatus({kind: "error", message: "The network request failed. Your subscription request was not sent. Check your connection and try again."});
    } finally { setPending(false); }
  }

  return <form className="form" onSubmit={submit} noValidate>
    <div className="honeypot" aria-hidden="true"><label>Company website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
    <div className="stack" style={{gap: ".45rem"}}>
      <h3>{freePdf ? "Subscribe and get your free learning guide." : "Subscribe for learning updates."}</h3>
      <p className="muted">{freePdf ? <>Enter your details to receive new learning content and access <strong>{freePdf.title}</strong>.</> : "Enter your details to receive new articles and learning resources from LEARNINGEVERGROW."}</p>
    </div>
    <div className={compact ? "stack" : "form-row"}>
      <div className="field"><label htmlFor={`${prefix}-name`}>Name</label><input className="input" id={`${prefix}-name`} name="name" autoComplete="name" placeholder="Your name" required aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? `${prefix}-name-error` : undefined} />{errors.name && <span className="form-error" id={`${prefix}-name-error`}>{errors.name}</span>}</div>
      <div className="field"><label htmlFor={`${prefix}-email`}>Email address</label><input className="input" id={`${prefix}-email`} name="email" type="email" autoComplete="email" placeholder="you@example.com" required aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? `${prefix}-email-error` : undefined} />{errors.email && <span className="form-error" id={`${prefix}-email-error`}>{errors.email}</span>}</div>
    </div>
    <div className="field"><label htmlFor={`${prefix}-phone`}>Phone number <span className="muted">(optional)</span></label><div className="phone-field"><select className="input" name="phoneCountryCode" aria-label="Country code" defaultValue="+977"><option value="+977">NP +977</option><option value="+91">IN +91</option><option value="+44">UK +44</option><option value="+1">US/CA +1</option><option value="+61">AU +61</option><option value="+971">AE +971</option></select><input className="input" id={`${prefix}-phone`} name="phone" type="tel" autoComplete="tel-national" inputMode="tel" placeholder="Phone number" aria-invalid={Boolean(errors.phone)} aria-describedby={`${prefix}-phone-note${errors.phone ? ` ${prefix}-phone-error` : ""}`} /></div><span className="muted" id={`${prefix}-phone-note`} style={{fontSize: ".82rem"}}>Only needed if you choose phone updates.</span>{errors.phone && <span className="form-error" id={`${prefix}-phone-error`}>{errors.phone}</span>}</div>
    <label className="consent"><input type="checkbox" name="emailConsent" required aria-invalid={Boolean(errors.consent)} aria-describedby={errors.consent ? `${prefix}-consent-error` : undefined} /><span>I agree to receive learning resources and email updates from LEARNINGEVERGROW.</span></label>
    {errors.consent && <span className="form-error" id={`${prefix}-consent-error`}>{errors.consent}</span>}
    {phoneUpdatesAvailable && <label className="consent"><input type="checkbox" name="messagingConsent" /><span>I would also like learning updates by SMS or WhatsApp.</span></label>}
    <button className="btn accent" disabled={pending}>{pending ? "Sending…" : freePdf ? "Send Me the Free PDF" : "Subscribe for Updates"}</button>
    <p className="muted" style={{fontSize: ".82rem"}}>Your details will be emailed to LEARNINGEVERGROW and used for the updates you choose, as explained in our <Link className="rule-link" href="/privacy">Privacy Policy</Link>. You can unsubscribe at any time.</p>
    {status && <div className={`form-status ${status.kind}`} role="status"><strong>{status.message}</strong></div>}
  </form>;
}
