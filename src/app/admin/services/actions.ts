"use server";

import { requireAdminUser } from "@/lib/auth";
import { updateDB } from "@/lib/store";
import crypto from "node:crypto";

function uuid() {
  return crypto.randomUUID();
}

export async function addServiceCategory(formData: FormData) {
  await requireAdminUser();
  const name = String(formData.get("name") ?? "").trim();
  if (!name) return;
  await updateDB((db) => {
    db.serviceCategories.push({ id: uuid(), name, sortOrder: db.serviceCategories.length + 1 });
  });
}

export async function addService(formData: FormData) {
  await requireAdminUser();
  const categoryId = String(formData.get("categoryId") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const priceFromInrRaw = String(formData.get("priceFromInr") ?? "").trim();
  const durationMinsRaw = String(formData.get("durationMins") ?? "").trim();
  const featured = formData.get("featured") === "on";
  if (!categoryId || !name) return;

  const priceNum = priceFromInrRaw ? Number(priceFromInrRaw) : NaN;
  const durationNum = durationMinsRaw ? Number(durationMinsRaw) : NaN;
  const priceFromInr = Number.isFinite(priceNum) ? priceNum : undefined;
  const durationMins = Number.isFinite(durationNum) ? durationNum : undefined;

  await updateDB((db) => {
    db.services.push({
      id: uuid(),
      categoryId,
      name,
      description,
      priceFromInr,
      durationMins,
      featured,
      active: true,
      sortOrder: db.services.length + 1,
    });
  });
}

export async function toggleService(formData: FormData) {
  await requireAdminUser();
  const id = String(formData.get("id") ?? "");
  const field = String(formData.get("field") ?? "");
  await updateDB((db) => {
    const s = db.services.find((x) => x.id === id);
    if (!s) return;
    if (field === "active") s.active = !s.active;
    if (field === "featured") s.featured = !s.featured;
  });
}
