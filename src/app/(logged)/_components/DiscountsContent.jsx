"use client";

import { useAuth } from "@/app/context/AuthContext";
import { translation } from "@/constants/translations";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

const DiscountsContent = () => {
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
        <main className="discounts">
            <h1>{t.discounts.n1}</h1>
            <hr className="dsh-hr"/>
            <div className="discounts-div">
                <h2>{t.discounts.n2}</h2>
                <p>{t.discounts.t1}</p>
            </div>
            <hr className="dsh-hr"/>
            <div className="discount-code-wrapper">
                <h3>{t.discounts.n3}</h3>
                <div className="discount-code">
                    <h4>placeholder</h4>
                    <p>{t.discounts.t2}</p>
                </div>
            </div>
            <div className="other-codes-wrapper">
                <h3>{t.discounts.n4}</h3>
                <div className="other-codes">

                </div>
            </div>
        </main>
    )
}

export default DiscountsContent