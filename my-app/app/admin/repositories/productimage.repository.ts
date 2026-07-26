// repositories/product.repository.ts

import { db } from "@/lib/db/dbconnect";

interface ProductImage {
  url: string;
  publicId: string;
}

export async function createProductImages(
  productId: number,
  images: ProductImage[]
) {
  const values: (number | string)[] = [];

  const placeholders: string[] = [];


  images.forEach((image, index) => {
    const offset = index * 3;

    placeholders.push(
      `($${offset + 1}, $${offset + 2}, $${offset + 3})`
    );

    values.push(
      productId,
      image.url,
      image.publicId
    );
  });


  const result = await db.query(
    `
    INSERT INTO product_images
    (
      product_id,
      image_url,
      public_id
    )

    VALUES

    ${placeholders.join(",")}

    RETURNING
      id,
      product_id,
      image_url,
      public_id;
    `,
    values
  );


  return result.rows;
}