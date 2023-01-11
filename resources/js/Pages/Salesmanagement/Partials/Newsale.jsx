import React, { useState, useEffect, useContext, useMemo } from 'react'
import Custominput from '../../../components/Custominput'
import { usePage, useForm } from '@inertiajs/inertia-react'
import Buttonsubmit from '../../../components/Buttonsubmit'
import { formatcurrency } from '../../../api/Util'
import Itemslist from './Itemslist'
import { printContext } from '../context/Printcontext'



export default function Newsale() {
  const { products } = usePage().props
  const [resetform, setResetForm] = useState(false)
  const { setPrintdata,autoGenerateInvoice, setAutoGenerateInvoice } = useContext(printContext)

  const { data, setData, processing, errors, reset, post } = useForm({})
  const [formData, setFormData] = useState({
    total_amount: 0,
    customer_name: '',
    customer_contact: '',
    customer_purchases: null,
  })


  let handlereset = () => {
    reset()
    setResetForm(!resetform)
    setFormData({
      total_amount: 0,
      customer_name: '',
      customer_contact: '',
      customer_purchases: null,
    })
  }


  useEffect(
    () => setData(formData)
    , [formData])

  let submit = () => {
    post('/sales/new', {
      onSuccess: () => handlereset()
    })
  }

  

  return (
    <div className='flex flex-col gap-7 max-w-4xl mx-auto pt-5'>
      <nav className='flex items-center gap-5 flex-col md:flex-row '>
        <Custominput error={errors.customer_name} value={formData.customer_name} label="customer full name" getValue={(value) => setFormData((cd) => cd = { ...cd, customer_name: value })} />
        <Custominput error={errors.customer_contact} value={formData.customer_contact} label="customer contact number" placeholder="(000) 000 0000" getValue={(value) => setFormData((cd) => cd = { ...cd, customer_contact: value })} />
      </nav>
      <Itemslist reset={resetform} errors={errors} products={products} getTotal={(value) => setFormData((cd) => cd = { ...cd, total_amount: value })} getData={(data) => setFormData((cd) => cd = { ...cd, customer_purchases: data })} />
      <nav className='self-end  flex items-center gap-5 user-select-none pointer-events-none '>
        <span>Total</span>
        <span className='bg-white p-1 px-2 min-w-[12rem] '>{formatcurrency(data.total_amount)}</span>
      </nav>
      <nav className='self-end mt-5'>
        <nav className='flex items-center text-xs gap-2 mb-1'>
          <input className='text-xs accent-indigo-400 rounded-md' onChange={(e)=>setAutoGenerateInvoice(e.target.checked)} defaultChecked={autoGenerateInvoice} type="checkbox" name="" id="" />
          <label htmlFor="">also  generate sale invoice</label>
        </nav>
        <Buttonsubmit onClick={submit} processing={processing} text="done" className="rounded-xl py-2  px-5" />
      </nav>
    </div>
  )
}
