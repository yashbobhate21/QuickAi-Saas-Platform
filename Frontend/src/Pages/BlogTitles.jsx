import React, { useState } from 'react'
import {Sparkles,Edit, Hash} from 'lucide-react'

function BlogTitles() {
     const BlogCategories = ["General", "Technology", "Health", "Lifestyle", "Travel","Business","Food","Education"];
         const [selectedCategory, setSelectedCategory] = useState("General");
         const [input,setinput] = useState('');
         const onSubmitHandler = async(e) => {
            e.preventDefault();
         } 
    return (
         <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700'>
            <form onSubmit={onSubmitHandler} className='w-full max-w-lg p-4 bg-white rounded-1g border border-gray-200'>
                <div className='flex items-center gap-3'>
                    <Sparkles className='w-6 text-[#8E37EB] '/>
                    <h1 className='text-xl font-semibold'>AI Title Generator</h1>
                </div>
                <p className='mt-6 text-sm font-medium'>Keyword</p>
                <input onChange={(e) => setinput(e.target.value)} value={input} type="text" className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300' 
                placeholder='Describe your Keyword here....' required/>
                <p className='mt-4 text-sm font-medium'>Category</p>
                <div className='mt-3 flex gap-3 flex-wrap sm:max-w-9/11'>
                    {BlogCategories.map((item) =>(
                        <span onClick={()=> setSelectedCategory(item)} 
                        className={`text-xs px-4 py-1 border rounded-full cursor-pointer 
                            ${selectedCategory === item ? 'bg-purple-50 text-purple-700' : 'border-gray-300 text-gray-600'}`}
                        key={item}>{item}</span>
                    ))}
                </div>
                <br />
                <button className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#8d51f3] to-[#775ebc]
                 text-white px-4 py-2 mt-6 text-sm rounded-1g cursor-pointer'>
                    <Hash className='w-5'/>
                    Generate Title
                </button>
            </form>
            <div className='w-full max-w-lg p-4 bg-white rounded-1g flex flex-col border border-gray-200 min-h-96'>
            <div className='flex items-center gap-3'>
                    <Hash className='w-5 h-5 text-[#8E37EB] '/>
                    <h1 className='text-xl font-semibold'>Generated Titles</h1>
            </div>
            <div className='flex-1 flex justify-center items-center'>
                    <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
                    <Hash className='w-9 h-9' /> 
                        <p>Enter a Keyword and click "Generate Title" to get started</p>
                    </div>
            </div>
            </div>
        </div>
    )
}

export default BlogTitles
