"use server";

import bcrypt from "bcryptjs";
import { requireAdminUser } from "@/lib/auth";
import { updateDB } from "@/lib/store";

export async function updateAccount(formData: FormData) {
  const user = await requireAdminUser();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "").trim();

  await updateDB(async (db) => {
    const u = db.users.find((x) => x.id === user.id);
    if (!u) return;
    if (email) u.email = email;
    if (password) u.passwordHash = await bcrypt.hash(password, 12);
  });
}

