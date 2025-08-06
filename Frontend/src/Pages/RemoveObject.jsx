import { Divide, Scissors, Sparkles } from 'lucide-react'
import React, { useState } from 'react'
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

function RemoveObject() {

    const [input,setinput] = useState('');
    const [object,setobject] = useState('');
     const [loading,setloading] = useState(false);
            const [content,setcontent] = useState('');
         
            const {getToken} = useAuth();
    const onSubmitHandler = async(e) => {
            e.preventDefault();

            try {
               setloading(true)

                if(object.split(' ').length > 1){
                return toast('Please enter only one object name')
                }

                const token = await getToken();
                const formData = new FormData()
                formData.append('image',input)
                formData.append('object',object)
                const {data} = await axios.post('/api/ai/remove-image-object',formData,
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
                <button disabled={loading} className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#9f35fb] to-[#ad08ff]
                 text-white px-4 py-2 mt-6 text-sm rounded-1g cursor-pointer'>
                    {
                        loading ? <span className="w-4 h-4 my-1 rounded-full border-2
                        border-t-transparent animate-spin"></span> : <Scissors className='w-5'/>
                    }
                    Remove Object
                </button>
            </form>
            <div className='w-full max-w-lg p-4 bg-white rounded-1g flex flex-col border border-gray-200 min-h-96'>
            <div className='flex items-center gap-3'>
                    <Scissors className='w-5 h-5 text-[#ba00fd] '/>
                    <h1 className='text-xl font-semibold'>Processed Image</h1>
            </div>
            {
                !content ? (
                    <div className='flex-1 flex justify-center items-center'>
                    <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
                    <Scissors className='w-9 h-9' /> 
                        <p>Upload Image and click "Remove Object" to get started</p>
                    </div>
            </div>
                ) : (
                    <img src={content} alt="image" className='h-full w-full mt-3' />
                )
            }
            </div>
        </div>   
    )
}

export default RemoveObject
