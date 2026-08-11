import { Suspense } from 'react';

import Sidebar from './_components/Sidebar';

export default function LoggedLayout({ children }) {
    return (
        <div className='logged-in flex min-h-screen w-full'>
            <Suspense fallback={<aside className='sidebar'>deinstalacja ostatniej woli do zycia...</aside>}>
                <Sidebar/>
            </Suspense>
            {children}
        </div>
    );
}