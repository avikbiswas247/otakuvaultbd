import {NextRequest, NextResponse} from "next/server";
import {verifyAccessToken} from "@/lib/utils/Token";
import jwt from "jsonwebtoken";
export async function middleware(request: NextRequest) {
    const accessToken = request.cookies.get("access_token")?.value;
    const pathname = request.nextUrl.pathname;
    // Check if the access token exists in the cookies
    try{
    if (!accessToken) {

        return NextResponse.redirect(new URL(`/api/auth/refresh?redirect=${pathname}`,request.url));
    }
    //If the access token is valid, allow the request to proceed
 const decodedToken = verifyAccessToken(accessToken);
 return decodedToken ? NextResponse.next() : NextResponse.redirect(new URL(`login`,request.url));
}
    catch(error){
        // If the access token is expired, redirect to the refresh token endpoint
        if (error instanceof jwt.TokenExpiredError) {
            return NextResponse.redirect(new URL(`/api/auth/refresh?redirect=${pathname}`,request.url));
        }}
    
    } 

   export const config = {
    matcher: ["/api/auth/logout",
    "/api/auth/refresh",
    "/api/auth/me",
    "/api/auth/update-password",
    "/api/auth/update-profile",
    "/api/auth/delete-account",
    "/api/auth/change-email",
    "/api/auth/change-username",
    "/api/auth/change-password",

    "/api/cart/:path*",]
   };
    


