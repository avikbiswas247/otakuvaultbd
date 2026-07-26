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
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
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
      const res = await fetch("/api/auth/me", {
        credentials: "include",
      });

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
      const res = await fetch("/api/cart/count", {
        credentials: "include",
      });

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
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

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

    const interval = setInterval(() => {
      fetchCartCount();
    }, 3000);

    const updateCart = () => fetchCartCount();

    window.addEventListener("cart-updated", updateCart);

    return () => {
      clearInterval(interval);

      window.removeEventListener(
        "cart-updated",
        updateCart
      );
    };
  }, []);

  if (loading) {
    return null;
  }

  return (
    <nav
      className="
      fixed
      top-0
      left-0
      right-0
      z-50
      h-16
      bg-background/80
      backdrop-blur-md
      border-b
      border-border
      flex
      items-center
      justify-between
      px-4
      sm:px-6
      lg:px-10
      "
    >
      {/* Logo */}

      <Link
        href="/"
        className="
        text-2xl
        font-bold
        tracking-wide
        whitespace-nowrap
        "
      >
        <Logo />
      </Link>

      {/* Desktop Navigation */}

      <div className="hidden md:flex items-center gap-8">
        <NavigationMenu>
          <NavigationMenuList className="gap-2">

            <NavigationMenuItem>
              <Link
                href="/"
                className="
                px-4
                py-2
                rounded-lg
                transition-all
                hover:bg-orange-500
                hover:text-white
                "
              >
                Home
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link
                href="/products"
                className="
                px-4
                py-2
                rounded-lg
                transition-all
                hover:bg-orange-500
                hover:text-white
                "
              >
                Products
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link
                href="/about"
                className="
                px-4
                py-2
                rounded-lg
                transition-all
                hover:bg-orange-500
                hover:text-white
                "
              >
                About
              </Link>
            </NavigationMenuItem>

          </NavigationMenuList>
        </NavigationMenu>
      </div>
            {/* Desktop Actions */}

      <div className="hidden md:flex items-center gap-4">

        <ThemeToggle />

        <Link href="/cart">
          <Button
            variant="secondary"
            className="relative flex items-center gap-2"
          >
            <ShoppingCart className="h-5 w-5" />

            <span>Cart</span>

            {cartCount > 0 && (
              <span
                className="
                absolute
                -top-2
                -right-2
                min-w-[20px]
                h-5
                rounded-full
                bg-red-500
                text-white
                text-xs
                font-bold
                flex
                items-center
                justify-center
                px-1
                "
              >
                {cartCount}
              </span>
            )}
          </Button>
        </Link>

        {isLoggedIn ? (
          <DropdownMenu>

            <DropdownMenuTrigger >

              
                <User className="h-6 w-6" />
              

            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-56"
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

              <DropdownMenuItem >
                <Link
                  href="/profile"
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <User className="h-4 w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem >
                <Link
                  href="/orders"
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Package className="h-4 w-4" />
                  Orders
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem >
                <Link
                  href="/wishlist"
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Heart className="h-4 w-4" />
                  Wishlist
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={logout}
                className="cursor-pointer text-red-500"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </DropdownMenuItem>

            </DropdownMenuContent>

          </DropdownMenu>

        ) : (

          <div className="flex items-center gap-3">

            <Link href="/login">
              <Button variant="ghost">
                Login
              </Button>
            </Link>

            <Link href="/signup">
              <InteractiveHoverButton>
                Sign Up
              </InteractiveHoverButton>
            </Link>

          </div>

        )}

      </div>

      {/* Mobile Actions */}

      <div className="flex md:hidden items-center gap-2">

        <Link href="/cart">

          <Button
            variant="ghost"
            size="icon"
            className="relative"
          >

            <ShoppingCart className="h-5 w-5" />

            {cartCount > 0 && (
              <span
                className="
                absolute
                -top-1
                -right-1
                min-w-[18px]
                h-[18px]
                rounded-full
                bg-red-500
                text-white
                text-[10px]
                font-bold
                flex
                items-center
                justify-center
                "
              >
                {cartCount}
              </span>
            )}

          </Button>

        </Link>

        <Sheet>

          <SheetTrigger >

            
              
              <Menu className="h-6 w-6" />
            

          </SheetTrigger>
                    <SheetContent
            side="right"
            className="w-[300px] sm:w-[340px]"
          >
            <div className="mt-8 flex flex-col gap-6">

              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">
                  Otaku Vault
                </h2>

                <ThemeToggle />
              </div>

              <div className="border-b" />

              <Link
                href="/"
                className="
                text-lg
                font-medium
                hover:text-orange-500
                transition-colors
                "
              >
                Home
              </Link>

              <Link
                href="/products"
                className="
                text-lg
                font-medium
                hover:text-orange-500
                transition-colors
                "
              >
                Products
              </Link>

              <Link
                href="/about"
                className="
                text-lg
                font-medium
                hover:text-orange-500
                transition-colors
                "
              >
                About
              </Link>

              <Link
                href="/cart"
                className="
                flex
                items-center
                justify-between
                text-lg
                font-medium
                hover:text-orange-500
                transition-colors
                "
              >
                <span>Cart</span>

                {cartCount > 0 && (
                  <span
                    className="
                    bg-red-500
                    text-white
                    text-xs
                    font-bold
                    rounded-full
                    min-w-[22px]
                    h-[22px]
                    flex
                    items-center
                    justify-center
                    "
                  >
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
                    className="
                    flex
                    items-center
                    gap-3
                    text-lg
                    hover:text-orange-500
                    transition-colors
                    "
                  >
                    <User className="h-5 w-5" />
                    Profile
                  </Link>

                  <Link
                    href="/orders"
                    className="
                    flex
                    items-center
                    gap-3
                    text-lg
                    hover:text-orange-500
                    transition-colors
                    "
                  >
                    <Package className="h-5 w-5" />
                    Orders
                  </Link>

                  <Link
                    href="/wishlist"
                    className="
                    flex
                    items-center
                    gap-3
                    text-lg
                    hover:text-orange-500
                    transition-colors
                    "
                  >
                    <Heart className="h-5 w-5" />
                    Wishlist
                  </Link>

                  <Button
                    variant="destructive"
                    onClick={logout}
                    className="mt-6 w-full"
                  >
                    <LogOut className="mr-2 h-5 w-5" />
                    Logout
                  </Button>

                </>
              ) : (
                <div className="flex flex-col gap-4">

                  <Link href="/login">
                    <Button
                      className="w-full"
                      variant="outline"
                    >
                      Login
                    </Button>
                  </Link>

                  <Link href="/signup">
                    <Button className="w-full">
                      Sign Up
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