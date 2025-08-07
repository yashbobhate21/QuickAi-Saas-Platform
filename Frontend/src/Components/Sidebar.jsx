import { Protect, useClerk, useUser } from '@clerk/clerk-react';
import { Eraser, FileText, Hash, Home, Image, LogOut, PenSquare, Scissors } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const navItems = [
    { to: '/ai', label: 'Dashboard', Icon: Home },
    { to: '/ai/write-article', label: 'Write Article', Icon: PenSquare },
    { to: '/ai/blog-title', label: 'Blog Titles', Icon: Hash },
    { to: '/ai/generate-images', label: 'Generate Images', Icon: Image },
    { to: '/ai/remove-background', label: 'Remove Background', Icon: Eraser },
    { to: '/ai/remove-object', label: 'Remove Object', Icon: Scissors },
    { to: '/ai/review-resume', label: 'Review Resume', Icon: FileText },
];

function Sidebar({ sidebar, setsidebar }) {
    const { user } = useUser();
    const { signOut, openUserProfile } = useClerk();

    return (
        <div
            className={`bg-white w-60 border-r border-gray-300 flex flex-col justify-between
            fixed sm:static top-0 bottom-0 left-0 z-50 transform sm:translate-x-0 
            ${sidebar ? 'translate-x-0' : '-translate-x-full'}
            transition-transform duration-300 ease-in-out`}
        >
            <div className='pt-16 sm:pt-8 px-4'>
                {user ? (
                    <>
                        <div className='flex flex-col items-center mb-6'>
                            <img
                                onClick={openUserProfile}
                                src={user.imageUrl}
                                alt="Profile"
                                className='w-12 h-12 rounded-full cursor-pointer'
                            />
                            <h1 className='mt-2 text-center text-sm font-medium'>{user.fullName}</h1>
                        </div>

                        <nav className='flex flex-col gap-1'>
                            {navItems.map(({ to, label, Icon }) => (
                                <NavLink
                                    key={to}
                                    to={to}
                                    end={to === '/ai'}
                                    onClick={() => setsidebar(false)}
                                    className={({ isActive }) =>
                                        `px-4 py-2 flex items-center gap-3 rounded transition-all
                                        ${
                                            isActive
                                                ? 'bg-gradient-to-r from-[#3C81FC] via-[#6D5BFA] to-[#9234EA] text-white ring-2 ring-[#6D5BFA]/40 shadow-md'
                                                : 'hover:bg-gradient-to-r hover:from-[#e0e7ff] hover:to-[#f3e8ff] hover:text-[#6D5BFA] text-gray-700'
                                        }`
                                    }
                                >
                                    <Icon className='w-4 h-4' />
                                    {label}
                                </NavLink>
                            ))}
                        </nav>
                    </>
                ) : (
                    <p className='text-center mt-6'>Loading...</p>
                )}
            </div>

            {user && (
                <div className='border-t border-gray-200 p-4 flex items-center justify-between'>
                    <div onClick={openUserProfile} className='flex items-center gap-3 cursor-pointer'>
                        <img src={user.imageUrl} className='w-8 h-8 rounded-full' alt="User" />
                        <div>
                            <h1 className='text-sm font-medium'>{user.fullName}</h1>
                            <p className='text-xs text-gray-500'>
                                <Protect plan='premium' fallback="Free">Premium</Protect>
                            </p>
                        </div>
                    </div>
                    <LogOut
                        onClick={signOut}
                        className='w-5 h-5 text-gray-400 hover:text-gray-700 cursor-pointer'
                    />
                </div>
            )}
        </div>
    );
}

export default Sidebar;
