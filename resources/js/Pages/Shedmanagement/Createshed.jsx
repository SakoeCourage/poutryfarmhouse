import React ,{useRef} from 'react'
import Custominput from '../../components/Custominput'
import Primarybutton from '../../components/Primarybutton'
import { useForm } from '@inertiajs/inertia-react'
import Buttonsubmint from '../../components/Buttonsubmit'
export default function Createshed() {
  const {data, setData, post, errors, processing,reset} = useForm({
        identification_name : '',
        number_of_flocks : ''
  })
  
   let form = useRef()
  let handlereset = (e) =>{
    reset()
    form.current.reset()
  } 

  let submit =(e)=>{
      e.preventDefault()
      post('/shed/create',{
        onSuccess: ()  => handlereset()
      })
  }
  
  return (
    <form onSubmit={submit} ref={form} className='flex flex-col gap-10 max-w-4xl mx-auto pt-20'>
    <nav className='flex flex-col  gap-5 md:gap-8'>
    <Custominput required error={errors.identification_name} getValue = {(value) => setData('identification_name',value) } label='shed identification name' />
    <Custominput error={errors.number_of_flocks} getValue = {(value) => setData('number_of_flocks',value) } label='number of flocks' type='number'/>
    </nav>
    <nav className=' self-end mt-5'>
    <Buttonsubmint processing={processing} text='create'/>
    </nav>
</form>  
  )
}
