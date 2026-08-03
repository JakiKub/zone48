import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function GET(request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) return NextResponse.json({ error: "Not authorized / Not logged in" }, { status: 401 });

        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const { payload } = await jwtVerify(token, secret);

        return NextResponse.json({ user: { id: payload.userId, username: payload.username, email: payload.email, pointsAll: payload.pointsAll, pointsNow: payload.pointsNow } }, { status: 200 })
    } catch (err) {
        return NextResponse.json({ error: "wylalo sesje lub token zly, nikt nie wie" }, { status: 401 })
    }
}