import jwt from "jsonwebtoken";
interface AccessTokenPayload {
  userId: number;
  username: string;
  email: string;
}
interface RefreshTokenPayload {
  userId: number;
  username: string;
  email: string;
}

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "your_access_token_secret";
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "your_refresh_token_secret";

export function generateAccessToken(payload: AccessTokenPayload): string {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: "4h" });
}

export function generateRefreshToken(payload: RefreshTokenPayload): string {
  return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
}



export function verifyAccessToken(token: string): AccessTokenPayload | null {
  try {
    return jwt.verify(token, ACCESS_TOKEN_SECRET) as AccessTokenPayload;
  } catch (error) {
    return null;
  }
}

export function verifyRefreshToken(token: string): RefreshTokenPayload | null {
  try {
    return jwt.verify(token, REFRESH_TOKEN_SECRET) as RefreshTokenPayload;
  } catch (error) {
    return null;
  }
}


export function decodeAccessToken(token: string): AccessTokenPayload | null {
  try {
    return jwt.decode(token) as AccessTokenPayload;
  } catch (error) {
    return null;
  } 



}