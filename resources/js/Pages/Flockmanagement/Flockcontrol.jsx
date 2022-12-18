import React,{useRef,useState,useEffect} from 'react'
import  Datepicker from '../../components/Datepicker'
import Custominput from '../../components/Custominput'
import Buttonsubmit from '../../components/Buttonsubmit'
import { useForm } from '@inertiajs/inertia-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import selectApi from '../../api/Getselectsitems'

export default function Flockcontrol() {
    const form = useRef()
    const [sheds, setSheds] = useState([])
    const [flocknames, setFlocknames] = useState([]);
    const [resetinputNumber,setresetinputNumber]=useState(false)
    const {data,setData,post,reset,processing,errors} = useForm({
      record_date : '',
      flock_name : '',
      shed_identification: '', 
      trays_produced:'',
      feeds_consumed: '', 
      dead_killed:'', 
      missing : '',
      culled : '',
    })
    let resetData= () =>{
        form.current.reset()
        reset('culled','dead_killed','feeds_consumed','flock_name','missing','shed_identification','trays_produced')
        setresetinputNumber(!resetinputNumber)
      }

    let submit = (e) =>{
        e.preventDefault()
        post('/flock/control',{
          onSuccess: ()=>resetData()
        })

    }
    function fetchAllShed(){
      selectApi.getAllShed().then(res=>{
         setSheds(res.data?.sheds)
      })
    }
    function fetchFlockNames(){
      selectApi.getAllflockNames().then(res=>{
        console.log(res.data)
        setFlocknames(res.data?.flocks)
      })
    }

    useEffect(()=>{
      fetchFlockNames()
      fetchAllShed()
    },[])

  return (
    <div className='mt-10'>
      <form ref={form} onSubmit={submit} className='max-w-4xl mx-auto'>
        <div className="flex flex-col gap-5">
        <nav className='flex flex-col gap-3'>
             <div className='flex items-center justify-between relative'>
              <label htmlFor="lastname" className=" font-semibold text-sm">record date</label>
              {errors.record_date && <div className=' mt-2'>
                <nav className="cursor-pointer font-awesome  gap-1  flex items-center absolute right-2 inset-y-0">
                  <FontAwesomeIcon icon="warning" className="text-red-400 h-5 w-5 order-2 " />
                  <span className="  text-sm text-red-400 backdrop-blur-sm bg-white/30 error ">{errors.record_date}</span>
                </nav>
              </div>}
            </div>
            <Datepicker getdateData={(value)=>setData('record_date',value)} />
          </nav>

          <span className="space-y-1 text-sm w-full">
            <div className='flex items-center justify-between relative'>
              <label htmlFor="lastname" className="font-medium">flock name</label>
              {errors.flock_name && <div className=' mt-2'>
                <nav className="cursor-pointer font-awesome  gap-1  flex items-center absolute right-2 inset-y-0">
                  <FontAwesomeIcon icon="warning" className="text-red-400 h-5 w-5 order-2 " />
                  <span className="  text-sm text-red-400 backdrop-blur-sm bg-white/30 error ">{errors.flock_name}</span>
                </nav>
              </div>}
            </div>
            <select onChange={(e) => setData('flock_name', e.target.value)} className=" block relative border border-gray-200 px-5 min-w-[12rem] py-3 focus:border-none outline-none rounded leading-6 w-full ring-offset-1 focus:ring-2 transition-all ease-out duration-150" type="text" placeholder="Enter user first name" >
              <option value='' >select flock name</option>
              {flocknames.map((flock )=><option 
              key={flock.id} value={flock.flock_name}>{flock.flock_name}
              </option>
              )}
              
            </select>
          </span>

          <nav className='flex flex-col md:flex-row md:items-center justify-between gap-5 md:gap-8'>
          <span className="space-y-1 text-sm w-full">
            <div className='flex items-center justify-between relative'>
              <label htmlFor="lastname" className="font-medium">shed</label>
              {errors.shed_identification && <div className=' mt-2'>
                <nav className="cursor-pointer font-awesome  gap-1  flex items-center absolute right-2 inset-y-0">
                  <FontAwesomeIcon icon="warning" className="text-red-400 h-5 w-5 order-2 " />
                  <span className="  text-sm text-red-400 backdrop-blur-sm bg-white/30 error ">{errors.shed_identification}</span>
                </nav>
              </div>}
            </div>
            <select onChange={(e) => setData('shed_identification', e.target.value)} className=" block relative border border-gray-200 px-5 min-w-[12rem] py-3 focus:border-none outline-none rounded leading-6 w-full ring-offset-1 focus:ring-2 transition-all ease-out duration-150" type="text" placeholder="Enter user first name" >
              <option value='' >select shed</option>
              {sheds.map((shed )=><option 
              key={shed.id} value={shed.id}>{shed.shed_identification_name}
              </option>
              )}
              
            </select>
          </span>
          
          <Custominput error={errors.trays_produced} getValue={(value)=>setData('trays_produced',value)} label='trays produced'  reset={resetinputNumber} type='number'/>
          </nav>
          <Custominput error={errors.feeds_consumed} getValue={(value)=>setData('feeds_consumed',value)} label='feeds consumed'  reset={resetinputNumber} type='number' />
            <fieldset className='border py-4 px-2'>
              <legend className='text-sm ml-3 px-1'>Mortality</legend>
              <nav className='flex flex-col md:flex-row  md:items-center gap-5 justify-between md:gap-2'>
                <Custominput error={errors.dead_killed} getValue={(value)=>setData('dead_killed',value)}  reset={resetinputNumber} type='number' label='dead,killed' placeholder='enter dead or killed ' />
                <Custominput error={errors.missing} getValue={(value)=>setData('missing',value)}  reset={resetinputNumber} type='number' label='missing' />
                <Custominput error={errors.culled} getValue={(value)=>setData('culled',value)} reset={resetinputNumber} type='number' label='culled' />
              </nav>
            </fieldset>
           <nav className="self-end">
              <Buttonsubmit text='create' processing={processing}/>
           </nav>
        </div>        
        </form>
    </div>
  )
}
