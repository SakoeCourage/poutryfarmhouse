import React, { useEffect,useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SimpleBar from 'simplebar-react'
import { usePage } from '@inertiajs/inertia-react';
import Simplepagination from '../../components/Simplepagination';
import { setsort, formatcurrency, dateReformat } from '../../api/Util';
import Rightmodalwithbackdrop from '../../components/Rightmodalwithbackdrop'
import { AnimatePresence } from 'framer-motion';
import Editstock from './Editstock';
import Editexpenses from './Editexpenses';

export default function Allstock() {
    const { stocks ,product_sales} = usePage().props
    const [currentData,setCurrentData]=useState({
        id: null,
        toggle: null,
    
    })
    useEffect(() => {
        console.log(stocks)
    }, [stocks])
    
    return (<div className='h-full bg-gray-100 flex '>
        <main className='mx-auto max-w-4xl p-5  '>
            <nav className=' flex  items-center  gap-5   '>
                <nav className='text-slate-800 w-full flex flex-col p-8 px-10 bg-white shadow-lg rounded-lg gap-2 items-center justify-center'>
                    <nav className='my-2 font-bold'>opening stock</nav>
                    <nav className='font-bold text-2xl'>GHS 72,889.00</nav>
                    <nav className='flex items-center justify-center text-sm text-green-500 gap-1'>
                    <span>+16%</span>
                    <FontAwesomeIcon icon="circle-arrow-up"/>
                    </nav>
                </nav>
                <nav className='text-slate-800 w-full flex flex-col p-8 px-10 bg-white shadow-lg rounded-lg gap-2 items-center justify-center'>
                    <nav className='my-2 font-bold'>daily production</nav>
                    <nav className='font-bold text-2xl'>GHS 72,889.00</nav>
                    <nav className='flex items-center justify-center text-sm text-green-500 gap-1'>
                    <span>+16%</span>
                    <FontAwesomeIcon icon="circle-arrow-up"/>
                    </nav>
                </nav>
                <nav className='text-slate-800 w-full flex flex-col p-8 px-10 bg-white shadow-lg rounded-lg gap-2 items-center justify-center'>
                    <nav className='my-2 font-bold'>closing stock</nav>
                    <nav className='font-bold text-2xl'>GHS 72,889.00</nav>
                    <nav className='flex items-center justify-center text-sm text-green-500 gap-1'>
                    <span>+16%</span>
                    <FontAwesomeIcon icon="circle-arrow-up"/>
                    </nav>
                </nav>
            </nav>
           <div className='text-gray-800 font-bold flex items-center justify-between my-10'>
             <span className='text-lg'>Sales</span>
             <span className='text-indigo-900 text-sm font-normal font-semibold flex items-center gap-2'><span>Manage Products </span> <FontAwesomeIcon icon="arrow-right"/> </span>
           </div>

           <div className='flex items-center gap-5'>
                <nav className='bg-white shadow-lg rounded-lg p-3 w-40 h-44 flex flex-col'>
                    <nav className='flex items-center gap-3 rounded-lg w-full p-1 px-2 bg-indigo-50'>
                        <FontAwesomeIcon className='text-indigo-700' icon="tag"/>
                        <span>Eggs</span>
                    </nav> 
                    <nav className=' my-auto flex '>
                        <span className='text-xs text-gray-500'>GHS</span>
                        <span className='pl-2 leading-5 font-semibold text-2xl text-gray-900'>20,000</span>
                    </nav>
                    <nav className=' h-auto block w-full mt-auto  flex items-center justify-between  text-semibold'>
                    <span>40,999 <span className='text-xs text-gray-500'>units</span></span>
                    <span className=' text-xs text-red-500'>-16.2% </span>
                    </nav>     
                </nav>
           </div>
        </main>
        <div className='max-w-md'>
                hello
        </div>
    </div>
    )
}
