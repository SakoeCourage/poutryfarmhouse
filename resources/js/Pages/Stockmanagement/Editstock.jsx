import { useState,useEffect,useRef } from 'react'
import React from 'react'
import Custominput from '../../components/Custominput'
import { useForm } from '@inertiajs/inertia-react'
import Buttonsubmit from '../../components/Buttonsubmit'
import Loadingspinner from '../../components/Loadingspinner'
import Buttondelete from '../../components/Buttondelete'
import { Inertia } from '@inertiajs/inertia'
import Dialoge from '../../components/Dialoge'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Dotanimation from '../../components/Dotanimation'

import Api from '../../api/Api'

export default function Editstock(props) {
    const [restExpenseTable, setResetExpenseTable] = useState(false)
    const [resetinputNumber,setresetinputNumber] = useState(false);
    const [isLoading,setisLoading] = useState(true);
    const [toggledelete, setToggledelete] = useState(false)
    const [currentData,setCurrentData]=useState({
        opening_stock: '',
        closing_stock: '',
        birds_sold: '',
        eggs_sold: '',
        daily_production: '',
        broken: '',
        other_defects:' '
    })
    const {data,setData,put,errors,processing,reset} = useForm({  })
     const form = useRef()

    let fetchStockdata = () =>{
        Api.get(`stock/getdata/${props.id}`).then(res=>{
            const {stock ,expenses} = res.data    
            setCurrentData(values => ({...values,opening_stock:stock.opening_stock}))
            setCurrentData(values =>( {...values,closing_stock:stock.closing_stock}))
            setCurrentData(values => ({...values,birds_sold:stock.birds_sold}))
            setCurrentData(values =>( {...values,eggs_sold:stock.eggs_sold}))
            setCurrentData(values =>( {...values,daily_production:stock.daily_production}))
            setCurrentData(values =>( {...values,broken:stock.broken}))
            setCurrentData(values =>( {...values,other_defects:stock.other_defects}))
            setisLoading(false)
        }).catch(err=> console.log(err.response))
    }

    function sendDeleterequest(e){
        e.preventDefault()
        Inertia.delete(`/stock/delete/${props.id}`,{
            onSuccess: () =>{ props.closeModal()}
        })
    }

    let submitform = (e) =>{
          e.preventDefault()
          put(`/stock/update/${props.id}`,{
         
          })  
      }

      useEffect(()=>{
        fetchStockdata()
      },[])
      useEffect(()=>{
       setData(currentData)
      
      },[currentData])

  return (
    <div className=' w-full mx-auto px-10 relative isolate'>
            {isLoading && <Dotanimation />}
      <main className='w-full mt-10'>
        <form ref={form} onSubmit={submitform} className='flex flex-col  gap-10'>
          <div className='flex flex-col md:flex-row gap-5'>
            <Custominput number={currentData.opening_stock} getValue={(value)=>setCurrentData({...currentData,opening_stock:value})} error={errors.opening_stock} reset={resetinputNumber} type='number' min='0' label='opening stock' />
            <Custominput number={currentData.closing_stock}  getValue={(value)=>setCurrentData({...currentData,closing_stock:value})} error={errors.closing_stock} reset={resetinputNumber} type='number' min='0' label='closing stock' />
          </div>
          <div className='flex flex-col md:flex-row gap-5'>
            <Custominput number={currentData.birds_sold} getValue={(value)=>setCurrentData({...currentData,birds_sold:value})} error={errors.birds_sold} reset={resetinputNumber} type='number' min='0' label='birds sold' />
            <Custominput number = {currentData.eggs_sold} getValue={(value)=>setCurrentData({...currentData,eggs_sold:value})} error={errors.eggs_sold} reset={resetinputNumber} type='number' min='0' label='eggs sold' />
          </div>
          <div className='flex flex-col md:flex-row gap-5'>
            <Custominput number={currentData.broken} getValue={(value)=>setCurrentData({...currentData,broken:value})} error={errors.broken} reset={resetinputNumber} type='number' min='0' label='broken' />
            <Custominput number={currentData.other_defects} getValue={(value)=>setCurrentData({...currentData,other_defects:value})} error={errors.other_defects} reset={resetinputNumber} type='number' min='0' label='other defects' />
          </div>
          <Custominput number={currentData.daily_production} getValue={(value)=>setCurrentData({...currentData,daily_production:value})} error={errors.daily_production} reset={resetinputNumber} type='number' min='0' label='daily production' />
          <div className='flex items-center gap-3 w-full  mt-7 justify-end relative'>
          {toggledelete && <Dialoge onDecline={()=>setToggledelete(false)} onConfirm={(e)=>sendDeleterequest(e)}>
                            <div className='py-5 flex flex-col justify-center'>
                                <FontAwesomeIcon className='text-red-500' size='xl' icon='warning' />
                                <nav>  Record will be permanently deleted </nav>
                                <nav className='text-xs text-gray-400 w-full text-center'> this action is irreversable </nav>
                            </div>
            </Dialoge >}
              <Buttonsubmit processing={processing} text='update'/>
              <Buttondelete onClick={(e)=>{e.preventDefault();setToggledelete(true)}} text='delete record'/>
          </div>


        </form>

      </main>
    </div>
  )
}
