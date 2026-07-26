import { NextRequest, NextResponse } from "next/server";

import { verifyAccessToken } from "@/lib/utils/Token";

import {
  checkout,
  ShippingAddressInput,
} from "@/lib/repositories/checkout.repository";

export async function POST(
  request: NextRequest
) {
  try {
    /* ============================
       AUTHENTICATION
    ============================ */

    const accessToken =
      request.cookies.get("access_token")?.value;

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

    /* ============================
       REQUEST BODY
    ============================ */

    const body = await request.json();

    const {
      paymentMethod,
      shipping,
    } = body;

    /* ============================
       VALIDATION
    ============================ */

    if (
      !paymentMethod ||
      !shipping
    ) {
      return NextResponse.json(
        {
          message:
            "Missing checkout information",
        },
        {
          status: 400,
        }
      );
    }

    const shippingData =
      shipping as ShippingAddressInput;

    if (
      !shippingData.full_name ||
      !shippingData.phone ||
      !shippingData.address_line1 ||
      !shippingData.city ||
      !shippingData.postal_code ||
      !shippingData.country
    ) {
      return NextResponse.json(
        {
          message:
            "Shipping information is incomplete",
        },
        {
          status: 400,
        }
      );
    }

    /* ============================
       CHECKOUT
    ============================ */

    const result = await checkout({
      userId: payload.userId,
      paymentMethod,
      shipping: shippingData,
    });

    return NextResponse.json(
      {
        success: true,

        message:
          "Checkout completed successfully",

        order: result.order,

        payment: result.payment,

        shipping: result.shipping,

        total: result.total,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    console.error(
      "CHECKOUT ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,

        message:
          error.message ??
          "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}