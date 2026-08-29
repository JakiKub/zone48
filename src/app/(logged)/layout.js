import { Suspense } from 'react';

import Sidebar from './_components/Sidebar';
import WelcomeNavbar from './_components/WelcomeNavbar';
import TabBar from './_components/TabBar';

export default function LoggedLayout({ children }) {
    return (
        <div className='logged-in flex min-h-screen w-full'>
            <Suspense fallback={<aside className='sidebar'>Ładowanie...</aside>}>
                <Sidebar/>
            </Suspense>
            <Suspense fallback={<header className='welcome'>Ładowanie...</header>}>
                <WelcomeNavbar/>
            </Suspense>
            {children}
            <Suspense fallback={<nav className='tabbar'>Ładowanie...</nav>}>
                <TabBar/>
            </Suspense>
        </div>
    );
}