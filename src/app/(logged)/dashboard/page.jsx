import { Suspense } from "react";

import DashboardContent from "../_components/DashboardContent";

export const metadata = {
    title: "Zone 48 - Dashboard",
    description: "Zobacz statystyki swojego konta"
}

const Dashboard = () => {
    return (
        <Suspense fallback={<main className="dashboard">Ładowanie dashboardu...</main>}>
            <DashboardContent/>
        </Suspense>
    )
}

export default Dashboard