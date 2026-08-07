"use client";

import { translation } from "@/constants/translations"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const RegisterModal = ({ closeRegister, closeRegisterOpen }) => {
    const searchParams = useSearchParams();
    const isPolish = searchParams.get("lang") !== "en";

    const [loading, setLoading] = useState(false);

    const t = translation[isPolish];

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (loading) return

        setLoading(true);

        const formData = new FormData(e.target);
        const data = {
            email: formData.get("email"),
            username: formData.get("username"),
            password: formData.get("password"),
            confirm: formData.get("confirm")
        }


        if (data.password !== data.confirm) {
            toast.error("Passwords must be the same");
            setLoading(false);
            return
        }

        const sendPromise = fetch("/api/register", {
            method: "POST",
            headers: { "Content-Type" : "application/json" },
            body: JSON.stringify(data)
        }).then(async (res) => {
            const resData = await res.json();

            if (!res.ok) throw new Error(resData.error || "hehehehe serwer ma wylew nic nie poradzisz");
            e.target.reset();
            return resData;
        });

        toast.promise(sendPromise, {
            loading: "Registering...",
            success: "Registered successfully. Check your email to verify your account",
            error: (err) => err.message
        })

        try {
            await sendPromise;
            setTimeout(() => {
                closeRegister()
            }, 3000)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false);
        }
    }
    
    return (
        < motion.div className="auth-modal register-wrapper" initial={{ opacity: 0, }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .4 }}>
            <div className="auth-modal-inside register-modal">
                <button className="auth-close" onClick={() => closeRegister()}><img src="/desktop/register-modal/x.png" alt="close button"/></button>
                <div className="register-top">
                    <h1>{t.register_modal.n1}</h1>
                    <p>{t.register_modal.t1}</p>
                </div>
                <form className="register-form" onSubmit={handleSubmit}>
                    <div className="register-grid">
                        <div>
                            <p>{t.register_modal.t2}</p>
                            <input type="email" name="email"/>
                        </div>
                        <div>
                            <p>{t.register_modal.t3}</p>
                            <input type="text" name="username"/>
                        </div>
                        <div>
                            <p>{t.register_modal.t4}</p>
                            <input type="password" name="password"/>
                        </div>
                        <div>
                            <p>{t.register_modal.t5}</p>
                            <input type="password" name="confirm"/>
                        </div>
                    </div>
                    <button className="register-submit">{t.register_modal.b1}</button>
                </form>
                <div className="jebac-design-register">
                    <div className="jebac-design-register-2">
                        <div className="kreska-pod-okiem"></div>
                        <p>{t.register_modal.t6}</p>
                        <div className="kreska-pod-okiem"></div>
                    </div>
                    <button onClick={() => closeRegisterOpen()}  disabled={loading}>{t.register_modal.b2}</button>
                </div>
                <Toaster position="top center" toastOptions={{ loading: { className: "kontakt-toast-loading" } , success: { className: "kontakt-toast-success" }, error: { className: "kontakt-toast-error" } }} reverseOrder={false} className/>
            </div>
        </motion.div>
    )
}

export default RegisterModal