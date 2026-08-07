"use client";

import { useAuth } from "@/app/context/AuthContext";
import { translation } from "@/constants/translations";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const HelpContent = () => {
    const { user, loading } = useAuth();

    const [loading2, setLoading2] = useState(false);

    const router = useRouter();

    const searchParams = useSearchParams();
    const isPolish = searchParams.get("lang") !== "en";
    
    const t = translation[isPolish];  
        
    useEffect(() => {
        if (!loading && !user) router.push(isPolish ? "/" : "/?lang=en")
    }, [user, loading, isPolish, router])
    
    if (!user || loading) return null

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading2(true);

        const formData = new FormData(e.target);
        const data = {
            imie: formData.get('dane'),
            email: formData.get('email'),
            temat: formData.get('temat'),
            wiadomosc: formData.get('tresc')
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
            error: (err) => err.message
        });

        try {
            await sendPromise
        } catch (err) {
            console.error(err);
        } finally {
            setLoading2(false);
        }
    }
    
    return (
        <main className="help">
            <h1>{t.help.n1}</h1>
            <hr className="dsh-hr"/>
            <div className="help-div">
                <h2>{t.help.n2}</h2>
                <p>{t.help.t1}</p>
            </div>
            <hr className="dsh-hr"/>
            <form className="help-form" onSubmit={handleSubmit}>
                <div>
                    <p>{t.help.i1}</p>
                    <input type="text" name="dane" required/>
                </div>
                <div>
                    <p>{t.help.i2}</p>
                    <input type="text" name="email" required/>
                </div>
                <div>
                    <p>{t.help.i3}</p>
                    <select name="temat" required>
                        <option value=""></option>
                        <option value="test">test</option>
                    </select>
                </div>
                <div>
                    <p>{t.help.i4}</p>
                    <input type="text" name="tresc" required/>
                </div>
                <button type="submit" disabled={loading2}>{t.help.b1}</button>
            </form>
            <Toaster position="top center" toastOptions={{ loading: { className: "kontakt-toast-loading" } , success: { className: "kontakt-toast-success" }, error: { className: "kontakt-toast-error" } }} reverseOrder={false} className/>
        </main>
    )
}

export default HelpContent