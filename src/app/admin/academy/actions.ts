"use server";

import { requireAdminUser } from "@/lib/auth";
import { updateDB } from "@/lib/store";
import crypto from "node:crypto";

function uuid() {
  return crypto.randomUUID();
}

export async function addCourseCategory(formData: FormData) {
  await requireAdminUser();
  const name = String(formData.get("name") ?? "").trim();
  if (!name) return;
  await updateDB((db) => {
    db.courseCategories.push({ id: uuid(), name, sortOrder: db.courseCategories.length + 1 });
  });
}

export async function addCourse(formData: FormData) {
  await requireAdminUser();
  const categoryId = String(formData.get("categoryId") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const durationText = String(formData.get("durationText") ?? "").trim();
  const feesText = String(formData.get("feesText") ?? "").trim();
  const featured = formData.get("featured") === "on";
  if (!categoryId || !name) return;

  await updateDB((db) => {
    db.courses.push({
      id: uuid(),
      categoryId,
      name,
      description,
      durationText,
      feesText,
      featured,
      active: true,
      sortOrder: db.courses.length + 1,
    });
  });
}

export async function toggleCourse(formData: FormData) {
  await requireAdminUser();
  const id = String(formData.get("id") ?? "");
  const field = String(formData.get("field") ?? "");
  await updateDB((db) => {
    const c = db.courses.find((x) => x.id === id);
    if (!c) return;
    if (field === "active") c.active = !c.active;
    if (field === "featured") c.featured = !c.featured;
  });
}

