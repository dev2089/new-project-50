"use server";

import { requireAdminUser } from "@/lib/auth";
import { updateDB } from "@/lib/store";
import crypto from "node:crypto";
import { savePublicUpload } from "@/lib/uploads";

function uuid() {
  return crypto.randomUUID();
}

export async function uploadMedia(formData: FormData) {
  await requireAdminUser();
  const file = formData.get("file");
  const title = String(formData.get("title") ?? "").trim();
  const tags = String(formData.get("tags") ?? "").trim();
  const featured = formData.get("featured") === "on";

  if (!(file instanceof File)) return;
  if (file.size === 0) return;

  const id = uuid();

  const isVideo = file.type.startsWith("video/");
  const webPath = await savePublicUpload(file, isVideo ? "videos" : "images");

  await updateDB((db) => {
    db.media.push({
      id,
      type: isVideo ? "VIDEO" : "IMAGE",
      path: webPath,
      title,
      alt: title,
      tags,
      featured,
      sortOrder: db.media.length + 1,
      createdAt: new Date().toISOString(),
    });
  });
}
