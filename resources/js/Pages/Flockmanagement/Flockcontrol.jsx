import React,{useRef,useState,useEffect,useMemo} from 'react'
import  Datepicker from '../../components/Datepicker'
import Custominput from '../../components/Custominput'
import Buttonsubmit from '../../components/Buttonsubmit'
import { useForm } from '@inertiajs/inertia-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import selectApi from '../../api/Getselectsitems'
import Controlproducts from './Partials/Controlproducts'
import Controlfeeds from './Partials/Controlfeeds'
import Api from '../../api/Api'
import { Inertia } from '@inertiajs/inertia'

export default function Flockcontrol(props) {
    const form = useRef()
    const [sheds, setSheds] = useState([])
    const [flocknames, setFlocknames] = useState([]);
    const [resetinputNumber,setresetinputNumber]=useState(false)
    const [currentPen,setCurrentPen] = useState('')
    const [errors,setErrors] = useState([])
    const [isLoding,setIsLoading] = useState(false)
    const {data,setData,post,reset,processing} = useForm({
      record_date : '',
      flock_name : '',
      products:'',
      feeds: '', 
      pen_identification:'',
      dead:'', 
      vaccination: '',
      medication: '',
      missing : '',
      culled : '',
      time: ''
    })
    let resetData= () =>{
        props.closeModal()
        form.current.reset()
        reset('culled','dead','feeds_consumed','flock_name','missing','vaccination','medication','pen_identification','eggs_produced')
        setresetinputNumber(!resetinputNumber)
      }

    let submit = (e) =>{
        e.preventDefault()
        post('/flock/control/create',{
          onSuccess: ()=>resetData()
        })

    }
    let submittoApi = (e) =>{
        e.preventDefault()
        setIsLoading(true)
        Api.post('/flock/control/create',data).then(res=>{   
          props.closeModal()
          Inertia.reload({only:['controldata','filters']})
        })
        .catch(err=>{
          setIsLoading(false)
          console.log(err)
          if(err && err.response.status == 422){
            setErrors(err.response.data.errors)
           
          }
        })

    }

    useEffect(() => {
        if(data.flock_name){
          let shed = flocknames.find((item,i)=>item.id == data.flock_name)
            setCurrentPen(shed.shed_id )
        }
    }, [data])
    useEffect(() => {
        setData('pen_identification',currentPen)
    }, [currentPen])

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
    
    useEffect(() => {
     console.log(data)
    }, [data])
    useEffect(() => {
     console.log(errors)
    }, [errors])
    

    useEffect(()=>{
      fetchFlockNames()
      fetchAllShed()
    },[])

  return (
    <div className=''>
      <form ref={form} onSubmit={submittoApi} className='max-w-4xl mx-auto p-5'>
        <div className="flex flex-col gap-5">
          <nav className='flex flex-col md:flex-row md:items-center justify-between gap-5 md:gap-8'>
          <nav className='flex flex-col gap-3 order-2 w-full'>
          <div className='flex items-center justify-between relative'>
              <label htmlFor="lastname" className=" font-semibold text-sm">time of collection </label>
              {errors.time && <div className=' mt-2'>
                <nav className="cursor-pointer font-awesome  gap-1  flex items-center absolute right-2 inset-y-0">
                  <FontAwesomeIcon icon="warning" className="text-red-400 h-5 w-5 order-2 " />
                  <span className="  text-sm text-red-400 backdrop-blur-sm bg-white/30 error ">{errors.time}</span>
                </nav>
              </div>}
            </div>
          <input onChange={(e)=>setData('time',e.target.value)} className='block relative border border-gray-200 px-5 min-w-[12rem] py-2 focus:border-none outline-none rounded leading-6 w-full ring-offset-1 focus:ring-2 transition-all ease-out duration-150' type="time" name="" id="" />
            </nav>  
        <nav className='flex flex-col gap-3 w-full'>
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
          </nav>

         <nav className='flex flex-col md:flex-row md:items-center justify-between gap-5 md:gap-8'>
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
                <select onChange={(e) => setData('flock_name',e.target.value)} className=" block relative border border-gray-200 px-5 min-w-[12rem] py-3 focus:border-none outline-none rounded leading-6 w-full ring-offset-1 focus:ring-2 transition-all ease-out duration-150" type="text" placeholder="Enter user first name" >
                  <option value='' >select flock name</option>
                  {flocknames.map((flock )=><option 
                  key={flock.id} value={flock.id}>{flock.flock_identification_name}
                  </option>
                  )}
                  
                </select>
              </span>

              <nav className='flex flex-col md:flex-row md:items-center justify-between gap-5 md:gap-8 w-full'>
              <span className="space-y-1 text-sm w-full">
                <div className='flex items-center justify-between relative'>
                  <label htmlFor="lastname" className="font-medium">Pen</label>
                  {errors.shed_identification && <div className=' mt-2'>
                    <nav className="cursor-pointer font-awesome  gap-1  flex items-center absolute right-2 inset-y-0">
                      <FontAwesomeIcon icon="warning" className="text-red-400 h-5 w-5 order-2 " />
                      <span className="  text-sm text-red-400 backdrop-blur-sm bg-white/30 error ">{errors.shed_identification}</span>
                    </nav>
                  </div>}
                </div>
                <select value={currentPen} disabled onChange={(e) => setData('pen_identification',e.target.value)}    className=" block relative border border-gray-200 px-5 min-w-[12rem] py-3 focus:border-none outline-none rounded leading-6 w-full ring-offset-1 focus:ring-2 transition-all ease-out duration-150" type="text" placeholder="Enter user first name" >
                  <option value='' >select pen</option>
                  {sheds.map((shed )=><option 
                  key={shed.id} value={shed.id}>{shed.shed_identification_name}
                  </option>
                  )}
                  
                </select>
              </span>
          
              </nav>
         </nav>
          <Controlfeeds errors={errors} getData={(data)=>setData('feeds',data)} />
          <Controlproducts errors={errors} getData={(data)=>setData('products',data)} />
          
          <nav className='flex flex-col md:flex-row md:items-center justify-between gap-5 md:gap-8'>
                <Custominput  label="vaccination" error={errors.vaccination} getValue={(value)=>setData('vaccination',value)}/>
                <Custominput  label="medication" error={errors.medication} getValue={(value)=>setData('medication',value)}/>
          </nav>   
            
            <fieldset className='border py-4 px-2'>
              <legend className='text-sm ml-3 px-1'>Mortality</legend>
              <nav className='flex flex-col md:flex-row  md:items-center gap-5 justify-between md:gap-2'>
                <Custominput error={errors.dead} getValue={(value)=>setData('dead',value)}  reset={resetinputNumber} type='number' label='dead' placeholder='enter dead or killed ' />
                <Custominput error={errors.missing} getValue={(value)=>setData('missing',value)}  reset={resetinputNumber} type='number' label='missing' />
                <Custominput error={errors.culled} getValue={(value)=>setData('culled',value)} reset={resetinputNumber} type='number' label='culled' />
              </nav>
            </fieldset>
        
        </div>        
        </form>
        <div className=' sticky bottom-0 mt-auto rounded-b-lg flex justify-end items-center p-5 bg-gray-100 '>
        <nav className='flex items-center gap-3'>
          <button onClick={() => props.closeModal()} className='px-4 py-1 border-2 text-gray-600 font-semibold rounded-lg'>
            {props.decline ?? 'cancel'}
          </button>
          <Buttonsubmit onClick={submittoApi} processing={isLoding} text="create" className="rounded-lg" />
        </nav>
      </div>
    </div>
  )
}
