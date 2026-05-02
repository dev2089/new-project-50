"use server";

import { requireAdminUser } from "@/lib/auth";
import { updateDB } from "@/lib/store";
import crypto from "node:crypto";

function uuid() {
  return crypto.randomUUID();
}

function cleanSlug(s: string) {
  return s
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function upsertPage(formData: FormData) {
  await requireAdminUser();
  const slug = cleanSlug(String(formData.get("slug") ?? ""));
  const title = String(formData.get("title") ?? "").trim();
  const contentMarkdown = String(formData.get("contentMarkdown") ?? "").trim();
  const metaTitle = String(formData.get("metaTitle") ?? "").trim();
  const metaDesc = String(formData.get("metaDesc") ?? "").trim();
  const published = formData.get("published") === "on";
  const showInNav = formData.get("showInNav") === "on";
  const navOrderRaw = String(formData.get("navOrder") ?? "").trim();
  const navOrderNum = navOrderRaw ? Number(navOrderRaw) : NaN;
  const navOrder = Number.isFinite(navOrderNum) ? navOrderNum : 50;

  if (!slug || !title) return;

  await updateDB((db) => {
    const now = new Date().toISOString();
    const existing = db.pages.find((p) => p.slug === slug);
    if (existing) {
      existing.title = title;
      existing.contentMarkdown = contentMarkdown;
      existing.metaTitle = metaTitle;
      existing.metaDesc = metaDesc;
      existing.published = published;
      existing.showInNav = showInNav;
      existing.navOrder = navOrder;
      existing.updatedAt = now;
      return;
    }
    db.pages.push({
      id: uuid(),
      slug,
      title,
      contentMarkdown,
      metaTitle,
      metaDesc,
      showInNav,
      navOrder,
      published,
      createdAt: now,
      updatedAt: now,
    });
  });
}

export async function togglePage(formData: FormData) {
  await requireAdminUser();
  const id = String(formData.get("id") ?? "");
  const field = String(formData.get("field") ?? "");
  await updateDB((db) => {
    const p = db.pages.find((x) => x.id === id);
    if (!p) return;
    if (field === "published") p.published = !p.published;
    if (field === "showInNav") p.showInNav = !p.showInNav;
    p.updatedAt = new Date().toISOString();
  });
}

