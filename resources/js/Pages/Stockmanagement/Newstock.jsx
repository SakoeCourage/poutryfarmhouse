import { useState,useEffect,useRef } from 'react'
import React from 'react'
import Custominput from '../../components/Custominput'
import { useForm } from '@inertiajs/inertia-react'
import Buttonsubmit from '../../components/Buttonsubmit'



export default function Newstock() {
    const [restExpenseTable, setResetExpenseTable] = useState(false)
    const [resetinputNumber,setresetinputNumber] = useState(false);
    const {data,setData,post,errors,processing,reset} = useForm({
        opening_stock: '',
        closing_stock: '',
        birds_sold: '',
        eggs_sold: '',
        daily_production: '',
        expense: '',
        broken: '',
        other_defects:' '

    })
    
        const form = useRef()
    
    function resetData(){
        form.current.reset()
        reset()
        setresetinputNumber(val=>!val)
        setResetExpenseTable(val=>!val)
    }
    let submitform = (e) =>{
          e.preventDefault()
          post("/stock/add",{
              onSuccess: () => resetData()
          })
         
      }

  return (
    <div>
      <main className=' max-w-4xl mx-auto'>
        <form ref={form} onSubmit={submitform} className='flex flex-col  gap-10'>
          <div className='flex flex-col md:flex-row gap-5'>
            <Custominput getValue={(value)=>setData('opening_stock',value)} error={errors.opening_stock} reset={resetinputNumber} type='number' min='0' label='opening stock' />
            <Custominput getValue={(value)=>setData('closing_stock',value)} error={errors.closing_stock} reset={resetinputNumber} type='number' min='0' label='closing stock' />
          </div>
          <div className='flex flex-col md:flex-row gap-5'>
            <Custominput getValue={(value)=>setData('birds_sold',value)} error={errors.birds_sold} reset={resetinputNumber} type='number' min='0' label='birds sold' />
            <Custominput getValue={(value)=>setData('eggs_sold',value)} error={errors.eggs_sold} reset={resetinputNumber} type='number' min='0' label='eggs sold' />
          </div>
          <div className='flex flex-col md:flex-row gap-5'>
            <Custominput getValue={(value)=>setData('broken',value)} error={errors.broken} reset={resetinputNumber} type='number' min='0' label='broken' />
            <Custominput getValue={(value)=>setData('other_defects',value)} error={errors.other_defects} reset={resetinputNumber} type='number' min='0' label='other defects' />
          </div>
          <Custominput getValue={(value)=>setData('daily_production',value)} error={errors.daily_production} reset={resetinputNumber} type='number' min='0' label='daily production' />
          <div className='flex w-full  mt-7 justify-end'>
              <Buttonsubmit processing={processing} text='create'/>
          </div>


        </form>

      </main>
    </div>
  )
}
