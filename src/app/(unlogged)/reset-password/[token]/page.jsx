import { Suspense } from "react";

import ResetPasswordContent from "../../_components/ResetPasswordContent";

const ResetPassword = () => {
    return (
        <Suspense fallback={<main className="reset-password">Ładowanie paneli słonecznych</main>}>
            <ResetPasswordContent/>
        </Suspense>
    )
}

export default ResetPassword