import React from 'react'

export default function  ProductMetaDataLoader() {
    return <div className='grid md:grid-cols-2 lg:grid-cols-3  gap-10 py-2'>
        <nav className=' bg-indigo-200/40 p-10 rounded-md shadow-sm animate-pulse'>
            <nav className='text-sm  bg-gray-50 rounded-md h-2 w-14  animate-pulse '></nav>
            <nav className='font-semibold bg-gray-50 rounded-md h-4 w-32 mt-5 animate-pulse '></nav>
        </nav>
        <nav className=' bg-indigo-200/40 p-10 rounded-md shadow-sm animate-pulse'>
            <nav className='text-sm  bg-gray-50 rounded-md h-2 w-14  animate-pulse '></nav>
            <nav className='font-semibold bg-gray-50 rounded-md h-4 w-32 mt-5 animate-pulse '></nav>
        </nav>
        <nav className=' bg-indigo-200/40 p-10 rounded-md shadow-sm animate-pulse'>
            <nav className='text-sm  bg-gray-50 rounded-md h-2 w-14  animate-pulse '></nav>
            <nav className='font-semibold bg-gray-50 rounded-md h-4 w-32 mt-5 animate-pulse '></nav>
            <nav className='font-semibold bg-gray-50 rounded-md h-10 w-28 mt-2 animate-pulse '></nav>
        </nav>

    </div>
}
