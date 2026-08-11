"use client";

import { useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { translation } from "@/constants/translations";

import { useAuth } from "@/app/context/AuthContext";

import Menu from "./Menu";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

const Navbar = () => { 
    const { user } = useAuth();

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [isOpen, setIsOpen] = useState(false);
    const [isDiscOpen, setIsDiscOpen] = useState(false);
    const [isMoreOpen, setIsMoreOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
    const isPolish = searchParams.get("lang") !== "en";

    const t = translation[isPolish];

    const closeMenu = () => setIsMenuOpen(false);
    const closeLogin = () => setIsLoginOpen(false);
    const closeLoginOpen = () => {
        setIsLoginOpen(false);
        setIsRegisterOpen(true);
    }
    const closeRegister = () => setIsRegisterOpen(false);
    const closeRegisterOpen = () => {
        setIsRegisterOpen(false);
        setIsLoginOpen(true);
    }

    const languageChange = (lang) => {
        const params = new URLSearchParams(searchParams.toString());

        lang === "pl" ? params.delete("lang") : params.set("lang", "en");

        router.push(`${pathname}?${params.toString()}`);

        setIsOpen(false);
    }

    const profileClick = () => {
        if (user) router.push(isPolish ? "/dashboard" : "/dashboard?lang=en")
        else setIsLoginOpen(true)
    }

    return (
        <header className="navbar">
            <div className="navbar-top">
                <p>{t.navbar.top}</p>
                <div>
                    <div className="lang-change">
                        <motion.button onClick={() => setIsOpen(!isOpen)}>
                            <img src={t.navbar.img} alt="flag"/>
                            <span>{t.navbar.choice}</span>
                            <img src="/desktop/navbar/nvb_jezyk_strzalka.png" alt="strzałka" className="strzalkaLang"/>
                        </motion.button>

                        <AnimatePresence>
                            {isOpen && (
                                <motion.div className="lang-choice" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: .4 }}>
                                    <div className="lang" onClick={() => languageChange("pl")}>
                                        <img src="/desktop/navbar/nvb_flag_poland.png" alt="polska"/>
                                        <span>POLSKI</span>
                                    </div>
                                    <div className="lang" onClick={() => languageChange("en")}>
                                        <img src="/desktop/navbar/nvb_flag_uk.png" alt="anglia"/>
                                        <span>ENGLISH</span>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                    <img src="/desktop/navbar/nvb_jezyk_szukaj_oddzielenie.png" alt="oddzielenie"/>
                    <button className="szukaj">
                        <img src="/desktop/navbar/nvb_szukaj.png" alt="szukaj"/>
                    </button>
                    <button className="profil" onClick={() => profileClick()}>
                        {user ? user?.username : t.navbar.n1}
                        <img src="/desktop/navbar/nvb_logowanie.png" alt="profil"/>
                    </button>
                </div>
            </div>
            <nav className="navbar-bottom">
                <Link className="logo" href={isPolish ? "/" :"/?lang=en"}>
                    <img src="/desktop/navbar/nvb_logo_projektu.png" alt="logo"/>
                </Link>
                <button className="menu-bttn" onClick={() => setIsMenuOpen(!isMenuOpen)}><img src={isMenuOpen ? "/mobile/navbar/navbar_tel_zamknijmenu.png" : "/mobile/navbar/navbar_tel_otworzmenu.png"} alt="menu-open-close"/></button>
                <Link href={isPolish ? "/" :"/?lang=en"} className="navbar-link">{t.navbar.s1}</Link>
                {/* tutaj wpisac inne sciezki jak beda gotowe :)) */}
                <div className="discover">
                    <button className="navbar-link" onClick={() => setIsDiscOpen(!isDiscOpen)}>{t.navbar.s2}</button>

                    <AnimatePresence>
                        {isDiscOpen && (
                            <motion.div className="city-choice" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: .4 }}>
                                <Link href="/" className="city-link">Toruń (POL)</Link>
                                <Link href="/" className="city-link">Budapest (HUN)</Link>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
                <Link href={isPolish ? "/o-nas" : "/o-nas?lang=en"} className="navbar-link">{t.navbar.s3}</Link>
                <Link href="/" className="navbar-link">{t.navbar.s5}</Link>
                <Link href={isPolish ? "/kontakt" : "/kontakt?lang=en"} className="navbar-link">{t.navbar.s6}</Link>
                <div className="more">
                    <button className="navbar-link" onClick={() => setIsMoreOpen(!isMoreOpen)}>{t.navbar.s7}</button>

                    <AnimatePresence>
                        {isMoreOpen && (
                            <motion.div className="more-choice" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: .4 }}>
                                <Link href="/" className="more-link">Podcast</Link>
                                <Link href="/" className="more-link">FAQ</Link>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </nav>
            <AnimatePresence>
                {isMenuOpen && <Menu isMenuOpen={isMenuOpen} t={t} closeMenu={closeMenu}/>}
            </AnimatePresence>
            <AnimatePresence mode="wait">
                {isLoginOpen && <LoginModal closeLogin={closeLogin} closeLoginOpen={closeLoginOpen}/>}
                {isRegisterOpen && <RegisterModal closeRegister={closeRegister} closeRegisterOpen={closeRegisterOpen}/>}
            </AnimatePresence>
        </header>
    )
}

export default Navbar