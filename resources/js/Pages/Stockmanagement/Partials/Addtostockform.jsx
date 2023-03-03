import React, { useState, useEffect, useMemo } from 'react'
import Api from '../../../api/Api';
import Custominput from '../../../components/Custominput';
import Buttonsubmit from '../../../components/Buttonsubmit';
export default function Addtostockform(props) {
  const [errors, setErrors] = useState({});
  const [processing, setProcessing] = useState(false)
  const [data, setData] = useState({
    in_crates: props.productDetails?.in_crates,
    crates: null,
    units: null,
    quantity: null,
    description: '',
    productsdefinition_id: props.productDetails?.id
  })
  const [currentRoute, setCurrentRoute] = useState('/stock/productstock/add')
  const handleSubmit = (e) => {
    e.preventDefault()
    if (quantityAfterUpdate >= 0) {
      setProcessing(true)
      Api.post(currentRoute, data).then(res => {
        props.handleOnSucess(props.productDetails.id)
      }).catch((err) => {
        if (err && err.response?.status == 422) {
          setProcessing(false)
          setErrors(err.response.data.errors)
        }
      })
    }
  }
  useEffect(() => {
    let q = (props.productDetails?.units_per_crate * data.crates) + data.units
    setData(cv => cv = { ...cv, quantity: q })
  }, [data.units, data.crates])

  const quantityAfterUpdate = useMemo(() => {
    if (currentRoute == '/stock/productstock/add') {
      return Number(props.productDetails?.quantity) + Number(data.quantity)
    } else {
      return Number(props.productDetails?.quantity) - Number(data.quantity)
    }
  }, [data.quantity, currentRoute])
  useEffect(() => {
    console.log(errors)
  }, [errors])

  useEffect(() => {
    if ((data.units > props.productDetails.units_per_crate) && props.productDetails.in_crates) {
      setErrors(ce => ce = { ...ce, units: ['Current units exceeds units per create and will be converted into crates'] })
    } else {
      setErrors(ce => ce = { ...ce, units: null })
    }
  }, [data.units])

  return (
    <div className='max-w-4xl mx-auto '>
      <div className='flex items-center mb-5 bg-gray-100 sticky top-9 z-30 backdrop-blur-md  '>
        <button
          onClick={() => setCurrentRoute('/stock/productstock/add')}
          className={`w-full p-2 rounded-md text-sm md:text-base  ${currentRoute == '/stock/productstock/add' && 'bg-indigo-400 text-white'}`}><span>Increase Stock Quantity</span></button>
        <button
          onClick={() => setCurrentRoute('/stock/productstock/remove')}
          className={`w-full p-2 rounded-md text-sm md:text-base ${currentRoute == '/stock/productstock/remove' && 'bg-red-300 text-white'}`} ><span>Decrease Stock Quantity </span></button>
      </div>
      <form className='flex flex-col gap-10    relative  '>
        <div className='p-5 w-full '>
          <nav className='flex flex-col  gap-5 md:gap-8'>
            {props.productDetails.in_crates &&
              <Custominput type="number" required error={errors.crates && errors.crates[0]} getValue={(value) => setData(cv => cv = { ...cv, crates: value })} label='crates' />}
            <Custominput type="number" required error={errors.units && errors.units[0]} getValue={(value) => setData(cv => cv = { ...cv, units: value })} label='units' />
            <Custominput error={errors.description && errors.description[0]} getValue={(value) => setData(cv => cv = { ...cv, 'description': value })} label='description' />
          </nav>
          <nav className='flex items-center justify-end mt-5  '>
            {props.productDetails?.in_crates ? <span className={`flex items-center w-max gap-2 p-2 rounded-md ${(quantityAfterUpdate < 0) ? 'text-red-500 bg-red-100' : 'bg-indigo-50 text-indigo-500 '}`}><span className='text-sm'>quantity after update:</span>
              {quantityAfterUpdate < 0 ? <div>0</div> :
                <span className='font-semibold text-xl'>{Math.floor(quantityAfterUpdate / (props.productDetails?.units_per_crate ?? 1))} <span className="text-xs mx-1">crates</span> &nbsp; {quantityAfterUpdate % (props.productDetails?.units_per_crate ?? 1)} <span className="text-xs mx-1">units</span> </span>}
            </span> : <span className={`flex items-center w-max gap-2 p-2 rounded-md ${(quantityAfterUpdate < 0) ? 'text-red-500 bg-red-100' : 'bg-indigo-50 text-indigo-500 '}`}><span className='text-sm'>quantity after update:</span>
                  <span className='font-semibold text-xl'>{new Intl.NumberFormat().format(quantityAfterUpdate)}</span>
                </span>}
          </nav>
        </div>
        <div className='mt-auto sticky bottom-0 rounded-b-lg flex justify-end items-center p-5 bg-gray-100 '>
          <nav className='flex items-center gap-3'>
            <button onClick={(e) => { e.preventDefault(); props.closeModal() }} className='px-4 py-1 border-2 text-gray-600 font-semibold rounded-lg'>
              cancel
            </button>
            <Buttonsubmit processing={processing} onClick={(e) => handleSubmit(e)} text="update" className="rounded-lg" />
          </nav>
        </div>
      </form>
    </div>
  )
}
