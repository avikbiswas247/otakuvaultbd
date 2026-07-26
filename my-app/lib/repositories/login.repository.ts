import { db } from "../db/dbconnect";
import { LoginUser } from "../../types/user";




export async function findUserByEmail(email: string): Promise<LoginUser | null> {
  const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);
  return result.rows[0] ;
}

