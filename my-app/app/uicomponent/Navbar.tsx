"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "./Logo";
import {
  Menu,
  ShoppingCart,
  User,
  Package,
  Heart,
  LogOut,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./Themetoggle";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type UserPayload = {
  userId: number;
  username?: string;
  email?: string;
};

export default function Navbar() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserPayload | null>(null);
  const [cartCount, setCartCount] = useState(0);

  async function fetchCurrentUser() {
    try {
      const res = await fetch("/api/auth/me", { credentials: "include" });
      if (!res.ok) {
        setIsLoggedIn(false);
        setUser(null);
        return;
      }
      const data = await res.json();
      setUser(data.user);
      setIsLoggedIn(true);
    } catch (error) {
      console.error(error);
      setIsLoggedIn(false);
      setUser(null);
    }
  }

  async function fetchCartCount() {
    try {
      const res = await fetch("/api/cart/count", { credentials: "include" });
      if (!res.ok) {
        setCartCount(0);
        return;
      }
      const data = await res.json();
      setCartCount(data.count ?? 0);
    } catch (error) {
      console.error(error);
      setCartCount(0);
    }
  }

  async function logout() {
    try {
      await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
      setUser(null);
      setIsLoggedIn(false);
      setCartCount(0);
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    async function initialize() {
      await fetchCurrentUser();
      await fetchCartCount();
      setLoading(false);
    }

    initialize();

    const interval = setInterval(() => fetchCartCount(), 3000);
    const updateCart = () => fetchCartCount();
    const handleAuthChange = () => {
      fetchCurrentUser();
      fetchCartCount();
    };

    window.addEventListener("cart-updated", updateCart);
    window.addEventListener("auth-state-changed", handleAuthChange);

    return () => {
      clearInterval(interval);
      window.removeEventListener("cart-updated", updateCart);
      window.removeEventListener("auth-state-changed", handleAuthChange);
    };
  }, []);

  if (loading) return null;

  return (
    <nav
      className="
        fixed top-0 left-0 right-0 z-50
        h-20 lg:h-24
        border-b border-border/40
        bg-background/75 supports-[backdrop-filter]:bg-background/60 backdrop-blur-3xl
        shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.45)]
        transition-all duration-700 ease-out
        flex items-center justify-between
        px-5 sm:px-8 lg:px-14
      "
    >
      {/* Logo */}
      <Link
        href="/"
        className="group text-2xl lg:text-3xl font-black tracking-[0.25rem] uppercase whitespace-nowrap transition-all duration-500 hover:scale-105 hover:tracking-[0.35rem]"
      >
        <Logo />
      </Link>

      {/* Desktop Navigation (visible on tablets and up) */}
      <div className="hidden md:flex items-center gap-6 lg:gap-10">
        <NavigationMenu>
          <NavigationMenuList className="gap-4 md:gap-6 lg:gap-8">
            <NavigationMenuItem>
              <Link
                href="/"
                className="
                  group relative px-2 lg:px-3 py-2
                  text-sm lg:text-base font-medium tracking-wide
                  transition-all duration-500 text-foreground/80
                  hover:text-foreground hover:-translate-y-[2px]
                  after:absolute after:left-0 after:-bottom-1
                  after:h-[2px] after:w-0 after:rounded-full
                  after:bg-violet-600 after:transition-all after:duration-500
                  group-hover:after:w-full
                "
              >
                Home
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link
                href="/products"
                className="
                  group relative px-2 lg:px-3 py-2
                  text-sm lg:text-base font-medium tracking-wide
                  transition-all duration-500 text-foreground/80
                  hover:text-foreground hover:-translate-y-[2px]
                  after:absolute after:left-0 after:-bottom-1
                  after:h-[2px] after:w-0 after:rounded-full
                  after:bg-violet-600 after:transition-all after:duration-500
                  group-hover:after:w-full
                "
              >
                Products
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link
                href="/about"
                className="
                  group relative px-2 lg:px-3 py-2
                  text-sm lg:text-base font-medium tracking-wide
                  transition-all duration-500 text-foreground/80
                  hover:text-foreground hover:-translate-y-[2px]
                  after:absolute after:left-0 after:-bottom-1
                  after:h-[2px] after:w-0 after:rounded-full
                  after:bg-violet-600 after:transition-all after:duration-500
                  group-hover:after:w-full
                "
              >
                About
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Desktop Actions (visible on tablets and up) */}
      <div className="hidden md:flex items-center gap-4 lg:gap-10">
        <ThemeToggle />

        <Link href="/cart">
          <Button
            variant="ghost"
            className="
              relative h-12 rounded-full
              border border-border/50 bg-background/50 backdrop-blur-xl
              px-3 lg:px-5 flex items-center gap-2 lg:gap-3
              transition-all duration-500 hover:scale-105
              hover:shadow-xl hover:bg-background
            "
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="font-medium tracking-wide hidden lg:inline">
              Cart
            </span>
            {cartCount > 0 && (
              <span className="
                absolute -top-2 -right-2
                h-5 min-w-[20px] rounded-full
                bg-violet-600 text-white text-[11px] font-bold
                flex items-center justify-center px-1
              ">
                {cartCount}
              </span>
            )}
          </Button>
        </Link>

        {isLoggedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger
              className="
                h-12 w-12 rounded-full
                border border-border/50 bg-background/50 backdrop-blur-xl
                flex items-center justify-center
                transition-all duration-500 hover:scale-110 hover:shadow-xl
              "
            >
              <User className="h-5 w-5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-72 rounded-3xl border border-border/50 bg-background/95 backdrop-blur-3xl p-2 shadow-2xl"
            >
              <div className="px-3 py-2 border-b">
                <p className="font-semibold">
                  {user?.username ?? "User"}
                </p>
                {user?.email && (
                  <p className="text-xs text-muted-foreground truncate">
                    {user.email}
                  </p>
                )}
              </div>
              <DropdownMenuItem className="rounded-xl cursor-pointer transition-all duration-300 hover:bg-accent focus:bg-accent">
                <Link href="/profile" className="flex items-center gap-2 cursor-pointer">
                  <User className="h-4 w-4" /> Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="rounded-xl cursor-pointer transition-all duration-300 hover:bg-accent focus:bg-accent">
                <Link href="/orders" className="flex items-center gap-2 cursor-pointer">
                  <Package className="h-4 w-4" /> Orders
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="rounded-xl cursor-pointer transition-all duration-300 hover:bg-accent focus:bg-accent">
                <Link href="/wishlist" className="flex items-center gap-2 cursor-pointer">
                  <Heart className="h-4 w-4" /> Wishlist
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="rounded-xl cursor-pointer transition-all duration-300 hover:bg-accent focus:bg-accent"
                onClick={logout}
              >
                <LogOut className="h-4 w-4 mr-2" /> Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex items-center gap-2 lg:gap-3">
            <Link href="/login">
              <Button
                variant="ghost"
                className="
                  rounded-full px-4 lg:px-6 h-10 lg:h-12
                  font-medium tracking-wide text-sm lg:text-base
                  transition-all duration-500 hover:bg-accent hover:scale-105
                "
              >
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button
                className="
                  h-10 lg:h-12 rounded-full bg-violet-600
                  px-5 lg:px-7 font-medium tracking-wide
                  text-sm lg:text-base transition-all duration-500
                  hover:scale-105 hover:bg-violet-500
                  text-gray-100 hover:shadow-lg hover:shadow-violet-500/30
                "
              >
                Sign Up
              </Button>
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Actions (visible only on phones) */}
      <div className="flex md:hidden items-center gap-3">
        <Link href="/cart">
          <Button
            variant="ghost"
            className="
              relative h-12 w-12 rounded-full
              border border-border/50 bg-background/60 backdrop-blur-2xl
              shadow-sm transition-all duration-500 ease-out
              hover:scale-110 hover:-translate-y-[2px]
              hover:bg-background hover:shadow-xl active:scale-95
            "
          >
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="
                absolute -top-1 -right-1
                min-w-[18px] h-[18px] rounded-full
                bg-violet-600 text-white text-[10px] font-bold
                flex items-center justify-center px-1 shadow-md
              ">
                {cartCount}
              </span>
            )}
          </Button>
        </Link>

        <Sheet>
          <SheetTrigger>
            <Button
              variant="ghost"
              className="
                h-12 w-12 rounded-full
                border border-border/50 bg-background/60 backdrop-blur-2xl
                shadow-sm transition-all duration-500 ease-out
                hover:scale-110 hover:-translate-y-[2px]
                hover:bg-background hover:shadow-xl active:scale-95
              "
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="
              w-[340px] sm:w-[380px]
              border-l border-border/50 bg-background/95 backdrop-blur-3xl
              shadow-2xl overflow-y-auto
            "
          >
            <div className="mt-8 flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Otaku Vault</h2>
                <ThemeToggle />
              </div>
              <div className="border-b" />
              <Link
                href="/"
                className="rounded-2xl px-4 py-3 text-lg font-medium transition-all duration-500 hover:bg-accent hover:translate-x-2"
              >
                Home
              </Link>
              <Link
                href="/products"
                className="rounded-2xl px-4 py-3 text-lg font-medium transition-all duration-500 hover:bg-accent hover:translate-x-2"
              >
                Products
              </Link>
              <Link
                href="/about"
                className="rounded-2xl px-4 py-3 text-lg font-medium transition-all duration-500 hover:bg-accent hover:translate-x-2"
              >
                About
              </Link>
              <Link
                href="/cart"
                className="rounded-2xl px-4 py-3 text-lg font-medium transition-all duration-500 hover:bg-accent hover:translate-x-2 relative"
              >
                <span>Cart</span>
                {cartCount > 0 && (
                  <span className="
                    absolute top-1/2 -translate-y-1/2 left-[calc(100%-2rem)]
                    h-5 min-w-[20px] rounded-full
                    bg-violet-600 text-white text-[11px] font-bold
                    flex items-center justify-center px-1 shadow-md
                  ">
                    {cartCount}
                  </span>
                )}
              </Link>
              <div className="border-b" />
              {isLoggedIn ? (
                <>
                  <div className="space-y-1">
                    <p className="font-semibold text-lg">
                      {user?.username ?? "User"}
                    </p>
                    {user?.email && (
                      <p className="text-sm text-muted-foreground">
                        {user.email}
                      </p>
                    )}
                  </div>
                  <Link
                    href="/profile"
                    className="rounded-2xl px-4 py-3 text-lg font-medium transition-all duration-500 hover:bg-accent hover:translate-x-2"
                  >
                    <User className="h-5 w-5 inline mr-2" /> Profile
                  </Link>
                  <Link
                    href="/orders"
                    className="rounded-2xl px-4 py-3 text-lg font-medium transition-all duration-500 hover:bg-accent hover:translate-x-2"
                  >
                    <Package className="h-5 w-5 inline mr-2" /> Orders
                  </Link>
                  <Link
                    href="/wishlist"
                    className="rounded-2xl px-4 py-3 text-lg font-medium transition-all duration-500 hover:bg-accent hover:translate-x-2"
                  >
                    <Heart className="h-5 w-5 inline mr-2" /> Wishlist
                  </Link>
                  <Button
                    onClick={logout}
                    className="
                      mt-6 h-12 w-full rounded-full
                      border border-red-500/20 bg-red-500/5
                      text-red-500 backdrop-blur-xl font-medium tracking-wide
                      transition-all duration-500 ease-out
                      hover:bg-red-500 hover:text-white
                      hover:shadow-lg hover:shadow-red-500/20
                      hover:scale-[1.02] active:scale-95
                    "
                  >
                    <LogOut className="mr-2 h-5 w-5" /> Logout
                  </Button>
                </>
              ) : (
                <div className="flex flex-col gap-4">
                  <Link href="/login">
                    <Button
                      variant="ghost"
                      className="
                        h-12 w-full rounded-full
                        border border-border/50 bg-background/50 backdrop-blur-xl
                        font-medium tracking-wide
                        transition-all duration-500 ease-out
                        hover:bg-accent hover:shadow-lg
                        hover:scale-[1.02] active:scale-95
                      "
                    >
                      Login
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button
                      className="
                        h-12 w-full rounded-full bg-violet-600
                        font-medium tracking-wide
                        shadow-lg shadow-violet-500/20
                        transition-all duration-500 ease-out
                        hover:bg-violet-500 hover:shadow-xl
                        hover:shadow-violet-500/30
                        hover:scale-[1.02] active:scale-95
                      "
                    >
                      Explore Collection
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}