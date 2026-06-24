import { isAuthenticated } from "@/lib/admin-auth";
import { redirect } from "next/navigation";

export default async function BukolaPage() {
  const authed = await isAuthenticated();
  if (authed) redirect("/bukola/dashboard");
  else redirect("/bukola/login");
}
