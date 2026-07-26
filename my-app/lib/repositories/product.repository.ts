import {db} from "@/lib/db/dbconnect";

export async function getProducts() {
  const result = await db.query("SELECT * FROM Products");
  return result.rows;
}