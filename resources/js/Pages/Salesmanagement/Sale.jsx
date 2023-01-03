import React, { useState, useEffect, useContext,useRef } from 'react'
import { searchContext } from './context/SearchContext'
import Printinvoice from './Printinvoice'
import { printContext } from './context/Printcontext'
import SearchBar from './Partials/Searchbar'
import Pill, { PillTabs } from './Partials/Pilltabs'
import {useReactToPrint} from 'react-to-print'
import Scrollablemodal from '../../components/Scrollablemodal'


export default function Sale() {
  const [activePill, setActivePill] = useState(0)
  const [searchResults, setSearchResults] = useState(null)
  const [searchKey, setSearchKey] = useState(null)
  const [printdata, setPrintdata] = useState(null)
  const PrintinvoiceRef = useRef()
  const handlePrint = useReactToPrint({
    content: ()=> PrintinvoiceRef.current,
    documentTitle: printdata?.invoice[0].invoice_number,
    onAfterPrint: () => setPrintdata(null)
  })
  useEffect(() => {
    console.log(searchResults)
  }, [searchResults])
  
  return (
    <div className='md:px-10 py-2 container mx-auto relative'>
      <printContext.Provider value={{ printdata, setPrintdata }}>
        {printdata && <Scrollablemodal closeModal={()=>setPrintdata(null)} title={printdata?.invoice[0].invoice_number}>
          <Printinvoice  printInvoice={()=>handlePrint()} ref={PrintinvoiceRef}  />
        </Scrollablemodal>}
        <searchContext.Provider value={{ searchResults, setSearchResults,searchKey,setSearchKey }} >
         
          <header className='flex items-center justify-between sticky top-0 z-20 bg-white py-2 flex-wrap space-y-1'>
            <nav className='flex items-center gap-3 w-max truncate'>
              {PillTabs.map((tab, index) => {
                return (
                  <Pill key={index} icon={tab.icon} index={index} active={index === activePill} title={tab.title} onClick={(i) => setActivePill(i)} />
                )
              })}
            </nav>
            {activePill == 1 && <nav><SearchBar /></nav>}
          </header>
          <div className='mt-3 '>
            <React.Fragment >
              {PillTabs.map((Tab, index) => <main key={index}>{index === activePill && <Tab.element />}</main>)}
            </React.Fragment>
          </div>
        </searchContext.Provider>
      </printContext.Provider>
    </div>
  )
}
