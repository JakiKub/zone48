"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { translation } from "@/constants/translations";

const TabBar = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const lang = searchParams.get("lang");
    const isPolish = lang !== "en";
    
    const t = translation[isPolish];

    const getHref = (path) => {
        return isPolish ? path : `${path}?lang=en`;
    };

    return (
        <nav className="tabbar">
            {[
                { path: "/dashboard", icon: "/mobile/tabbar/mobilna_pulpit.png", label: t.tabbar.b1 },
                { path: "/discounts", icon: "/mobile/tabbar/mobilna_znizki.png", label: t.tabbar.b2 },
                { path: "/", icon: "/mobile/tabbar/mobilna_odkrywaj.png", label: t.tabbar.b3 },
                { path: "/settings", icon: "/mobile/tabbar/mobilna_ustawienia.png", label: t.tabbar.b4 },
                { path: "/help", icon: "/mobile/tabbar/mobilna_pomoc.png", label: t.tabbar.b5 },
            ].map((item) => {
                const isActive = pathname === item.path;

                return (
                    <Link key={item.path} href={getHref(item.path)} className={`tabbar-item ${isActive ? "active" : ""}`}><img src={item.icon} alt="ikona" />{item.label}</Link>
                );
            })}
        </nav>
    );
};

export default TabBar