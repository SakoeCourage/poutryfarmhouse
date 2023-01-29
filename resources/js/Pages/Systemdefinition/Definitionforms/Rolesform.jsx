import React, { useEffect } from 'react'
import Buttonsubmit from '../../../components/Buttonsubmit';
import Custominput from '../../../components/Custominput';
import { useForm } from '@inertiajs/inertia-react';

export default function Rolesform(props) {
  const { processing, post, errors, setData, data } = useForm({
    name: ''
  })
  const submit = (e) => {
    e.preventDefault()
    post('/roles/create', {
      onSuccess: () => props.closeModal()
    })
  }
  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <form onSubmit={submit} className='flex flex-col gap-10 max-w-4xl mx-auto pt-10 h-full '>
      <div className='p-5 w-full '>
        <nav className='flex flex-col  gap-5 md:gap-8'>
          <Custominput required error={errors.name} getValue={(value) => setData('name', value)} label='Role name' />
        </nav>
      </div>
      <div className='mt-auto sticky bottom-0 rounded-b-lg flex justify-end items-center p-5 bg-gray-100 '>
        <nav className='flex items-center gap-3'>
          <button onClick={(e) => { e.preventDefault(); props.closeModal() }} className='px-4 py-1 border-2 text-gray-600 font-semibold rounded-lg'>
            cancel
          </button>
          <Buttonsubmit onClick={submit} processing={processing} text="create" className="rounded-lg" />
        </nav>
      </div>
    </form>
  )
}
