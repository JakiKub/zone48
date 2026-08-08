import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function PATCH(request) {
    try {
        const { userId, newUsername } = await request.json();

        if (!userId || !newUsername) return NextResponse.json({ error: "Wszystkie pola wymagane / All inputs required" }, { status: 400 });

        await connectDB();

        const exists = await User.findOne({ username: newUsername.trim(), id: { $ne: userId } });

        if (exists) return NextResponse.json({ error: "Użytkownik już istnieje / This user already exists" }, { status: 400 });

        const changedUser = await User.findByIdAndUpdate(userId, { username: newUsername.trim() }, { new: true, runValidators: true });

        if (!changedUser) return NextResponse.json({ error: "Nie znaleziono użytkownika / User not found" }, { status: 404 });

        return NextResponse.json({ message: "Pomyślnie zmieniono nazwę użytkownika / Username changed successfully", username: changedUser.username }, { status: 200 })
    } catch (err) {
        console.error(`Błąd w /api/username-change: ${err}`);
        return NextResponse.json({ error: "Błąd serwera / Internal server error" }, { status: 500 })
    }
}