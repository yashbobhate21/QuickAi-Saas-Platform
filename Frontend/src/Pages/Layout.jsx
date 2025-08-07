import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Sidebar from '../Components/Sidebar';
import { useUser, SignIn } from '@clerk/clerk-react';
import { assets } from '../assets/assets';

function Layout() {
    const navigate = useNavigate();
    const [sidebar, setsidebar] = useState(false);
    const { user } = useUser();

    if (!user) {
        return (
            <div className='flex items-center justify-center h-screen'>
                <SignIn />
            </div>
        );
    }

    return (
        <div className='flex flex-col h-screen'>
            {/* Top Navigation */}
            <nav className='w-full px-6 sm:px-8 py-3 flex items-center justify-between border-b-2 border-gray-300 bg-white z-40'>
                <img
                    src={assets.logo}
                    alt="logo"
                    className='w-32 sm:w-44 cursor-pointer'
                    onClick={() => navigate('/')}
                />
                <button className='sm:hidden' onClick={() => setsidebar(!sidebar)}>
                    {sidebar ? <X className='w-6 h-6 text-gray-700' /> : <Menu className='w-6 h-6 text-gray-700' />}
                </button>
            </nav>

            {/* Main Content */}
            <div className='flex flex-1 overflow-hidden'>
                {/* Sidebar */}
                <Sidebar sidebar={sidebar} setsidebar={setsidebar} />

                {/* Outlet Content */}
                <main className='flex-1 overflow-y-auto bg-[#b9d1f1a4] p-4'>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default Layout;
