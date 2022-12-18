import React, { useEffect, useState } from 'react'
import SimpleBar from 'simplebar-react'
import Simplepagination from '../../components/Simplepagination'
import { usePage } from '@inertiajs/inertia-react'
import { dateReformat, setsort, removeURLParameter } from '../../api/Util'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Inertia } from '@inertiajs/inertia'
import Customsearchinput from '../../components/customsearchinput'
import { useDebounce } from '@react-hook/debounce'


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
    return (
        <div className='w-full h-full'>
            <SimpleBar className="  w-full overflow-x-scroll overflow-y-scroll h-full relative">
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
                                profile
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
                                        <button className='border-2 border-gray-300 p-2 px-4 rounded-full text-xs'>
                                            <span>view </span>
                                        </button>
                                    </td>
                                    <td className="py-2 px-6 ">
                                        <nav className='text-blue-500 flex items-center gap-2'>
                                            <span >Edit</span>
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
