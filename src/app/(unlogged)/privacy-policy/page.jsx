import { Suspense } from "react";

import PrivacyPolicyContent from "../_components/PrivacyPolicyContent";

export const metadata = {
    title: "Zone 48 - Polityka prywatności"
}

const PrivacyPolicy = () => {
    return (
        <Suspense fallback={<main className="privacy-policy">Ładowanie...</main>}>
            <PrivacyPolicyContent/>
        </Suspense>
    )
}

export default PrivacyPolicy