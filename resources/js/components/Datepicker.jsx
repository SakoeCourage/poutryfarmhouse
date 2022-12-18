import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import React from 'react'

export default function Datepicker({getdateData,disabled}) {
    const [startDate, setStartDate] = useState(new Date());
    let handleChange = (data) =>{
        setStartDate(data)
        getdateData(data)
        console.log(data)
    }
    useEffect(()=>{
        getdateData(new Date())
    },[])
  return (
    <div>
        <nav className={`flex items-center gap-2  rounded px-5 py-2 leading-6 w-max focus-within:border-indigo-400 ring-offset-1 focus-within:ring-2 transition-all ease-out duration-150 ${!disabled && 'border border-gray-200'}`}>
        <FontAwesomeIcon icon='calendar-day' className="text-gray-500"/>
        <DatePicker dateFormat="yyyy/MM/dd" className=" outline-none grow" disabled={disabled} selected={startDate} onChange={(date) => handleChange(date)} />
        </nav>
    </div>
  )
}
