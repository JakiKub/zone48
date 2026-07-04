import { Suspense } from "react";

import KontaktContent from "../_components/KontaktContent";

const KontaktPage = () => {
    return (
        <Suspense fallback={<main className="kontakt-page">ladowanie recznego granatnika</main>}>
            <KontaktContent/>
        </Suspense>
    )
}

export default KontaktPage