import React,{useRef} from 'react'
import Custominput from '../../../components/Custominput'
import Buttonsubmit from '../../../components/Buttonsubmit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm } from '@inertiajs/inertia-react';



export default function Productform(props) {
    const {errors,setData,data,processing,post} = useForm({ 
      name: '',
      unit_price: '',
      automated_stocking: false    
    })
    let form = useRef()
    let submit = (e) =>{
        e.preventDefault()
        post('/definitions/product/create',{
            onSuccess: () => props.closeModal()
        });
    }
  return (
    <form onSubmit={submit} ref={form} className='flex flex-col gap-10 max-w-4xl mx-auto pt-10 h-full '>
      <div className='p-5 w-full '>
        <nav className='flex flex-col  gap-5 md:gap-8'>
          <Custominput required error={errors.name} getValue={(value) => setData('name', value)} label='product name' />
          <Custominput type="number" error={errors.unit_price} getValue={(value) => setData('unit_price', value)} label='unit price'  />
          <nav className='flex items-center justify-end text-sm'>
          <nav className='flex items-center'>
          <label htmlFor="">Allow automated stocking for this product</label>
          <input onChange={(e)=>setData('automated_stocking',e.target.checked)} type="checkbox" className=' accent-indigo-400 ml-1 cursor-pointer' name="" id="" />
          </nav>
          <abbr className='text-red-300 cursor-pointer ml-2' title='when this is ticked. This product can also be stock from flock management'>
          <FontAwesomeIcon icon="question-circle" />
          </abbr>
          </nav>
          
        </nav>

        
      </div>
      <div className='mt-auto sticky bottom-0 rounded-b-lg flex justify-end items-center p-5 bg-gray-100 '>
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
