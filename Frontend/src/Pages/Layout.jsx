import React, {  useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import {assets} from '../assets/assets'
import { Menu,X } from 'lucide-react'
import Sidebar from '../Components/Sidebar';

function Layout() {
  const navigate = useNavigate();
  const [sidebar,setsidebar] = useState(false);
    return (
      <div className='flex flex-col h-screen items-start justify-start'>
        <nav className='w-full px-8 min-h-14 flex items-center justify-between border-b border-gray-400'>
          <img src={assets.logo}  alt="logo" onClick={() => navigate("/")}/>
          {
            sidebar ? <X onClick={() => setsidebar(false)} className='w-6 h-6 text-gray-600 sm:hidden' />
            : <Menu className='w-6 h-6 text-gray-600 sm:hidden' onClick={() => setsidebar(true)} />
          }
        </nav>
        <div className='flex-1 w-full flex h-[calc(100vh-64px)]'>
          <Sidebar sidebar={sidebar} setsidebar={setsidebar}/>
          <div className='flex-1 bg-[#F4F7FB'>
        <Outlet />
          </div>
        </div>
      </div>  
    )
}

export default Layout
