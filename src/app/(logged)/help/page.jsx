import { Suspense } from "react";

import HelpContent from "../_components/HelpContent";

export const metadata = {
    title: "Zone 48 - Pomoc",
    description: "Skontaktuj się nami"
}

const Help = () =>  {
    return (
        <Suspense fallback={<main className="help">Ładowanie pomocy...</main>}>
            <HelpContent/>
        </Suspense>
    )
}

export default Help