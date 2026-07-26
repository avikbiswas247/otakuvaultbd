import {NextResponse} from "next/server";
export async function POST(request: Request) {
    try {
        const response = NextResponse.json(
            { message: "Logout successful" },
            { status: 200 }
        );
        response.cookies.delete("access_token");
        response.cookies.delete("refresh_token");
        return response;
    } catch (error) {
        return NextResponse.json(
            { message: "Logout failed" },
            { status: 500 }
        );
    }

}