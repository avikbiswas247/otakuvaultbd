import {db} from "../db/dbconnect";
import {RegisterUserInput,RegisteredUser} from "../../types/user";

export async function RegisterUser(user:RegisterUserInput):Promise<RegisteredUser> {
    const {username,email,password_hash} = user;
    const result = await db.query<RegisterUserInput>(
        "INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *",
        [username,email,password_hash]
    );
    console.log(result.rows[0])
    return result.rows[0];
}