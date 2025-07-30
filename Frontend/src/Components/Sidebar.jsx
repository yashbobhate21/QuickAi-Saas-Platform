import React from 'react'
import { useClerk, useUser} from '@clerk/clerk-react'
import { Eraser, FileText, Hash, Home, Image, LogOut, PenSquare, Scissors } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const navItems = [
    {
        to: '/ai',label: 'Dashboard',Icon: Home
    },
    {
        to: '/ai/write-article',label: 'Write Article',Icon: PenSquare
    },
    {
        to: '/ai/blog-title',label: 'Blog Titles',Icon: Hash
    },
    {
        to: '/ai/generate-images',label: 'Generate Images',Icon: Image
    },
    {
        to: '/ai/remove-background',label: 'Remove Background',Icon: Eraser
    },
    {
        to: '/ai/remove-object',label: 'Remove Object',Icon: Scissors
    },
    {
        to: '/ai/review-resume',label: 'Review Resume',Icon: FileText
    },
]

function Sidebar({sidebar, setsidebar}) {
    const {user} = useUser()
    const {signOut,openUserProfile} = useClerk()
    return (
        <div className={`w-60 bg-white border-r-2 border-gray-400 flex flex-col
             justify-between items-center max-sm:absolute top-14 bottom-0 ${sidebar ? 'translate-x-0'
                :'max-sm:-translate-x-full'}transition-all duration-300 ease-in-out`}>
            <div className='my-7 w-full flex flex-col items-center'>
                {user ? (
                    <>
                        <img onClick={openUserProfile} src={user.imageUrl} alt="" className='w-10 rounded-full max-auto cursor-pointer'/>
                        <h1 className='mt-1 text-center mb-2'>{user.fullName}</h1>
                        <div>
                            {navItems.map(({to,label,Icon}) => (
                                <NavLink key={to} to={to} end={to === '/ai'} 
                                onClick={() => (setsidebar(false))}
                                className={({isActive}) => `px-3.5 py-2.5 flex items-center gap-3 rounded
                                ${isActive ? 'bg-gradient-to-r from-[#3C81FC] via-[#6D5BFA] to-[#9234EA] text-white shadow-lg ring-2 ring-[#6D5BFA]/40'
                                           : 'hover:bg-gradient-to-r hover:from-[#e0e7ff] hover:to-[#f3e8ff] hover:text-[#6D5BFA]'}`}>
                                    {({isActive}) => (
                                        <>
                                        <Icon className={`w-4 h-4 ${isActive ? 'text-white' : ''}`} />
                                        {label}
                                        </>
                                    )}
                                </NavLink>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className='text-center'>Loading...</div>
                )}
            </div>
            <div className='w-full border-t border-gray-200 p-4 px-7 flex items-center
                 justify-between'>
                    <div onClick={openUserProfile} className='flex items-center gap-2 cursor-pointer'>
                        <img src={user?.imageUrl} alt="" className='w-6 h-6 rounded-full'/>
                        <span className='text-sm text-gray-600'>{user?.fullName}</span>
                    </div>
                    <LogOut onClick={signOut} className='w-4.5 text-gray-500 hover:text-red-700 transition cursor-pointer'/>
            </div>        
        </div>
    )
}

export default Sidebar
