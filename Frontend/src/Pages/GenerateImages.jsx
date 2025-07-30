import { Hash, Image, Sparkles } from 'lucide-react';
import React, { useState } from 'react'

function GenerateImages() {

    const ImageStyle = ['Realistic', 'Ghibli style', 'Anime style', 'Cartoon style', 
                        'Fantasy style', 'Realistic style', '3D style', 'Portrait style']
    const [selectedStyle, setselectedStyle] = useState("Realistic");
    const [input,setinput] = useState('');
    const [Publish, setPublish] = useState(false);

    const onSubmitHandler = async(e) => {
                e.preventDefault();
             } 

    return (
        <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700'>
            <form onSubmit={onSubmitHandler} className='w-full max-w-lg p-4 bg-white rounded-1g border border-gray-200'>
                <div className='flex items-center gap-3'>
                    <Sparkles className='w-6 text-[#00AD25] '/>
                    <h1 className='text-xl font-semibold'>AI Image Generator</h1>
                </div>
                <p className='mt-6 text-sm font-medium'>Describe your image</p>
                <textarea onChange={(e) => setinput(e.target.value)} value={input} rows={4} className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300' 
                placeholder='Describe your image here....' required/>
                <p className='mt-4 text-sm font-medium'>Style</p>
                <div className='mt-3 flex gap-3 flex-wrap sm:max-w-9/11'>
                    {ImageStyle.map((item) =>(
                        <span onClick={()=> setselectedStyle(item)} 
                        className={`text-xs px-4 py-1 border rounded-full cursor-pointer 
                            ${selectedStyle === item ? 'bg-green-100 text-green-700' : 'border-gray-300 text-gray-600'}`}
                        key={item}>{item}</span>
                    ))}
                </div>
                <br />
                <button className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#4f880a] to-[#0e8d27]
                 text-white px-4 py-2 mt-6 text-sm rounded-1g cursor-pointer'>
                    <Image className='w-5'/>
                    Generate Image
                </button>
            </form>
            <div className='w-full max-w-lg p-4 bg-white rounded-1g flex flex-col border border-gray-200 min-h-96'>
            <div className='flex items-center gap-3'>
                    <Image className='w-5 h-5 text-[#28af57] '/>
                    <h1 className='text-xl font-semibold'>Generated Image</h1>
            </div>
            <div className='flex-1 flex justify-center items-center'>
                    <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
                    <Image className='w-9 h-9' /> 
                        <p>Describe your image and click "Generate Image" to get started</p>
                    </div>
            </div>
            </div>
        </div>
    )
}

export default GenerateImages
