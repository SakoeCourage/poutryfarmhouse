import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
export default function SaleLoader() {
    return <nav className=' animate-pulse custom_box_shadow rounded-md p-3 min-w-[10rem] max-w-max h-44 flex flex-col relative'>
        <button className="absolute top-3 right-1 bg-gray-100 shadow-md opacity-60 backdrop:blur-md text-gray-400 rounded-full h-7 w-7  p-2 grid items-center justify-center ">
            <FontAwesomeIcon size='sm' icon='up-right-and-down-left-from-center' />
        </button>
        <nav className='flex items-center gap-3 rounded-lg w-full p-1 px-2 bg-indigo-50'>
            <FontAwesomeIcon className='text-gray-200' icon="tags" />
            <span className='h-2.5 bg-gray-300 rounded-full  w-24 mb-2.5'></span>
        </nav>
        <nav className=' my-auto flex'>
            <span className='text-xs text-gray-500 h-2.5 bg-gray-300 rounded-full w-8 mb-2.5'></span>
            <span className='pl-2 leading-5 font-semibold text-2xl text-gray-900 text-center h-2.5 bg-gray-300 rounded-full  w-24 mb-2.5'>
            </span>
        </nav>
        <nav className='mt-auto flex items-center justify-between text-semibold h-2.5 bg-gray-300 rounded-full w-8 mb-2.5'>
            <span><span className='text-xs text-gray-500 h-2.5 bg-gray-300 rounded-full  w-24 mb-2.5'></span></span>
        </nav>
    </nav>
}