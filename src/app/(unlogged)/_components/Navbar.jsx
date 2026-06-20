"use client";

import { useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";
import { translation } from "@/constants/translations";

const Navbar = () => { 
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [isOpen, setIsOpen] = useState(false);
    const [isDiscOpen, setIsDiscOpen] = useState(false);
    const [isMoreOpen, setIsMoreOpen] = useState(false);
    const isPolish = searchParams.get("lang") !== "en";

    const t = translation[isPolish];

    const languageChange = (lang) => {
        const params = new URLSearchParams(searchParams.toString());

        lang === "pl" ? params.delete("lang") : params.set("lang", "en");

        router.push(`${pathname}?${params.toString()}`);

        setIsOpen(false);
    }

    return (
        <nav className="navbar">
            <div className="navbar-top">
                <p>{t.navbar.top}</p>
                <div>
                    <div className="lang-change">
                        <button onClick={() => setIsOpen(!isOpen)}>
                            <img src={t.navbar.img} alt="flag"/>
                            <span>{t.navbar.choice}</span>
                            <img src="/desktop/navbar/nvb_jezyk_strzalka.png" alt="strzalka"/>
                        </button>

                        {isOpen && (
                            <div className="lang-choice">
                                <div className="lang" onClick={() => languageChange("pl")}>
                                    <img src="/desktop/navbar/nvb_flag_poland.png" alt="polska"/>
                                    <span>POLSKI</span>
                                </div>
                                <div className="lang" onClick={() => languageChange("en")}>
                                    <img src="/desktop/navbar/nvb_flag_uk.png" alt="anglia"/>
                                    <span>ENGLISH</span>
                                </div>
                            </div>
                        )}
                    </div>
                    <img src="/desktop/navbar/nvb_jezyk_szukaj_oddzielenie.png" alt="oddzielenie"/>
                    <button className="szukaj">
                        <img src="/desktop/navbar/nvb_szukaj.png" alt="szukaj"/>
                    </button>
                    <button className="profil">
                        <img src="/desktop/navbar/nvb_logowanie.png" alt="profil"/>
                    </button>
                </div>
            </div>
            <div className="navbar-bottom">
                <Link className="logo" href="/">
                    <img src="/desktop/navbar/nvb_logo_projektu.png" alt="logo"/>
                </Link>
                <Link href="/" className="navbar-link">{t.navbar.s1}</Link>
                {/* tutaj wpisac inne sciezki jak beda gotowe :)) */}
                <div className="discover">
                    <button className="navbar-link" onClick={() => setIsDiscOpen(!isDiscOpen)}>{t.navbar.s2}</button>

                    {isDiscOpen && (
                        <div className="city-choice">
                            <Link href="/" className="city-link">Toruń (POL)</Link>
                            <Link href="/" className="city-link">Budapest (HUN)</Link>
                        </div>
                    )}
                </div>
                <Link href="/" className="navbar-link">{t.navbar.s3}</Link>
                <Link href="/" className="navbar-link">{t.navbar.s4}</Link>
                <Link href="/" className="navbar-link">{t.navbar.s5}</Link>
                <Link href="/" className="navbar-link">{t.navbar.s6}</Link>
                <div className="more">
                    <button className="navbar-link" onClick={() => setIsMoreOpen(!isMoreOpen)}>{t.navbar.s7}</button>

                    {isMoreOpen && (
                        <div className="more-choice">
                            <Link href="/" className="more-link">Podcast</Link>
                            <Link href="/" className="more-link">FAQ</Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar;