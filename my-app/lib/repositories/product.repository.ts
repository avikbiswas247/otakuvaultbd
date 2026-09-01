import { db } from "@/lib/db/dbconnect";
import { getproduct } from "@/types/product";

/* GET ALL PRODUCTS*/

export async function getProducts() {
  const result = await db.query("SELECT * FROM Products");
  return result.rows;
}

/* GET SINGLE PRODUCT (with images)*/

export async function getProductById(id: number) {
  const result = await db.query(
    `
    SELECT
      p.*,
      COALESCE(
        (
          SELECT json_agg(
            json_build_object(
              'id', pi.id,
              'product_id', pi.product_id,
              'image_url', pi.image_url,
              'public_id', pi.public_id
            )
            ORDER BY pi.is_primary DESC, pi.id ASC
          )
          FROM product_images pi
          WHERE pi.product_id = p.id
        ),
        '[]'::json
      ) AS images
    FROM products p
    WHERE p.id = $1
    `,
    [id]
  );

  return result.rows[0] ?? null;
}

/* GET PRODUCTS BY IDS (batch) */

export async function getProductsByIds(ids: number[]) {
  if (ids.length === 0) return [];
  const result = await db.query(
    `
    SELECT
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
      COALESCE(
        (
          SELECT json_agg(
            json_build_object(
              'id', pi.id,
              'product_id', pi.product_id,
              'image_url', pi.image_url,
              'public_id', pi.public_id
            )
            ORDER BY pi.is_primary DESC, pi.id ASC
          )
          FROM product_images pi
          WHERE pi.product_id = p.id
        ),
        '[]'::json
      ) AS images
    FROM products p
    WHERE p.id = ANY($1::int[])
    `,
    [ids]
  );
  return result.rows;
}

/* CREATE PRODUCT*/

export async function createProduct(
  name: string,
  description: string,
  price: number,
  stock: number,
  discount: number,
  size: string,
  series: string,
  arival: string,
  rating: number,
  type: string
): Promise<getproduct> {
  const product = await db.query(
    `
    INSERT INTO Products(name, description, price, stock, discount, size, series, ARRIVAL, rating, type)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING *
    `,
    [name, description, price, stock, discount, size, series, arival, rating, type]
  );

  return product.rows[0];
}
export async function getRelatedProducts(series: string, excludeId: number, limit: number = 4) {
  const result = await db.query(
    `
    SELECT
      p.*,
      (SELECT pi.image_url FROM product_images pi WHERE pi.product_id = p.id ORDER BY pi.is_primary DESC, pi.id ASC LIMIT 1) AS first_image
    FROM products p
    WHERE p.series = $1 AND p.id != $2
    ORDER BY p.id DESC
    LIMIT $3
    `,
    [series, excludeId, limit]
  );
  // Transform result rows to include an images array with that single image URL
  return result.rows.map(row => ({
    ...row,
    images: row.first_image ? [row.first_image] : [],
  }));
}