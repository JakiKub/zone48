import { NextResponse } from "next/server";
import crypto from "crypto";
import bcrypt from "bcryptjs";

import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(request) {
    try {
        const { rawToken, password, confirmPassword } = await request.json();

        if ( !rawToken || !password || !confirmPassword) return NextResponse.json({ error: "Wszystkie pola wymagane / All inputs required" }, { status: 400 });

        if (password !== confirmPassword) return NextResponse.json({ error: "Hasła muszą sie zgadzać / Passwords must be the same" }, { status: 400 });

        await connectDB();

        const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex");
        
        const user = await User.findOne({ resetPasswordToken: hashedToken, resetPasswordExpires: { $gt: Date.now() } });

        if (!user) return NextResponse.json({ error: "Zły lub wygasły token / Invalid or expired token" }, { status: 400 });

        const hashedPass = await bcrypt.hash(password, 10);

        user.password = hashedPass;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();

        return NextResponse.json({ message: "Pomyślnie zmieniono hasło / Password changed successfully" }, { status: 200 });

    } catch (err) {
        console.error(`Błąd w /api/reset-password: ${err}`);
        return NextResponse.json({ error: "Błąd serwera / Internal server error" }, { status: 500 });
    }
}