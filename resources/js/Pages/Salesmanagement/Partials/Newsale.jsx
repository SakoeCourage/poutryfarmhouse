import React, { useState, useEffect, useContext, useMemo } from 'react'
import Custominput from '../../../components/Custominput'
import { usePage, useForm } from '@inertiajs/inertia-react'
import Buttonsubmit from '../../../components/Buttonsubmit'
import { formatcurrency } from '../../../api/Util'
import Itemslist from './Itemslist'
import { printContext } from '../context/Printcontext'
import Customcheckbox from '../../../components/Customcheckbox'



export default function Newsale() {
  const { products } = usePage().props
  const [resetform, setResetForm] = useState(false)
  const { setPrintdata, autoGenerateInvoice, setAutoGenerateInvoice } = useContext(printContext)
  const [saleDiscount, setSaleDiscount] = useState(true)
  const { data, setData, processing, errors, reset, post } = useForm({})
  const [formData, setFormData] = useState({
    total_amount: 0,
    customer_name: '',
    sub_total: 0,
    customer_contact: '',
    customer_purchases: null,
    discount_rate: null,
  })


  let handlereset = () => {
    reset()
    setResetForm(!resetform)
    setFormData({
      total_amount: 0,
      sub_total: 0,
      customer_name: '',
      customer_contact: '',
      customer_purchases: null,
      discount_rate: null,
    })
  }


  useEffect(() => {
    if (saleDiscount && formData.discount_rate) {
      let dicounted_amount = (formData.discount_rate / 100) * formData.sub_total
      let Total = formData.sub_total - dicounted_amount
      setFormData(cd => cd = { ...cd, total_amount: Total })
    } else {
      let Total = formData.sub_total
      setFormData(cd => cd = { ...cd, total_amount: Total })

    }
  }, [formData.sub_total, formData.discount_rate, saleDiscount])


  useEffect(
    () => {
      console.log(formData)
      setData(formData)}
    
    , [formData])

  let submit = () => {
    console.log(data)
      if(formData.total_amount > 0){
        post('/sales/new', {
          onSuccess: () => handlereset()
        })
      }
  }





  return (
    <div className='flex flex-col gap-7 max-w-4xl mx-auto pt-5'>
      <nav className='flex items-center gap-5 flex-col md:flex-row '>
        <Custominput error={errors.customer_name} value={formData.customer_name} label="customer full name" getValue={(value) => setFormData((cd) => cd = { ...cd, customer_name: value })} />
        <Custominput error={errors.customer_contact} value={formData.customer_contact} label="customer contact number" placeholder="(000) 000 0000" getValue={(value) => setFormData((cd) => cd = { ...cd, customer_contact: value })} />
      </nav>
      <Itemslist reset={resetform} errors={errors} getTotal={(value) => setFormData((cd) => cd = { ...cd, sub_total: value })} getData={(data) => setFormData((cd) => cd = { ...cd, customer_purchases: data })} />

      <div>
        <nav className='p-3 px-4 rounded-md bg-indigo-50/50 font-semibold justify-between  flex items-center gap-5 user-select-none pointer-events-none '>
          <span className=''>Sub total</span>
          <span className='min-w-[12rem] '>{formatcurrency(data.sub_total)}</span>
        </nav>
        <nav className='flex items-center justify-between flex-1 my-2 px-4'>

          <nav className='w-full text-sm'>sale discount</nav>
          <nav className='w-full text-sm flex items-center gap-1'>
            <span className={`${saleDiscount ? 'text-indigo-700' :'text-gray-700'} `}>{saleDiscount ?  `${formData.discount_rate}% discount is applied` : 'no discount applied'}</span>
            <Customcheckbox checked={saleDiscount} onChange={(e) => setSaleDiscount(e.target.checked)} />
          </nav>
          <nav className='flex items-center w-full gap-1'>
            <Custominput  readOnly={!saleDiscount} reset={resetform}  placeholder="enter rate (%)" getValue={(value) => setFormData((cd) => cd = { ...cd, discount_rate: Number(value) })} />
            <span className='text-gray-500'>%</span>
          </nav>
        </nav>
      </div>
      <nav className={`p-3 px-4 rounded-md bg-indigo-50/50 font-semibold justify-between  flex items-center gap-5 user-select-none pointer-events-none ${formData.discount_rate &&  formData.total_amount <= 0 && 'text-red-500 bg-red-50'}`}>
        <span className=''>Total</span>
        <span className='min-w-[12rem] '>{formatcurrency(data.total_amount)}</span>
      </nav>
      <nav className='self-end mt-5'>
        <nav className='flex items-center text-xs gap-2 mb-1'>
          <Customcheckbox onChange={(e) => setAutoGenerateInvoice(e.target.checked)} checked={autoGenerateInvoice} />
          <label htmlFor="">also  generate sale invoice</label>
        </nav>
        <Buttonsubmit onClick={submit} processing={processing} text="done" className="rounded-xl py-2  px-5" />
      </nav>
    </div>
  )
}
