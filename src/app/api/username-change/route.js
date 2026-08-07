import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function PATCH(request) {
    try {
        const { userId, newUsername } = await request.json();

        if (!userId || !newUsername) return NextResponse.json({ error: "cos zgubiles po drodze" }, { status: 400 });

        await connectDB();

        const exists = await User.findOne({ username: newUsername.trim(), id: { $ne: userId } });

        if (exists) return NextResponse.json({ error: "taki juz istnieje, znajdz sobie inny" }, { status: 400 });

        const changedUser = await User.findByIdAndUpdate(userId, { username: newUsername.trim() }, { new: true, runValidators: true });

        if (!changedUser) return NextResponse.json({ error: "taki nie istnieje, zes sobie znalazl" }, { status: 404 });

        return NextResponse.json({ message: "updated username", username: changedUser.username }, { status: 200 })
    } catch (err) {
        return NextResponse.json({ error: "co sie stalo do dzis nie wiem, religia to nie moje hobby, wolalem siedziec na gorce obserwowac startujace samoloty" }, { status: 500 })
    }
}