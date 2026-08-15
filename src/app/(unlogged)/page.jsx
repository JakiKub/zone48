import { Suspense } from "react";

import HomeContent from "./_components/HomeContent";

export const metadata = {
  title: "Zone 48 - Home Page",
  description: "Strona główna projektu Zone 48"
}

const HomePage = () => {
  return (
    <Suspense fallback={<main className="home-page">Ładowanie strony głównej...</main>}>
      <HomeContent/>
    </Suspense>
  )
}

export default HomePage