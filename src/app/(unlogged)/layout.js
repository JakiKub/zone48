import { Epilogue } from 'next/font/google';
import { Geist } from 'next/font/google';
import "../globals.css";

import { Suspense } from 'react';

import Navbar from "./_components/Navbar";
import Footer from './_components/Footer';

const epilogue = Epilogue({
  subsets: ['latin'],
  variable: '--font-epilogue',
});

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
});

export const metadata = {
  title: "Zone 48",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pl" className={`h-full antialiased ${epilogue.variable} ${geist.variable}`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col">
        <Suspense fallback={<header>szukanie szczescia w zyciu...</header>}>
          <Navbar/>
        </Suspense>
        {children}
        <Suspense fallback={<footer>szczescie szuka żyda...</footer>}>
          <Footer/>
        </Suspense>
      </body>
    </html>
  );
}
