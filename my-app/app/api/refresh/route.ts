import { NextRequest, NextResponse } from "next/server";
import {
  verifyRefreshToken,
  generateAccessToken,
} from "@/lib/utils/Token";

export async function GET(request: NextRequest) {
  const refreshToken = request.cookies.get("refresh_token")?.value;
  const redirectPath = request.nextUrl.searchParams.get("redirect") || "/";

  if (!refreshToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const decoded = verifyRefreshToken(refreshToken);

  if (!decoded) {
    // Refresh token invalid or expired -> force re-login
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("access_token");
    response.cookies.delete("refresh_token");
    return response;
  }

  const newAccessToken = generateAccessToken({
    userId: decoded.userId,
    email: decoded.email,
    username: decoded.username,
  });

  const response = NextResponse.redirect(new URL(redirectPath, request.url));

  response.cookies.set("access_token", newAccessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 14400, // 4 hours, matches generateAccessToken's expiresIn
  });

  return response;
}