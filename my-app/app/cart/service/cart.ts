import { CartItem } from "@/app/cart/type/cart";

const API = "/api/cart";

export async function getCart(): Promise<CartItem[]> {
  const res = await fetch(API, {
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed");

  const data = await res.json();

  return data.items;
}

export async function addToCart(
  productId: number,
  quantity = 1
) {
  return fetch(API, {
    method: "POST",

    credentials: "include",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      productId,
      quantity,
    }),
  });
}

export async function removeCartItem(
  itemId: number
) {
  return fetch(`/api/cart/${itemId}`, {
    method: "DELETE",

    credentials: "include",
  });
}

export async function updateQuantity(
  itemId: number,
  quantity: number
) {
  return fetch(`/api/cart/${itemId}`, {
    method: "PATCH",

    credentials: "include",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      quantity,
    }),
  });
}

export async function getCartTotal() {
  const res = await fetch("/api/cart/total", {
    credentials: "include",
  });

  return res.json();
}

export async function getCartCount() {
  const res = await fetch("/api/cart/count", {
    credentials: "include",
  });

  return res.json();
}