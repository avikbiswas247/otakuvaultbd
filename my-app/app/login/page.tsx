"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, LogIn } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

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

    try {
      setLoading(true);

      const response = await fetch(
        "/api/auth/login", // Change to your backend URL
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          credentials: "include",

          body: JSON.stringify({
            email: form.email,
            password: form.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed.");
        return;
      }

      router.push("/profile");
    } catch (err) {
      setError("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 dark:from-zinc-950 dark:via-black dark:to-zinc-900 transition-colors flex items-center justify-center px-4 py-8">

      <div className="w-full max-w-md">

        <div className="rounded-3xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-white/20 dark:border-zinc-700 shadow-2xl p-8">

          <div className="flex flex-col items-center">

            <div className="w-20 h-20 rounded-full bg-orange-600 flex items-center justify-center mb-5">

              <LogIn
                size={38}
                className="text-white"
              />

            </div>

            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Welcome Back
            </h1>

            <p className="text-gray-500 dark:text-gray-400 mt-2 text-center">
              Login to continue to your account.
            </p>

          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >

            {/* Email */}

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
                placeholder="john@example.com"
                className="w-full rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-600 transition"
              />

            </div>

            {/* Password */}

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
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-orange-600 transition"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute top-3.5 right-4 text-gray-500 hover:text-orange-600"
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>

              </div>

            </div>

            {/* Error */}

            {error && (
              <div className="rounded-lg bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 p-3 text-sm">
                {error}
              </div>
            )}

            {/* Login Button */}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-orange-600 hover:bg-orange-700 transition py-3 text-white font-semibold flex justify-center items-center gap-2 disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2
                    className="animate-spin"
                    size={18}
                  />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </button>

          </form>

          {/* Divider */}

          <div className="my-6 flex items-center gap-4">

            <div className="flex-1 h-px bg-gray-300 dark:bg-zinc-700" />

            <span className="text-gray-400 text-sm">
              OR
            </span>

            <div className="flex-1 h-px bg-gray-300 dark:bg-zinc-700" />

          </div>

          {/* Signup Link */}

          <div className="text-center text-gray-600 dark:text-gray-300">

            Don't have an account?

            <Link
              href="/signup"
              className="ml-2 font-semibold text-orange-600 hover:underline"
            >
              Create one
            </Link>

          </div>

        </div>

      </div>

    </main>
  );
}