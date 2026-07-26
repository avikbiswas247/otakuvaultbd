import { NextRequest, NextResponse } from "next/server";
import { getProductById } from "@/lib/repositories/product.repository";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  request: NextRequest,
  { params }: Params
) {
  try {
    const { id } = await params;

    const productId = Number(id);

    if (isNaN(productId)) {
      return NextResponse.json(
        {
          message: "Invalid product id",
        },
        {
          status: 400,
        }
      );
    }

    const product = await getProductById(productId);

    if (!product) {
      return NextResponse.json(
        {
          message: "Product not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(product, {
      status: 200,
    });
  } catch (error) {
    console.error("GET PRODUCT ERROR:", error);

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