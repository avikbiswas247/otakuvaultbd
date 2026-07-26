"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

export default function HomeButton() {
  return (
    <div
      className="
      absolute
      inset-0
      z-20
      flex
      items-center
      justify-center
      bg-black/55
      top-[10vh]
      h-[120vh]
      "
    >
      <div
        className="
        w-full
        max-w-5xl
        px-6
        sm:px-10
        text-center
        text-white
        absolute
        top-[6vh]
        "
      >
        {/* Heading */}
        <h1
          className="
          text-4xl
          sm:text-5xl
          md:text-6xl
          lg:text-7xl
          font-extrabold
          leading-tight
          tracking-tight
          "
        >
          Welcome to
          <span className="block text-orange-500">
            Otaku Vault
          </span>
        </h1>

        {/* Description */}
        <p
          className="
          mt-6
          mx-auto
          max-w-2xl
          text-base
          sm:text-lg
          md:text-xl
          text-gray-200
          "
        >
          Discover premium anime figures, collectibles,
          manga, accessories, and exclusive merchandise
          from your favorite series.
        </p>

        {/* Buttons */}
        <div
          className="
          mt-10
          flex
          flex-col
          sm:flex-row
          items-center
          justify-center
          gap-5
          "
        >
          <Link href="/products">
            <div className="rounded-xl dark:text-white  text-black  transition-colors">
              <InteractiveHoverButton>
                Explore Products
              </InteractiveHoverButton>
            </div>
          </Link>

          <Link href="/about">
            <div className="rounded-xl dark:text-white  text-black transition-colors">
              <InteractiveHoverButton>
                About Us
              </InteractiveHoverButton>
            </div>
          </Link>
        </div>

        {/* Stats */}
        <div
          className="
          mt-14
          grid
          grid-cols-3
          gap-6
          max-w-3xl
          mx-auto
          "
        >
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-orange-400">
              1000+
            </h2>
            <p className="text-sm sm:text-base text-gray-300">
              Products
            </p>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-blue-400">
              500+
            </h2>
            <p className="text-sm sm:text-base text-gray-300">
              Happy Customers
            </p>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-green-400">
              50+
            </h2>
            <p className="text-sm sm:text-base text-gray-300">
              Anime Series
            </p>
          </div>
        </div>

        
      </div>
    </div>
  );
}