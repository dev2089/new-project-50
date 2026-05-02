"use server";

import { requireAdminUser } from "@/lib/auth";
import { updateDB } from "@/lib/store";
import crypto from "node:crypto";
import { savePublicUpload } from "@/lib/uploads";

function uuid() {
  return crypto.randomUUID();
}

export async function addProductCategory(formData: FormData) {
  await requireAdminUser();
  const name = String(formData.get("name") ?? "").trim();
  if (!name) return;
  await updateDB((db) => {
    db.productCategories.push({ id: uuid(), name, sortOrder: db.productCategories.length + 1 });
  });
}

export async function addProduct(formData: FormData) {
  await requireAdminUser();
  const categoryId = String(formData.get("categoryId") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const featured = formData.get("featured") === "on";
  const priceRaw = String(formData.get("priceInr") ?? "").trim();

  const image = formData.get("image");
  const imagePath = image instanceof File && image.size > 0 ? await savePublicUpload(image, "products") : "";

  const priceNum = priceRaw ? Number(priceRaw) : NaN;
  const priceInr = Number.isFinite(priceNum) ? priceNum : undefined;

  if (!categoryId || !name) return;

  await updateDB((db) => {
    db.products.push({
      id: uuid(),
      categoryId,
      name,
      description,
      priceInr,
      imagePath,
      featured,
      active: true,
      sortOrder: db.products.length + 1,
    });
  });
}

export async function toggleProduct(formData: FormData) {
  await requireAdminUser();
  const id = String(formData.get("id") ?? "");
  const field = String(formData.get("field") ?? "");
  await updateDB((db) => {
    const p = db.products.find((x) => x.id === id);
    if (!p) return;
    if (field === "active") p.active = !p.active;
    if (field === "featured") p.featured = !p.featured;
  });
}
