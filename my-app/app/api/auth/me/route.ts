import {NextRequest,NextResponse} from "next/server";
import {verifyAccessToken} from "@/lib/utils/Token";
export async function GET(request: NextRequest) {
    const accessToken = request.cookies.get("access_token")?.value;
    if (!accessToken) {
        return NextResponse.json(
            { message: "Access token not found" },
            { status: 401 }
        );
    }

const User = verifyAccessToken(accessToken);
    if (!User) {
        return NextResponse.json(
            { message: "Invalid access token" },
            { status: 401 }
        );
    }

    return NextResponse.json(
        { message: "User authenticated", user: User },
        { status: 200 }
    );
}