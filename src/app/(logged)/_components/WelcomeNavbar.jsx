"use client";

import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"
import { translation } from "@/constants/translations";

import { useAuth } from "@/app/context/AuthContext";

const WelcomeNavbar = () => {
    const { user, logout } = useAuth();
    const router = useRouter();

    const searchParams = useSearchParams();
    const isPolish = searchParams.get("lang") !== "en";
    
    const t = translation[isPolish];

    const handleLogout = async () => {
        router.push(isPolish ? "/" : "/?lang=en");
        await logout();
    }

    return (
        <header className="welcome">
            <div>
                <button onClick={() => handleLogout()}><img src="/mobile/sidebar/logout.png" alt="logout button"/></button>
                <div>
                    <img src="/desktop/sidebar/pulpit_logozone48.png" alt="logo"></img>
                    <div>
                        <p className="welcome-p-1">Zone 48</p>
                        <p className="welcome-p-2">Leave your mark on the Top</p>
                    </div>
                </div>
                <Link href={isPolish ? "/" : "/?lang=en"} className="button-welcome"><img src="/mobile/sidebar/backtomain.png" alt="back to home page button"/></Link>
            </div>
            <hr/>
            <h1>{t.welcome_navbar.n1}<b>{user?.username}</b></h1>
            <hr/>
        </header>
    )
}

export default WelcomeNavbar