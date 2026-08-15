import { Suspense } from "react";

import AboutUsContent from "../_components/AboutUsContent";

export const metadata = {
    title: "Zone 48 - O nas",
    description: "Dowiedz się wiecęj o projekcie oraz jego historii"
}

const AboutUsPage = () => {
    return (
        <Suspense fallback={<main className="o-nas-page">Ładowanie o nas....</main>}>
            <AboutUsContent/>
        </Suspense>
    )
}

export default AboutUsPage