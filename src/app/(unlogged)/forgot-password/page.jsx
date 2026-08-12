import { Suspense } from "react";

import ForgotPasswordContent from "../_components/ForgotPasswordContent";

export const metadata = {
    title: "Zone 48 - Zapomniałeś swojego hasła?",
    description : ""
}

const ForgotPassword = () => {
    return (
        <Suspense fallback={<main className="forgot-password">Loading...</main>}>
            <ForgotPasswordContent/>
        </Suspense>
    )
}

export default ForgotPassword