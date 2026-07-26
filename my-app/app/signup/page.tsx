"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, UserPlus } from "lucide-react";

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

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        "/api/auth/register",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          credentials: "include",

          body: JSON.stringify({
            username: form.username,
            email: form.email,
            password: form.password,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Signup failed");
        return;
      }

      setSuccess("Account created successfully.");

      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (err) {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-purple-100 dark:from-zinc-950 dark:via-black dark:to-zinc-900 px-4 py-10 transition-colors">

      <div className="w-full max-w-md relative top-[6vh]">

        <div className="rounded-3xl border border-white/20 dark:border-zinc-700 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl shadow-2xl p-8">

          <div className="flex flex-col items-center">

            <div className="w-20 h-20 rounded-full bg-orange-600 flex items-center justify-center mb-4">

              <UserPlus
                size={36}
                className="text-white"
              />

            </div>

            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Create Account
            </h1>

            <p className="text-gray-500 dark:text-gray-400 mt-2 text-center">
              Join us today and start your journey.
            </p>

          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5 mt-8"
          >

            <div>

              <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200">
                Username
              </label>

              <input
                name="username"
                value={form.username}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-600"
                placeholder="avik1234"
              />

            </div>

            <div>

              <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-600"
                placeholder="avik@example.com"
              />

            </div>

            <div>

              <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200">
                Password
              </label>

              <div className="relative">

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:orange-indigo-600"
                  placeholder="••••••••"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  className="absolute right-4 top-3 text-gray-500"
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>

              </div>

            </div>

            <div>

              <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200">
                Confirm Password
              </label>

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-600"
                placeholder="••••••••"
              />

            </div>

            {error && (
              <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg p-3 text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg p-3 text-sm">
                {success}
              </div>
            )}

            <button
              disabled={loading}
              className="w-full rounded-xl bg-orange-600 hover:bg-orange-700 transition py-3 text-white font-semibold flex justify-center items-center gap-2 disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2
                    className="animate-spin"
                    size={18}
                  />
                  Creating Account...
                </>
              ) : (
                "Sign Up"
              )}
            </button>

          </form>

          <div className="mt-8 text-center text-gray-600 dark:text-gray-300">

            Already have an account?

            <Link
              href="/login"
              className="ml-2 text-orange-600 font-semibold hover:underline"
            >
              Login
            </Link>

          </div>

        </div>

      </div>

    </main>
  );
}