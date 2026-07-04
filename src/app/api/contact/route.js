import { Resend } from "resend";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const resend = new Resend(process.env.RESEND_API_KEY);

        const { imie, email, temat, wiadomosc } = await request.json();

        if (!imie || !email || !temat || !wiadomosc) return NextResponse.json({ error: "All inputs required" }, { status: 400 })

        const data = await resend.emails.send({
            from: "Kontakt <onboarding@resend.dev>",
            to: ['contact.zone48@gmail.com'],
            subject: `Nowa wiadomość na temat ${temat}`,
            html: `
                <p>od ${imie}, ${email}</p>
                <p>temat: ${temat}</p>
                <p>tresc: ${wiadomosc}</p>
            `
        });

        return NextResponse.json({ success: true, data });
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}