import { useEffect, useLayoutEffect, useState } from "react"
import Datalinkchart from "../../components/Datalinkchart"
import Flockcompareselection from "../../components/Flockcompareselection"
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import { chartContext } from "../../contexts/chartContext";
import React from 'react'
export default function Compareflocks() {
    const [chartData,setchartData] = useState([])

    let setUiChanges = () =>{
       let documentPage = document.querySelector('#documentPage')
       let docHeight = document.documentElement.getBoundingClientRect().height
       let comparePage = document.querySelector('#contraintHeight')
       let headerHeight = document.querySelector('#header').getBoundingClientRect().height
       comparePage.style.height = `${docHeight-headerHeight}px`
       disableBodyScroll(documentPage);
  }
  useLayoutEffect(()=>setUiChanges(),[])
  return (
    <div className="  flex overflow-y-hidden" id="contraintHeight">
        <chartContext.Provider value={{chartData,setchartData}}>
        <Flockcompareselection />
        <Datalinkchart chartData={chartData} />
        </chartContext.Provider>
       
    </div>
  )
}
