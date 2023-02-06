import React,{useState,useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { diffForHumans } from '../../api/Util'
import { Inertia } from '@inertiajs/inertia'

export default function ExpenseNotification(props) {
    
  return (
    <div className="w-full h-auto relative rounded-lg shadow hover:shadow-2xl bg-white" onClick={()=>Inertia.visit('/expenses/all')}>
    <div className="  px-5 py-3.5  w-full ">
        <div className="flex items-center mt-2 rounded-lg px-1 py-1 cursor-pointer">
            <div className="relative flex flex-shrink-0 items-end">
                <div className="h-16 w-16 rounded-full text-3xl grid place-items-center text-blue-300 bg-blue-100"> 
                    E
                </div>   
                <span className="absolute h-6 w-6 grid place-items-center   rounded-full bottom-0 right-0 border-2 border-white bg-white text-blue-500">
                    <FontAwesomeIcon className='h-4 w-4 ' icon='credit-card-alt'/>
                </span>
            </div>
            <div className="ml-3">
                <span className="text-xs leading-none ">New  expense awaiting from</span>
                <span className="font-semibold tracking-tight text-xs ml-1">{props.data.author?.name}</span>
                <p className="text-xs leading-4 pt-2 italic w-full opacity-70 overflow-hidden">"{props.data.expense?.description} "</p>
                <span className=" text-blue-500 text-xs leading-4 opacity-75">{diffForHumans(props.data.expense?.created_at)}</span>
            </div>
        </div>
    </div>
</div>
  )
}
