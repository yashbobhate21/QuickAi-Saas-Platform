import React, {  useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import {assets} from '../assets/assets'
import { Menu,X } from 'lucide-react'
import Sidebar from '../Components/Sidebar';
import { useUser,SignIn } from '@clerk/clerk-react';

function Layout() {
  const navigate = useNavigate();
  const [sidebar,setsidebar] = useState(false);
  const {user} = useUser();
    return user ? (
      <div className='flex flex-col h-screen items-start justify-start'>
        <nav className='w-full px-8 min-h-14 flex items-center justify-between border-b-2 border-gray-400'>
          <img className='cursor-pointer' src={assets.logo}  alt="logo" onClick={() => navigate("/")}/>
          {
            sidebar ? <X onClick={() => setsidebar(false)} className='w-6 h-6 text-gray-600 sm:hidden' />
            : <Menu className='w-6 h-6 text-gray-600 sm:hidden' onClick={() => setsidebar(true)} />
          }
        </nav>
        <div className='flex-1 w-full flex h-[calc(100vh-64px)]'>
          <Sidebar sidebar={sidebar} setsidebar={setsidebar}/>
          <div className='flex-1 bg-[#b9d1f1a4]'>
        <Outlet />
          </div>
        </div>
      </div>  
    ) : 
    <div className='flex items-center justify-center h-screen'>
      <SignIn />
    </div>
}

export default Layout
