"use client";

import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"
import { translation } from "@/constants/translations";

import { useAuth } from "@/app/context/AuthContext";

const Sidebar = () => {
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
        <aside className="sidebar">
            <div className="sidebar-div-1">
                <img src="/desktop/sidebar/pulpit_logozone48.png" alt="logo"/>
                <div>
                    <h1>Zone 48</h1>
                    <p>Leave your mark on the Top</p>
                </div>
            </div>
            <hr className="hr-sidebar"/>
            <div className="sidebar-div">
                <p className="sidebar-p-1">{t.sidebar.t1}</p>
                <p className="sidebar-p-2">{user?.username}</p>
                <p className="sidebar-p-3">{user?.email}</p>
            </div>
            <hr className="hr-sidebar"/>
            <div className="sidebar-div">
                <p className="sidebar-p-3">{t.sidebar.n1}</p>
                <nav>
                    <Link href={isPolish ? "/dashboard" : "/dashboard?lang=en"} className="sidebar-link"><img src="/desktop/sidebar/zakladka_pulpit.png" alt=""/>{t.sidebar.b1}</Link>
                    <Link href={isPolish ? "/discounts" : "/discounts?lang=en"} className="sidebar-link"><img src="/desktop/sidebar/zakladka_znizki.png" alt=""/>{t.sidebar.b2}</Link>
                    <Link href="/dashboard" className="sidebar-link"><img src="/desktop/sidebar/zakladka_odkrywaj.png" alt=""/>{t.sidebar.b3}</Link>
                    <Link href={isPolish ? "/settings" : "/settings?lang=en"} className="sidebar-link"><img src="/desktop/sidebar/zakladka_ustawienia.png" alt=""/>{t.sidebar.b4}</Link>
                    <Link href={isPolish ? "/help" : "/help?lang=en"} className="sidebar-link"><img src="/desktop/sidebar/zakladka_pomoc.png" alt=""/>{t.sidebar.b5}</Link>
                </nav>
            </div>
            <hr className="hr-sidebar"/>
            <div className="sidebar-div">
                <Link href={isPolish ? "/" : "/?lang=en"} className="sidebar-bottom">{t.sidebar.b6}</Link>
                <button className="sidebar-bottom" onClick={() => handleLogout()}>{t.sidebar.b7}</button>
            </div>
        </aside>
    )
}

export default Sidebar