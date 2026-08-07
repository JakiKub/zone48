import { Suspense } from "react";

import HelpContent from "../_components/HelpContent";

const Help = () =>  {
    return (
        <Suspense fallback={<main className="help">usuwanie fotowoltaiki...</main>}>
            <HelpContent/>
        </Suspense>
    )
}

export default Help