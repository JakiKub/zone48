import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { SignJWT } from "jose";

export async function POST(request) {
    try {
        const { username, password } = await request.json();

        if (!username || !password) return NextResponse.json({ error: "Nazwa użytkownika i hasło wymagane / Username and password required" }, { status: 400 });

        await connectDB();

        const user = await User.findOne({ username });

        if (!user) return NextResponse.json({ error: "Błędny login lub hasło / Wrong login or password" }, { status: 401 });

        const isPassCorrect = await bcrypt.compare(password, user.password);

        if (!isPassCorrect) return NextResponse.json({ error: "Błędny login lub hasło / Wrong login or password" }, { status: 401 });

        if (!user.verified) return NextResponse.json({ error: "E-mail musi być zweryfikowany / E-mail must be verified" }, { status: 403 });

        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const token = await new SignJWT({ userId: user._id.toString(), username: user.username, email: user.email, nationality: user.nationality, pointsAll: user.pointsAll, pointsNow: user.pointsNow }).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("1d").sign(secret);
        const response = NextResponse.json({ message: "Zalogowano pomyślnie / Logged in successfully", user: { _id: user._id, username: user.username, email: user.email } }, { status: 200 });
        
        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24,
            path: "/"
        });

        return response
    } catch (err) {
        console.error(`Błąd w /api/login: ${err}`);
        return NextResponse.json({ error: "Błąd serwera / Internal server error" }, { status: 500 })
    }
}