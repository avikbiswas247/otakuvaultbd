// app/api/reviews/route.ts
import { NextRequest, NextResponse } from "next/server";

import {
  getReviewsByProductId,
  getReviewStatsByProductId,
  createReview,
  createReviewImages,
  getUserReviewForProduct,
} from "@/lib/repositories/review.repository";

import cloudinary from "@/lib/mediastorage/cloudinary";

import { verifyAccessToken } from "@/lib/utils/Token";

const MAX_IMAGES = 4;

/* ==========================================================
   GET  /api/reviews?productId=X   (public)
========================================================== */

export async function GET(request: NextRequest) {
  try {
    const productId = Number(
      request.nextUrl.searchParams.get("productId")
    );

    if (isNaN(productId) || productId <= 0) {
      return NextResponse.json(
        { message: "Invalid productId" },
        { status: 400 }
      );
    }

    const [reviews, stats] = await Promise.all([
      getReviewsByProductId(productId),
      getReviewStatsByProductId(productId),
    ]);

    return NextResponse.json({ reviews, stats }, { status: 200 });
  } catch (error) {
    console.error("GET REVIEWS ERROR:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

/* ==========================================================
   POST /api/reviews   (authed, FormData)
========================================================== */

export async function POST(request: NextRequest) {
  let uploadedPublicIds: string[] = [];

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

    const formData = await request.formData();

    const productId = Number(formData.get("productId"));
    const rating = Number(formData.get("rating"));
    const comment = String(formData.get("comment") ?? "").trim();

    if (isNaN(productId) || productId <= 0) {
      return NextResponse.json(
        { message: "Product ID is required" },
        { status: 400 }
      );
    }

    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return NextResponse.json(
        { message: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    if (!comment) {
      return NextResponse.json(
        { message: "Review comment is required" },
        { status: 400 }
      );
    }

    // Check duplicate review
    const existing = await getUserReviewForProduct(payload.userId, productId);
    if (existing) {
      return NextResponse.json(
        { message: "You have already reviewed this product" },
        { status: 409 }
      );
    }

    // Collect image files (max 4)
    const files: File[] = [];
    for (const [key, value] of formData.entries()) {
      if (key === "images" && value instanceof File) {
        files.push(value);
      }
    }

    if (files.length > MAX_IMAGES) {
      return NextResponse.json(
        { message: `Maximum ${MAX_IMAGES} images allowed` },
        { status: 400 }
      );
    }

    // Upload to Cloudinary
    const uploadedImages: { image_url: string; public_id: string }[] = [];

    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const b64 = `data:${file.type};base64,${buffer.toString("base64")}`;

      const result = await cloudinary.uploader.upload(b64, {
        folder: "reviews",
        resource_type: "image",
      });

      uploadedPublicIds.push(result.public_id);

      uploadedImages.push({
        image_url: result.secure_url,
        public_id: result.public_id,
      });
    }

    // Create review + images
    const review = await createReview(
      payload.userId,
      productId,
      rating,
      comment
    );

    await createReviewImages(review.id, uploadedImages);

    return NextResponse.json(
      {
        success: true,
        message: "Review submitted successfully",
        review,
      },
      { status: 201 }
    );
  } catch (error) {
    // If anything failed after some uploads succeeded, try to roll back.
    for (const publicId of uploadedPublicIds) {
      try {
        await cloudinary.uploader.destroy(publicId);
      } catch {
        // best-effort cleanup
      }
    }

    console.error("CREATE REVIEW ERROR:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}