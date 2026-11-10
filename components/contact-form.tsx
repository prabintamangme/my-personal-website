"use client";

import { FormEvent, useRef, useState } from "react";

type Errors = Partial<Record<"name" | "email" | "subject" | "message", string>>;

export function ContactForm() {
  const started = useRef<number | null>(null);
  const [status, setStatus] = useState<{kind: string; message: string} | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [pending, setPending] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const subject = String(data.get("subject") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const next: Errors = {};
    if (name.length < 2) next.name = "Enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "Enter a valid email address.";
    if (subject.length < 3) next.subject = "Enter a subject.";
    if (message.length < 20) next.message = "Tell me a little more—use at least 20 characters.";
    setErrors(next);
    if (Object.keys(next).length) return;
    setPending(true); setStatus(null);
    const payload = {...Object.fromEntries(data), enquiryType: "General enquiry", startedAt: started.current ?? 0};
    try {
      const response = await fetch("/api/contact", {method: "POST", headers: {"content-type": "application/json"}, body: JSON.stringify(payload)});
      const result = await response.json() as {message: string};
      setStatus({kind: response.ok ? "success" : "error", message: result.message});
      if (response.ok) { form.reset(); started.current = null; }
    } catch { setStatus({kind: "error", message: "The network request failed. Your message was not sent. Please try again or email directly."}); }
    finally { setPending(false); }
  }
  return <form className="form" onFocusCapture={() => { started.current ??= Date.now(); }} onSubmit={submit} noValidate>
    <div className="honeypot" aria-hidden="true"><label>Company website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
    <div className="form-row">
      <div className="field"><label htmlFor="contact-name">Name</label><input className="input" id="contact-name" name="name" autoComplete="name" required aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "contact-name-error" : undefined} />{errors.name && <span className="form-error" id="contact-name-error">{errors.name}</span>}</div>
      <div className="field"><label htmlFor="contact-email">Email</label><input className="input" id="contact-email" name="email" type="email" autoComplete="email" required aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "contact-email-error" : undefined} />{errors.email && <span className="form-error" id="contact-email-error">{errors.email}</span>}</div>
    </div>
    <div className="field"><label htmlFor="contact-subject">Subject</label><input className="input" id="contact-subject" name="subject" required maxLength={160} aria-invalid={Boolean(errors.subject)} aria-describedby={errors.subject ? "contact-subject-error" : undefined} />{errors.subject && <span className="form-error" id="contact-subject-error">{errors.subject}</span>}</div>
    <div className="field"><label htmlFor="contact-message">Message</label><textarea className="input" id="contact-message" name="message" required minLength={20} maxLength={5000} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "contact-message-error" : undefined} />{errors.message && <span className="form-error" id="contact-message-error">{errors.message}</span>}</div>
    <button className="btn accent" disabled={pending}>{pending ? "Sending…" : "Send Message"}</button>
    {status && <div className={`form-status ${status.kind}`} role="status">{status.message}</div>}
  </form>;
}
