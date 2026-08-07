import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function PATCH(request) {
    try {
        const { userId, newNation } = await request.json();

        if (!userId || !newNation) return NextResponse.json({ error: "cos zgubiles" }, { status: 400 });

        await connectDB();

        const changedUser = await User.findByIdAndUpdate(userId, { nationality: newNation.trim() }, { new: true, runValidators: true });

        if (!changedUser) return NextResponse.json({ error: "nie ma takiego uzytkownika" }, { status: 404 });

        return NextResponse.json({ message: "nationality updated", nationality: changedUser.nationality }, { status: 200 })
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}