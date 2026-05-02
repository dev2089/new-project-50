import crypto from "node:crypto";
import { cookies } from "next/headers";
import { getDB } from "@/lib/store";
import bcrypt from "bcryptjs";

const COOKIE_NAME = "ni_admin";

function secret() {
  const s = process.env.SESSION_SECRET ?? "dev-secret-change-me";
  return Buffer.from(s, "utf8");
}

function b64url(input: Buffer | string) {
  const buf = typeof input === "string" ? Buffer.from(input, "utf8") : input;
  return buf
    .toString("base64")
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replaceAll("=", "");
}

function b64urlDecode(input: string) {
  const pad = input.length % 4 === 0 ? "" : "=".repeat(4 - (input.length % 4));
  const b64 = input.replaceAll("-", "+").replaceAll("_", "/") + pad;
  return Buffer.from(b64, "base64");
}

function sign(payloadJson: string) {
  return crypto.createHmac("sha256", secret()).update(payloadJson).digest();
}

export type AdminTokenPayload = { uid: string; exp: number };

export function createAdminToken(uid: string, ttlSeconds: number) {
  const payload: AdminTokenPayload = {
    uid,
    exp: Math.floor(Date.now() / 1000) + ttlSeconds,
  };
  const payloadJson = JSON.stringify(payload);
  const sig = sign(payloadJson);
  return `${b64url(payloadJson)}.${b64url(sig)}`;
}

export function verifyAdminToken(token: string): AdminTokenPayload | null {
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const payloadJson = b64urlDecode(parts[0]).toString("utf8");
  const sig = b64urlDecode(parts[1]);
  const expected = sign(payloadJson);
  if (!crypto.timingSafeEqual(sig, expected)) return null;
  const payload = JSON.parse(payloadJson) as AdminTokenPayload;
  if (!payload?.uid || !payload?.exp) return null;
  if (payload.exp < Math.floor(Date.now() / 1000)) return null;
  return payload;
}

export async function getAdminUser() {
  const token = cookies().get(COOKIE_NAME)?.value;
  if (!token) return null;
  const payload = verifyAdminToken(token);
  if (!payload) return null;
  const db = await getDB();
  const user = db.users.find((u) => u.id === payload.uid);
  return user ? { id: user.id, email: user.email } : null;
}

export async function requireAdminUser() {
  const user = await getAdminUser();
  if (!user) throw new Error("UNAUTHORIZED");
  return user;
}

export async function verifyPassword(email: string, password: string) {
  const db = await getDB();
  const user = db.users.find((u) => u.email === email.toLowerCase());
  if (!user) return null;
  const ok = await bcrypt.compare(password, user.passwordHash);
  return ok ? { id: user.id, email: user.email } : null;
}

export const adminCookieName = COOKIE_NAME;

