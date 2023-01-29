import React,{useEffect} from 'react'
import {Card,Row} from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { usePage } from '@inertiajs/inertia-react'


function ProductionOverview() {
  const {graded_products} = usePage().props
  console.log((graded_products))
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 items-center bg-slate-200/50 rounded-lg shadow-sm min-h-[16rem] p-7'>
        <nav className="p-5  h-[13rem] min-w-full md:min-w-[12rem]    " >
          <nav className='my-auto'>
          <nav className="text-slate-800 font-bold text-lg" >Production </nav>
            <nav className='text-muted mt-5 text-xs'>
                Products from flocks today
            </nav>
          </nav>
        </nav>
        <nav className='flex items-center gap-5 flex-wrap space-y-5 lg:space-y-0 col-span-1 md:col-span-2'>
            
            <div  className='flex flex-col h-[13rem] items-center justify-center  gap-7 relative bg-gray-50 shadow-lg min-w-full md:min-w-[12rem]  min-h-[12rem] p-7 rounded-xl'>
                    <nav className='absolute -top-[10%] flex items-center justify-center bg-transparent'>
                    <FontAwesomeIcon icon="tag" size='xl' className=' h-6 w-6 p-2 shadow-sm rounded-full text-white bg-indigo-900  '/>   
                    </nav>
                    <div className=' font-bold text-slate-800 text-lg  '>Eggs </div>
                    <div className=' text-muted '>G1</div>
                    <div className='  font-bold text-slate-700 '>20,0000
                    <span className='text-muted text-xs font-normal block text-center'>units</span>
                    </div>
            </div >
   
        
        </nav>
    </div>
  )
}

export default ProductionOverview