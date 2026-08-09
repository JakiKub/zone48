"use client";

import { translation } from "@/constants/translations";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast"

import { useAuth } from "@/app/context/AuthContext";

const LoginModal = ({ closeLogin, closeLoginOpen }) => {
    const { checkUser } = useAuth();

    const searchParams = useSearchParams();
    const router = useRouter();
    const isPolish = searchParams.get("lang") !== "en";

    const t = translation[isPolish];

    const [imgIndex, setImgIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    
    const imgArray = [
        "/desktop/login-modal/grafika1.png",
        "/desktop/login-modal/grafika2.png",
        "/desktop/login-modal/grafika3.png"
    ]

    useEffect(() => {
        const zmiana = setInterval(() => {
            setImgIndex((prev) => (prev + 1) % imgArray.length)
        }, 4000)

        return () => clearInterval(zmiana);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (loading) return

        setLoading(true);

        const formData = new FormData(e.target);
        const data = {
            username: formData.get("username"),
            password: formData.get("password")
        }

        const sendPromise = fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type" : "application/json" },
            body: JSON.stringify(data)
        }).then(async (res) => {
            const resData = await res.json();

            if (!res.ok) throw new Error("Błąd serwera / Internal server error");
            e.target.reset();
            return resData;
        });

        toast.promise(sendPromise, {
            loading: "Logging in...",
            success: "Logged in successfully",
            error: (err) => err.message
        })

        try {
            await sendPromise;
            await checkUser();
            router.push("/dashboard");
            setTimeout(() => {
                closeLogin();
                router.refresh();
            }, 3000);
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false);
        }
    }
    
    return (
        <motion.div className="auth-modal login-wrapper" initial={{ opacity: 0, }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .4 }}>
            <div className="login-modal auth-modal-inside">
                <button className="auth-close" onClick={() => closeLogin()}><img src="/desktop/login-modal/x.png" alt="close button"/></button>
                <AnimatePresence mode="wait">
                    <motion.img src={imgArray[imgIndex]} key={imgIndex} initial={{ opacity: 0, }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .4 }} alt=""/>
                </AnimatePresence>
                <div className="login-right">
                    <div className="kys-login">
                        <h1>{t.login_modal.n1}</h1>
                        <p className="login-p-1">{t.login_modal.t1}</p>
                    </div>
                    <form className="login-form" onSubmit={handleSubmit}>
                        <div className="login-div">
                            <p className="login-div-p">{t.login_modal.t2}</p>
                            <input type="text" name="username"/>
                        </div>
                        <div className="login-div">
                            <p className="login-div-p">{t.login_modal.t3}</p>
                            <input type="password" name="password"/>
                        </div>
                        <button type="submit">{t.login_modal.b1}</button>
                    </form>
                    <div className="jebac-design">
                        <div className="jebac-design-2">
                            <div className="kreska-donosowa"></div>
                            <p>{t.login_modal.t4}</p>
                            <div className="kreska-donosowa"></div>
                        </div>
                        <button onClick={() => closeLoginOpen()} disabled={loading}>{t.login_modal.b2}</button>
                    </div>
                </div>
                <Toaster position="top center" toastOptions={{ loading: { className: "kontakt-toast-loading" }, success: { className: "kontakt-toast-success" }, error: { className: "kontakt-toast-error" } }} reverseOrder={false} className/>
            </div>
        </motion.div>
    )
}

export default LoginModal