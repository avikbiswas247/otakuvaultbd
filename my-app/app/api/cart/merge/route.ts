import { NextRequest, NextResponse } from "next/server";

import {
  findCartByUserId,
  createCartForUser,
  findCartItemByCartId,
  addItemToCart,
  updateCartItemQuantity,
  getCartItemCount,
} from "@/lib/repositories/add_to_cart.repository";

import { verifyAccessToken } from "@/lib/utils/Token";

export async function POST(request: NextRequest) {
  try {
    const accessToken = request.cookies.get("access_token")?.value;

    if (!accessToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const payload = verifyAccessToken(accessToken);

    if (!payload) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    const body = await request.json();
    const items: { productId: number; quantity: number }[] = body?.items;

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ count: 0 }, { status: 200 });
    }

    // Find (or create) the user's server-side cart once.
    let cart = await findCartByUserId(payload.userId);
    if (!cart) {
      cart = await createCartForUser(payload.userId);
    }

    for (const item of items) {
      const productId = Number(item.productId);
      const quantity = Number(item.quantity);

      if (!Number.isInteger(productId) || productId <= 0) continue;
      if (!Number.isInteger(quantity) || quantity <= 0) continue;

      const existingItem = await findCartItemByCartId(cart.id, productId);

      if (existingItem) {
        await updateCartItemQuantity(
          existingItem.id,
          existingItem.quantity + quantity
        );
      } else {
        await addItemToCart(cart.id, productId, quantity);
      }
    }

    const count = await getCartItemCount(cart.id);

    return NextResponse.json({ count }, { status: 200 });
  } catch (error) {
    console.error("MERGE CART ERROR:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
