import React, { useRef, useState, useEffect } from 'react'
import Custominput from '../../components/Custominput'
import Datepicker from '../../components/Datepicker'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useForm } from '@inertiajs/inertia-react'
import Buttonsubmint from '../../components/Buttonsubmit'
import selectApi from '../../api/Getselectsitems'
import { BreadList } from './Createflock'




export default function Editflock() {
    const [resetBreeds, setresetBreeds] = useState(false) 
    const [sheds, setSheds] = useState([])
    
    const { data, setData, post, processing, errors, reset } = useForm({
      flock_name: '',
      shed_id: '',
      start_date: '',
      breed_types: ''
    })
    let form = useRef()
  
    let handlereset = (e) =>{
      reset()
      form.current.reset()
      setresetBreeds(curr => !curr)
    } 
    
    let submit = (e) => {  
      post('/flock/create', {
        onSuccess: (e) => handlereset(e)
      })
    }
    
    function fetchAllShed(){
      selectApi.getAllShed().then(res=>{
         setSheds(res.data?.sheds)
         console.log(sheds)
      })
      
    }
  
    useEffect(()=>{fetchAllShed()},[])
    
    return (
      <div className='w-full mx-auto px-10 relative isolate'>
        
        <main ref={form} onSubmit={submit} className=' max-w-4xl mx-auto'>
          <nav className='flex flex-col gap-3'>
            <span>
              <label htmlFor="" className='font-medium text-sm'>Today</label>
            <Datepicker getdateData={() => null} disabled={true} />
            </span>
            <Custominput error={errors.flock_name} getValue={(value)=>setData('flock_name',value)} label='flock name' />
            <BreadList reset={resetBreeds} getData={(data) => setData('breed_types', data)} />
            <div className='flex flex-col md:flex-row gap-10 items-center'>
            <span className="space-y-1 text-sm w-full">
              <div className='flex items-center justify-between relative'>
                <label htmlFor="lastname" className="font-medium">shed</label>
                {errors.shed_id && <div className=' mt-2'>
                  <nav className="cursor-pointer font-awesome  gap-1  flex items-center absolute right-2 inset-y-0">
                    <FontAwesomeIcon icon="warning" className="text-red-400 h-5 w-5 order-2 " />
                    <span className="  text-sm text-red-400 backdrop-blur-sm bg-white/30 error ">{errors.shed_id}</span>
                  </nav>
                </div>}
              </div>
              <select onChange={(e) => setData('shed_id', e.target.value)} className=" block relative border border-gray-200 px-5 min-w-[12rem] py-3 focus:border-none outline-none rounded leading-6 w-full ring-offset-1 focus:ring-2 transition-all ease-out duration-150" type="text" placeholder="Enter user first name" >
                <option value='' >select shed</option>
                {sheds.map((shed )=><option 
                key={shed.id} value={shed.id}>{shed.shed_identification_name}
                </option>
                )}
                
              </select>
            </span>
            <span className='w-full'>
            <div className='flex items-center justify-between relative'>
                <label htmlFor="lastname" className=" font-semibold text-sm">start date</label>
                {errors.start_date && <div className=' mt-2'>
                  <nav className="cursor-pointer font-awesome  gap-1  flex items-center absolute right-2 inset-y-0">
                    <FontAwesomeIcon icon="warning" className="text-red-400 h-5 w-5 order-2 " />
                    <span className="  text-sm text-red-400 backdrop-blur-sm bg-white/30 error ">{errors.start_date}</span>
                  </nav>
                </div>}
              </div>
              <Datepicker getdateData={(data) => setData('start_date', data)} disabled={false} />
            </span>
            </div>
            <nav className=' self-end mt-5'>
              <Buttonsubmint onClick={()=>{submit()}} processing={processing} text='create' />
            </nav>
          </nav>
  
        </main>
      </div>
    )
  
}
