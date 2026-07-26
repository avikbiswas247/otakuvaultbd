import {db} from "@/lib/db/dbconnect";

export async function getProductsImage() {
  const result = await db.query("SELECT * FROM product_images");
  return result.rows;
}