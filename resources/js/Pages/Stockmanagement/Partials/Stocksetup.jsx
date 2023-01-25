import React,{useState} from 'react'
import Primarybutton from '../../../components/Primarybutton'
import Custominput from '../../../components/Custominput'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Api from '../../../api/Api'

export default function Stocksetup(props) {
    const [amount,setAmount] = useState('')
    const [errors,setErrors] = useState([])
    const [processing,setProcessing] = useState(false)
    function sendData(){
        setProcessing(true)
        Api.post('/stock/create/new',{'amount': amount})
        .then(res=>{
            props.handleAfterSucess()
        }).catch(err=>{
            if(err.response.status == 422){
                setErrors(err.response.data.errors)
                setProcessing(false)
            }
        })
    } 
    return (
        <div className='min-h-[20rem] flex flex-col '>
            <nav className='text-indigo-600 text-sm flex items-center gap-1 mb-4 p-5 font-bold  bg-indigo-50'>
                <FontAwesomeIcon size='xl' className='p-2 rounded-full border border-indigo-600' icon='money-check-dollar' />
                <span> Define an opening stock to continue</span>
            </nav>
            <nav className='my-auto p-5'>
            <Custominput error={errors.amount} type="number" placeholder="Enter opening stock" getValue={(value)=>setAmount(value)}/>
            </nav>
            <nav className=' flex items-center justify-end mt-auto p-2 '>
                <Primarybutton onClick={sendData} text="continue" className={`text-sm rounded-full ${processing && 'pointer-events-none'}`} icon="paper-plane"/>
            </nav>
        </div>
    )
}
