import React from 'react'

export default function StockLoader() {
    return <nav className=' grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-5 animate-pulse '>

        <nav className='text-slate-800 min-h-[12rem] min-w-[13rem] relative  w-full flex flex-col p-8 px-10  custom_box_shadow rounded-lg gap-2 items-center justify-center'>
            <nav className='absolute z-0 isolate   inset-0 opacity-30 blur-[1px] rounded-md shadow-md bg-gradient-to-br from-blue-200 via-indigo-300 to-indigo-400'></nav>
            <nav className='my-2 font-bold h-2.5 bg-gray-300 rounded-full w-8 mb-2.5'></nav>
            <nav className='font-bold text-xl text-center h-2.5 bg-gray-300 rounded-full w-16 mb-2.5'> </nav>
        </nav>
        <nav className='text-slate-800 min-h-[12rem] min-w-[13rem] relative w-full flex flex-col p-8 px-10 bg-white custom_box_shadow rounded-lg gap-2 items-center justify-center'>
            <nav className='absolute z-0 isolate   inset-0 opacity-30 blur-[1px] rounded-md shadow-md bg-gradient-to-br from-indigo-200 via-emerald-300 to-emerald-400'></nav>

            <nav className='my-2 font-bold h-2.5 bg-gray-300 rounded-full w-8 mb-2.5'></nav>
            <nav className='font-bold text-xl text-center h-2.5 bg-gray-300 rounded-full w-16 mb-2.5'></nav>
            <nav className='flex items-center justify-center text-sm text-green-900 gap-1'>

            </nav>
        </nav>
        <nav className='text-slate-800 min-h-[12rem] min-w-[13rem] w-full relative flex flex-col p-8 px-10 bg-white custom_box_shadow rounded-lg gap-2 items-center justify-center'>
            <nav className='absolute z-0 isolate   inset-0 opacity-30 blur-[1px] rounded-md shadow-md bg-gradient-to-br from-indigo-200 via-sky-300 to-sky-400'></nav>
            <nav className='my-2 font-bold h-2.5 bg-gray-300 rounded-full w-8 mb-2.5'></nav>
            <nav className='font-bold text-xl text-center h-2.5 bg-gray-300 rounded-full w-16 mb-2.5'></nav>
        </nav>
        <nav className='text-slate-800 min-h-[12rem] min-w-[13rem] relative w-full flex flex-col p-8 px-10 bg-white custom_box_shadow rounded-lg gap-2 items-center justify-center'>
            <nav className='absolute z-0 isolate   inset-0 opacity-30 blur-[1px] rounded-md shadow-md bg-gradient-to-br from-red-200 via-pink-300 to-pink-400'></nav>

            <nav className='my-2 font-bold h-2.5 bg-gray-300 rounded-full w-8 mb-2.5'></nav>
            <nav className='font-bold text-xl text-center h-2.5 bg-gray-300 rounded-full w-16 mb-2.5'></nav>
        </nav>
    </nav>

}
