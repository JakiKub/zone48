import { Suspense } from "react";

import DashboardContent from "../_components/DashboardContent";

const Dashboard = () => {
    return (
        <Suspense fallback={<main className="dashboard">montowanie fotowoltaiki...</main>}>
            <DashboardContent/>
        </Suspense>
    )
}

export default Dashboard