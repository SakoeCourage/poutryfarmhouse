import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Primarybutton from './Primarybutton'

export default function Dialoge(props) {
  return (
    <div className='bg-white p-2 px-5 absolute right-0 top-0 transform mb-5 translate-y-[-100%] w-max border shadow-md '>
    {props.children}
    <div className='flex items-center gap-3 justify-end'>
        <button onClick={props.onConfirm} type="submit" className={`space-x-2 border font-semibold focus:outline-none w-max px-4 py-1  leading-6 rounded border-gray-300 bg-gray-100 text-gray-500 hover:text-gray-600 hover:shadow-lg`}>
            ok
        </button>
        <Primarybutton onClick={props.onDecline} text='cancel' />
    </div>
</div>
  )
}
