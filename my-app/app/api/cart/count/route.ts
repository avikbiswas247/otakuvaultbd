import { NextRequest, NextResponse } from "next/server";

import {
  findCartByUserId,
  getCartItemCount,
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
        { message: "Invalid Token" },
        { status: 401 }
      );
    }

    const cart = await findCartByUserId(payload.userId);

    if (!cart) {
      return NextResponse.json({
        count: 0,
      });
    }

    const count = await getCartItemCount(cart.id);

    return NextResponse.json({
      count,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}