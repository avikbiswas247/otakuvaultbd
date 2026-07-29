// app/profile/layout.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    // Force server components to re‑render (e.g., any server‑side navbar)
    router.refresh();

    // Tell the client‑side navbar to re‑fetch user + cart count immediately
    window.dispatchEvent(new Event("auth-state-changed"));
  }, [router]);

  return <>{children}</>;
}