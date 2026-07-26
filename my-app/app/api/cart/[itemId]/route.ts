import { NextRequest, NextResponse } from "next/server";

import {
  getCartItemById,
  updateCartItemQuantity,
  removeCartItem,
} from "@/lib/repositories/add_to_cart.repository";

interface RouteContext {
  params: Promise<{
    itemId: string;
  }>;
}

export async function GET(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    const { itemId } = await params;

    const item = await getCartItemById(Number(itemId));

    if (!item) {
      return NextResponse.json(
        {
          message: "Cart item not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(item);

  } catch (error) {
    console.error(error);

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

export async function PATCH(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    const { itemId } = await params;

    const { quantity } = await request.json();

    if (!quantity || quantity <= 0) {
      return NextResponse.json(
        {
          message: "Quantity must be greater than 0",
        },
        {
          status: 400,
        }
      );
    }

    const updated = await updateCartItemQuantity(
      Number(itemId),
      quantity
    );

    return NextResponse.json(updated);

  } catch (error) {
    console.error(error);

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

export async function DELETE(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    const { itemId } = await params;

    await removeCartItem(Number(itemId));

    return NextResponse.json({
      message: "Item removed from cart",
    });

  } catch (error) {
    console.error(error);

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