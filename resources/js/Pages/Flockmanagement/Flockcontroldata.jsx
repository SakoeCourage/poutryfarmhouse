import React, { useEffect } from 'react'
import { usePage } from '@inertiajs/inertia-react'
import { dateReformat, setsort } from '../../api/Util'
import SimpleBar from 'simplebar-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Simplepagination from '../../components/Simplepagination'
export default function Flockcontroldata() {
    const { controldata } = usePage().props

    useEffect(() => console.log(controldata), [])
    return (
        <div className='w-full h-full'>
            <SimpleBar className="  w-full overflow-x-scroll overflow-y-scroll h-full ">

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
                            <th scope="col" className="py-3 px-6 min-w-[10rem] ">
                               <div className='flex items-center justify-between w-full'>
                                   record date
                                <span className='flex flex-col'>
                                    <FontAwesomeIcon className='cursor-pointer' onClick={() => setsort('recdate_asc')} icon='caret-up' />
                                    <FontAwesomeIcon className='cursor-pointer' onClick={() => setsort('recdate_desc')} icon='caret-down' />
                                </span>
                               </div>
                            </th>
                            <th scope="col" className="py-3 px-6 min-w-[10rem]">
                                flock name
                            </th>
                            <th scope="col" className="py-3 px-6 min-w-[10rem]">
                                shed name
                            </th>
                            <th scope="col" className="py-3 px-6 min-w-[10rem]">
                                trays produced
                            </th>
                            <th scope="col" className="py-3 px-6 min-w-[10rem]">
                                feeds consumed
                            </th>
                            <th scope="col" className="py-3 px-6 min-w-[10rem]">
                                dead killed
                            </th>
                            <th scope="col" className="py-3 px-6 min-w-[10rem]">
                                missing
                            </th>
                            <th scope="col" className="py-3 px-6 min-w-[10rem]">
                                culled
                            </th>
                            <th scope="col" className="py-3 px-6 min-w-[10rem]">
                                Action
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        {controldata.data.map((data, i) => {
                            return (
                                <tr key={i} className={` border-b hover:bg-gray-200 ${i % 2 == 0 ? 'bg-gray-50' : 'white'}`}>

                                    <td scope="col" className="py-3  text-center  ">
                                        <input type="checkbox" name="" id="" />
                                    </td>

                                    <td className="py-2 px-6">
                                        {dateReformat(data.date_created)}
                                    </td>
                                    <td className="py-2 px-6 ">
                                        {dateReformat(data.record_date)}
                                    </td>
                                    <td className="py-2 px-6 ">
                                        {data.flock_name}
                                    </td>
                                    <td className="py-2 px-6 ">
                                        {data.shed}
                                    </td>
                                    <td className="py-2 px-6 ">
                                        {data.trays_produced}
                                    </td>
                                    <td className="py-2 px-6 ">
                                        {data.feeds_consumed}
                                    </td>
                                    <td className="py-2 px-6 ">
                                        {data.dead_killed}
                                    </td>
                                    <td className="py-2 px-6 ">
                                        {data.missing}
                                    </td>
                                    <td className="py-2 px-6 ">
                                        {data.culled}
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
                    from={controldata.from}
                    to={controldata.to}
                    next_page_url={controldata.next_page_url}
                    prev_page_url={controldata.prev_page_url}
                    total={controldata.total}
                    only='controldata'
                />

            </SimpleBar>

        </div>

    )
}
