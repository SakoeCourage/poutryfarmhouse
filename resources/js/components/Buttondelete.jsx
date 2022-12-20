import React from 'react'

export default function Buttondelete(props) {
  return (
    <button onClick={props.onClick} type="submit" className={`inline-flex justify-center items-center space-x-2 border transition-all font-semibold focus:outline-none w-max px-4 py-1  leading-6 rounded border-red-700 bg-red-100 text-red-400  hover:bg-red-200 hover:border-red-800 focus:ring focus:ring-red-400 focus:ring-opacity-50 active:bg-red-700 active:border-red-700 ${props.processing && 'opacity-50 pointer-events-none'}`}>
    {props.processing && <Loadingspinner />}
    {props.text}
</button>
  )
}
