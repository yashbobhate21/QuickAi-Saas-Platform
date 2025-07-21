import React, { useEffect, useState } from 'react'
import { Sparkles } from 'lucide-react'
import Creationitem from '../Components/Creationitem';
import { dummyCreationData } from '../assets/assets';

function Dashboard() {
    const [creation,setcreation] = useState([]);
    const getCreationData = async () => {
        setcreation(dummyCreationData);
    }
    useEffect(() => {
        getCreationData();
    }, []);
    return (
        <div className='h-full overflow-y-scroll p-6'>
            <div className='flex justify-start gap-4 flex-wrap'>
            <div className='flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-gray-200'>
                <div className='text-slate-600'>
                    <p className='text-xl'>Total Creations</p>
                    <h2 className='text-xl font-semibold'>{creation.length}</h2>
                </div>
                <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-[#3588F2] to-[#0BB0D7] text-white flex justify-center items-center'>
                    <Sparkles className='w-5 text-white'/>
                </div>
            </div>
            </div>

            <div className='space-y-3'>
            <p className='mt-6 mb-4'>Recent Creations</p>
            {
                creation.map((item) => <Creationitem key={item.id} item={item}/>)
            }
            </div>

        </div>
    )
}

export default Dashboard
