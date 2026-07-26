import {db} from "@/lib/db/dbconnect";

export async function getProducts() {
  const result = await db.query("SELECT * FROM Products");
  return result.rows;
}


export async function getProductById(
  productId: number
) {
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
        json_agg(
          json_build_object(
            'id', pi.id,
            'image_url', pi.image_url,
            'is_primary', pi.is_primary
          )
          ORDER BY pi.is_primary DESC, pi.id
        ) FILTER (WHERE pi.id IS NOT NULL),
        '[]'
      ) AS images

    FROM products p

    LEFT JOIN product_images pi
      ON pi.product_id = p.id

    WHERE p.id = $1

    GROUP BY p.id
    `,
    [productId]
  );

  return result.rows[0] ?? null;
}