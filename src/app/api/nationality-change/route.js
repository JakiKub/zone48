import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function PATCH(request) {
    try {
        const { userId, newNation } = await request.json();

        if (!userId || !newNation) return NextResponse.json({ error: "Wszystkie pola wymagane / All inputs required" }, { status: 400 });

        await connectDB();

        const changedUser = await User.findByIdAndUpdate(userId, { nationality: newNation.trim() }, { new: true, runValidators: true });

        if (!changedUser) return NextResponse.json({ error: "Nie znaleziono użytkownika / User not found" }, { status: 404 });

        return NextResponse.json({ message: "Zaktualizowano narodowość / Nationality updated", nationality: changedUser.nationality }, { status: 200 })
    } catch (err) {
        console.error(`Błąd w /api/nationality-change: ${err}`);
        return NextResponse.json({ error: "Błąd serwera / Internal server error" }, { status: 500 });
    }
}