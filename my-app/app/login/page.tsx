"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, ArrowRight } from "lucide-react";
import { mergeGuestCartIntoServer } from "@/app/cart/service/cart";
import {
  invalidateAuthCache,
} from "@/lib/auth/client-auth";

export default function LoginPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Invalid credentials.");
        return;
      }

      invalidateAuthCache();

      // Merge the guest cart (if any) into the server-side cart.
      await mergeGuestCartIntoServer();

      // Notify the navbar that auth state changed.
      window.dispatchEvent(new Event("auth-state-changed"));

      // Respect a safe redirect param (e.g. /login?redirect=/checkout).
      let redirect = "/profile";
      try {
        const param = new URLSearchParams(
          window.location.search
        ).get("redirect");
        if (param && param.startsWith("/") && !param.startsWith("//")) {
          redirect = param;
        }
      } catch {
        // fall back to /profile
      }

      router.push(redirect);
    } catch (err) {
      setError("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#F8F7F4] dark:bg-black flex items-center justify-center px-4 py-12 transition-colors duration-300 relative top-[8vh]">
      <div className="w-full max-w-md">
        {/* Glass card */}
        <div className="rounded-3xl bg-white/70 dark:bg-[#18191D]/80 backdrop-blur-xl border border-[#E6E3DE] dark:border-gray-700 shadow-2xl shadow-violet-100/20 dark:shadow-violet-900/10 p-8">
          {/* Branding */}
          <div className="flex flex-col items-center mb-8">
            <div className="text-3xl font-bold text-[#171717] dark:text-[#FAFAFA] tracking-tight mb-2">
              Otaku<span className="text-[#8B5CF6]">Vault</span>
            </div>
            <div className="w-12 h-1 bg-[#8B5CF6] rounded-full mb-4" />
            <h1 className="text-2xl font-semibold text-[#171717] dark:text-[#FAFAFA]">
              Welcome back
            </h1>
            <p className="text-sm text-[#5F5F5F] dark:text-[#B0B0B0] mt-1 text-center">
              Sign in to your account to continue
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block mb-2 text-sm font-medium text-[#171717] dark:text-[#FAFAFA]">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="w-full rounded-xl border border-[#E6E3DE] dark:border-gray-600 bg-white dark:bg-black px-4 py-3 text-[#171717] dark:text-[#FAFAFA] placeholder:text-[#9CA3AF] dark:placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-[#8B5CF6] transition-shadow"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block mb-2 text-sm font-medium text-[#171717] dark:text-[#FAFAFA]">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-[#E6E3DE] dark:border-gray-600 bg-white dark:bg-black px-4 py-3 pr-12 text-[#171717] dark:text-[#FAFAFA] placeholder:text-[#9CA3AF] dark:placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-[#8B5CF6] transition-shadow"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-3.5 right-4 text-[#5F5F5F] dark:text-[#B0B0B0] hover:text-[#8B5CF6] transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 p-3 text-sm">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-semibold py-3 shadow-lg shadow-violet-200/30 dark:shadow-violet-900/20 hover:shadow-xl hover:shadow-violet-200/40 dark:hover:shadow-violet-900/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Signing in…
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="flex-1 h-px bg-[#E6E3DE] dark:bg-gray-700" />
            <span className="text-sm text-[#9CA3AF] dark:text-[#6B7280]">or</span>
            <div className="flex-1 h-px bg-[#E6E3DE] dark:bg-gray-700" />
          </div>

          {/* Signup link */}
          <p className="text-center text-sm text-[#5F5F5F] dark:text-[#B0B0B0]">
            Don’t have an account?{" "}
            <Link
              href="/signup"
              className="font-semibold text-[#8B5CF6] hover:underline underline-offset-2"
            >
              Create one
            </Link>
          </p>
        </div>

        {/* Subtle footer text */}
        <p className="text-center text-xs text-[#9CA3AF] dark:text-[#6B7280] mt-6">
          © {new Date().getFullYear()} OtakuVault. Premium anime Merch.
        </p>
      </div>
    </main>
  );
}