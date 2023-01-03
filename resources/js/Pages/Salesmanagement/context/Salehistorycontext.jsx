import React,{ useState } from 'react'
import { HistoryContext } from './Historycontext'

export default function Salehistorycontext(props) {
    const [sales,setSales] = useState('ama')
  return (
     <HistoryContext.Provider  value={{sales,setSales}}>
        {props.children}
    </HistoryContext.Provider>
  )
}
