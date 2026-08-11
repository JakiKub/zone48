import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { Resend } from "resend";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
    try {
        const { username, email, password } = await request.json();

        if (!username || !email || !password) return NextResponse.json({ error: "Wszystkie pola wymagane / All inputs required" }, { status: 400 })

        await connectDB()

        const userExists = await User.findOne({ $or: [{ email }, { username }] });

        if (userExists) return NextResponse.json({ error: "Użytkownik już istnieje / This user already exists" }, { status: 400 });

        const hashedPass = await bcrypt.hash(password, 10);

        const rawToken = crypto.randomBytes(32).toString("hex");
        const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex");

        const createUser = await User.create({ username, email, password: hashedPass, verifToken: hashedToken, verified: false });

        const domain = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"; //uzupelnic to w .env, mam szeczera kurna nadzieje ze na "https://zone48.com"
        const verifyUrl = `${domain}/api/email-verification?token=${rawToken}`;

        await resend.emails.send({
            from: "onboarding@resend.dev", //potem zmienic na no-reply@zone48.com (lub .vercel.app)
            to: email,
            subject: "E-mail validation / Potwierdzenie e-maila",
            html: `<p>Kliknij, aby zweryfikować swój e-mail: </p><a href=${verifyUrl}>${verifyUrl}</a>`
        })

        return NextResponse.json(
            {
                message: "Zarejestrowano pomyślnie, sprawdź maila, aby go zweryfikować / Registered successfully, check your e-mail to verify it",
                user: {
                    id: createUser._id,
                    username: createUser.username,
                    email: createUser.email
                },
            }, { status: 200 }
        )
    } catch (err) {
        console.error(`Błąd w /api/register: ${err}`);
        return NextResponse.json({ error: "Błąd serwera / Internal server error" }, { status: 500 });
    }
}