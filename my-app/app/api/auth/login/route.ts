import {verifyPassword} from "@/lib/utils/password";
import { NextResponse } from "next/server";
import{findUserByEmail} from "@/lib/repositories/login.repository";
import {generateAccessToken,generateRefreshToken} from "@/lib/utils/Token";
export async function POST(request: Request) {

    try {  

        const body = await request.json();

        const {email,password} = body;

        // Here you would typically fetch the user from the database using the email

        // For demonstration, let's assume we have a user object with a hashed password 

        const user = {
            email: email,
            password: password // Replace with actual hashed password from database
        };
        const existingUser = await findUserByEmail(email);

        if (!existingUser) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }
        const isMatch = await verifyPassword(password, existingUser.password_hash);
        const accessToken = generateAccessToken({ userId: existingUser.id, email: existingUser.email, username: existingUser.username });
        const refreshToken = generateRefreshToken({ userId: existingUser.id, email: existingUser.email, username: existingUser.username });
        if (!isMatch) {
            return NextResponse.json(
                { message: "Invalid credentials" },
                { status: 401 }
            );
        }

        const response = NextResponse.json(
            { message: "Login successful" },
            { status: 200 }
        );
        response.cookies.set("access_token", accessToken, { httpOnly: true,   secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/", maxAge: 14400 });
        response.cookies.set("refresh_token", refreshToken, { httpOnly: true,   secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/", maxAge: 604800 });
        return response;
    } catch (error) {
        return NextResponse.json(
            { message: "Login failed" },
            { status: 500 }
        );
    }
}