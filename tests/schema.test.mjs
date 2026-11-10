import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { DatabaseSync } from "node:sqlite";

test("the initial migration creates every durable model", () => {
  const db = new DatabaseSync(":memory:");
  db.exec(readFileSync(new URL("../drizzle/0000_learningevergrow.sql", import.meta.url), "utf8"));
  const names = db.prepare("SELECT name FROM sqlite_master WHERE type = 'table' ORDER BY name").all().map(row => row.name);
  for (const table of ["admins", "contacts", "content", "learning_paths", "lessons", "services", "site_settings", "subscribers"]) assert.ok(names.includes(table), `${table} table is missing`);
});

test("subscriber preference migration adds consent and optional phone fields", () => {
  const db = new DatabaseSync(":memory:");
  db.exec(readFileSync(new URL("../drizzle/0000_learningevergrow.sql", import.meta.url), "utf8"));
  db.exec(readFileSync(new URL("../drizzle/0001_subscriber_preferences.sql", import.meta.url), "utf8"));
  const columns = db.prepare("PRAGMA table_info(subscribers)").all().map(row => row.name);
  for (const column of ["phone_country_code", "phone", "email_consent_at", "messaging_consent_at"]) assert.ok(columns.includes(column), `${column} is missing`);
});

test("contact rate-limit lookup has an index", () => {
  const db = new DatabaseSync(":memory:");
  db.exec(readFileSync(new URL("../drizzle/0000_learningevergrow.sql", import.meta.url), "utf8"));
  const indexes = db.prepare("SELECT name FROM sqlite_master WHERE type = 'index'").all().map(row => row.name);
  assert.ok(indexes.includes("contacts_ip_created_idx"));
});
