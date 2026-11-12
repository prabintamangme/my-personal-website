"use client";

import { FormEvent, useRef, useState } from "react";

type Errors = Partial<Record<"name" | "email" | "subject" | "message", string>>;
const formSubmitEndpoint = "https://formsubmit.co/ajax/prabintamangme@gmail.com";

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
    const website = String(data.get("website") ?? "").trim();
    const next: Errors = {};
    if (name.length < 2) next.name = "Enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "Enter a valid email address.";
    if (subject.length < 3) next.subject = "Enter a subject.";
    if (message.length < 20) next.message = "Tell me a little more—use at least 20 characters.";
    setErrors(next);
    if (Object.keys(next).length) return;
    if (website) return;
    setPending(true); setStatus(null);
    try {
      const response = await fetch(formSubmitEndpoint, {
        method: "POST",
        headers: {"content-type": "application/json", accept: "application/json"},
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
          _replyto: email,
          _subject: `New LEARNINGEVERGROW enquiry: ${subject}`,
          _template: "table",
          _honey: website,
          _url: "https://prabintamang7.com.np/contact",
        }),
      });
      const result = await response.json().catch(() => ({})) as {success?: boolean | string; message?: string};
      const accepted = response.ok && result.success !== false && result.success !== "false";
      setStatus({
        kind: accepted ? "success" : "error",
        message: accepted
          ? "Your message has been sent. Thank you—I’ll reply using the email you provided."
          : result.message ?? "Your message could not be sent. Please try again or email directly.",
      });
      if (accepted) { form.reset(); started.current = null; }
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
    <p className="muted" style={{fontSize: ".82rem"}}>Your message will be emailed to prabintamangme@gmail.com. You will remain on this website after submitting.</p>
    {status && <div className={`form-status ${status.kind}`} role="status">{status.message}</div>}
  </form>;
}
