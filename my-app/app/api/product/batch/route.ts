// app/api/product/batch/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getProductsByIds } from "@/lib/repositories/product.repository";

export async function POST(req: NextRequest) {
  try {
    const { productIds } = await req.json();

    if (!Array.isArray(productIds) || productIds.length === 0) {
      return NextResponse.json(
        { error: "productIds must be a non-empty array" },
        { status: 400 }
      );
    }

    if (productIds.length > 100) {
      return NextResponse.json(
        { error: "Maximum 100 product IDs allowed" },
        { status: 400 }
      );
    }

    // Validate all IDs are numbers
    const validIds = productIds.filter(
      (id: unknown) => typeof id === "number" && Number.isInteger(id) && id > 0
    );

    if (validIds.length === 0) {
      return NextResponse.json({ products: [] });
    }

    const products = await getProductsByIds(validIds);
    return NextResponse.json({ products });
  } catch (error) {
    console.error("[Product Batch]", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
