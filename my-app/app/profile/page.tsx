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
  ChevronRight,
  Shield,
  Star,
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
      const res = await fetch("/api/auth/me", {
        credentials: "include",
      });

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
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
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
      <div className="min-h-screen flex justify-center items-center bg-[#F8F7F4] dark:bg-black">
        <Loader2 className="animate-spin text-[#8B5CF6]" size={40} />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8F7F4] dark:bg-black transition-colors duration-300">
      {/* Hero banner */}
      <div className="relative h-48 md:h-56 bg-gradient-to-r from-[#8B5CF6] via-[#7C3AED] to-[#6D28D9] overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        {/* Subtle decorative pattern */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10 bg-repeat"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-10">
        {/* Profile Card */}
        <div className="bg-white dark:bg-[#18191D] border border-[#E6E3DE] dark:border-gray-700 rounded-3xl shadow-xl shadow-violet-100/30 dark:shadow-violet-900/10 p-6 md:p-8 transition-all">
          <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-8">
            {/* Avatar */}
            <div className="mx-auto md:mx-0">
              <div className="w-32 h-32 md:w-36 md:h-36 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] flex items-center justify-center shadow-lg shadow-violet-200/40 dark:shadow-violet-900/30 ring-4 ring-white dark:ring-[#18191D]">
                <User className="text-white" size={64} />
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold text-[#171717] dark:text-[#FAFAFA] tracking-tight">
                {user?.username}
              </h1>
              <div className="flex justify-center md:justify-start items-center gap-2 mt-3 text-[#5F5F5F] dark:text-[#B0B0B0]">
                <Mail size={16} />
                <span>{user?.email}</span>
              </div>
              <div className="mt-3 flex justify-center md:justify-start items-center gap-2 text-sm text-[#C1A68A] dark:text-[#C1A68A]">
                <Shield size={14} />
                <span>Member since 2024</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mt-8 mb-16">
          {/* Left column - main info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Personal Information */}
            <div className="bg-white dark:bg-[#18191D] border border-[#E6E3DE] dark:border-gray-700 rounded-3xl shadow-md p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-[#171717] dark:text-[#FAFAFA] mb-6 relative after:absolute after:bottom-0 after:left-0 after:w-12 after:h-1 after:bg-[#8B5CF6] after:rounded-full pb-2">
                Personal Information
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-[#5F5F5F] dark:text-[#B0B0B0] mb-1">Username</p>
                  <p className="font-semibold text-[#171717] dark:text-[#FAFAFA]">{user?.username}</p>
                </div>
                <div>
                  <p className="text-sm text-[#5F5F5F] dark:text-[#B0B0B0] mb-1">Email</p>
                  <p className="font-semibold text-[#171717] dark:text-[#FAFAFA]">{user?.email}</p>
                </div>
                <div>
                  <p className="text-sm text-[#5F5F5F] dark:text-[#B0B0B0] mb-1">User ID</p>
                  <p className="font-semibold text-[#171717] dark:text-[#FAFAFA]">#{user?.id}</p>
                </div>
              </div>
            </div>

            {/* Shopping Quick Links */}
            <div className="bg-white dark:bg-[#18191D] border border-[#E6E3DE] dark:border-gray-700 rounded-3xl shadow-md p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-[#171717] dark:text-[#FAFAFA] mb-6 relative after:absolute after:bottom-0 after:left-0 after:w-12 after:h-1 after:bg-[#8B5CF6] after:rounded-full pb-2">
                Shopping
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <Link
                  href="/orders"
                  className="group flex flex-col items-center p-5 rounded-2xl border border-[#E6E3DE] dark:border-gray-700 bg-[#F2EFEA] dark:bg-black hover:bg-[#F7F5FF] dark:hover:bg-violet-900/20 hover:border-[#8B5CF6] transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <Package className="w-8 h-8 text-[#5F5F5F] dark:text-[#B0B0B0] group-hover:text-[#8B5CF6] transition-colors" />
                  <span className="mt-3 font-semibold text-[#171717] dark:text-[#FAFAFA] text-sm">Orders</span>
                </Link>
                <Link
                  href="/wishlist"
                  className="group flex flex-col items-center p-5 rounded-2xl border border-[#E6E3DE] dark:border-gray-700 bg-[#F2EFEA] dark:bg-black hover:bg-[#F7F5FF] dark:hover:bg-violet-900/20 hover:border-[#8B5CF6] transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <Heart className="w-8 h-8 text-[#5F5F5F] dark:text-[#B0B0B0] group-hover:text-[#8B5CF6] transition-colors" />
                  <span className="mt-3 font-semibold text-[#171717] dark:text-[#FAFAFA] text-sm">Wishlist</span>
                </Link>
                <Link
                  href="/cart"
                  className="group flex flex-col items-center p-5 rounded-2xl border border-[#E6E3DE] dark:border-gray-700 bg-[#F2EFEA] dark:bg-black hover:bg-[#F7F5FF] dark:hover:bg-violet-900/20 hover:border-[#8B5CF6] transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <ShoppingCart className="w-8 h-8 text-[#5F5F5F] dark:text-[#B0B0B0] group-hover:text-[#8B5CF6] transition-colors" />
                  <span className="mt-3 font-semibold text-[#171717] dark:text-[#FAFAFA] text-sm">Cart</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white dark:bg-[#18191D] border border-[#E6E3DE] dark:border-gray-700 rounded-3xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-[#171717] dark:text-[#FAFAFA] mb-5">Quick Actions</h2>
              <div className="space-y-2">
                <Link
                  href="/settings"
                  className="flex items-center justify-between p-4 rounded-xl text-[#171717] dark:text-[#FAFAFA] hover:bg-[#F7F5FF] dark:hover:bg-violet-900/20 hover:text-[#8B5CF6] transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <Settings className="w-5 h-5 transition-colors group-hover:text-[#8B5CF6]" />
                    <span className="font-medium">Settings</span>
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>

                <button
                  onClick={logout}
                  className="w-full flex items-center justify-between p-4 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Logout</span>
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </div>
            </div>

            {/* Premium Call-to-Action */}
            <div className="bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] rounded-3xl shadow-lg overflow-hidden relative">
              <div className="p-6 text-white relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <Star className="w-5 h-5 fill-white" />
                  <span className="text-sm font-medium uppercase tracking-wider opacity-80">Premium Collection</span>
                </div>
                <h2 className="text-2xl font-bold mb-2">Welcome Back 👋</h2>
                <p className="text-sm opacity-90 leading-relaxed mb-6">
                  Discover exclusive anime‑inspired streetwear, limited drops, and collectibles curated just for true fans.
                </p>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 bg-white text-[#8B5CF6] px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all shadow-md hover:shadow-lg"
                >
                  Continue Shopping
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              {/* Decorative circles */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white opacity-5 rounded-full" />
              <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-white opacity-5 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}