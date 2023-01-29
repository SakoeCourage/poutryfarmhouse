import React, { useRef, useState, useEffect } from 'react'
import Custominput from '../../components/Custominput'
import Datepicker from '../../components/Datepicker'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useForm } from '@inertiajs/inertia-react'
import selectApi from '../../api/Getselectsitems'
import { useCustomEventListener } from 'react-custom-events'
import Buttonsubmit from '../../components/Buttonsubmit'





export default function Createflock(props) {
  const [resetBreeds, setresetBreeds] = useState(false)
  const [sheds, setSheds] = useState([])
  const [breeds, setBreeds] = useState([])

  const { data, setData, post, processing, errors, reset } = useForm({
    flock_identification_name: '',
    shed_id: '',
    start_date: '',
    breed: '',
    age_of_flocks: '',
    opening_birds: ''
  })
  let form = useRef()

  let handlereset = (e) => {
    props.closeModal()
    reset()
    form.current.reset()
    setresetBreeds(curr => !curr)
  }

  let submit = (e) => {
    post('/flock/create', {
      onSuccess: (e) => handlereset(e),
      onStart: () => { }
    })
  }

  function SelectData() {
    selectApi.getAllShed().then(res => {
      setSheds(res.data?.sheds)
      console.log(sheds)
    }).then(() => {
      selectApi.getAllBreeds().then(res => {
        setBreeds(res.data.breeds)
      }).catch(err=>{
        console.log(err.response)
      })
    })

  }

  useEffect(() => { SelectData() }, [])

  return (
    <div className='mt-10 '>
      <main ref={form} onSubmit={submit} className='  max-w-4xl mx-auto p-5'>
        <nav className='flex flex-col gap-10'>
          <span className='w-max'>
            <div className='flex items-center justify-between relative'>
              <label htmlFor="lastname" className=" font-semibold text-sm">flock start date</label>
              {errors.start_date && <div className=' mt-2'>
                <nav className="cursor-pointer font-awesome  gap-1  flex items-center absolute right-2 inset-y-0">
                  <FontAwesomeIcon icon="warning" className="text-red-400 h-5 w-5 order-2 " />
                  <span className="  text-sm text-red-400 backdrop-blur-sm bg-white/30 error ">{errors.start_date}</span>
                </nav>
              </div>}
            </div>
            <Datepicker getdateData={(data) => setData('start_date', data)} disabled={false} />
          </span>
          <Custominput error={errors.flock_identification_name} getValue={(value) => setData('flock_identification_name', value)} label='flock identification' />
          <nav className='flex flex-col md:flex-row gap-10'>
            <Custominput type="number" error={errors.age_of_flocks} getValue={(value) => setData('age_of_flocks', value)} label='age of flock' />
            <Custominput type="number" error={errors.opening_birds} getValue={(value) => setData('opening_birds', value)} label='opening birds' />
          </nav>
      
    
          <nav className='flex flex-col md:flex-row gap-10 items-center'>
            <span className="space-y-1 text-sm w-full">
              <div className='flex items-center justify-between relative'>
                <label htmlFor="lastname" className="font-medium">breed type</label>
                {errors.shed_id && <div className=' mt-2'>
                  <nav className="cursor-pointer font-awesome  gap-1  flex items-center absolute right-2 inset-y-0">
                    <FontAwesomeIcon icon="warning" className="text-red-400 h-5 w-5 order-2 " />
                    <span className="  text-sm text-red-400 backdrop-blur-sm bg-white/30 error ">{errors.shed_id}</span>
                  </nav>
                </div>}
              </div>
              <select onChange={(e) => setData('breed', e.target.value)} className=" block relative border border-gray-200 px-5 min-w-[12rem] py-3 focus:border-none outline-none rounded leading-6 w-full ring-offset-1 focus:ring-2 transition-all ease-out duration-150" type="text" placeholder="Enter user first name" >
                <option value=' ' >select breed</option>
                {breeds.map((breed) => <option
                  key={breed.id} value={breed.id}>{breed.type}
                </option>
                )}
              </select>
            </span>

            <span className="space-y-1 text-sm w-full">
              <div className='flex items-center justify-between relative'>
                <label htmlFor="lastname" className="font-medium">pen identification name</label>
                {errors.shed_id && <div className=' mt-2'>
                  <nav className="cursor-pointer font-awesome  gap-1  flex items-center absolute right-2 inset-y-0">
                    <FontAwesomeIcon icon="warning" className="text-red-400 h-5 w-5 order-2 " />
                    <span className="  text-sm text-red-400 backdrop-blur-sm bg-white/30 error ">{errors.shed_id}</span>
                  </nav>
                </div>}
              </div>
              <select onChange={(e) => setData('shed_id', e.target.value)} className=" block relative border border-gray-200 px-5 min-w-[12rem] py-3 focus:border-none outline-none rounded leading-6 w-full ring-offset-1 focus:ring-2 transition-all ease-out duration-150" type="text" placeholder="Enter user first name" >
                <option value='' >select pen</option>
                {sheds.map((shed) => <option
                  key={shed.id} value={shed.id}>{shed.shed_identification_name}
                </option>
                )}

              </select>
            </span>
          </nav>


        </nav>

      </main>
      <div className=' sticky bottom-0 rounded-b-lg flex justify-end items-center p-5 bg-gray-100 '>
        <nav className='flex items-center gap-3'>
          <button onClick={() => props.closeModal()} className='px-4 py-1 border-2 text-gray-600 font-semibold rounded-lg'>
            {props.decline ?? 'cancel'}
          </button>
          <Buttonsubmit onClick={() => { submit() }} processing={processing} text="create" className="rounded-lg" />
        </nav>
      </div>
    </div>
  )
}
