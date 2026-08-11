import { Suspense } from 'react';

import Navbar from "./_components/Navbar";
import Footer from './_components/Footer';


export default function UnloggedLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Suspense fallback={<header>szukanie szczescia w zyciu...</header>}>
        <Navbar/>
      </Suspense>
      {children}
      <Suspense fallback={<footer>szczescie szuka żyda...</footer>}>
        <Footer/>
      </Suspense>
    </div>
  );
}
