import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function GET(request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) return NextResponse.json({ error: "Not authorized / Not logged in" }, { status: 401 });

        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const { payload } = await jwtVerify(token, secret);

        await connectDB();

        const newUser = await User.findById(payload.userId).select("-password");

        if (!newUser) return NextResponse.json({ error: "seek and you shall find" }, { status: 404 });

        return NextResponse.json({ user: { id: newUser._id, username: newUser.username, email: newUser.email, nationality: newUser.nationality, pointsAll: newUser.pointsAll, pointsNow: newUser.pointsNow } }, { status: 200 })
    } catch (err) {
        return NextResponse.json({ error: "wylalo sesje lub token zly, nikt nie wie" }, { status: 401 })
    }
}