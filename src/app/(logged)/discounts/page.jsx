import { Suspense } from "react";

import DiscountsContent from "../_components/DiscountsContent";

export const metadata = {
    title: "Zone 48 - Zniżki",
    description: "Zobacz jakie zniżki oferujemy"
}

const Discounts = () => {
    return (
        <Suspense fallback={<main className="discounts">ladowanie baterii socjalnych...</main>}>
            <DiscountsContent/>
        </Suspense>
    )
}

export default Discounts