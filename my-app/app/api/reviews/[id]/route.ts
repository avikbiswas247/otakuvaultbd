// app/api/reviews/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";

import {
  deleteReview,
  getReviewImages,
} from "@/lib/repositories/review.repository";

import cloudinary from "@/lib/mediastorage/cloudinary";

import { verifyAccessToken } from "@/lib/utils/Token";

interface Params {
  params: Promise<{ id: string }>;
}

/* ==========================================================
   DELETE /api/reviews/[id]   (own review only)
========================================================== */

export async function DELETE(
  request: NextRequest,
  { params }: Params
) {
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

    const { id } = await params;
    const reviewId = Number(id);

    if (isNaN(reviewId)) {
      return NextResponse.json(
        { message: "Invalid review id" },
        { status: 400 }
      );
    }

    // Verify ownership before deleting
    const review = await deleteReview(reviewId, payload.userId);

    if (!review) {
      return NextResponse.json(
        { message: "Review not found or not yours" },
        { status: 404 }
      );
    }

    // Clean up Cloudinary images (best-effort)
    const images = await getReviewImages(reviewId);
    for (const img of images) {
      try {
        if (img.public_id) {
          await cloudinary.uploader.destroy(img.public_id);
        }
      } catch {
        // best-effort cleanup
      }
    }

    return NextResponse.json(
      { success: true, message: "Review deleted" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE REVIEW ERROR:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}