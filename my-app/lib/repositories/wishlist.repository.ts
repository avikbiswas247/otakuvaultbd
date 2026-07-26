import { db } from "@/lib/db/dbconnect";

/* =====================================
   FIND WISHLIST ROW OF USER
===================================== */

export async function findWishlistByUserId(
  userId: number
) {
  const result = await db.query(
    `
    SELECT *
    FROM wishlist
    WHERE user_id = $1
    LIMIT 1
    `,
    [userId]
  );

  return result.rows[0] ?? null;
}

/* =====================================
   FIND PRODUCT IN WISHLIST
===================================== */

export async function findWishlistItem(
  userId: number,
  productId: number
) {
  const result = await db.query(
    `
    SELECT *
    FROM wishlist
    WHERE user_id = $1
      AND product_id = $2
    LIMIT 1
    `,
    [userId, productId]
  );

  return result.rows[0] ?? null;
}

/* =====================================
   CREATE WISHLIST ENTRY
===================================== */

export async function createWishlist(
  userId: number,
  productId: number
) {
  const result = await db.query(
    `
    INSERT INTO wishlist
    (
      user_id,
      product_id
    )
    VALUES
    (
      $1,
      $2
    )
    RETURNING *
    `,
    [userId, productId]
  );

  return result.rows[0];
}

/* =====================================
   CREATE WISHLIST ITEM
===================================== */

export async function createWishlistItem(
  wishlistId: number,
  productId: number
) {
  const result = await db.query(
    `
    INSERT INTO wishlist_items
    (
      wishlist_id,
      product_id
    )
    VALUES
    (
      $1,
      $2
    )
    RETURNING *
    `,
    [wishlistId, productId]
  );

  return result.rows[0];
}

/* =====================================
   REMOVE PRODUCT
===================================== */

export async function removeWishlistItem(
  userId: number,
  productId: number
) {
  const wishlist = await findWishlistItem(
    userId,
    productId
  );

  if (!wishlist) return;

  await db.query(
    `
    DELETE FROM wishlist_items
    WHERE wishlist_id = $1
      AND product_id = $2
    `,
    [
      wishlist.id,
      productId,
    ]
  );

  await db.query(
    `
    DELETE FROM wishlist
    WHERE id = $1
    `,
    [
      wishlist.id,
    ]
  );
}

/* =====================================
   GET USER WISHLIST
===================================== */

export async function getWishlistItems(
  userId: number
) {
  const result = await db.query(
    `
    SELECT

        w.id AS wishlist_id,

        w.created_at,

        wi.id AS wishlist_item_id,

        wi.added_at,

        p.id,
        p.name,
        p.description,
        p.price,
        p.discount,
        p.stock,
        p.series,
        p.size,
        p.type,
        p.rating,

        COALESCE
        (
            (
                SELECT image_url
                FROM product_images
                WHERE product_id = p.id
                ORDER BY is_primary DESC,id ASC
                LIMIT 1
            ),
            ''
        ) AS image_url

    FROM wishlist w

    JOIN wishlist_items wi
        ON wi.wishlist_id = w.id

    JOIN products p
        ON p.id = wi.product_id

    WHERE w.user_id = $1

    ORDER BY wi.added_at DESC
    `,
    [userId]
  );

  return result.rows;
}

/* =====================================
   GET SINGLE WISHLIST ITEM
===================================== */

export async function getWishlistItemById(
  wishlistItemId: number
) {
  const result = await db.query(
    `
    SELECT

        w.id AS wishlist_id,

        wi.id AS wishlist_item_id,

        wi.added_at,

        p.id,
        p.name,
        p.description,
        p.price,
        p.discount,
        p.stock,
        p.series,
        p.size,
        p.type,
        p.rating,

        COALESCE
        (
            (
                SELECT image_url
                FROM product_images
                WHERE product_id = p.id
                ORDER BY is_primary DESC,id ASC
                LIMIT 1
            ),
            ''
        ) AS image_url

    FROM wishlist_items wi

    JOIN wishlist w
        ON w.id = wi.wishlist_id

    JOIN products p
        ON p.id = wi.product_id

    WHERE wi.id = $1
    `,
    [wishlistItemId]
  );

  return result.rows[0] ?? null;
}

/* =====================================
   COUNT
===================================== */

export async function getWishlistCount(
  userId: number
) {
  const result = await db.query(
    `
    SELECT COUNT(*) AS count

    FROM wishlist_items wi

    JOIN wishlist w
        ON wi.wishlist_id = w.id

    WHERE w.user_id = $1
    `,
    [userId]
  );

  return Number(result.rows[0].count);
}

/* =====================================
   CHECK EXISTS
===================================== */

export async function isProductInWishlist(
  userId: number,
  productId: number
) {
  const result = await db.query(
    `
    SELECT EXISTS
    (
        SELECT 1

        FROM wishlist

        WHERE user_id = $1
          AND product_id = $2
    ) AS exists
    `,
    [userId, productId]
  );

  return result.rows[0].exists;
}