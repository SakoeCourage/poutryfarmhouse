import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Primarybutton from '../../components/Primarybutton'
import { Inertia } from '@inertiajs/inertia'
import { usePage } from '@inertiajs/inertia-react'
import { motion, AnimatePresence } from 'framer-motion'
import { AccessByPermission } from '../../authorization/AcessControl'


export default function Selectionscreen(props) {

    const { today, auth, submission_today } = usePage().props
 
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
            className=" max-w-3xl mx-auto flex items-center  p-2 w-full min-h-screen">
            <div className=" grid grid-cols-1 gap-6 w-full  md:grid-cols-2  ">

                <div onClick={() => props.showform()} className="relative  w-full aspect-square max-w-xs mx-auto  flex items-center  justify-center bg-white  rounded-xl  shadow-xl bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-indigo-200 via-pink-500 to-indigo-200 cursor-pointer transform transition-transform hover:scale-105">
                    <div className="cursor-pointer text-white flex items-center absolute rounded-full -top-3   py-4 px-4 shadow-xl bg-pink-500 ">
                        <FontAwesomeIcon className='h-4 w-4' icon=" fa-circle-plus" size='sm' />
                    </div>
                    <div className="flex flex-col ">

                        <p className="text-xl font-semibold my-2  text-white  border-2 p-2 rounded-md ">New expense</p>
                        <div className="flex items-center space-x-2 text-white text-sm">

                            <FontAwesomeIcon icon='user' className='h-3 w-4' />
                            <p>{auth.user?.user.name}</p>
                        </div>
                        <Primarybutton onClick={() => props.showform()} text="click to add" className="self-center mt-5 rounded-full bg-pink-500 border-none hover:bg-pink-400 active:bg-pink-700 outline-none " />

                    </div>
                </div>

                <AccessByPermission abilities={['authorize expense']}>
                    <div onClick={() => Inertia.get('/expenses/all')} className="relative  w-full aspect-square max-w-xs mx-auto bg-white  rounded-xl  shadow-xl flex flex-col items-center justify-center bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-indigo-200 via-green-500 to-indigo-200 cursor-pointer transform transition-transform hover:scale-105 ">

                        <div className="cursor-pointer text-white flex items-center absolute rounded-full -top-3   py-4 px-4 shadow-xl bg-green-500 ">

                            <FontAwesomeIcon className='h-4 w-4' icon=" fa-list" size='sm' />
                        </div>
                        <div className=" flex flex-col">
                            <p className="text-xl font-semibold my-2 text-white  border-2 p-2 rounded-md">View Expenses</p>

                            <div className="flex space-x-2 text-white text-sm items-center  ">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <p>{today} today</p>
                            </div>
                            <Primarybutton text="click to open" onClick={() => Inertia.get('/expenses/all')} className="self-center  mt-5 rounded-full bg-green-500 border-none hover:bg-green-400 active:bg-green-700 outline-none " />
                        </div>
                    </div>
                </AccessByPermission>

                <div onClick={() => Inertia.get('/expenses/submissions')} className="relative  w-full aspect-square max-w-xs mx-auto bg-white  rounded-xl  shadow-xl flex flex-col items-center justify-center bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-indigo-200 via-blue-500 to-indigo-200 cursor-pointer transform transition-transform hover:scale-105 ">

                    <div className="cursor-pointer text-white flex items-center absolute rounded-full -top-3   py-4 px-4 shadow-xl bg-blue-500 ">

                        <FontAwesomeIcon className='h-4 w-4' icon=" fa-user-plus" size='sm' />
                    </div>
                    <div className=" flex flex-col">
                        <p className="text-xl font-semibold my-2 text-white  border-2 p-2 rounded-md">My Submission</p>

                        <div className="flex space-x-2 text-white text-sm items-center  ">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <p>{submission_today} today</p>
                        </div>
                        <Primarybutton text="click to open" onClick={() => Inertia.get('/expenses/submissions')} className="self-center  mt-5 rounded-full bg-blue-500 border-none hover:bg-blue-500 active:bg-blue-700 outline-none  " />
                    </div>
                </div>
            </div>

        </motion.div>
    )
}
