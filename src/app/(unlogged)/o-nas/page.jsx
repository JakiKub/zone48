import { Suspense } from "react";

import AboutUsContent from "../_components/AboutUsContent";

const AboutUsPage = () => {
    return (
        <Suspense fallback={<main className="o-nas-page">ladowanie telefonu</main>}>
            <AboutUsContent/>
        </Suspense>
    )
}

export default AboutUsPage