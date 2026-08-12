import { Suspense } from "react";

import ResetPasswordContent from "../../_components/ResetPasswordContent";

export const metadata = {
    title: "Zone 48 - Zresetuj swoje hasło",
    description : ""
}

const ResetPassword = () => {
    return (
        <Suspense fallback={<main className="reset-password">Ładowanie paneli słonecznych</main>}>
            <ResetPasswordContent/>
        </Suspense>
    )
}

export default ResetPassword