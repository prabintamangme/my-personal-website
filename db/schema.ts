import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const admins = sqliteTable("admins", {
  userId: text("user_id").primaryKey(), email: text("email").notNull(),
  displayName: text("display_name").notNull(), createdAt: text("created_at").notNull(),
});

export const content = sqliteTable("content", {
  id: text("id").primaryKey(), slug: text("slug").notNull().unique(),
  title: text("title").notNull(), subtitle: text("subtitle"), summary: text("summary").notNull(),
  body: text("body").notNull(), type: text("type").notNull(), topic: text("topic").notNull(),
  author: text("author").notNull(), tags: text("tags").notNull().default("[]"),
  status: text("status").notNull().default("draft"), featured: integer("featured", { mode: "boolean" }).notNull().default(false),
  externalKind: text("external_kind"), sourceName: text("source_name"), sourceUrl: text("source_url"),
  permissionNote: text("permission_note"), abstract: text("abstract"), references: text("references").notNull().default("[]"),
  doi: text("doi"), attachmentKey: text("attachment_key"), publishedAt: text("published_at"),
  updatedAt: text("updated_at").notNull(), createdAt: text("created_at").notNull(),
});

export const services = sqliteTable("services", {
  id: text("id").primaryKey(), title: text("title").notNull(), description: text("description").notNull(),
  audience: text("audience").notNull(), status: text("status").notNull().default("draft"),
  sortOrder: integer("sort_order").notNull().default(0), createdAt: text("created_at").notNull(), updatedAt: text("updated_at").notNull(),
});

export const learningPaths = sqliteTable("learning_paths", {
  id: text("id").primaryKey(), slug: text("slug").notNull().unique(), title: text("title").notNull(),
  description: text("description").notNull(), topic: text("topic").notNull(), difficulty: text("difficulty").notNull(),
  status: text("status").notNull().default("draft"), createdAt: text("created_at").notNull(), updatedAt: text("updated_at").notNull(),
});

export const lessons = sqliteTable("lessons", {
  id: text("id").primaryKey(), pathId: text("path_id").notNull(), slug: text("slug").notNull().unique(),
  title: text("title").notNull(), summary: text("summary").notNull(), body: text("body").notNull(),
  videoUrl: text("video_url"), resourceKey: text("resource_key"), sortOrder: integer("sort_order").notNull().default(0),
  status: text("status").notNull().default("draft"), createdAt: text("created_at").notNull(), updatedAt: text("updated_at").notNull(),
});

export const contacts = sqliteTable("contacts", {
  id: text("id").primaryKey(), name: text("name").notNull(), email: text("email").notNull(),
  subject: text("subject").notNull(), enquiryType: text("enquiry_type").notNull(), message: text("message").notNull(),
  status: text("status").notNull().default("new"), ipHash: text("ip_hash").notNull(), createdAt: text("created_at").notNull(),
});

export const subscribers = sqliteTable("subscribers", {
  id: text("id").primaryKey(), email: text("email").notNull().unique(), name: text("name"),
  status: text("status").notNull().default("pending"), providerId: text("provider_id"),
  phoneCountryCode: text("phone_country_code"), phone: text("phone"),
  emailConsentAt: text("email_consent_at"), messagingConsentAt: text("messaging_consent_at"),
  createdAt: text("created_at").notNull(), updatedAt: text("updated_at").notNull(),
});

export const siteSettings = sqliteTable("site_settings", {
  key: text("key").primaryKey(), value: text("value").notNull(), updatedAt: text("updated_at").notNull(),
});
