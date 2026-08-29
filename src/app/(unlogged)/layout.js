import { Suspense } from 'react';

import Navbar from "./_components/Navbar";
import Footer from './_components/Footer';

import { ModalProvider } from '../context/ModalContext';


export default function UnloggedLayout({ children }) {
  return (
    <ModalProvider>
      <div className="flex flex-col min-h-screen w-full">
        <Suspense fallback={<header>Ładowanie navbaru...</header>}>
          <Navbar/>
        </Suspense>
        {children}
        <Suspense fallback={<footer>Ładowanie stopki...</footer>}>
          <Footer/>
        </Suspense>
      </div>
    </ModalProvider>
  );
}
