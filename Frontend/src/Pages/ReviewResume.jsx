import { FileText, Sparkles } from 'lucide-react';
import React, { useState } from 'react'

function ReviewResume() {

      const [input,setinput] = useState('');
                 const onSubmitHandler = async(e) => {
                    e.preventDefault();
                 } 

    return (
         <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700'>
            <form onSubmit={onSubmitHandler} className='w-full max-w-lg p-4 bg-white rounded-1g border border-gray-200'>
                <div className='flex items-center gap-3'>
                    <Sparkles className='w-6 text-[#f30bc4] '/>
                    <h1 className='text-xl font-semibold'>Review Resume</h1>
                </div>
                <p className='mt-6 text-sm font-medium'>Upload Resume</p>
                <input onChange={(e) => setinput(e.target.files[0])} accept='application/pdf' type="file"
                className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300 text-gray-600' required/>
                <p className='text-xs font-light mt-1 text-gray-500'>upload pdf only</p>
                <button className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#ea0ab9] to-[#e206e6]
                 text-white px-4 py-2 mt-6 text-sm rounded-1g cursor-pointer'>
                    <FileText className='w-5'/>
                    Review Resume
                </button>
            </form>
            <div className='w-full max-w-lg p-4 bg-white rounded-1g flex flex-col border border-gray-200 min-h-96'>
            <div className='flex items-center gap-3'>
                    <FileText className='w-5 h-5 text-[#f30bc4] '/>
                    <h1 className='text-xl font-semibold'>Analysis Result</h1>
            </div>
            <div className='flex-1 flex justify-center items-center'>
                    <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
                    <FileText className='w-9 h-9' /> 
                        <p>Upload Resume and click "Review Resume" to get started</p>
                    </div>
            </div>
            </div>
        </div>
    )
}

export default ReviewResume
