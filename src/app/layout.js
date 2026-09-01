import { Epilogue } from 'next/font/google';
import { Geist } from 'next/font/google';

import Script from 'next/script';

import "./globals.css";

import ToasterProvider from "./providers/ToasterProvider";

import { AuthProvider } from "./context/AuthContext";

const epilogue = Epilogue({
    subsets: ['latin'],
    variable: '--font-epilogue',
    });

    const geist = Geist({
    subsets: ['latin'],
    variable: '--font-geist',
});

export const metadata = {
    icons: {
        icon: "/misc/logo_strony_zone48.svg"
    }
}

export default function RootLayout({ children }) {
    return (
        <html lang="pl" className={`h-full antialiased ${epilogue.variable} ${geist.variable}`} suppressHydrationWarning>
        <body className="min-h-full flex flex-col">
            <AuthProvider>
                <ToasterProvider/>
                {children}
                <Script async src="https://cloud.umami.is/script.js" data-website-id="61457e26-5697-49c7-9924-d18be780744a"></Script>
            </AuthProvider>
        </body>
        </html>
    );
}