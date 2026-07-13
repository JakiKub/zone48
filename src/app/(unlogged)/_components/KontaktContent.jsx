"use client";

import { translation } from "@/constants/translations";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const KontaktContent = () => {
    const searchParams = useSearchParams();
    const isPolish = searchParams.get("lang") !== "en";

    const t = translation[isPolish];

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.target);
        const data = {
            imie: formData.get('imie'),
            email: formData.get('email'),
            temat: formData.get('temat'),
            wiadomosc: formData.get('wiadomosc')
        };

        const sendPromise = fetch('/api/contact', {
            method: "POST",
            headers: { "Content-Type" : "application/json" },
            body: JSON.stringify(data)
        }).then(async (res) => {
            if (!res.ok) throw new Error("bladm serwera");
            e.target.reset();
            return res.json();
        });

        toast.promise(sendPromise, {
            loading: 'Sending a message...',
            success: 'Message sent successfully',
            error: 'Message couldn\'t be sent'
        });

        try {
            await sendPromise
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="kontakt-page">
            <img src="/desktop/contact/kontakt_grafika.png" alt="zdjecie" className="kontakt-img"/>
            <img src="/mobile/contact/kontakt_mb_tlo.png" alt="zdjecie" className="kontakt-img-mobile"/>
            <div className="kontakt-top">
                <h1>{t.contact.n1}</h1>
                <p>{t.contact.t1}</p>
                <button onClick={() => document.getElementById("kontaktBottom").scrollIntoView({ behavior: "smooth" })}>{t.contact.b1}<img src="/desktop/contact/kontakt_strzalka.png" alt="strzalka"/></button>
            </div>
            <div className="kontakt-bottom" id="kontaktBottom">
                <div className="kontakt-left">
                    <div className="kontakt-div-1">
                        <p className="kontakt-p-1">{t.contact.t2}</p>
                        <div className="kontakt-wrapper">
                            <div>
                                <img src="/desktop/contact/kontakt_tel.png" alt="tel"/>
                            </div>
                            <p className="kontakt-p-2" id="nrTel">(+48) 73 137 05 41</p>
                        </div>
                    </div>
                    <div className="kontakt-div-1">
                        <p className="kontakt-p-1">{t.contact.t3}</p>
                        <div className="kontakt-wrapper">
                            <div>
                                <img src="/desktop/contact/kontakt_siedziba.png" alt="siedziba"/>
                            </div>
                            <p className="kontakt-p-2" id="siedzProj">{t.contact.t3_02}</p>
                        </div>
                    </div>
                    <div className="kontakt-div-1">
                        <p className="kontakt-p-1">{t.contact.t4}</p>
                        <div className="kontakt-wrapper">
                            <div>
                                <img src="/desktop/contact/kontakt_email.png" alt="email"/>
                            </div>
                            <p className="kontakt-p-2" id="emailAddr">contact.zone48@gmail.com</p>
                        </div>
                    </div>
                    <div className="kontakt-div-1">
                        <p className="kontakt-p-1">{t.contact.t5}</p>
                        <div className="kontakt-wrapper">
                            <div>
                                <img src="/desktop/contact/kontakt_socialmedia.png" alt="sm"/>
                            </div>
                            <p className="kontakt-p-2" id="socMedia">@wearezone.48</p>
                        </div>
                    </div>
                </div>
                <form className="kontakt-right" onSubmit={handleSubmit}>
                    <h2>{t.contact.n2}</h2>
                    <hr/>
                    <div>
                        <div className="kontakt-right-div">
                            <p className="kontakt-p-3">{t.contact.t6}</p>
                            <input type="text" name="imie" className="kontakt-input" required></input>
                        </div>
                        <div className="kontakt-right-div">
                            <p className="kontakt-p-3">{t.contact.t7}</p>
                            <input type="email" name="email" className="kontakt-input" required></input>
                        </div>
                        <div className="kontakt-right-div">
                            <p className="kontakt-p-3">{t.contact.t8}</p>
                            <select name="temat" className="kontakt-input" required>
                                <option value=""></option>
                                <option value="test">{t.contact.t8_test}</option>
                            </select>
                        </div>
                        <div className="kontakt-right-div">
                            <p className="kontakt-p-3">{t.contact.t9}</p>
                            <input type="text" name="wiadomosc" className="kontakt-input" required></input>
                        </div>
                        <button className="kontakt-send" type="submit" disabled={loading}>{t.contact.b3}</button>
                    </div>

                    <Toaster position="top center" toastOptions={{ success: { className: "kontakt-toast-success" }, error: { className: "kontakt-toast-error" } }} reverseOrder={false} className/>
                </form>
            </div>
        </main>
    )
}

export default KontaktContent