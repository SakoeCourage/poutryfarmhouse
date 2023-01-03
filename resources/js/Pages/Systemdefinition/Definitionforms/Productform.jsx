import React,{useRef} from 'react'
import Custominput from '../../../components/Custominput'
import Buttonsubmit from '../../../components/Buttonsubmit';
import { usePage } from '@inertiajs/inertia-react';
import { useForm } from '@inertiajs/inertia-react';

export default function Productform(props) {
    const {errors,setData,data,processing,post} = useForm({ 
      name: '',
      unit_price: '',    
    })
    let form = useRef()
    let submit = (e) =>{
        e.preventDefault()
        post('/definitions/product/create',{
            onSuccess: () => props.closeModal()
        });
    }
  return (
    <form onSubmit={submit} ref={form} className='flex flex-col gap-10 max-w-4xl mx-auto pt-10 '>
      <div className='p-5 w-full '>
        <nav className='flex flex-col  gap-5 md:gap-8'>
          <Custominput required error={errors.name} getValue={(value) => setData('name', value)} label='product name' />
          <Custominput type="number" error={errors.unit_price} getValue={(value) => setData('unit_price', value)} label='unit price'  />
        </nav>
      </div>
      <div className=' sticky bottom-0 rounded-b-lg flex justify-end items-center p-5 bg-gray-100 '>
        <nav className='flex items-center gap-3'>
          <button onClick={(e) =>{ e.preventDefault(); props.closeModal()}} className='px-4 py-1 border-2 text-gray-600 font-semibold rounded-lg'>
            cancel
          </button>
          <Buttonsubmit onClick={submit} processing={processing} text="create" className="rounded-lg" />
        </nav>
      </div>
    </form>
  )
}
