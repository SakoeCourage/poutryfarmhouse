import { useState,useEffect,useRef } from 'react'
import React from 'react'
import Custominput from '../../components/Custominput'
import { useForm } from '@inertiajs/inertia-react'
import Buttonsubmit from '../../components/Buttonsubmit'
function CreateExpensesTable(props) {
  const [expense, setExpense] = useState([])
  const [currentValue, setCurrentValue] = useState({ name: null, amount: null })

  let appendCurrentItems = (e) => {
    e.preventDefault()
    if (!Object.values(currentValue).some((item) => item === null)) {
      setExpense(value => value = [...value, currentValue])
      
    }
    console.log(expense)
  }

  let deleteitem_at = (e,i) => {
    e.preventDefault()
    setExpense((values) => values.filter((value, index) => index !== i))
  }
  useEffect(()=>{
      props.getData(expense)
  },[expense])
  useEffect(()=>{
     setExpense([])
     console.log('reset')
  },[props.reset])

  return <div className='block border rounded-md h-[20rem] overflow-y-scroll relative '>
    <table className="w-full text-sm text-left text-gray-500 h-full">
      <thead className="text-xs text-gray-600 rounded-md bg-gray-50 sticky top-0 ">
        <tr>
          <th scope="col" className="py-3 px-6">
            Expense name
          </th>
          <th scope="col" className="py-3 px-6">
            amount
          </th>
          <th scope="col" className="py-3 px-6">
            Action
          </th>
        </tr>
      </thead>
      <tbody className=''>
        {expense.map((ex, i) => <tr key={i} className="bg-white border-b w-full">
          <td scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
            {ex.name}
          </td>

          <td className="py-4 px-6">
            ${ex.amount}
          </td>
          <td className="py-4 px-6">
            <button onClick={(e) =>deleteitem_at(e,i)} href="#" className="font-medium text-blue-600  hover:underline">delete</button>
          </td>
        </tr>
        )}  
      </tbody>
    </table>
    <nav className='self-end sticky bottom-1 w-full flex border bg-indigo-50 focus-within:outline-none focus-within:ring focus-within:ring-indigo-300 focus-within:ring-opacity-50 transition-all duration-500 rounded-md'>
      <nav className='flex  items-center gap-2 grow bg-indigo-50'>
        <input className='w-full bg-indigo-50 outline-none border-none focus:outline-none py-2 px-2 text-sm' type='text' label='select product' placeholder='enter expense name'  onChange={(e) => { setCurrentValue(values => ({ ...values, name: e.target.value })) }} />
        
        <input className='w-full bg-indigo-50 outline-none border-none focus:outline-none py-2 px-2 text-sm' placeholder='amount'  type='number' min={0} onChange={(e) => { setCurrentValue(values => ({ ...values, amount: e.target.value })) }} />
      </nav>
      <button size='sm' className='ml-1 lowercase p-1 bg-indigo-500 text-white rounded-md text-sm' onClick={(e) => appendCurrentItems(e)} >
        append
      </button>
    </nav>
  </div>
}

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
          <CreateExpensesTable reset={restExpenseTable} getData={(value)=>{setData('expense',value)}}/>
          <div className='flex w-full  mt-7 justify-end'>
              <Buttonsubmit processing={processing} text='create'/>
          </div>


        </form>

      </main>
    </div>
  )
}
