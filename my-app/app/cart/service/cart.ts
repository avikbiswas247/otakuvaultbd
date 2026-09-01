import { CartItem } from "@/app/cart/type/cart";
import { isLoggedIn } from "@/lib/auth/client-auth";
import {
  getGuestCartRaw,
  addGuestCartItem,
  removeGuestCartItem,
  updateGuestCartQuantity,
  getGuestCartCount,
  clearGuestCart,
} from "@/app/cart/guest/guestCart";

const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  return process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
};

const API = `${getBaseUrl()}/api/cart`;

/* ---------- guest helpers ---------- */

async function fetchGuestProducts(
  ids: number[]
): Promise<Record<number, any>> {
  if (ids.length === 0) return {};
  const res = await fetch(`${getBaseUrl()}/api/product/batch`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productIds: ids }),
  });
  if (!res.ok) return {};
  const data = await res.json();
  const map: Record<number, any> = {};
  for (const p of data.products ?? []) {
    map[p.id] = p;
  }
  return map;
}

function mapGuestCartItems(raw: any[], products: Record<number, any>): CartItem[] {
  return raw
    .filter((i) => products[i.productId])
    .map((i) => {
      const p = products[i.productId];
      return {
        cart_item_id: undefined,
        id: p.id,
        name: p.name,
        description: p.description,
        price: String(p.price),
        discount: String(p.discount),
        stock: String(p.stock),
        series: p.series,
        size: p.size,
        type: p.type,
        rating: String(p.rating),
        image_url: p.images?.[0]?.image_url ?? "/placeholder.png",
        quantity: i.quantity,
      };
    });
}

/* ---------- public API ---------- */

export async function getCart(): Promise<CartItem[]> {
  const authed = await isLoggedIn();

  if (!authed) {
    const raw = getGuestCartRaw();
    if (raw.length === 0) return [];
    const products = await fetchGuestProducts(raw.map((i) => i.productId));
    return mapGuestCartItems(raw, products);
  }

  const res = await fetch(API, { credentials: "include" });
  if (!res.ok) throw new Error("Failed");
  const data = await res.json();
  return data.items;
}

export async function addToCart(productId: number, quantity = 1) {
  const authed = await isLoggedIn();

  if (!authed) {
    addGuestCartItem(productId, quantity);
    // Return a Response-like object so callers can check .ok
    return new Response(null, { status: 200, statusText: "OK" });
  }

  return fetch(`${getBaseUrl()}/api/cart`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId, quantity }),
  });
}

export async function removeCartItem(itemId: number) {
  const authed = await isLoggedIn();

  if (!authed) {
    removeGuestCartItem(itemId);
    return new Response(null, { status: 200, statusText: "OK" });
  }

  return fetch(`${getBaseUrl()}/api/cart/${itemId}`, {
    method: "DELETE",
    credentials: "include",
  });
}

export async function updateQuantity(itemId: number, quantity: number) {
  const authed = await isLoggedIn();

  if (!authed) {
    updateGuestCartQuantity(itemId, quantity);
    return new Response(null, { status: 200, statusText: "OK" });
  }

  return fetch(`${getBaseUrl()}/api/cart/${itemId}`, {
    method: "PATCH",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ quantity }),
  });
}

export async function getCartTotal() {
  const authed = await isLoggedIn();

  if (!authed) {
    const raw = getGuestCartRaw();
    if (raw.length === 0) return { total: 0 };
    const products = await fetchGuestProducts(raw.map((i) => i.productId));
    let total = 0;
    for (const item of raw) {
      const p = products[item.productId];
      if (!p) continue;
      const price = Number(p.price);
      const discount = Number(p.discount);
      total += item.quantity * price * (1 - discount / 100);
    }
    return { total: Math.round(total * 100) / 100 };
  }

  const res = await fetch(`${getBaseUrl()}/api/cart/total`, {
    credentials: "include",
  });
  return res.json();
}

export async function getCartCount() {
  const authed = await isLoggedIn();

  if (!authed) {
    return { count: getGuestCartCount() };
  }

  const res = await fetch(`${getBaseUrl()}/api/cart/count`, {
    credentials: "include",
  });
  return res.json();
}

export async function mergeGuestCartIntoServer(): Promise<boolean> {
  const raw = getGuestCartRaw();
  if (raw.length === 0) return true;

  try {
    const res = await fetch(`${getBaseUrl()}/api/cart/merge`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: raw }),
    });

    if (res.ok) {
      clearGuestCart();
      return true;
    }
    return false;
  } catch {
    return false;
  }
}
