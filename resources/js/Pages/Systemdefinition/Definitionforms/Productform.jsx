import React, { useRef, useState, useEffect } from 'react'
import Custominput from '../../../components/Custominput'
import Buttonsubmit from '../../../components/Buttonsubmit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm } from '@inertiajs/inertia-react';

export default function Productform(props) {
  const [definitions, setDefinitions] = useState([{
    name: '',
    unit_price: ''
  }])
  const { errors, setData, data, processing, post } = useForm({
    name: '',
    definitions: [],
    automated_stocking: false
  })

  let addNewItem = () => {
    setDefinitions((ci => ci = [...ci, {
      name: '',
      unit_price: ''
    }]))
  }

  let handleValueChange = (i, name, current) => {
    let newitems = [...definitions];
    newitems[i][name] = current
    setDefinitions(newitems)
  }
  let removeItemat = (i) => {
    let newitems = [...definitions];
    newitems.splice(i, 1);
    setDefinitions(newitems)
  }

  useEffect(() => {
    setData('definitions', definitions)
  }, [definitions])

  let submit = (e) => {
    post('/definitions/product/create', {
      onSuccess: () => props.closeModal()
    });
  }
  useEffect(() => {
    console.log(definitions)
  }, [definitions])

  return (
    <main  className='flex flex-col gap-10 max-w-4xl mx-auto pt-10 h-full '>
      <div className='p-5 w-full '>
        <nav className='flex flex-col  gap-5 md:gap-8'>
          <Custominput required error={errors.name} getValue={(value) => setData('name', value)} label='product name' />

          {/* Multiple products definition  */}
          <nav className='bg-indigo-50/70 rounded-md p-3 shadow-sm'>
            <nav className='text-indigo-600 text-sm flex items-center gap-1 mb-4'>
              <FontAwesomeIcon icon="question-circle" />
              <span>If product have more than one type click on the plus symbol to add more</span>
            </nav>
            {definitions.map((definition, i) => <nav key={i} className='flex items-center gap-2 my-2'>
              <Custominput error={errors[`definitions.${i}.name`]} value={definition.name} getValue={(value) => handleValueChange(i, "name", value)} placeholder=" product type" />
              <Custominput  error={errors[`definitions.${i}.unit_price`]} value={definition.unit_price} getValue={(value) => handleValueChange(i, "unit_price", value)} placeholder="unit price" />
              <button onClick={(e) => removeItemat(i)} className='text-gray-500  shrink text-right  '><FontAwesomeIcon className=' h-3 w-3 p-1 rounded-full bg-red-100 shadow-md text-red-400  ' icon="minus" /></button>
            </nav>)}
            <div className='flex items-center justify-center mt-5'>
              <button onClick={addNewItem} className="  bg-blue-300 self-center text-white  border border-gray-300  text-xs rounded-full shadow-lg ">
                <FontAwesomeIcon icon="plus-circle" className='h-8 w-8' size="2xl" />
              </button>
            </div>
          </nav>
          <nav className='flex items-center justify-end text-sm'>
            <nav className='flex items-center'>
              <label htmlFor="">Allow automated stocking for this product</label>
              <input onChange={(e) => setData('automated_stocking', e.target.checked)} type="checkbox" className=' accent-indigo-400 ml-1 cursor-pointer' name="" id="" />
            </nav>
            <abbr className='text-red-300 cursor-pointer ml-2' title='when this is ticked. This product can also be stock from flock management'>
              <FontAwesomeIcon icon="question-circle" />
            </abbr>
          </nav>

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
    </main>
  )
}
