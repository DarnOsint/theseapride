"use server";

import { login as authLogin, logout as authLogout, checkRateLimit } from "@/lib/admin-auth";
import { headers } from "next/headers";

export async function loginAction(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const { allowed, remaining } = checkRateLimit(ip);

  if (!allowed) {
    return { success: false, error: "Too many attempts. Try again in 15 minutes." };
  }

  const result = await authLogin(username, password);
  if (!result.success) {
    return { success: false, error: result.error, remaining };
  }

  return { success: true };
}

export async function logoutAction() {
  await authLogout();
}
