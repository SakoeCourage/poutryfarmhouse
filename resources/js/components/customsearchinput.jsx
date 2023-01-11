import React,{useState,useEffect,useLayoutEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Loadingspinner from './Loadingspinner'


export default function Customsearchinput(props) {
    const [currentValue,setCurrentValue] = useState(props.value ?? '') 
    let handleonchange = (onchangeValue) =>{
        setCurrentValue(onchangeValue)
        props.getValue(onchangeValue)
    }
    return (
        <div className={`w-full space-y-1 `}>
          <nav className=" relative border flex items-center  border-gray-200 focus-within:border-none rounded leading-6 w-full min-w-max ring-offset-1 focus-within:ring-2 transition-all ease-out duration-150" >
            <input value={currentValue} onChange={(e)=>handleonchange(e.target.value)} readOnly={props.disabled} min='0'  className={`px-5 py-3 text-sm min-w-max  grow  border-none focus:border-none focus:outline-none `} placeholder={props.placeholder ?? `enter ${props.label ?? ''}`} />
            {props.processing ? <Loadingspinner/> :
            <FontAwesomeIcon className='text-gray-300 mr-2 w-5 h-6 text-sm' size='sm' icon='magnifying-glass'/> 
            }
          </nav>
        </div>
      )
}
