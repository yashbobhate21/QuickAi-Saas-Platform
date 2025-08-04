import React, { useState } from 'react'
import {Sparkles,Edit, Hash} from 'lucide-react'
import toast from 'react-hot-toast';
import Markdown from 'react-markdown';
import { useAuth } from '@clerk/clerk-react';
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

function BlogTitles() {
     const BlogCategories = ["General", "Technology", "Health", "Lifestyle", "Travel","Business","Food","Education"];
         const [selectedCategory, setSelectedCategory] = useState("General");
         const [input,setinput] = useState('');
         const [loading,setloading] = useState(false);
         const [content,setcontent] = useState('');

         const {getToken} = useAuth();

         const onSubmitHandler = async(e) => {
            e.preventDefault();
            try {
                setloading(true)
                const token = await getToken();
                const prompt = `generate a blog title for the keyword ${input} in the category ${setSelectedCategory}`;
                const {data} = await axios.post('/api/ai/generate-blog-title',{prompt},
                    {headers:{
                        Authorization:`Bearer ${token}`
                    }
                })
                if(data.success){
                    setcontent(data.content)
                }else{
                    toast.error(data.message)
                }
            } catch (error) {
                toast.error(error.message)
            }
            setloading(false);
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
                <button disabled={loading} className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#8d51f3] to-[#775ebc]
                 text-white px-4 py-2 mt-6 text-sm rounded-1g cursor-pointer'>
                    {loading ? <span className="w-4 h-4 my-1 rounded-full border-2
                        border-t-transparent animate-spin"></span> : <Hash className='w-5'/>}
                    Generate Title
                </button>
            </form>
            <div className='w-full max-w-lg p-4 bg-white rounded-1g flex flex-col border border-gray-200 min-h-96'>
            <div className='flex items-center gap-3'>
                    <Hash className='w-5 h-5 text-[#8E37EB] '/>
                    <h1 className='text-xl font-semibold'>Generated Titles</h1>
            </div>
            {!content ? (
                <div className='flex-1 flex justify-center items-center'>
                    <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
                    <Hash className='w-9 h-9' /> 
                        <p>Enter a Keyword and click "Generate Title" to get started</p>
                    </div>
            </div>
            ) : (
                <div className='mt-3 h-full overflow-y-scroll text-sm text-slate-600'>
                                <div className='.reset-tw'>
                                    <Markdown>{content}</Markdown>
                                </div>
                                </div>
            )}
            
            </div>
        </div>
    )
}

export default BlogTitles
