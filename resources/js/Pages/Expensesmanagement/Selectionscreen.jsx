import React,{useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Primarybutton from '../../components/Primarybutton'
import { Inertia } from '@inertiajs/inertia'
import { usePage } from '@inertiajs/inertia-react'
import { motion,AnimatePresence } from 'framer-motion'

export default function Selectionscreen(props) {
      
    const {today,auth,submission_today} = usePage().props
    useEffect(() => {
        console.log(submission_today)
    }, [submission_today]) 
  return (
    
    <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 1, scale: 1,
            transition: {
              type: 'spring',
              mass: 0.9,
              damping: 8
            }
          }}
          exit={{ opacity: 0, scale: 0.8 }}
    className="flex items-center px-auto w-full min-h-full">

    <div className="flex items-center justify-center  w-full ">
        <div className=" grid grid-cols-1 gap-6  md:grid-cols-2  ">

            <div className="relative min-h-[13rem]  flex  justify-center bg-white  rounded-xl w-52 shadow-xl">
                <div className="cursor-pointer text-white flex items-center absolute rounded-full -top-3 opacity-70  py-4 px-4 shadow-xl bg-pink-500 ">

                    <FontAwesomeIcon className='h-4 w-4' icon=" fa-circle-plus" size='sm' />
                </div>
                <div className="flex flex-col mt-14">

                    <p className="text-xl font-semibold my-2  text-gray-900 ">New expense</p>
                    <div className="flex items-center space-x-2 text-gray-400 text-sm">

                        <FontAwesomeIcon icon='user' className='h-3 w-4' />
                        <p>{auth.user?.user.name}</p>
                    </div>
                    <Primarybutton onClick={()=>props.showform()} text="add" className="self-center mt-5 rounded-full bg-pink-500 border-none hover:bg-pink-500 active:bg-pink-700 outline-none " />

                </div>
            </div>


            <div className="relative min-h-[13rem] bg-white  rounded-xl w-52 shadow-xl flex flex-col items-center ">
            
                <div className="cursor-pointer text-white flex items-center absolute rounded-full -top-3 opacity-70  py-4 px-4 shadow-xl bg-green-500 ">

                    <FontAwesomeIcon className='h-4 w-4' icon=" fa-list" size='sm' />
                </div>
                <div className="mt-14 flex flex-col">
                    <p className="text-xl font-semibold my-2">View Expenses</p>
                  
                    <div className="flex space-x-2 text-gray-400 text-sm items-center  ">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p>{today} today</p>
                    </div>
                    <Primarybutton text="open" onClick={()=>Inertia.get('/expenses/all')} className="self-center  mt-5 rounded-full bg-green-500 border-none hover:bg-green-500 active:bg-green-700 outline-none " />             
                </div>
            </div>

            <div className="relative min-h-[13rem] bg-white  rounded-xl w-52 shadow-xl flex flex-col items-center ">
            
                <div className="cursor-pointer text-white flex items-center absolute rounded-full -top-3 opacity-70  py-4 px-4 shadow-xl bg-blue-500 ">

                    <FontAwesomeIcon className='h-4 w-4' icon=" fa-user-plus" size='sm' />
                </div>
                <div className="mt-14 flex flex-col">
                    <p className="text-xl font-semibold my-2">My Submission</p>
                  
                    <div className="flex space-x-2 text-gray-400 text-sm items-center  ">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p>{submission_today} today</p>
                    </div>
                    <Primarybutton text="open" onClick={()=>Inertia.get('/expenses/all')} className="self-center  mt-5 rounded-full bg-blue-500 border-none hover:bg-blue-500 active:bg-blue-700 outline-none " />             
                </div>
            </div>


        </div>
    </div>
</motion.div>
  )
}
