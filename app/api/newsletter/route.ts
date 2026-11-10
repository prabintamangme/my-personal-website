import { NextResponse } from "next/server";
import { z } from "zod";
import { getD1 } from "@/lib/data";

const schema = z.object({
  email: z.string().trim().email().max(200),
  name: z.string().trim().min(2).max(100),
  phoneCountryCode: z.string().trim().max(8).optional().default("+977"),
  phone: z.string().trim().max(30).optional().default(""),
  emailConsent: z.literal(true),
  messagingConsent: z.boolean().optional().default(false),
});

export async function POST(request: Request) {
  let input: z.infer<typeof schema>;
  try { input = schema.parse(await request.json()); }
  catch { return NextResponse.json({message: "Check your name, email address, and required email consent."}, {status: 400}); }

  const providerUrl = process.env.NEWSLETTER_PROVIDER_URL;
  const token = process.env.NEWSLETTER_PROVIDER_TOKEN;
  if (!providerUrl || !token) return NextResponse.json({message: "Newsletter signup is not configured yet.", detail: "Your details were not subscribed. Please try again after the email service is connected."}, {status: 503});
  if (input.messagingConsent && (!input.phone || !process.env.MESSAGING_PROVIDER_URL)) return NextResponse.json({message: "Phone updates are not available yet.", detail: "Leave phone messaging unchecked to continue with email updates only."}, {status: 400});

  const db = getD1();
  if (!db) return NextResponse.json({message: "Subscriber storage is unavailable.", detail: "Your details were not subscribed."}, {status: 503});
  const email = input.email.toLowerCase();
  const resourceTitle = process.env.NEXT_PUBLIC_FREE_PDF_TITLE?.trim();
  const resourceUrl = process.env.NEXT_PUBLIC_FREE_PDF_URL?.trim();
  try {
    const existing = await db.prepare("SELECT status FROM subscribers WHERE email = ?").bind(email).first<{status: string}>();
    if (existing?.status === "active") return NextResponse.json({message: resourceTitle && resourceUrl ? "You’re subscribed. Your guide is ready." : "You are already subscribed to learning updates.", detail: resourceTitle ? `Download your copy of ${resourceTitle} and start learning.` : "There is no need to create another subscription.", stage: resourceTitle && resourceUrl ? "ready" : undefined, downloadUrl: resourceTitle && resourceUrl ? resourceUrl : undefined});
    const origin = new URL(request.url).origin;
    const response = await fetch(providerUrl, {
      method: "POST",
      headers: {authorization: `Bearer ${token}`, "content-type": "application/json"},
      body: JSON.stringify({
        email, name: input.name, doubleOptIn: true,
        phone: input.phone || undefined,
        phoneCountryCode: input.phone ? input.phoneCountryCode : undefined,
        messagingConsent: input.messagingConsent,
        confirmationReturnUrl: `${origin}/newsletter/confirmed`,
        resourceTitle: resourceTitle || undefined,
        resourceUrl: resourceUrl || undefined,
      }),
    });
    if (!response.ok) return NextResponse.json({message: "The email provider did not accept the request.", detail: "Your subscription was not confirmed. Please retry in a moment."}, {status: 502});
    const result = await response.json().catch(() => ({})) as {id?: string};
    const now = new Date().toISOString();
    await db.prepare("INSERT INTO subscribers (id,email,name,status,provider_id,phone_country_code,phone,email_consent_at,messaging_consent_at,created_at,updated_at) VALUES (?,?,?,'pending',?,?,?,?,?,?,?) ON CONFLICT(email) DO UPDATE SET name=excluded.name,status='pending',provider_id=excluded.provider_id,phone_country_code=excluded.phone_country_code,phone=excluded.phone,email_consent_at=excluded.email_consent_at,messaging_consent_at=excluded.messaging_consent_at,updated_at=excluded.updated_at")
      .bind(crypto.randomUUID(), email, input.name, result.id ?? null, input.phone ? input.phoneCountryCode : null, input.phone || null, now, input.messagingConsent ? now : null, now, now).run();
    return NextResponse.json({message: "One more step: check your inbox.", detail: freePdfDetail(resourceTitle), stage: "check_inbox"}, {status: 201});
  } catch {
    return NextResponse.json({message: "The subscription request failed.", detail: "Your subscription was not confirmed. Please retry."}, {status: 500});
  }
}

function freePdfDetail(title?: string) {
  return title ? `Confirm your email address to receive updates and access ${title}.` : "Confirm your email address to receive learning updates.";
}
