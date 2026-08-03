import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(request) {
    try {
        const { username, email, password } = await request.json();

        if (!username || !email || !password) return NextResponse.json({ error: "wszystkie pola wymagane, nie widzisz?" }, { status: 400 })

        await connectDB()

        const userExists = await User.findOne({ $or: [{ email }, { username }] });

        if (userExists) return NextResponse.json({ error: "podszywasz sie pod kogos? taki juz istnieje" }, { status: 400 });

        const hashedPass = await bcrypt.hash(password, 10);

        const createUser = await User.create({ username, email, password: hashedPass });

        return NextResponse.json(
            {
                message: "zarejestrowano pomyslnie",
                user: {
                    id: createUser._id,
                    username: createUser.username,
                    email: createUser.email
                },
            }, { status: 200 }
        )
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}