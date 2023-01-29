
// import './App.css'
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import React,{ useEffect,useRef } from 'react'
import { usePage } from '@inertiajs/inertia-react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Toastnotification from '../components/toastnotification';
import { AnimatePresence } from 'framer-motion';

export default function Layout({ children }) {
    const { auth } = usePage().props
    
    const sideBarRef=useRef(null)
    useEffect(() => {
        console.log(auth)
    }, [auth])

    let toggleSidebar = () =>{
        // client width
        let c_w = sideBarRef.current.getBoundingClientRect().width
        if(c_w === 0){
            sideBarRef.current.style.minWidth  = "290px"
        }else{
            sideBarRef.current.style.minWidth = "0"
        }
       
    }

    return (
        <main className="w-screen h-screen flex overflow-hidden">
                <AnimatePresence>
                <Toastnotification />
                </AnimatePresence>
            <span className='min-w-0 md:min-w-[290px] transition-[min-width] duration-300 ease-in-out  ' ref={sideBarRef} >
                <Sidebar />
            </span>
            <span className='bg-white grow h-full overflow-x-hidden flex flex-col' id='documentPage'>
                <Header toggleSidebar={toggleSidebar}/>
                <nav className='w-full h-full    relative   mx-auto overflow-x-hidden px-5 md:px-2 grow pb-5  bg-gray-50/50' id='outlet'>
                    {children}
                </nav>
            </span>

        </main>
    )
}

