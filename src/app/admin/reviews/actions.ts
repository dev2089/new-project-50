"use server";

import { requireAdminUser } from "@/lib/auth";
import { updateDB } from "@/lib/store";
import crypto from "node:crypto";

function uuid() {
  return crypto.randomUUID();
}

export async function addReview(formData: FormData) {
  await requireAdminUser();
  const authorName = String(formData.get("authorName") ?? "").trim();
  const ratingRaw = String(formData.get("rating") ?? "").trim();
  const reviewTime = String(formData.get("reviewTime") ?? "").trim();
  const text = String(formData.get("text") ?? "").trim();
  const featured = formData.get("featured") === "on";

  const ratingNum = ratingRaw ? Number(ratingRaw) : NaN;
  const rating = Number.isFinite(ratingNum) ? Math.max(1, Math.min(5, ratingNum)) : 5;
  if (!authorName || !text) return;

  await updateDB((db) => {
    db.reviews.push({
      id: uuid(),
      authorName,
      rating,
      text,
      source: "Google",
      reviewTime,
      createdAt: new Date().toISOString(),
      featured,
      sortOrder: db.reviews.length + 1,
    });
  });
}

export async function toggleReview(formData: FormData) {
  await requireAdminUser();
  const id = String(formData.get("id") ?? "");
  const field = String(formData.get("field") ?? "");
  await updateDB((db) => {
    const r = db.reviews.find((x) => x.id === id);
    if (!r) return;
    if (field === "featured") r.featured = !r.featured;
  });
}

