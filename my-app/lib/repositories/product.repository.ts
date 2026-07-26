import { db } from "@/lib/db/dbconnect";
import { getproduct } from "@/types/product";

/* ==============================
   GET ALL PRODUCTS
============================== */

export async function getProducts() {
  const result = await db.query("SELECT * FROM Products");
  return result.rows;
}

/* ==============================
   GET SINGLE PRODUCT (with images)
============================== */

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

/* ==============================
   CREATE PRODUCT
============================== */

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