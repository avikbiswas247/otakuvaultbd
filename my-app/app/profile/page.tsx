"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  User,
  Mail,
  Heart,
  ShoppingCart,
  Package,
  Settings,
  LogOut,
  Loader2,
} from "lucide-react";

interface UserData {
  id: number;
  username: string;
  email: string;
}

export default function ProfilePage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState<UserData | null>(null);

  async function getProfile() {
    try {
      const res = await fetch(
        "/api/auth/me",
        {
          credentials: "include",
        }
      );

      if (!res.ok) {
        router.replace("/login");
        return;
      }

      const data = await res.json();

      setUser(data.user);
    } catch {
      router.replace("/login");
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    try {
      await fetch(
        "/api/auth/logout",
        {
          method: "POST",
          credentials: "include",
        }
      );

      router.replace("/login");
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100 dark:bg-black">
        <Loader2
          className="animate-spin"
          size={40}
        />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-zinc-950 transition-colors ">

      {/* Hero */}

      <section className="bg-gradient-to-r from-orange-600 to-orange-800 h-56 relative">

        <div className="absolute inset-0 bg-black/20" />

      </section>

      <div className="max-w-6xl mx-auto px-5 -mt-24">

        {/* Profile Card */}

        <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl p-8 relative top-[2vh]">

          <div className="flex flex-col lg:flex-row lg:items-center gap-8">

            {/* Avatar */}

            <div className="mx-auto lg:mx-0">

              <div className="w-36 h-36 rounded-full bg-orange-600 flex items-center justify-center shadow-lg">

                <User
                  className="text-white"
                  size={70}
                />

              </div>

            </div>

            {/* Info */}

            <div className="flex-1 text-center lg:text-left">

              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">

                {user?.username}

              </h1>

              <div className="flex justify-center lg:justify-start items-center gap-2 mt-3 text-gray-500 dark:text-gray-400">

                <Mail size={18} />

                {user?.email}

              </div>

            </div>

          </div>

        </div>

        {/* Information */}

        <div className="grid lg:grid-cols-3 gap-8 mt-8">

          {/* Left */}

          <div className="lg:col-span-2 space-y-8">

            {/* Personal Information */}

            <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-lg p-8">

              <h2 className="text-2xl font-semibold mb-6 dark:text-white">

                Personal Information

              </h2>

              <div className="grid sm:grid-cols-2 gap-6">

                <div>

                  <p className="text-gray-500">
                    Username
                  </p>

                  <p className="font-semibold dark:text-white">

                    {user?.username}

                  </p>

                </div>

                <div>

                  <p className="text-gray-500">
                    Email
                  </p>

                  <p className="font-semibold dark:text-white">

                    {user?.email}

                  </p>

                </div>

                <div>

                  <p className="text-gray-500">
                    User ID
                  </p>

                  <p className="font-semibold dark:text-white">

                    #{user?.id}

                  </p>

                </div>

              </div>

            </div>

            {/* Shopping */}

            <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-lg p-8">

              <h2 className="text-2xl font-semibold mb-6 dark:text-white">

                Shopping

              </h2>

              <div className="grid sm:grid-cols-3 gap-5">

                <Link
                  href="/orders"
                  className="rounded-2xl bg-indigo-100 dark:bg-zinc-800 hover:scale-105 transition p-6 text-center"
                >
                  <Package
                    className="mx-auto text-orange-600"
                    size={35}
                  />

                  <p className="mt-3 font-semibold dark:text-white">

                    Orders

                  </p>
                </Link>

                <Link
                  href="/wishlist"
                  className="rounded-2xl bg-pink-100 dark:bg-zinc-800 hover:scale-105 transition p-6 text-center"
                >
                  <Heart
                    className="mx-auto text-pink-600"
                    size={35}
                  />

                  <p className="mt-3 font-semibold dark:text-white">

                    Wishlist

                  </p>
                </Link>

                <Link
                  href="/cart"
                  className="rounded-2xl bg-green-100 dark:bg-zinc-800 hover:scale-105 transition p-6 text-center"
                >
                  <ShoppingCart
                    className="mx-auto text-green-600"
                    size={35}
                  />

                  <p className="mt-3 font-semibold dark:text-white">

                    Cart

                  </p>
                </Link>

              </div>

            </div>

          </div>

          {/* Right */}

          <div className="space-y-6">

            <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-lg p-6">

              <h2 className="font-semibold text-xl mb-5 dark:text-white">

                Quick Actions

              </h2>

              <div className="space-y-4">

                <Link
                  href="/settings"
                  className="flex items-center gap-3 p-4 rounded-xl hover:bg-gray-100 dark:hover:bg-zinc-800 transition"
                >
                  <Settings size={22} />

                  Settings
                </Link>

                <button
                  onClick={logout}
                  className="w-full flex items-center gap-3 p-4 rounded-xl bg-red-600 hover:bg-red-700 text-white transition"
                >
                  <LogOut size={20} />

                  Logout
                </button>

              </div>

            </div>

            <div className="bg-gradient-to-br from-orange-600 to-orange-800 rounded-3xl text-white p-8">

              <h2 className="text-2xl font-bold">

                Welcome Back 👋

              </h2>

              <p className="mt-3 text-sm opacity-90">

                Continue shopping and discover new collectibles, anime figures, manga, and exclusive merchandise.

              </p>

              <Link
                href="/products"
                className="inline-block mt-6 bg-white text-orange-700 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
              >
                Continue Shopping
              </Link>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}