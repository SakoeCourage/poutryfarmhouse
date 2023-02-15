import React, { useState, useEffect } from 'react'
import profilepic from '../../../public/images/profilepic.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AccessByRole } from '../authorization/AcessControl'
import { usePage } from '@inertiajs/inertia-react'
import { Link } from '@inertiajs/inertia-react'
import { motion, AnimatePresence } from "framer-motion"
import Notification from './Notification'
import Api from '../api/Api'
import { formatMaximumValue } from '../Pages/Dashboardcomponents/StatsOverview'
import Rightmodalwithbackdrop from './Rightmodalwithbackdrop'
import Editprofile from './Editprofile'



function Accountmenu() {
    const { auth } = usePage().props
    const { user } = auth
    return <div
        className="mt-2 absolute min-w-[100vw] h-screen inset-x-0 custom_box_shadow  md:h-auto md:min-w-[18rem] md:left-auto  md:right-16 md:rounded-md">
        <div className="bg-white md:rounded-md overflow-hidden shadow-lg">
            <div className="text-center p-6  border-b">
                <div className="h-24 w-24 mx-auto rounded-full text-3xl grid place-items-center text-indigo-400 bg-indigo-100  uppercase">
                    {user.roles[0].charAt(0)}
                </div>
                <p className="pt-2 text-lg font-semibold">{user.user?.name ?? "Username"}</p>
                <p className="text-sm text-gray-600">{user.user?.email ?? "user email"}</p>
            </div>
            <div className="border-b">
                <AccessByRole requiredRoles={['Super Admin']}>
                    <Link href="/user/create" className="px-4 py-2 hover:bg-gray-100 flex">
                        <div className="text-gray-800">
                            <svg
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1"
                                viewBox="0 0 24 24"
                                className="w-5 h-5"
                            >
                                <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <div className="pl-3">
                            <p className="text-sm font-medium text-gray-800 leading-none">User management</p>
                            <p className="text-xs text-gray-500">Add/remove users</p>
                        </div>
                    </Link>
                </AccessByRole>
                <a href="#" className="px-4 py-2 hover:bg-gray-100 flex">
                    <div className="text-gray-800">
                        <svg
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1"
                            viewBox="0 0 24 24"
                            className="w-5 h-5"
                        >
                            <path d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div className="pl-3">
                        <p className="text-sm font-medium text-gray-800 leading-none">Personal settings</p>
                        <p className="text-xs text-gray-500">Email, profile,password</p>
                    </div>
                </a>

            </div>

            <div className="">
                <Link href="/logout" method='post' as='button' className="px-4 py-2 w-full pb-4 hover:bg-gray-100 flex gap-4 items-center justify between ">
                    <FontAwesomeIcon className='text-gray-500' icon="right-from-bracket" /><p className="text-sm font-medium text-gray-800 leading-none">Logout</p>
                </Link>
            </div>
        </div>
    </div>
}

export default function Header(props) {
    const [isDropped, setisDropped] = useState(false)
    const [showNotifications, setShowNotifications] = useState(false)
    const { auth } = usePage().props
    const { user } = auth
    const [unreadCount, setUnreadCount] = useState(0);
    useEffect(() => {
        Api.get('/notifications/uread/count').then(res => {
            setUnreadCount(res.data)
        }).catch(err => console.log(err.response.data))
    }, [])

    useEffect(() => {
        setUnreadCount(user.notifications);
    }, [user.notifications])

    useEffect(() => {
        setisDropped(false);
        setShowNotifications(false);
    }, [window.location.href])

    return (
        <div className=' h-14 z-40 sticky top-0 shadow-sm  basis-16 ' id='header'>
            {/* <Rightmodalwithbackdrop title="Edit Profile">
                <Editprofile/>
            </Rightmodalwithbackdrop> */}
            <div className='flex justify-between items-center  px-10 py-2'>
                <FontAwesomeIcon className='text-[#0E121F]/90 cursor-pointer' onClick={props.toggleSidebar} icon="bars" />
                <nav className=' flex items-center gap-3'>
                    <span className=' order-2 flex flex-col'>
                        <span>{user.user?.name ?? "Username"}</span>
                        <span className='text-xs text-gray-400'>{user.roles[0] ?? 'role'}</span>
                    </span>
                    <button onClick={() => setShowNotifications(!showNotifications)} className={`relative mr-3 ${(Boolean(unreadCount) || showNotifications) ? 'text-gray-500' : 'text-gray-300'}`}>
                        <FontAwesomeIcon icon='bell' size='xl' />
                        {Boolean(unreadCount) && <span className="flex items-center justify-center absolute -top-[40%] -right-[50%] bg-red-500 text-white p-1 h-5 w-5 rounded-full text-xs ring-1 ring-offset-1 ring-white">
                            {formatMaximumValue(unreadCount)}
                        </span>}
                    </button>
                    <div className="h-8 w-8 rounded-full text-xl grid place-items-center text-indigo-400 bg-indigo-100 uppercase">
                        {user.roles[0].charAt(0)}
                    </div>
                    <FontAwesomeIcon onClick={() => setisDropped(!isDropped)} className='order-3 cursor-pointer  bg-gray-700 text-white h-2 w-2 p-1 rounded-full' icon='angle-down' />
                </nav>
            </div>
            {isDropped && <Accountmenu />}
            {showNotifications && <Notification onClose={() => setShowNotifications(false)} setUnreadCount={(value) => setUnreadCount(value)} />}
        </div>
    )
}


