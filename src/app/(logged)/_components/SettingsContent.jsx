"use client";

import { useAuth } from "@/app/context/AuthContext";
import { translation } from "@/constants/translations";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

const SettingsContent = () => {
    const { user, setUser, loading } = useAuth();
    const [isUsernameOpen, setIsUsernameOpen] = useState(false);
    const [isMailOpen, setIsMailOpen] = useState(false);
    const [isPassOpen, setIsPassOpen] = useState(false);
    const [isNationOpen, setIsNationOpen] = useState(false);

    const [isUsernameChanging, setIsUsernameChanging] = useState(false);
    const [isNationChanging, setIsNationChanging] = useState(false);
    const [isPassChanging, setIsPassChanging] = useState(false);

    const handleUsernameChange = async (e) => {
        e.preventDefault();
        if (isUsernameChanging) return

        setIsUsernameChanging(true);

        const formData = new FormData(e.target);
        const newUsername = formData.get("username-change");

        const sendPromise = fetch("/api/username-change", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: user.id, newUsername: newUsername })
        }).then(async (res) => {
            const resData = await res.json();

            if (!res.ok) throw new Error(resData.error);

            return resData
        })

        toast.promise(sendPromise, {
            loading: "Saving...",
            success: "Username changed successfully",
            error: (err) => err.message
        });

        try {
            const resData = await sendPromise;

            setUser((prev) => ({ ...prev, username: resData.username }));
            setTimeout(() => { setIsUsernameOpen(false) }, 2000)
        } catch (err) {
            console.error(err);
        } finally {
            setIsUsernameChanging(false);
        }
    }

    const handleNationChange = async (e) => {
        e.preventDefault();
        if (isNationChanging) return

        setIsNationChanging(true);

        const formData = new FormData(e.target);
        const newNation = formData.get("nation");

        const sendPromise = fetch("/api/nationality-change", {
            method: "PATCH",
            headers: { "Content-Type" : "application/json" },
            body: JSON.stringify({ userId: user.id, newNation: newNation })
        }).then(async (res) => {
            const resData = await res.json();

            if (!res.ok) throw new Error(resData.error);

            return resData
        })

        toast.promise(sendPromise, {
            loading: "Saving...",
            success: "Nationality changed successfully",
            error: (err) => err.message
        });

        try {
            const resData = await sendPromise;

            setUser((prev) => ({ ...prev, nationality: resData.nationality }));
            setTimeout(() => { setIsNationOpen(false) }, 2000)
        } catch (err) {
            console.error(err);
        } finally {
            setIsNationChanging(false);
        }
    }

    const handlePassChange = async (e) => {
        e.preventDefault();
        if (isPassChanging) return 

        setIsPassChanging(true);

        const formData = new FormData(e.target);
        const ogPass = formData.get("og-pass");
        const newPass = formData.get("new-pass");
        const newPassConfirm = formData.get("new-pass-confirm");

        if (newPass !== newPassConfirm) {
            toast.error("New passwords must be the same");
            setIsPassChanging(false);
            return
        }

        const sendPromise = fetch("/api/password-change", {
            method: "PATCH",
            headers: { "Content-Type" : "application/json" },
            body: JSON.stringify({ userId: user.id, ogPass, newPass, newPassConfirm })
        }).then(async (res) => {
            const resData = await res.json();

            if (!res.ok) throw new Error(resData.error)

            return resData
        });

        toast.promise(sendPromise, {
            loading: "Saving...",
            success: "Password changed successfully",
            error: (err) => err.message
        });

        try {
            await sendPromise

            setTimeout(() => { setIsPassOpen(false) }, 2000)
        } catch (err) {
            console.error(err);
        } finally {
            setIsPassChanging(false);
        }
    }

    const router = useRouter();

    const searchParams = useSearchParams();
    const isPolish = searchParams.get("lang") !== "en";

    const t = translation[isPolish];  
    
    useEffect(() => {
        if (!loading && !user) router.push(isPolish ? "/" : "/?lang=en")
    }, [user, loading, isPolish, router])

    if (!user || loading) return null
    
    return (
        <main className="settings">
            <h1>{t.settings.n1}</h1>
            <hr className="dsh-hr"/>
            <div className="settings-div">
                <h2>{t.settings.n2}</h2>
                <p>{t.settings.t1}</p>
            </div>
            <hr className="dsh-hr"/>
            <div className="settings-div-2">
                <div className="settings-div-3">
                    <h3>{t.settings.t2}</h3>
                    <div>
                        <p>{user?.username}</p>
                        <button onClick={() => setIsUsernameOpen(true)}>{t.settings.b1}</button>
                    </div>
                </div>
                <div className="settings-div-3">
                    <h3>{t.settings.t3}</h3>
                    <div>
                        <p>{user?.email}</p>
                        <button onClick={() => setIsMailOpen(true)}>{t.settings.b1}</button>
                    </div>
                </div>
                <div className="settings-div-3">
                    <h3>{t.settings.t4}</h3>
                    <div>
                        <p>{t.settings.warn}</p>
                        <button onClick={() => setIsPassOpen(true)}>{t.settings.b1}</button>
                    </div>
                </div>
                <div className="settings-div-3">
                    <h3>{t.settings.t5}</h3>
                    <div>
                        <p>{user?.nationality}</p>
                        <button onClick={() => setIsNationOpen(true)}>{t.settings.b1}</button>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isUsernameOpen && <motion.form className="settings-form" onSubmit={handleUsernameChange}  initial={{ opacity: 0, }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .4 }}>
                    <div className="settings-form-wrapper">
                        <button type="button" className="settings-form-close" onClick={() => setIsUsernameOpen(false)}><img src="/desktop/login-modal/x.png" alt="close"/></button>
                        <div className="settings-top">
                            <h2>{t.settings.n3}</h2>
                            <p>{t.settings.t6}</p>
                        </div>
                        <div className="settings-input-div">
                            <p>{t.settings.t7}</p>
                            <input type="text" name="username-change" required></input>
                        </div>
                        <button className="settings-form-button" type="submit">{t.settings.b3}</button>
                    </div>
                </motion.form>}
            </AnimatePresence>
            <AnimatePresence>            
                {isMailOpen && <motion.form className="settings-form" initial={{ opacity: 0, }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .4 }}>
                    <div className="settings-form-wrapper">
                        <button type="button" className="settings-form-close" onClick={() => setIsMailOpen(false)}><img src="/desktop/login-modal/x.png" alt="close"/></button>
                        <div className="settings-top">
                            <h2>{t.settings.n4}</h2>
                            <p>{t.settings.t6}</p>
                        </div>
                        <div className="settings-input-div">
                            <p>{t.settings.t9}</p>
                            <input type="email" name="email-change" required></input>
                        </div>
                        <div className="settings-input-div">
                            <p>{t.settings.t10}</p>
                            <input type="password" name="password-check" required></input>
                        </div>
                        <button className="settings-form-button" type="submit">{t.settings.b4}</button>
                    </div>
                </motion.form>}
            </AnimatePresence>
            <AnimatePresence>            
                {isPassOpen && <motion.form className="settings-form" initial={{ opacity: 0, }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .4 }} onSubmit={handlePassChange}>
                    <div className="settings-form-wrapper">
                        <button type="button" className="settings-form-close" onClick={() => setIsPassOpen(false)}><img src="/desktop/login-modal/x.png" alt="close"/></button>
                        <div className="settings-top">
                            <h2>{t.settings.n5}</h2>
                            <p>{t.settings.t6}</p>
                        </div>
                        <div className="settings-input-div">
                            <p>{t.settings.t12}</p>
                            <input type="password" name="og-pass" required></input>
                        </div>
                        <div className="settings-input-div">
                            <p>{t.settings.t13}</p>    
                            <input type="password" name="new-pass" required></input>
                        </div>
                        <div className="settings-input-div">
                            <p>{t.settings.t15}</p>    
                            <input type="password" name="new-pass-confirm" required></input>
                        </div>
                        <button className="settings-form-button" type="submit">{t.settings.b5}</button>
                    </div>
                </motion.form>}
            </AnimatePresence>
            <AnimatePresence>            
                {isNationOpen && <motion.form className="settings-form" initial={{ opacity: 0, }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .4 }} onSubmit={handleNationChange}>
                    <div className="settings-form-wrapper">
                        <button type="button" className="settings-form-close" onClick={() => setIsNationOpen(false)}><img src="/desktop/login-modal/x.png" alt="close"/></button>
                        <div className="settings-top">
                            <h2>{t.settings.n6}</h2>
                            <p>{t.settings.t6}</p>
                        </div>
                        <div className="settings-input-div">
                            <p>{t.settings.t16}</p>
                            <select name="nation" required>
                                <option value=""/>
                                <option value="Unset">Unset</option>
                                <option value="Polska (POL)">Polska (POL)</option>
                            </select>
                        </div>
                        <button type="submit">{t.settings.b6}</button>
                    </div>
                </motion.form>}
            </AnimatePresence>
            <Toaster position="top center" toastOptions={{ loading: { className: "kontakt-toast-loading" } , success: { className: "kontakt-toast-success" }, error: { className: "kontakt-toast-error" } }} reverseOrder={false} className/>
        </main>
    )
}

export default SettingsContent


// poprawic errory und jak jest return nextresponse.json to w tym error piszemy oglnie a dopiero robimy console.error