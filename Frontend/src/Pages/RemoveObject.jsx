import { Divide, Scissors, Sparkles } from 'lucide-react'
import React, { useState } from 'react'

function RemoveObject() {

    const [input,setinput] = useState('');
    const [object,setobject] = useState('');
    const onSubmitHandler = async(e) => {
            e.preventDefault();
     } 

    return (
     <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700'>
            <form onSubmit={onSubmitHandler} className='w-full max-w-lg p-4 bg-white rounded-1g border border-gray-200'>
                <div className='flex items-center gap-3'>
                    <Sparkles className='w-6 text-[#aa00ff] '/>
                    <h1 className='text-xl font-semibold'>AI Object Remover</h1>
                </div>
                <p className='mt-6 text-sm font-medium'>Upload Image</p>
                <input onChange={(e) => setinput(e.target.files[0])} accept='image/*' type="file"
                className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300 text-gray-600' required/>
                <p className='text-xs font-light mt-1 text-gray-500'>Supports jpg,png and other image formats</p>
                <p className='mt-6 text-sm font-medium'>Describe object to remove</p>
                <textarea onChange={(e) => setobject(e.target.value)} value={object} rows={4} className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300' 
                placeholder='Describe your object here..eg.car or bike' required/>
                <button className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#9f35fb] to-[#ad08ff]
                 text-white px-4 py-2 mt-6 text-sm rounded-1g cursor-pointer'>
                    <Scissors className='w-5'/>
                    Remove Object
                </button>
            </form>
            <div className='w-full max-w-lg p-4 bg-white rounded-1g flex flex-col border border-gray-200 min-h-96'>
            <div className='flex items-center gap-3'>
                    <Scissors className='w-5 h-5 text-[#ba00fd] '/>
                    <h1 className='text-xl font-semibold'>Processed Image</h1>
            </div>
            <div className='flex-1 flex justify-center items-center'>
                    <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
                    <Scissors className='w-9 h-9' /> 
                        <p>Upload Image and click "Remove Object" to get started</p>
                    </div>
            </div>
            </div>
        </div>   
    )
}

export default RemoveObject
