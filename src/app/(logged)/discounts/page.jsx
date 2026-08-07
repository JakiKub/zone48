import { Suspense } from "react";

import DiscountsContent from "../_components/DiscountsContent";

const Discounts = () => {
    return (
        <Suspense fallback={<main className="discounts">ladowanie baterii socjalnych...</main>}>
            <DiscountsContent/>
        </Suspense>
    )
}

export default Discounts