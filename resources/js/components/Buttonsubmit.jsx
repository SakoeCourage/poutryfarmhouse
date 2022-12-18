import React from 'react'
import Loadingspinner from './Loadingspinner'

export default function Buttonsubmit(props) {
  return (
    <button onClick={props.onClick} type="submit" className={`inline-flex justify-center items-center space-x-2 border transition-all font-semibold focus:outline-none w-max px-4 py-1  leading-6 rounded border-indigo-700 bg-indigo-500 text-white hover:text-white hover:bg-indigo-800 hover:border-indigo-800 focus:ring focus:ring-indigo-400 focus:ring-opacity-50 active:bg-indigo-700 active:border-indigo-700 ${props.processing && 'opacity-50 pointer-events-none'}`}>
    {props.processing && <Loadingspinner />}
    {props.text}
</button>
  )
}
