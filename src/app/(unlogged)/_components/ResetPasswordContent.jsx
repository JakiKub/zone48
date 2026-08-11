"use client";

import { useSearchParams, useParams, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

import { translation } from "@/constants/translations";

const ResetPasswordContent = () => {
    const searchParams = useSearchParams();
    const params = useParams();
    const router = useRouter();
    const isPolish = searchParams.get("lang") !== "en";
    const t = translation[isPolish];

    const [loading, setLoading] = useState(false);

    const rawToken = params.token;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (loading) return 

        setLoading(true);

        const formData = new FormData(e.target);
        const data = {
            rawToken: rawToken,
            password: formData.get("password"),
            confirmPassword: formData.get("confirm-password")
        }

        const sendPromise = fetch("/api/reset-password", {
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
            loading: isPolish ? "Zmienianie hasła..." : "Changing password...",
            success: (success) => success.message,
            error: (err) => err.message
        },);

        try {
            await sendPromise;
            setTimeout(() => { router.push("/") }, 2000);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }
    
    return (
        <main className="reset-password">
            <h1>{t.reset_password.n1}</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <p>{t.reset_password.t1}</p>
                    <input type="password" name="password"/>
                </div>
                <div>
                    <p>{t.reset_password.t2}</p>
                    <input type="password" name="confirm-password"/>
                </div>
                <button type="submit">{t.reset_password.b1}</button>
            </form>
        </main>
    )
}

export default ResetPasswordContent