import { NextResponse } from "next/server";
import { Resend } from "resend";
import crypto from 'crypto';

import User from "@/models/User";
import connectDB from "@/lib/mongodb";

const resend = new Resend(process.env.RESEND_API_KEY);

//trzeba znalezc w db czy user jest verified, jak nie to wyjebac error a jak tak to go wpuscic :))

//co zrobic dalej bo mn wyjebali z kompa: sprawdzic czy jest uzytkownik w bazie, sprawdzic czy email jest zweryfikowany, 
//jesli tak to wyslac maila z linkiem resetujacym na podany mail a potem napisac endpoint /reset-password i to samo na froncie

export async function POST(request) {
    try {
        const { email } = await request.json();

        if (!email) return NextResponse.json({ error: "Wszystkie pola wymagane / All inputs required" }, { status: 400 });

        await connectDB();

        const user = await User.findOne({ email });

        if (!user) return NextResponse.json({ error: "Nie znaleziono użytkownika / User not found" }, { status: 404 });

        if (!user.verified) return NextResponse.json({ error: "Użytkownik musi być zweryfikowany / User must be verified" }, { status: 401 });

        const rawToken = crypto.randomBytes(32).toString("hex");
        const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex");
        const tokenExpireDate = Date.now() + 3600000;

        user.resetPasswordToken = hashedToken;
        user.resetPasswordExpires = tokenExpireDate;

        await user.save();

        const domain = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
        const verifyUrl = `${domain}/reset-password/${rawToken}`;

        await resend.emails.send({
            from: "noreply@zone48.pl",
            to: email,
            subject: "Link do resetu hasła / Reset password link",
            html: `<p>Kliknij poniższy link aby zresetować swoje hasło: / Click this link to reset your password: </p>
                        <br/>
                        <a href="${verifyUrl}">${verifyUrl}</a>
                        <br/>
                        <p>Jeśli to nie ty, to zignoruj tą wiadomość / If this is not you, ignore this message</p>
            `
        });

        return NextResponse.json({ message: "Pomyślnie wysłano link resetujący / Reset link has been sent successfully" }, { status: 200 });

    } catch (err) {
        console.error(`Błąd w /api/forgot-password: ${err}`);
        return NextResponse.json({ error: "Błąd serwera / Internal server error" }, { status: 500 });
    }
}