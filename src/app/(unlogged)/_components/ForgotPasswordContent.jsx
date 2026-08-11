"use client";

import { useSearchParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useState } from "react";

import { translation } from "@/constants/translations";

const ForgotPasswordContent = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const isPolish = searchParams.get("lang") !== "en";

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (loading) return

        setLoading(true);

        const formData = new FormData(e.target);
        const data = {
            email: formData.get("email")
        }

        const sendPromise = fetch("/api/forgot-password", {
            method: "POST",
            headers: { "Content-Type" : "application/json" },
            body: JSON.stringify(data)
        }).then(async (res) => {
            const resData = await res.json();

            if (!res.ok) throw new Error(resData.error);
            e.target.reset();
            return resData
        });

        toast.promise(sendPromise, {
            loading: isPolish ? "Wysyłanie linku resetującego..." : "Sending reset link...",
            success: (success) => success.message,
            error: (err) => err.message
        });

        try {
            await sendPromise;
            setTimeout(() => { router.push(isPolish ? "/" : "/?lang=en") }, 4000)
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }
    
    const t = translation[isPolish];

    return (
        <main className="forgot-password">
            <h1>{t.forgot_password.n1}</h1>
            <form onSubmit={handleSubmit}>
                <p>{t.forgot_password.t1}</p>
                <input type="email" name="email"/>
                <button type="submit">{t.forgot_password.b1}</button>
            </form>
        </main>
    )
}

export default ForgotPasswordContent