import { env } from "runtime-bindings";
import { demoContent } from "./site-data";
import type { ContentItem, ContentType } from "./types";

type D1Result<T> = { results?: T[] };
export type PublishedService = { id: string; title: string; description: string; audience: string };
export function getD1(): D1Database | null { return env.DB ?? null; }

export function rowToContent(row: Record<string, unknown>): ContentItem {
  const parse = (value: unknown) => { try { return JSON.parse(String(value ?? "[]")); } catch { return []; } };
  return {
    id: String(row.id), slug: String(row.slug), title: String(row.title), subtitle: row.subtitle ? String(row.subtitle) : null,
    summary: String(row.summary), body: String(row.body), type: String(row.type) as ContentType, topic: String(row.topic),
    author: String(row.author), tags: parse(row.tags), status: row.status === "published" ? "published" : "draft",
    featured: Boolean(row.featured), externalKind: row.external_kind ? String(row.external_kind) : null,
    sourceName: row.source_name ? String(row.source_name) : null, sourceUrl: row.source_url ? String(row.source_url) : null,
    permissionNote: row.permission_note ? String(row.permission_note) : null, abstract: row.abstract ? String(row.abstract) : null,
    references: parse(row.references), doi: row.doi ? String(row.doi) : null, attachmentKey: row.attachment_key ? String(row.attachment_key) : null,
    publishedAt: row.published_at ? String(row.published_at) : null, updatedAt: String(row.updated_at), createdAt: String(row.created_at),
  };
}

export async function getPublishedContent(): Promise<ContentItem[]> {
  const fallback = process.env.NODE_ENV === "production" ? [] : demoContent;
  const db = getD1(); if (!db) return fallback;
  try {
    const result = await db.prepare("SELECT * FROM content WHERE status = 'published' ORDER BY published_at DESC, updated_at DESC").all() as D1Result<Record<string, unknown>>;
    const items = (result.results ?? []).map(rowToContent); return items.length ? items : fallback;
  } catch { return fallback; }
}

export async function getContentBySlug(slug: string): Promise<ContentItem | null> {
  const demo = process.env.NODE_ENV === "production" ? undefined : demoContent.find((item) => item.slug === slug); const db = getD1(); if (!db) return demo ?? null;
  try { const row = await db.prepare("SELECT * FROM content WHERE slug = ? AND status = 'published'").bind(slug).first<Record<string, unknown>>(); return row ? rowToContent(row) : demo ?? null; }
  catch { return demo ?? null; }
}

export async function getAllAdminContent(): Promise<ContentItem[]> {
  const db = getD1(); if (!db) return [];
  try { const result = await db.prepare("SELECT * FROM content ORDER BY updated_at DESC").all() as D1Result<Record<string, unknown>>; return (result.results ?? []).map(rowToContent); }
  catch { return []; }
}

export async function getPublishedServices(): Promise<PublishedService[]> {
  const db = getD1(); if (!db) return [];
  try {
    const result = await db.prepare("SELECT id,title,description,audience FROM services WHERE status = 'published' ORDER BY sort_order, title").all() as D1Result<PublishedService>;
    return result.results ?? [];
  } catch { return []; }
}

export async function isAdmin(userId: string): Promise<boolean> {
  const db = getD1(); if (!db) return false;
  try { return Boolean(await db.prepare("SELECT user_id FROM admins WHERE user_id = ?").bind(userId).first()); } catch { return false; }
}

export async function hasAdmin(): Promise<boolean> {
  const db = getD1(); if (!db) return false;
  try { return Boolean(await db.prepare("SELECT user_id FROM admins LIMIT 1").first()); } catch { return false; }
}
