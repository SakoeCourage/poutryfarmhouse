import React, { useRef } from 'react'
import Custominput from '../../components/Custominput'
import Primarybutton from '../../components/Primarybutton'
import { useForm } from '@inertiajs/inertia-react'
import Buttonsubmit from '../../components/Buttonsubmit'
export default function Createshed(props) {
  const { data, setData, post, errors, processing, reset } = useForm({
    identification_name: '',
    number_of_flocks: ''
  })

  let form = useRef()
  let handlereset = (e) => {
    reset()
    form.current.reset()
    props.closeModal()
  }

  let submit = (e) => {
    e.preventDefault()
    post('/shed/create', {
      onSuccess: () => handlereset()
    })
  }

  return (
    <form onSubmit={submit} ref={form} className='flex flex-col gap-10 max-w-4xl mx-auto pt-10 '>
      <div className='p-5 w-full '>
        <nav className='flex flex-col  gap-5 md:gap-8'>
          <Custominput required error={errors.identification_name} getValue={(value) => setData('identification_name', value)} label='shed identification name' />
          <Custominput error={errors.number_of_flocks} getValue={(value) => setData('number_of_flocks', value)} label='number of flocks' type='number' />
        </nav>
      </div>
      <div className=' sticky bottom-0 rounded-b-lg flex justify-end items-center p-5 bg-gray-100 '>
        <nav className='flex items-center gap-3'>
          <button onClick={(e) =>{ e.preventDefault(); props.closeModal()}} className='px-4 py-1 border-2 text-gray-600 font-semibold rounded-lg'>
            {props.decline ?? 'cancel'}
          </button>
          <Buttonsubmit onClick={submit} processing={processing} text="create" className="rounded-lg" />
        </nav>
      </div>
    </form>
  )
}
