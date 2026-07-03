import { Suspense } from "react";

import HomeContent from "./_components/HomeContent";

const HomePage = () => {
  return (
    <Suspense fallback={<main className="home-page">szukanie ostatnich komórek mózgowych...</main>}>
      <HomeContent/>
    </Suspense>
  )
}

export default HomePage