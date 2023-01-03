import React, { useEffect, useState } from 'react'
import SimpleBar from 'simplebar-react'
import Simplepagination from '../../components/Simplepagination'
import { usePage } from '@inertiajs/inertia-react'
import { dateReformat, setsort, removeURLParameter } from '../../api/Util'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Inertia } from '@inertiajs/inertia'
import Customsearchinput from '../../components/customsearchinput'
import { useDebounce } from '@react-hook/debounce'
import Rightmodalwithbackdrop from '../../components/Rightmodalwithbackdrop'
import { AnimatePresence } from 'framer-motion'
import Edituser from './Edituser'


function SearchBar(props) {
    const [searchKey, setsearchKey] = useState(null)
    const [processing, setProcessing] = useState(false)
    const [sendSearchRequest, setsendSearchRequest] = useDebounce(false, 300)
    const { filters } = usePage().props
    const sendRequest = () => {
        let CurrentRoute = () => location.href.toString()
        let newRouteUrlwithoutpages = removeURLParameter('page', CurrentRoute())
        Inertia.get(newRouteUrlwithoutpages, { search: searchKey }, {
            preserveState: true,
            replace: true,
            onFinish: () => { setProcessing(false) }
        })
    }
    const handlesearchrequest = (searchKey) => {
        setProcessing(true)
        setsearchKey(searchKey)
        setsendSearchRequest(!sendSearchRequest)
    }
    useEffect(() => {
        if(searchKey !== null){
            sendRequest()
        }
    }, [sendSearchRequest])

    return (
        <Customsearchinput processing={processing} value={filters.search ?? ''} getValue={(value) => { handlesearchrequest(value) }} placeholder="enter search item here" />
    )
}


export default function Allusers() {
    let { users } = usePage().props
    const [currentUser, setCurrentUser] = useState(  {
         currentUserId : null,
         currentUsername: null,
    }  )
    return (
        <div className='w-full h-full z-50'>
             <AnimatePresence>
             {currentUser.currentUserId &&
            <Rightmodalwithbackdrop onClose={()=>setCurrentUser(cu=>cu={currentUsername: null, currentUserId:null})} title={`${currentUser.currentUsername}`}>
                    <Edituser id={currentUser.currentUserId} closeModal={()=>setCurrentUser(cu=>cu={currentUsername: null, currentUserId:null})} />
            </Rightmodalwithbackdrop>
             }
             </AnimatePresence>
            <SimpleBar className="  w-full  h-full relative">
                <nav className=' py-2'>
                    <div className='w-full md:w-[25rem] px-4'>
                        <SearchBar />
                    </div>
                </nav>
                <table className="px-5 w-full text-sm text-left text-gray-500 relative">
                    <thead className="text-xs text-gray-700 bg-blue-50 sticky top-0 shadow-sm ">
                        <tr className=''>
                            <th scope="col" className="py-3  text-center  px-2 ">
                                <input type="checkbox" name="" id="" />
                            </th>
                            <th scope="col" className="py-3 px-6 min-w-[10rem] flex items-center justify-between">
                                date created
                                <span className='flex flex-col'>
                                    <FontAwesomeIcon className='cursor-pointer' onClick={() => setsort('created_asc')} icon='caret-up' />
                                    <FontAwesomeIcon className='cursor-pointer' onClick={() => setsort('created_desc')} icon='caret-down' />
                                </span>
                            </th>
                            <th scope="col" className="py-3 px-6 min-w-[10rem]">
                                user name
                            </th>
                            <th scope="col" className="py-3 px-6 min-w-[10rem]">
                                email
                            </th>
                            <th scope="col" className="py-3 px-6 min-w-[10rem]">
                                role
                            </th>
                            <th scope="col" className="py-3 px-6 min-w-[10rem]">
                                Action
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        {users.data.map((user, i) => {
                            return (
                                <tr key={i} className={` border-b hover:bg-gray-200 ${i % 2 == 0 ? 'bg-gray-50' : 'white'}`}>
                                    <td scope="col" className="py-3  text-center  ">
                                        <input type="checkbox" name="" id="" />
                                    </td>
                                    <td className="py-2 px-6">
                                        {dateReformat(user.date_created)}
                                    </td>
                                    <td className="py-2 px-6 ">
                                        {user.name}
                                    </td>
                                    <td className="py-2 px-6 ">
                                        {user.email}
                                    </td>
                                    <td className="py-2 px-6 ">
                                        {user.role[0] ?? ' notset'}

                                    </td>
                                    <td className="py-2 px-6 ">
                                        <nav className='text-blue-500 flex items-center gap-2'>
                                            <button onClick={()=>setCurrentUser(cu=>cu={currentUsername: user.name, currentUserId:user.id})}>Edit</button>
                                            <FontAwesomeIcon icon='arrow-right' className='text-blue-500' size='sm' />
                                        </nav>
                                    </td>
                                </tr>

                            )
                        })}

                    </tbody>
                </table>
                <Simplepagination
                    from={users.from}
                    to={users.to}
                    next_page_url={users.next_page_url}
                    prev_page_url={users.prev_page_url}
                    total={users.total}
                    only='users'
                />

            </SimpleBar>

        </div>

    )
}
