"use client";

import { translation } from "@/constants/translations";

import { useAuth } from "@/app/context/AuthContext";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

const DashboardContent = () => {
    const { user, loading } = useAuth();

    const router = useRouter();

    const searchParams = useSearchParams();
    const isPolish = searchParams.get("lang") !== "en";

    const t = translation[isPolish];  
    
    useEffect(() => {
        if (!loading && !user) router.push(isPolish ? "/" : "/?lang=en")
    }, [user, loading, isPolish, router])

    if (!user || loading) return null

    return (
        <main className="dashboard">
            <h1>{t.dashboard.n1}</h1>
            <hr className="dsh-hr"/>
            <div className="dsh-div-1">
                <h2>{t.dashboard.n2}</h2>
                <p>{t.dashboard.t1}</p>
            </div>
            <hr className="dsh-hr"/>
            <div className="dsh-saldo-wrapper">
                <p>{t.dashboard.n3}</p>
                <div className="dsh-saldo">
                    <h3>{t.dashboard.n4}</h3>
                    <div>
                        <p>{user?.pointsNow}</p>
                        <img src="/desktop/dashboard/pulpit_waluta.png" alt="monetka"/>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default DashboardContent