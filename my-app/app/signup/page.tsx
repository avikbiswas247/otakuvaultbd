"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, UserPlus, ArrowRight } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          username: form.username,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Signup failed");
        return;
      }

      setSuccess("Account created! Redirecting to login…");

      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (err) {
      setError("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#F8F7F4] dark:bg-black flex items-center justify-center px-4 py-12 transition-colors duration-300 relative top-[10vh]">
      <div className="w-full max-w-lg">
        <div className="rounded-3xl bg-white/70 dark:bg-[#18191D]/80 backdrop-blur-xl border border-[#E6E3DE] dark:border-gray-700 shadow-2xl shadow-violet-100/20 dark:shadow-violet-900/10 p-8 sm:p-10">
          {/* Branding */}
          <div className="flex flex-col items-center mb-8">
            <div className="text-3xl sm:text-4xl font-bold text-[#171717] dark:text-[#FAFAFA] tracking-tight">
              Otaku<span className="text-[#8B5CF6]">Vault</span>
            </div>
            <div className="w-12 h-1 bg-[#8B5CF6] rounded-full my-3" />
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#8B5CF6]/10 dark:bg-violet-900/20 flex items-center justify-center">
                <UserPlus size={20} className="text-[#8B5CF6]" />
              </div>
              <h1 className="text-2xl font-semibold text-[#171717] dark:text-[#FAFAFA]">
                Create your account
              </h1>
            </div>
            <p className="text-sm text-[#5F5F5F] dark:text-[#B0B0B0] mt-2 text-center">
              Join the vault and unlock exclusive anime streetwear.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div>
              <label className="block mb-2 text-sm font-medium text-[#171717] dark:text-[#FAFAFA]">
                Username
              </label>
              <input
                name="username"
                value={form.username}
                onChange={handleChange}
                required
                placeholder="your_username"
                className="w-full rounded-xl border border-[#E6E3DE] dark:border-gray-600 bg-white dark:bg-black px-4 py-3 text-[#171717] dark:text-[#FAFAFA] placeholder:text-[#9CA3AF] dark:placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-[#8B5CF6] transition-shadow"
              />
            </div>

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

            {/* Confirm Password */}
            <div>
              <label className="block mb-2 text-sm font-medium text-[#171717] dark:text-[#FAFAFA]">
                Confirm Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className="w-full rounded-xl border border-[#E6E3DE] dark:border-gray-600 bg-white dark:bg-black px-4 py-3 text-[#171717] dark:text-[#FAFAFA] placeholder:text-[#9CA3AF] dark:placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-[#8B5CF6] transition-shadow"
              />
            </div>

            {/* Error / Success messages */}
            {error && (
              <div className="rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 p-3 text-sm">
                {error}
              </div>
            )}
            {success && (
              <div className="rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-600 dark:text-green-400 p-3 text-sm">
                {success}
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-semibold py-3 shadow-lg shadow-violet-200/30 dark:shadow-violet-900/20 hover:shadow-xl hover:shadow-violet-200/40 dark:hover:shadow-violet-900/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Creating account…
                </>
              ) : (
                <>
                  Sign Up
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

          {/* Login link */}
          <p className="text-center text-sm text-[#5F5F5F] dark:text-[#B0B0B0]">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-[#8B5CF6] hover:underline underline-offset-2"
            >
              Sign in
            </Link>
          </p>
        </div>

        <p className="text-center text-xs text-[#9CA3AF] dark:text-[#6B7280] mt-6">
          © {new Date().getFullYear()} OtakuVault. Premium anime Merch.
        </p>
      </div>
    </main>
  );
}