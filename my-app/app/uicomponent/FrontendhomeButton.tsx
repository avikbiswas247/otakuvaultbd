"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import CountUp from "../../components/CountUp";
import Orb from "../../components/Orb";
import { WordRotate } from "@/components/ui/word-rotate";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

export default function HomeButton() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => setMounted(true), []);

  // Orb background color: pure white in light, pure black in dark
  const orbBg =
    mounted && (resolvedTheme || theme) === "dark" ? "#000000" : "#FFFFFF";

  return (
    <div
      className="
        absolute
        inset-0
        z-20
        flex
        items-center
        justify-center
        bg-white
        dark:bg-[#0B0B0D]
        h-[100vh]
        top-[8vh]
        gap-8
        transition-colors duration-700
      "
    >
      {/* Adaptive Orb Background */}
      {mounted && (
        <Orb
          hoverIntensity={2}
          rotateOnHover
          hue={0}
          forceHoverState={false}
          backgroundColor={orbBg}
        />
      )}

      <div
        className="
          w-full
          max-w-5xl
          px-0 sm:px-10
          text-center
          absolute
          top-[6vh]
          z-10
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
            text-[#171717]
            dark:text-[#FAFAFA]
          "
        >
          Welcome to{" "}
          <span className="text-violet-500">Otaku Vault</span>
        </h1>

        {/* Description with rotating word */}
        <p
          className="
            mt-6
            mx-auto
            max-w-2xl
            text-base
            sm:text-lg
            md:text-xl
            text-[#5F5F5F]
            dark:text-[#B0B0B0]
          "
        >
          Get Premium{" "}
          <WordRotate
            words={["Action Figure", "Anime Merch"]}
            className="text-violet-500 text-2xl sm:text-3xl md:text-4xl font-semibold"
          />
        </p>

        {/* Buttons */}
        <div
          className="
            mt-8
            flex
            flex-col
            sm:flex-row
            items-center
            justify-center
            gap-5
          "
        >
          <Link href="/products">
            <InteractiveHoverButton>
              <span className="text-[#171717] dark:text-[#FAFAFA]">
                Explore Products
              </span>
            </InteractiveHoverButton>
          </Link>

          <Link href="/about">
            <InteractiveHoverButton>
              <span className="text-[#171717] dark:text-[#FAFAFA]">
                About Us
              </span>
            </InteractiveHoverButton>
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
            <h2 className="text-2xl sm:text-3xl font-bold text-violet-500">
              <CountUp
                from={0}
                to={1000}
                separator=","
                direction="up"
                duration={3}
                delay={0}
              />
              +
            </h2>
            <p className="text-sm sm:text-base text-violet-500">
              Products
            </p>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-violet-500">
              <CountUp
                from={0}
                to={500}
                separator=","
                direction="up"
                duration={2}
                delay={1}
              />
              +
            </h2>
            <p className="text-sm sm:text-base text-violet-500">
              Happy Customers
            </p>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-violet-500">
              <CountUp
                from={0}
                to={50}
                separator=","
                direction="up"
                duration={1}
                delay={2}
              />
              +
            </h2>
            <p className="text-sm sm:text-base text-violet-500">
              Anime Series
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}