import React from 'react'
import { useNavigate } from 'react-router-dom';

function Hero() {
    const navigate = useNavigate();
    return (
       <div className='px-4 sm:px-20 xl:px-32 relative inline-flex flex-col w-full justify-center bg-[url(/gradientBackground.png)] \
       bg-cover bg-no-repeat min-h-screen'>

       <div className="text-center mb-10 px-4 md:px-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-600 drop-shadow-lg leading-tight">
        Create Amazing Content with AI
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
        Boost your content creation with AI tools — write articles, generate images, and enhance your productivity like never before.
        </p>
       </div>

       <div className='flex flex-wrap justify-center gap-4 text-sm max-sm:text-xs'>
       <button onClick={()=> navigate('/ai')} className='bg-primary text-white px-10 py-3 
       rounded-lg hover:scale-102 active: scale-95 transition
       cursor-pointer text-lg'>Start Creation</button>
       <button className='bg-white px-10 py-3 rounded-lg border
      border-gray-300 hover:scale-102 active: scale-95 transition
       cursor-pointer text-lg'>Watch Demo</button>
       </div>



       </div>
       
    
    )
}

export default Hero
