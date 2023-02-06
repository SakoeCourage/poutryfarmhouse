import React,{useRef,useEffect} from 'react'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SimpleBar from 'simplebar-react'

export default function Slideover(props) {
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
         
            className="fixed z-40 rounded-md   md:top-[2%] md:right-[2%] md:bottom-0  h-screen  md:max-w-2xl bg-gray-50 isolate  shadow-lg  w-full "
          >
          <div  className=' text-lg  p-5 flex items-center gap-3 justify-between  shadow-sm'>
            <span className='font-semibold'>{props.title}</span>
            <FontAwesomeIcon icon="times" size="lg" onClick={props.onClose} className='text-gray-800 cursor-pointer'  />
          </div>
          <SimpleBar className='relative h-full min-h-max w-full flex-items-center justify-center '>
            {props.children}
          </SimpleBar>

        </motion.div>
      </div>
    </motion.div>
  )
}
