import { NextResponse } from "next/server";

import { registerUser } from "@/lib/services/auth.service";

import type {
    FrontendRegisterUserInput
} from "@/types/user";

export async function POST(

    request: Request

) {

    try {
// Parse the request body to get the user input
        const body = await request.json();
        console.log(body)
        const user: FrontendRegisterUserInput = {

            username: body.username,

            email: body.email,

            password: body.password

        };
// Call the registerUser function to handle the registration logic
        const newUser = await registerUser(
            user
        );
// Return a success response with the newly registered user
        return NextResponse.json(

            newUser,

            {
                status: 201
            }

        );

    }
// Handle any errors that occur during registration
    catch (error) {

        return NextResponse.json(

            {
                message: "Registration failed"
            },

            {
                status: 500
            }

        );

    }

}