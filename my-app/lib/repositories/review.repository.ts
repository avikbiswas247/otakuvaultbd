// lib/repositories/review.repository.ts
import { db } from "@/lib/db/dbconnect";

/* ==========================================================
   TYPES
========================================================== */

export interface ReviewImage {
  id: number;
  image_url: string;
}

export interface ReviewWithUser {
  id: number;
  user_id: number;
  username: string;
  rating: number;
  comment: string;
  created_at: string;
  images: ReviewImage[];
}

export interface ReviewStats {
  average: number;
  count: number;
}

/* ==========================================================
   GET REVIEWS BY PRODUCT
========================================================== */

export async function getReviewsByProductId(
  productId: number
): Promise<ReviewWithUser[]> {
  const result = await db.query(
    `
    SELECT
      r.id,
      r.user_id,
      u.username,
      r.rating,
      r.comment,
      r.created_at,
      COALESCE(
        (
          SELECT json_agg(
            json_build_object(
              'id', ri.id,
              'image_url', ri.image_url
            )
            ORDER BY ri.id ASC
          )
          FROM review_images ri
          WHERE ri.review_id = r.id
        ),
        '[]'::json
      ) AS images
    FROM reviews r
    JOIN users u ON u.id = r.user_id
    WHERE r.product_id = $1
    ORDER BY r.created_at DESC
    `,
    [productId]
  );
  return result.rows;
}

/* ==========================================================
   GET REVIEW STATS BY PRODUCT
========================================================== */

export async function getReviewStatsByProductId(
  productId: number
): Promise<ReviewStats> {
  const result = await db.query(
    `
    SELECT
      COUNT(*)::int AS count,
      COALESCE(AVG(rating), 0) AS average
    FROM reviews
    WHERE product_id = $1
    `,
    [productId]
  );
  const row = result.rows[0];
  return {
    average: Number(row.average),
    count: Number(row.count),
  };
}

/* ==========================================================
   CREATE REVIEW
========================================================== */

export async function createReview(
  userId: number,
  productId: number,
  rating: number,
  comment: string
) {
  const result = await db.query(
    `
    INSERT INTO reviews (user_id, product_id, rating, comment)
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `,
    [userId, productId, rating, comment]
  );
  return result.rows[0];
}

/* ==========================================================
   CREATE REVIEW IMAGES
========================================================== */

export async function createReviewImages(
  reviewId: number,
  images: { image_url: string; public_id: string }[]
) {
  if (images.length === 0) return;
  for (const img of images) {
    await db.query(
      `
      INSERT INTO review_images (review_id, image_url, public_id)
      VALUES ($1, $2, $3)
      `,
      [reviewId, img.image_url, img.public_id]
    );
  }
}

/* ==========================================================
   CHECK IF USER ALREADY REVIEWED
========================================================== */

export async function getUserReviewForProduct(
  userId: number,
  productId: number
) {
  const result = await db.query(
    `
    SELECT *
    FROM reviews
    WHERE user_id = $1 AND product_id = $2
    LIMIT 1
    `,
    [userId, productId]
  );
  return result.rows[0] ?? null;
}

/* ==========================================================
   DELETE REVIEW (own review only)
========================================================== */

export async function deleteReview(reviewId: number, userId: number) {
  const result = await db.query(
    `
    DELETE FROM reviews
    WHERE id = $1 AND user_id = $2
    RETURNING *
    `,
    [reviewId, userId]
  );
  return result.rows[0] ?? null;
}

/* ==========================================================
   GET IMAGES BY REVIEW (for cleanup after delete)
========================================================== */

export async function getReviewImages(reviewId: number) {
  const result = await db.query(
    `
    SELECT id, image_url, public_id
    FROM review_images
    WHERE review_id = $1
    `,
    [reviewId]
  );
  return result.rows;
}