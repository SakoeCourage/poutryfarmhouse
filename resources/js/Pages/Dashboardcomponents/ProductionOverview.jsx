import React, { useEffect ,useState,useContext} from 'react'
import { Card, Row } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { usePage } from '@inertiajs/inertia-react'
import { formatnumber } from '../../api/Util'
import { DashboardContext } from './DashboardContext'

function ProductComponent(props) {
  const [productName, setProductName] = useState('')
  const [units, setUnits] = useState('')

  useEffect(()=>{
      for(const[key,value] of Object.entries(props.metadata)){
        setProductName(key)
        setUnits(value.quantity)
      }
  },[props.metadata])
  return <div className='flex flex-col h-[13rem] items-center justify-center  gap-7 relative bg-gray-50 shadow-lg min-w-[12rem] w-full  min-h-[12rem] p-7 rounded-xl'>
    <nav className='absolute -top-[10%] flex items-center justify-center bg-transparent'>
      <FontAwesomeIcon icon="tag" size='xl' className=' h-6 w-6 p-2 shadow-sm rounded-full text-white bg-indigo-900  ' />
    </nav>
    <div className=' font-bold text-slate-800 text-lg  '>{productName} </div>
    <div className=' text-muted '>{props.definintion}</div>
    <div className='  font-bold text-slate-700 '>{formatnumber(units)}
      <span className='text-muted text-xs font-normal block text-center'>units</span>
    </div>
  </div >
}

function ProductionOverview() {
  const {dashboarData} = useContext(DashboardContext)
  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 items-center bg-slate-200/50 rounded-lg shadow-sm min-h-[16rem] p-7'>
      <nav className="p-5  h-[13rem] min-w-[12rem] w-full">
        <nav className='my-auto'>
          <nav className="text-slate-800 font-bold text-lg">Production </nav>
          <nav className='text-muted mt-5 text-xs'>
            Products from flocks today
          </nav>
        </nav>
      </nav>
      <nav className='grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-7 flex-wrap space-y-5 lg:space-y-0 col-span-1 md:col-span-2'>
           {dashboarData?.graded_products &&  Object.entries(dashboarData?.graded_products).map((product,i)=><ProductComponent definintion={product[0]} metadata={product[1]}  key={i} />)}
      </nav>
    </div>
  )
}

export default ProductionOverview