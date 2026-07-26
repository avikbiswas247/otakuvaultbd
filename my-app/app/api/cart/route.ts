import { NextRequest, NextResponse } from "next/server";

import {
  findCartByUserId,
  createCartForUser,
  findCartItemByCartId,
  addItemToCart,
  updateCartItemQuantity,
  getUserCartItems,
} from "@/lib/repositories/add_to_cart.repository";

import { verifyAccessToken } from "@/lib/utils/Token";

export async function GET(request: NextRequest) {
  try {
    const accessToken = request.cookies.get("access_token")?.value;

    if (!accessToken) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const payload = verifyAccessToken(accessToken);

    if (!payload) {
      return NextResponse.json(
        { message: "Invalid token" },
        { status: 401 }
      );
    }

    const cart = await findCartByUserId(payload.userId);

    if (!cart) {
      return NextResponse.json(
        {
          items: [],
          totalItems: 0,
        },
        { status: 200 }
      );
    }

    const items = await getUserCartItems(cart.id);

    return NextResponse.json(
      {
        items,
        totalItems: items.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET CART ERROR:", error);

    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const accessToken = request.cookies.get("access_token")?.value;

    if (!accessToken) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const payload = verifyAccessToken(accessToken);

    if (!payload) {
      return NextResponse.json(
        { message: "Invalid token" },
        { status: 401 }
      );
    }

    const body = await request.json();

    const { productId, quantity } = body;

    if (
      !productId ||
      !quantity ||
      quantity <= 0
    ) {
      return NextResponse.json(
        {
          message: "Invalid request body",
        },
        {
          status: 400,
        }
      );
    }

    let cart = await findCartByUserId(payload.userId);

    if (!cart) {
      cart = await createCartForUser(payload.userId);
    }

    const existingItem = await findCartItemByCartId(
      cart.id,
      productId
    );

    if (existingItem) {
      const updatedItem =
        await updateCartItemQuantity(
          existingItem.id,
          existingItem.quantity + quantity
        );

      return NextResponse.json(
        {
          message: "Cart updated successfully",
          item: updatedItem,
        },
        {
          status: 200,
        }
      );
    }

    const newItem = await addItemToCart(
      cart.id,
      productId,
      quantity
    );

    return NextResponse.json(
      {
        message: "Item added to cart",
        item: newItem,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("ADD TO CART ERROR:", error);

    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}