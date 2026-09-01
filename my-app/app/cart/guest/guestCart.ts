// app/cart/guest/guestCart.ts
"use client";

const STORAGE_KEY = "otaku_guest_cart_v1";

export interface GuestCartItem {
  productId: number;
  quantity: number;
}

function notify() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("cart-updated"));
  }
}

export function getGuestCartRaw(): GuestCartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function save(items: GuestCartItem[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    notify();
  } catch {
    // quota exceeded or unavailable — fail silently
  }
}

export function addGuestCartItem(productId: number, quantity = 1) {
  const items = getGuestCartRaw();
  const existing = items.find((i) => i.productId === productId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    items.push({ productId, quantity });
  }
  save(items);
}

export function removeGuestCartItem(productId: number) {
  const items = getGuestCartRaw().filter((i) => i.productId !== productId);
  save(items);
}

export function updateGuestCartQuantity(productId: number, quantity: number) {
  if (quantity <= 0) {
    removeGuestCartItem(productId);
    return;
  }
  const items = getGuestCartRaw();
  const item = items.find((i) => i.productId === productId);
  if (item) {
    item.quantity = quantity;
    save(items);
  }
}

export function getGuestCartCount(): number {
  return getGuestCartRaw().reduce((sum, i) => sum + i.quantity, 0);
}

export function clearGuestCart() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
    notify();
  } catch {
    // fail silently
  }
}

export function hasGuestCart(): boolean {
  return getGuestCartRaw().length > 0;
}
