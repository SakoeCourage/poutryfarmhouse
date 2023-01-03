import React from 'react'
import Newsale from "./Newsale"
import Salehistory from "./Salehistory"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const PillTabs = [
    {
      title: 'new',
      element: Newsale,
      icon: 'pen-to-square'
    },
    {
      title: 'sale history',
      element: Salehistory,
      icon: 'history'
    }
  ]
  
  export default function Pill(props) {
    return (
      <button className={`p-2 px-4 text-sm rounded-full border text-center min-w-[5rem] text-gray-600  border-gray-300 hover:bg-blend-overlay flex items-center gap-1 shadow-sm ${props.active && 'bg-indigo-400 text-white'}`} onClick={() => props.onClick(props.index)}>
        <FontAwesomeIcon icon={props.icon} />
        <span>{props.title}</span>
      </button>
  
    )
  }