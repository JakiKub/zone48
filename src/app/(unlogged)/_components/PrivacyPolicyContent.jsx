"use client";

import Link from "next/link";

import { translation } from "@/constants/translations";
import { useSearchParams } from "next/navigation";

const PrivacyPolicyContent = () => {
    const searchParams = useSearchParams();
    const isPolish = searchParams.get("lang") !== "en";

    const t = translation[isPolish];
    
    return (
        <main className="privacy-policy">
            <h1>{t.privacy_policy.n1}</h1>
            <div>
                <h2>{t.privacy_policy.n2}</h2>
                <div>
                    <p>{t.privacy_policy.p2_1}</p>
                    <p>{t.privacy_policy.p2_2}</p>
                    <p>{t.privacy_policy.p2_3}</p>
                </div>
            </div>
            <div>
                <h2>{t.privacy_policy.n3}</h2>
                <p className="pp-p-1">{t.privacy_policy.p3_0}</p>
                <div>
                    <p>{t.privacy_policy.p3_1}</p>
                    <p>{t.privacy_policy.p3_2}</p>
                    <p>{t.privacy_policy.p3_3}</p>
                </div>
                <p className="pp-p-2">{t.privacy_policy.p3_4}</p>
            </div>
            <div>
                <h2>{t.privacy_policy.n4}</h2>
                <p className="pp-p-1">{t.privacy_policy.p4_0}</p>
                <div>
                    <p>1. <Link href="https://www.mongodb.com/products/platform/atlas-database">MongoDB Atlas</Link>{t.privacy_policy.p4_1}</p>
                    <p>2. <Link href="https://vercel.com">Vercel.com</Link>{t.privacy_policy.p4_2}</p>
                    <p>3. <Link href="https://umami.is">Umami Analytics</Link>{t.privacy_policy.p4_3}</p>
                </div>
            </div>
            <div>
                <h2>{t.privacy_policy.n5}</h2>
                <p className="pp-p-1">{t.privacy_policy.p5_0}</p>
                <div>
                    <p>{t.privacy_policy.p5_1}</p>
                </div>
            </div>
            <div>
                <h2>{t.privacy_policy.n6}</h2>
                <p className="pp-p-1">{t.privacy_policy.p6_0}</p>
            </div>
            <div>
                <h2>{t.privacy_policy.n7}</h2>
                <p className="pp-p-1">{t.privacy_policy.p7_0} <Link href="https://umami.is">Umami Analytics</Link></p>
                <div>
                    <p><Link href="https://umami.is">Umami Analytics</Link> {t.privacy_policy.p7_1}</p>
                </div>
                <p className="pp-p-2">{t.privacy_policy.p7_4}</p>
            </div>
        </main>
    )
}

export default PrivacyPolicyContent