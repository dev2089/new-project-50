"use server";

import { headers } from "next/headers";
import { getDB, updateDB } from "@/lib/store";
import crypto from "node:crypto";

function uuid() {
  return crypto.randomUUID();
}

export async function createWhatsAppBooking(formData: FormData) {
  const db = await getDB();
  const name = String(formData.get("name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const serviceName = String(formData.get("serviceName") ?? "").trim();
  const preferredDateText = String(formData.get("preferredDateText") ?? "").trim();
  const notes = String(formData.get("notes") ?? "").trim();

  const wa = (db.settings.whatsappNumber || "").replace(/[^\d]/g, "");
  const ua = headers().get("user-agent") ?? "";

  const lines = [
    `Hello ${db.settings.siteName}!`,
    "",
    `Name: ${name || "-"}`,
    phone ? `Phone: ${phone}` : null,
    serviceName ? `Service: ${serviceName}` : null,
    preferredDateText ? `Preferred: ${preferredDateText}` : null,
    notes ? `Notes: ${notes}` : null,
    "",
    "Sent from your website booking form.",
  ].filter(Boolean) as string[];

  const message = lines.join("\n");
  const url = `https://wa.me/${wa}?text=${encodeURIComponent(message)}`;

  await updateDB((db2) => {
    db2.bookings.push({
      id: uuid(),
      createdAt: new Date().toISOString(),
      status: "CONFIRMED",
      name,
      phone,
      notes,
      serviceName,
      preferredDateText,
      whatsappNumberUsed: wa,
      whatsappMessage: message,
      userAgent: ua,
    });
  });

  return { url };
}

