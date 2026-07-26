import { verifyAccessToken } from "../utils/Token";
import {findUserByEmail} from "../repositories/login.repository";
import{db} from "../db/dbconnect";

export async function getUserProfile(accessToken: string) {
    const decodedToken = verifyAccessToken(accessToken);
    if (!decodedToken) {
        throw new Error("Invalid access token");
    }
    return findUserByEmail(decodedToken.email);
}