import { NextRequest, NextResponse } from "next/server";

import {
  findWishlistItem,
  createWishlist,
  createWishlistItem,
  getWishlistItems,
} from "@/lib/repositories/wishlist.repository";

import { verifyAccessToken } from "@/lib/utils/Token";

export async function GET(request: NextRequest) {
  try {
    const accessToken = request.cookies.get("access_token")?.value;

    if (!accessToken) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const payload = verifyAccessToken(accessToken);

    if (!payload) {
      return NextResponse.json(
        {
          message: "Invalid Token",
        },
        {
          status: 401,
        }
      );
    }

    const wishlist = await getWishlistItems(payload.userId);

    return NextResponse.json(
      {
        success: true,
        count: wishlist.length,
        items: wishlist,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("GET WISHLIST ERROR:", error);

    return NextResponse.json(
      {
        success: false,
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
        {
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const payload = verifyAccessToken(accessToken);

    if (!payload) {
      return NextResponse.json(
        {
          message: "Invalid Token",
        },
        {
          status: 401,
        }
      );
    }

    const { productId } = await request.json();

    if (!productId) {
      return NextResponse.json(
        {
          message: "Product ID is required",
        },
        {
          status: 400,
        }
      );
    }

    const alreadyExists = await findWishlistItem(
      payload.userId,
      productId
    );

    if (alreadyExists) {
      return NextResponse.json(
        {
          success: false,
          message: "Product already exists in wishlist",
        },
        {
          status: 409,
        }
      );
    }

    // Insert into wishlist table
    const wishlist = await createWishlist(
      payload.userId,
      productId
    );

    // Insert into wishlist_items table
    const wishlistItem = await createWishlistItem(
      wishlist.id,
      productId
    );

    return NextResponse.json(
      {
        success: true,
        message: "Product added to wishlist",
        wishlist,
        wishlistItem,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("ADD WISHLIST ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}