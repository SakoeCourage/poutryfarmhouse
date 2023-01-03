import React,{useRef,useState,useEffect} from 'react'
import Datepicker from '../../components/Datepicker'
import Custominput from '../../components/Custominput'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useForm } from '@inertiajs/inertia-react'
import { Inertia } from '@inertiajs/inertia'
import Buttonsubmit from '../../components/Buttonsubmit'
import selectApi from '../../api/Getselectsitems'
import Api from '../../api/Api'
import Loadingspinner from '../../components/Loadingspinner'
import Buttondelete from '../../components/Buttondelete'
import Dialoge from '../../components/Dialoge'

export default function Editflockcontrol(props) {
    const form = useRef()
    const [sheds, setSheds] = useState([])
    const [toggledelete, setToggledelete] = useState(false)
    const [flocknames, setFlocknames] = useState([]);
    const [resetinputNumber,setresetinputNumber]=useState(true)
    const [isLoading, setIsLoading] = useState(true)
    const {data,setData,put,reset,processing,errors} = useForm({    })
    const [controlData, setControlData] =useState({
    })
  
    

    let submit = (e) =>{
        e.preventDefault()
        console.log(data)
        put(`/flock/edit/${props.id}/flockcontrol`)

    }
    function allData(){    
        Api.get(`/flockcontrol/getdata/${props.id}`).then(res=>{
            console.log(res.data)
            setControlData({...res.data})
           
        }).then(()=> selectApi.getAllShed().then(res=>{
            setSheds(res.data?.sheds)
           
         })).then(()=>selectApi.getAllflockNames().then(res=>{
            setFlocknames(res.data?.flocks)
          })).catch(err=>console.log(err)).finally(()=>{
            setIsLoading(false)
          })
    }

    function sendDeleterequest(e){
        e.preventDefault()
        Inertia.delete(`/flock/delete/${props.id}/flockcontrol`,{
            onSuccess: ()=>{props.closeModal()}
        })
    }

    useEffect(()=>{
        allData()   
    },[])

    useEffect(()=>{setData(controlData);console.log(controlData)},[controlData])

  return (
    <div className=' w-full mx-auto px-10 relative isolate'>
          {isLoading && <div className=' h-full w-full absolute inset-0 z-20 bg-gray-200/50 flex items-center justify-center'>
                <Loadingspinner />
        </div>}
      <main ref={form} onSubmit={submit} className='z-10'>
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
            <Datepicker value={controlData.record_date} getdateData={(value)=>setControlData({...controlData,record_date:value})} />
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
             <select value={controlData.flock_name} onChange={(e) => setControlData({...controlData,flock_name: e.target.value})} className=" block relative border border-gray-200 px-5 min-w-[12rem] py-3 focus:border-none outline-none rounded leading-6 w-full ring-offset-1 focus:ring-2 transition-all ease-out duration-150" type="text" placeholder="Enter user first name" >
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
              {errors.shed_id && <div className=' mt-2'>
                <nav className="cursor-pointer font-awesome  gap-1  flex items-center absolute right-2 inset-y-0">
                  <FontAwesomeIcon icon="warning" className="text-red-400 h-5 w-5 order-2 " />
                  <span className="  text-sm text-red-400 backdrop-blur-sm bg-white/30 error ">{errors.shed_id}</span>
                </nav>
              </div>}
            </div>
             <select value={controlData.shed_id} onChange={(e) => setControlData({...controlData,shed_id:e.target.value})} className=" block relative border border-gray-200 px-5 min-w-[12rem] py-3 focus:border-none outline-none rounded leading-6 w-full ring-offset-1 focus:ring-2 transition-all ease-out duration-150" type="text" placeholder="Enter user first name" >
              {sheds.map((shed )=><option 
              key={shed.id} value={shed.id}>{shed.shed_identification_name}
              </option>
              )}
              
            </select>
          </span>
          
          <Custominput  number={controlData.trays_produced} error={errors.trays_produced} getValue={(value)=>setControlData({...controlData,trays_produced:value})} label='trays produced'  reset={resetinputNumber} type='number'/>
          </nav>
          <Custominput  number={controlData.feeds_consumed} error={errors.feeds_consumed} getValue={(value)=>setControlData({...controlData,feeds_consumed:value})} label='feeds consumed'  reset={resetinputNumber} type='number' />
            <fieldset className='border py-4 px-2'>
              <legend className='text-sm ml-3 px-1'>Mortality</legend>
              <nav className='flex flex-col md:flex-row  md:items-center gap-5 justify-between md:gap-2'>
                <Custominput  number={controlData.dead_killed} error={errors.dead_killed} getValue={(value)=>setControlData({...controlData,dead_killed:value})}  reset={resetinputNumber} type='number' label='dead,killed' placeholder='enter dead or killed ' />
                <Custominput  number={controlData.missing} error={errors.missing} getValue={(value)=>setControlData({...controlData,missing:value})}  reset={resetinputNumber} type='number' label='missing' />
                <Custominput  number={controlData.culled} error={errors.culled} getValue={(value)=>setControlData({...controlData,culled:value})} reset={resetinputNumber} type='number' label='culled' />
              </nav>
            </fieldset>
           <nav className="self-end flex gap-2 items-center relative">
           {toggledelete && <Dialoge onDecline={()=>setToggledelete(false)} onConfirm={(e)=>sendDeleterequest(e)}>
                            <div className='py-5 flex flex-col justify-center'>
                                <FontAwesomeIcon className='text-red-500' size='xl' icon='warning' />
                                <nav>  Record will be permanently deleted </nav>
                                <nav className='text-xs text-gray-400 w-full text-center'> this action is irreversable </nav>
                            </div>
            </Dialoge >}
              <Buttonsubmit text='update' onClick={submit} processing={processing}/>
              <Buttondelete onClick={()=>setToggledelete(true)} text='delete data'/>
           </nav>
        </div>        
        </main>
    </div>
  )
}
