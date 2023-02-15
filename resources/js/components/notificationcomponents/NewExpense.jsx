import React,{useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Inertia } from '@inertiajs/inertia'
import { diffForHumans } from '../../api/Util'
export default function NewExpense(props) {
    
  return (
    <div className="w-full h-auto relative rounded-lg shadow hover:shadow-2xl bg-white" onClick={()=>Inertia.visit('/expenses/submissions')}>
    <div className="  px-5 py-3.5  w-full ">
        <div className="flex items-center mt-2 rounded-lg px-1 py-1 cursor-pointer">
            <div className="relative flex flex-shrink-0 items-end">
                <div className="h-16 w-16 rounded-full text-3xl grid place-items-center text-green-400 bg-green-100"> 
                    E
                </div>   
                <span className="absolute h-6 w-6 grid place-items-center   rounded-full bottom-0 right-0 border-2 border-white bg-white text-green-500">
                    <FontAwesomeIcon className='h-4 w-4 ' icon='credit-card-alt'/>
                </span>
            </div>
            <div className="ml-3">
                <span className="text-xs leading-none ">Your Expense is approved</span>
                <p className="text-xs leading-4 pt-2 italic w-full opacity-70 overflow-hidden">"{props.data.expense?.description} "</p>
                <span className=" text-blue-500 text-xs leading-4 opacity-75">{diffForHumans(props.data.expense?.updated_at)}</span>
            </div>
        </div>
    </div>
</div>
  )
}
