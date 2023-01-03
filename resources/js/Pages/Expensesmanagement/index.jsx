import React,{useEffect,useState} from 'react'
import Selectionscreen from './Selectionscreen'
import Newexpense from './Newexpense'
import {AnimatePresence} from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function index() {
    const [newExpenseForm,setNewExpenseForm] = useState(false)
    return (
        <div className='container mx-auto py-5 w-full min-h-full h-full  '>

            <AnimatePresence>
            {newExpenseForm ?  <Newexpense />:
            <Selectionscreen  showform={()=>setNewExpenseForm(true)} />
            }
            </AnimatePresence>

        </div>
    )
}
