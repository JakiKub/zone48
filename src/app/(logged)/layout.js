import { Epilogue } from 'next/font/google';
import { Geist } from 'next/font/google';
import "../globals.css";

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
        <html lang="pl" className={` h-full antialiased ${epilogue.variable} ${geist.variable}`}>
        <body className="min-h-full flex flex-col">{children}</body>
        </html>
    );
}