import { Resend } from "resend";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const resend = new Resend(process.env.RESEND_API_KEY);

        const { imie, email, temat, wiadomosc } = await request.json();

        if (!imie || !email || !temat || !wiadomosc) return NextResponse.json({ error: "Wszystkie pola wymagane / All inputs required" }, { status: 400 })

        const data = await resend.emails.send({
            from: "Kontakt <noreply@zone48.pl>",
            to: ['contact.zone48@gmail.com'],
            subject: `Nowa wiadomość na temat ${temat}`,
            html: `
                <p>Od ${imie}, ${email}</p>
                <p>Temat wiadomości: ${temat}</p>
                <p>Treść: ${wiadomosc}</p>
            `
        });

        return NextResponse.json({ message: "Pomyślnie wysłano wiadomość / Message sent successfully", success: true, data });
    } catch (err) {
        console.error(`Błąd w /api/contact: ${err}`);
        return NextResponse.json({ error: "Błąd serwera / Internal server error" }, { status: 500 });
    }
}