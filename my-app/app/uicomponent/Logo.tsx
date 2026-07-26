"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Logo() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <Image
        src="/images/logo_2-removebg-preview new.png"
        alt="Otaku Vault"
        width={180}
        height={60}
        priority
      />
    );
  }

  return (
    <Image
      src={
        resolvedTheme === "dark"
          ? "/images/logo_2-removebg-preview.png"
          : "/images/logo_2-removebg-preview new.png"
      }
      alt="Otaku Vault"
      width={180}
      height={60}
      priority
    />
  );
}