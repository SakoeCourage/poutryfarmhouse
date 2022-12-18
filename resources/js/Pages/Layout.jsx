
// import './App.css'
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import React from 'react'
import { usePage } from '@inertiajs/inertia-react'
import { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Layout({ children }) {
    const { auth, flash } = usePage().props
    
    
    useEffect(() => {
        console.log(auth?.user)
    }, [auth])


    useEffect(() => {
        if(flash.message?.type == 'sucess'){
            toast.success(flash.message?.text, {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        }else{
            toast.warn(flash.message?.text, {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        }
       
    }, [flash])

    return (
        <main className="w-screen h-screen flex overflow-hidden">
            <ToastContainer />
            <span className='w-0 md:w-[320px]   '>
                <Sidebar />
            </span>
            <span className=' grow h-full overflow-x-hidden flex flex-col' id='documentPage'>
                <nav className='sticky top-0 shadow-sm z-20  bg-white basis-16 '><Header /></nav>
                <nav className='w-full h-full bg-white   relative   mx-auto overflow-x-hidden px-5 md:px-2 grow pb-5' id='outlet'>
                    {children}
                </nav>
            </span>

        </main>
    )
}

