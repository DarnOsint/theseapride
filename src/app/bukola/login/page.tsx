"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginAction } from "@/app/actions/admin-auth";
import { Waves } from "lucide-react";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const result = await loginAction(formData);

    if (result.success) {
      router.push("/bukola/dashboard");
      router.refresh();
    } else {
      setError(result.error || "Login failed");
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md mx-4">
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-sea-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-sea-500/30">
            <Waves className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-white">Admin Login</h1>
          <p className="text-sea-200 text-sm mt-1">TheSeaPride Management</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-sea-200 mb-1.5">Username</label>
            <input
              name="username"
              required
              autoFocus
              autoComplete="username"
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-sea-300 focus:border-sea-400 focus:ring-2 focus:ring-sea-500/30 outline-none transition-all text-sm"
              placeholder="Enter username"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-sea-200 mb-1.5">Password</label>
            <input
              type="password"
              name="password"
              required
              autoComplete="current-password"
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-sea-300 focus:border-sea-400 focus:ring-2 focus:ring-sea-500/30 outline-none transition-all text-sm"
              placeholder="Enter password"
            />
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-400/30 rounded-xl px-4 py-3 text-sm text-red-200">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-sea-500 hover:bg-sea-400 disabled:bg-sea-600/50 text-white py-3 rounded-xl font-semibold transition-all hover:shadow-lg hover:shadow-sea-500/25 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
      <p className="text-center text-sea-300 text-xs mt-6">
        Authorized personnel only
      </p>
    </div>
  );
}
