import { Suspense } from "react";

import KontaktContent from "../_components/KontaktContent";

export const metadata = {
    title: "Zone 48 - Kontakt",
    description: "Skontaktuj się z nami"
}

const KontaktPage = () => {
    return (
        <Suspense fallback={<main className="kontakt-page">ladowanie recznego granatnika</main>}>
            <KontaktContent/>
        </Suspense>
    )
}

export default KontaktPage