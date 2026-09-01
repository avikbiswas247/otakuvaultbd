// lib/auth/client-auth.ts
"use client";

let cachedResult: boolean | null = null;
let cacheTimestamp = 0;
const CACHE_TTL = 30_000; // 30 seconds

export async function isLoggedIn(): Promise<boolean> {
  if (typeof window === "undefined") return false;

  const now = Date.now();
  if (cachedResult !== null && now - cacheTimestamp < CACHE_TTL) {
    return cachedResult;
  }

  try {
    const res = await fetch("/api/auth/me", {
      credentials: "include",
      cache: "no-store",
    });
    cachedResult = res.ok;
  } catch {
    cachedResult = false;
  }

  cacheTimestamp = Date.now();
  return cachedResult;
}

/** Force-invalidate the cache (e.g. after login/logout). */
export function invalidateAuthCache() {
  cachedResult = null;
  cacheTimestamp = 0;
}
