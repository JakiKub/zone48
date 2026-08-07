import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { SignJWT } from "jose";

export async function POST(request) {
    try {
        const { username, password } = await request.json();

        if (!username) return NextResponse.json({ error: "logowanie bez nazwy uzytkownika? specjalny jestes?" }, { status: 400 });
        if (!password) return NextResponse.json({ error: "ale logowanie bez hasla? to juz lekka przesada" }, { status: 400 });

        await connectDB();

        const user = await User.findOne({ username });

        if (!user) return NextResponse.json({ error: "cos chyba zespules z loginem lub haslem" }, { status: 401 });

        const isPassCorrect = await bcrypt.compare(password, user.password);

        if (!isPassCorrect) return NextResponse.json({ error: "cos chyba zespules z loginem lub haslem" }, { status: 401 });

        if (!user.verified) return NextResponse.json({ error: "ruszylbys sie moze do weryfikacji maila, co? inaczej sie nie zalogujesz kochany" }, { status: 403 });

        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const token = await new SignJWT({ userId: user._id.toString(), username: user.username, email: user.email, nationality: user.nationality, pointsAll: user.pointsAll, pointsNow: user.pointsNow }).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("1d").sign(secret);
        const response = NextResponse.json({ message: "Logged in successfully", user: { _id: user._id, username: user.username, email: user.email } }, { status: 200 });
        
        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24,
            path: "/"
        });

        return response
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}