import crypto from "node:crypto";
import path from "node:path";
import { promises as fs } from "node:fs";
import { put } from "@vercel/blob";

function uuid() {
  return crypto.randomUUID();
}

function safeName(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]+/g, "-").slice(0, 80);
}

export async function savePublicUpload(file: File, folder: string) {
  const ext = path.extname(file.name || "").toLowerCase() || ".bin";
  const base = safeName(path.basename(file.name || `upload${ext}`, ext));
  const filename = `${uuid()}-${base}${ext}`;
  const pathname = `${folder}/${filename}`;

  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (token) {
    const blob = await put(pathname, file, { access: "public", token });
    return blob.url;
  }

  // Local fallback (dev): store under public/uploads so Next can serve it.
  const uploadDir = path.join(process.cwd(), "public", "uploads", folder);
  await fs.mkdir(uploadDir, { recursive: true });
  const bytes = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(path.join(uploadDir, filename), bytes);
  return `/uploads/${folder}/${filename}`;
}

