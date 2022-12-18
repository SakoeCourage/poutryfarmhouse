import React from 'react'

export default function Compareoverayear() {
  return (
    <div className='border border-blue-400 shadow-md rounded-md '>
    <div className='flex  items-center justify-between w-full shadow-sm pb-2  px-2 pt-2'>
    <span className=' text-blue-400 bg-blue-50 px-2 py-1 text-sm rounded-md'>one year (Jan-Dec)</span> 
    <input className='' type="checkbox" name="" id="" />
    </div>
     <div className='flex px-2 items-center justify-between gap-2 mt-2 pb-3'>
        <input placeholder='(0000)' type="number" min='0'  className='text-xs border border-gray-200 rounded px-1 py-1 leading-6 w-full focus-within:border-blue-400 focus-within:outline-none focus-within:ring focus-within:ring-blue-400 focus-within:ring-opacity-50 transition-all duration-500' name="" id="" />
     </div>
</div>
  )
}
