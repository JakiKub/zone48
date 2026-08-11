import { Suspense } from "react";

import ForgotPasswordContent from "../_components/ForgotPasswordContent";

const ForgotPassword = () => {
    return (
        <Suspense fallback={<main className="forgot-password">Loading...</main>}>
            <ForgotPasswordContent/>
        </Suspense>
    )
}

export default ForgotPassword