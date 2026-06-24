import { createHash, randomBytes } from "crypto";
import { cookies } from "next/headers";

const ADMIN_COOKIE = "bukola_session";
const ADMIN_SECRET = process.env.ADMIN_SECRET || "theseapride-admin-secret-2026";
const SESSION_DURATION_MS = 24 * 60 * 60 * 1000;

const ADMIN_USERNAME = "Bukola";
const ADMIN_PASSWORD = "Highschool1@2653";

function hmac(data: string, secret: string): string {
  return createHash("sha256").update(data + secret).digest("hex");
}

function createSessionToken(): string {
  const payload = JSON.stringify({ timestamp: Date.now(), role: "admin" });
  const hash = hmac(payload, ADMIN_SECRET);
  const encoded = Buffer.from(payload).toString("base64url");
  return `${encoded}.${hash}`;
}

function verifySessionToken(token: string): boolean {
  try {
    const parts = token.split(".");
    if (parts.length !== 2) return false;
    const [encoded, hash] = parts;
    const payload = Buffer.from(encoded, "base64url").toString();
    const expected = hmac(payload, ADMIN_SECRET);
    if (hash !== expected) return false;
    const data = JSON.parse(payload);
    if (Date.now() - data.timestamp > SESSION_DURATION_MS) return false;
    return data.role === "admin";
  } catch {
    return false;
  }
}

const loginAttempts = new Map<string, { count: number; lastAttempt: number }>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000;

function getClientIp(): string {
  try {
    const { headers } = require("next/headers");
    const h = headers();
    const forwarded = h.get("x-forwarded-for");
    return forwarded?.split(",")[0]?.trim() || "unknown";
  } catch {
    return "unknown";
  }
}

export function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const entry = loginAttempts.get(ip);

  if (!entry) {
    loginAttempts.set(ip, { count: 1, lastAttempt: now });
    return { allowed: true, remaining: MAX_ATTEMPTS - 1 };
  }

  if (now - entry.lastAttempt > WINDOW_MS) {
    loginAttempts.set(ip, { count: 1, lastAttempt: now });
    return { allowed: true, remaining: MAX_ATTEMPTS - 1 };
  }

  if (entry.count >= MAX_ATTEMPTS) {
    const resetIn = Math.ceil((WINDOW_MS - (now - entry.lastAttempt)) / 1000 / 60);
    return { allowed: false, remaining: 0 };
  }

  entry.count++;
  entry.lastAttempt = now;
  return { allowed: true, remaining: MAX_ATTEMPTS - entry.count };
}

export function resetRateLimit(ip: string): void {
  loginAttempts.delete(ip);
}

export async function login(username: string, password: string): Promise<{
  success: boolean;
  error?: string;
}> {
  if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
    return { success: false, error: "Invalid credentials" };
  }
  const cookieStore = await cookies();
  const token = createSessionToken();
  cookieStore.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/bukola",
    maxAge: 60 * 60 * 24,
  });
  return { success: true };
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE);
}

export async function isAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ADMIN_COOKIE)?.value;
    if (!token) return false;
    return verifySessionToken(token);
  } catch {
    return false;
  }
}
