import React, { forwardRef, useState, useEffect, useMemo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NumericFormat } from 'react-number-format';


const TextField = ((props) => {
  const [value, setValue] = useState('')
  let handleonchange = (onchangeValue) => {
    setValue(onchangeValue)
    props.getValue(onchangeValue)
  }
  useEffect(() => {
    handleonchange(props.value ?? '')
  }
    , [props.value])

  useEffect(
    () => handleonchange('')
    , [props.reset])
  return (
    <div className={`w-full space-y-1 ${props.disabled && 'pointer-events-none opacity-50'}`}>
      {props.label && <nav>   <label htmlFor="lastname" className="font-medium text-sm capitalize ">{props.label ?? 'label'}</label> {props.required && <abbr className='text-red-300' title='this field is requred'>*</abbr>}
      </nav>
      }
      <nav className={`block relative border border-gray-200 focus-within:border-none rounded leading-6 w-full ring-offset-1 focus-within:ring-2 transition-all ease-out duration-150 ${props.readOnly && 'focus-within:none border-none ring-0 ring-offset-0 outline-none'}`} >
        <input value={props.value ?? value} type={props.type === 'number' ? 'text' : props.type} onChange={(e) => handleonchange(e.target.value)} readOnly={props.readOnly} min='0' className={`px-5 py-3 text-sm  w-full border-none focus:border-none focus:outline-none `} placeholder={props.placeholder ?? `enter ${props.label ?? ''}`} />
        {props.error && <nav className="cursor-pointer  gap-1 font-awesome flex items-center absolute right-2 inset-y-0">
          <FontAwesomeIcon icon="warning" className="text-red-400 h-5 w-5 order-2 " />
          <span className="  text-sm text-red-400 backdrop-blur-sm bg-white/30 error ">{props.error}</span>
        </nav>}
      </nav>
    </div>
  )
})

const Custominput = ((props) => {
  const [value, setValue] = useState('')
  let handleChangeinValues = (cvalue) => {
    setValue(cvalue)
    if (cvalue.length === 0) {
      props.getValue(cvalue)
    } else {
      props.getValue(Number(cvalue.replaceAll(',', '')))
    }
  }
  useEffect(() => {
    handleChangeinValues('')
  }, [props.reset])

  useEffect(
    () => {
      try {
        if (props.number!==null && typeof(props.number) !== 'undefined' ) {
          setValue(props.number)
          props.getValue(Number(value.replaceAll(',', '')))
        }
      } catch (error) {
        console.log(error)
      }

    }
    , [props.number])
  return (
    <div className='w-full'>
      {props.type === "number" ?
        <NumericFormat thousandSeparator="," value={value} customInput={TextField} {...props} getValue={handleChangeinValues} />
        : <TextField {...props} />
      }
    </div>
  )
})





export default Custominput;




