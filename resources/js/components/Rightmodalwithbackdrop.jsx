import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SimpleBar from 'simplebar-react';


export default function Rightmodalwithbackdrop(props) {
    let backdrop = useRef(null)
    let closeOnBackdropClick = (e)=>{
      if(e.target === backdrop.current){
            props.onClose()
      }
    }
    
    useEffect(()=>{
      window.addEventListener('click',(e)=>{closeOnBackdropClick(e)},true)   
      return ()=> window.removeEventListener('click',(e)=>{closeOnBackdropClick(e)},true)
    }
      ,[])
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='fixed bg-black/20 backdrop-blur-[1px] isolate z-40 inset-0   '>
      <div className='h-full w-full ' ref={backdrop}>
        <motion.div
          initial={{ opacity: 0, x: '100vw' }}
          animate={{
            opacity: 1, x: 0,
            transition: {
              type: 'spring',
              mass: 0.1,
              damping: 8
            }
          }}
          exit={{ opacity: 0, x: '100vw' }}
         
          className='fixed z-40 top-0 right-0 rounded-tl-xl h-full w-full md:max-w-3xl bg-gray-50 isolate '>
          <div  className=' text-sm p-5 flex items-center gap-3  shadow-sm'>
            <FontAwesomeIcon icon="right-from-bracket" onClick={props.onClose} className='text-gray-800 cursor-pointer' size='sm' />
            <span>{props.title}</span>
          </div>
          <SimpleBar className='h-full pb-20 relative'>
          {props.children}
          </SimpleBar>

        </motion.div>
      </div>
    </motion.div>
  )
}
