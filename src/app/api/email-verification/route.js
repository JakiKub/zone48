import { NextResponse } from "next/server";
import crypto from "crypto";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const token = searchParams.get("token");

        if (!token) return NextResponse.json({ error: "po drodze token zgubiles slodziaku" }, { status: 400 });

        await connectDB();

        const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

        const user = await User.findOne({ verifToken: hashedToken })

        if (!user) return NextResponse.json({ error: "token zly albo uzyty" }, { status: 400 })

        user.verified = true;
        user.verifToken = undefined;
        await user.save();

        const domain = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

        return NextResponse.redirect(`${domain}/?verified=true`)
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}