import React, { useRef, useState, useEffect } from 'react'
import Custominput from '../../components/Custominput'
import Datepicker from '../../components/Datepicker'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useForm } from '@inertiajs/inertia-react'
import selectApi from '../../api/Getselectsitems'
import { useCustomEventListener } from 'react-custom-events'
import Buttonsubmit from '../../components/Buttonsubmit'




export function BreadList(props) {
  const inputNewBreedref = useRef()
  const [newBreed, setNewBreed] = useState('')
  const [breedList, setBreedList] = useState([])

  let addtoBreedList = () => {
    setBreedList((values) => values = [...values, newBreed])
    console.log(breedList)
    inputNewBreedref.current.value = ''
    setNewBreed('')
  }
  let removeItemat = (i) => {
    setBreedList((List) => List.filter((Listitem, index) => index !== i))
  }
  let addnewBreadList = () => {
    if (newBreed) {
      addtoBreedList()
    }
    else {
      return
    }
  }


  useEffect(() => {
    setBreedList([])
  }, [props.reset])
  useEffect(() => {
    props.getData(breedList)
  }, [breedList])

  useEffect(() => {
    window.addEventListener("process-flockcreate-submit", () => {
      console.log('event received')
    });
  }, [])


  return <div className='my-3' >
    <label htmlFor="" className='font-medium text-sm'>Breed type</label>
    <div onClick={() => { inputNewBreedref.current.focus() }} className="text-gray-400 grid grid-cols-3 pt-2 rounded-md  bg-indigo-100/50 ring-indigo-200 ring-offset-1 focus-within:ring-2 transition-all ease-out duration-150">
      <ul className="  col-span-3 px-1 min-h-[10rem]  w-full   flex  py-1 gap-2 flex-wrap">
        {breedList.map((breed, i) => <li onDoubleClick={() => removeItemat(i)} key={i} className="border-gray-300 select-none cursor-pointer border shadow-sm min-h-min leading-tight flex items-center gap-1 bg-transparent text-red-400 p-1 px-3 rounded-md h-min text-sm relative hover:shadow-md">
          {breed}
          <FontAwesomeIcon onClick={() => { removeItemat(i) }} icon='times' className='text-red-500' />
        </li>)}
      </ul>
      <div className=" col-span-3 flex items-center w-full  pb-1 rounded-md " >
        <div className='w-full text-sm px-1'>
          <nav className='flex items-center bg-white gap-3 border border-none focus-within:border-none rounded px-1  leading-6 w-full'>
            <FontAwesomeIcon icon='kiwi-bird' className='text-gray-500' />
            <input ref={inputNewBreedref} onChange={e => setNewBreed(e.target.value)} onKeyUp={(e) => { e.key == 'Enter' && addnewBreadList() }} className=" grow focus:border-none focus:outline-none py-2" type='text' placeholder='Enter breed name here click add' />
            <span onClick={addnewBreadList} className=' cursor-pointer border p-1 rounded-md hover:text-indigo-500 bg-indigo-50 hover:bg-indigo-100'>add</span>
          </nav>
        </div>
      </div>



    </div>
  </div>

}
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
        console.log(res.data.breeds?.data)
        setBreeds(res.data.breeds?.data)
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
      
          {/* <BreadList reset={resetBreeds} getData={(data) => setData('breed', data)} /> */}
          <nav className='flex flex-col md:flex-row gap-10 items-center'>
            <span className="space-y-1 text-sm w-full">
              <div className='flex items-center justify-between relative'>
                <label htmlFor="lastname" className="font-medium">breed name</label>
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
                  key={breed.id} value={breed.id}>{breed.name}
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
