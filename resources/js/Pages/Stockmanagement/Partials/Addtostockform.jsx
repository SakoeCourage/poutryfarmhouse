import React,{useState,useEffect,useMemo} from 'react'
import Api from '../../../api/Api';
import Custominput from '../../../components/Custominput';
import Buttonsubmit from '../../../components/Buttonsubmit';
export default function Addtostockform(props) {
    const [errors,setErrors] = useState({});
    const [processing,setProcessing] = useState(false)
    const [data,setData] = useState({
      'quantity':null,
      'description': '',
      'productsdefinition_id':props.productDetails?.id
    })     
    const [currentRoute,setCurrentRoute] = useState('/stock/productstock/add')
    const handleSubmit= (e) =>{
      e.preventDefault()
        if(quantityAfterUpdate >= 0){
          setProcessing(true)
          Api.post(currentRoute,data).then(res=>{
            // console.log(res.data)
            props.handleOnSucess(props.productDetails.id)
          }).catch((err)=>{
              if(err && err.response?.status == 422){
                setProcessing(false)
                setErrors(err.response.data.errors)
              }
          })
        }
    } 

    const quantityAfterUpdate = useMemo(() =>{
      if(currentRoute == '/stock/productstock/add'){
        return  Number(props.productDetails?.quantity) + Number(data.quantity) 
      }else{
        return Number(props.productDetails?.quantity) - Number(data.quantity) 
      }
    } , [data.quantity,currentRoute])
    useEffect(() => {
      console.log(data)
    }, [data])
    
  return (
      <div className='max-w-4xl mx-auto '>
        <div className='flex items-center mb-5 bg-gray-100 sticky top-0 mx-5 md:mx-10 '>
          <button
          onClick={()=>setCurrentRoute('/stock/productstock/add')}
          className={`w-full p-2 rounded-md text-sm md:text-base  ${currentRoute =='/stock/productstock/add' && 'bg-indigo-400 text-white' }`}><span>Increase Stock Quantity</span></button>
          <button 
          onClick={()=>setCurrentRoute('/stock/productstock/remove')}
          className={`w-full p-2 rounded-md text-sm md:text-base ${currentRoute =='/stock/productstock/remove' && 'bg-red-300 text-white' }`} ><span>Decrease Stock Quantity </span></button>
      </div>
     
    <form  className='flex flex-col gap-10    relative  '>
    <div className='p-5 w-full '>
      <nav className='flex flex-col  gap-5 md:gap-8'>
        <Custominput type="number" required error={errors.quantity && errors.quantity[0]} getValue={(value) => setData(cv=>cv={...cv,'quantity':value})} label='quantity' />
        <Custominput  error={errors.description && errors.description[0]}  getValue={(value) => setData(cv=>cv={...cv,'description':value})} label='description' />
      </nav>
      <nav className='flex items-center justify-end mt-5  '>
            <span className={`flex items-center w-max gap-2 p-2 rounded-md ${(quantityAfterUpdate < 0) ? 'text-red-500 bg-red-100':'bg-indigo-50 text-indigo-500 '}`}><span className='text-sm'>quantity after update:</span>
            <span className='font-semibold text-xl'>{new Intl.NumberFormat().format(quantityAfterUpdate)}</span>
            </span>
      </nav>
    </div>
    <div className='mt-auto sticky bottom-0 rounded-b-lg flex justify-end items-center p-5 bg-gray-100 '>
      <nav className='flex items-center gap-3'>
        <button onClick={(e) =>{ e.preventDefault(); props.closeModal()}} className='px-4 py-1 border-2 text-gray-600 font-semibold rounded-lg'>
          cancel
        </button>
        <Buttonsubmit processing={processing} onClick={(e)=>handleSubmit(e)}  text="update" className="rounded-lg" />
      </nav>
    </div>
  </form>
  </div>
  )
}
