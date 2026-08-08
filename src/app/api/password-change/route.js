import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function PATCH(request) {
    try {
        const { userId, ogPass, newPass, newPassConfirm } = await request.json();

        if (!userId || !ogPass || !newPass || !newPassConfirm) return NextResponse.json({ error: "Wszytkie pola wymagane / All inputs required" }, { status: 400 });

        if (newPass !== newPassConfirm) return NextResponse.json({ error: "Nowe hasła muszą się zgadzać / New passwords must be the same" }, { status: 400 });

        await connectDB();

        const user = await User.findById(userId);

        if (!user) return NextResponse.json({ error: "Nie znaleziono użytkownika / User not found" }, { status: 404 });

        const match = await bcrypt.compare(ogPass, user.password);

        if (!match) return NextResponse.json({ error: "Błędne poprzednie hasło / Wrong old password" }, { status: 400 });

        user.password = await bcrypt.hash(newPass, 10);

        await user.save();

        return NextResponse.json({ message: "Pomyślnie zmieniono hasło / Password changed successfully" }, { status: 200 });
    } catch (err) {
        console.error(`Błąd w /api/password-change: ${err}`);
        return NextResponse.json({ error: "Błąd serwera / Internal server error" }, { status: 500 });
    }
}