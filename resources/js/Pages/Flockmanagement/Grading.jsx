import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { usePage } from '@inertiajs/inertia-react'
import { diffForHumans, setsort, setfilter } from '../../api/Util'
import SimpleBar from 'simplebar-react'
import Simplepagination from '../../components/Simplepagination'
import Slideover from '../../components/Slideover'
import Gradeaction from './Partials/Gradeaction'
import { Inertia } from '@inertiajs/inertia'
export default function Grading() {
    const [flockControlId, setFlockControlId] = useState(null)
    const { records, graded, ungraded, all, filter } = usePage().props
    useEffect(() => {
        console.log(records)
    }, [])

    const handleOnsucess = () =>{
        setFlockControlId(null)
       Inertia.reload({ only: ['records'] })
    }


    return (
        <div className=''>
            {flockControlId && <Slideover onClose={()=>setFlockControlId(null)}  title="Action">
                <Gradeaction onSucess={()=>handleOnsucess()} id={flockControlId} />
            </Slideover>}
            <nav className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full p-5 max-w-xl">
                <button onClick={() => setfilter('all')} className={`flex items-center justify-center gap-1 p-3 border rounded-md shadow-md   min-h-[5rem] ${Boolean(filter.filter === 'all') && 'bg-red-100/20'} `}>
                    <span className='p-1 px-3 bg-red-300 text-sm text-white rounded-full '>{new Intl.NumberFormat('en', { notation: 'compact' }).format(all)}   </span>
                    <span>All</span>
                </button>
                <button onClick={() => setfilter('ungraded')} className={`flex items-center justify-center gap-1 p-3 border rounded-md shadow-md  min-h-[5rem] ${Boolean(filter.filter === 'ungraded') && 'bg-red-100/20'} `}>
                    <span className='p-1 px-3 bg-red-300 text-sm text-white rounded-full '>{new Intl.NumberFormat('en', { notation: 'compact' }).format(ungraded)}  </span>
                    <span>Ungraded</span>
                </button>
                <button onClick={() => setfilter('graded')} className={`flex items-center justify-center gap-1 p-3 border rounded-md shadow-md  min-h-[5rem] ${Boolean(filter.filter === 'graded') && 'bg-red-100/20'}  `}>
                    <span className='p-1 px-3 bg-red-300 text-sm text-white rounded-full '>{new Intl.NumberFormat('en', { notation: 'compact' }).format(graded)}  </span>
                    <span>Graded</span>
                </button>
            </nav>
            <div>

            </div>

            <SimpleBar className="  w-full  h-full relative">
                <table className="px-5 w-full text-sm text-left text-gray-500 relative">
                    <thead className="text-xs text-gray-700 bg-blue-50 sticky top-0 shadow-sm ">
                        <tr className=''>
                            <th scope="col" className="py-3  text-center  px-2 ">
                                <input type="checkbox" name="" id="" />
                            </th>
                            <th scope="col" className="py-3 px-6 min-w-[10rem] flex items-center justify-between sticky left-0 backdrop-blur-md">
                                Record time <span className='flex flex-col'>
                                    <FontAwesomeIcon className='cursor-pointer' onClick={() => setsort('created_asc')} icon='caret-up' />
                                    <FontAwesomeIcon className='cursor-pointer' onClick={() => setsort('created_desc')} icon='caret-down' />
                                </span>
                            </th>
                            <th scope="col" className="py-3 px-6 min-w-[10rem]">
                                Product name
                            </th>
                            <th scope="col" className="py-3 px-6 min-w-[10rem]">
                                Quantity
                            </th>
                            <th scope="col" className="py-3 px-6 min-w-[10rem]">
                                Status
                            </th>
                            <th scope="col" className="py-3 px-6 min-w-[10rem]">
                                Action
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        {records.data.map((record, i) => {
                            return (
                                <tr key={i} className={` border-b hover:bg-gray-200 ${i % 2 == 0 ? 'bg-gray-50' : 'white'}`}>
                                    <td scope="col" className="py-3  text-center  ">
                                        <input type="checkbox" name="" id="" />
                                    </td>
                                    <td className="py-2 px-6">
                                        {diffForHumans(record.created_at)}
                                    </td>
                                    <td className="py-2 px-6 ">
                                        {record.product_name}
                                    </td>
                                    <td className="py-2 px-6 ">
                                        {record.quantity}
                                    </td>
                                    <td className="py-2 px-6 ">
                                        {Boolean(record.status) ? 'graded' : 'ungraded'}
                                    </td>
                                    <td className="py-2 px-6 ">
                                    {Boolean(record.status) ? <nav className='text-blue-500 flex items-center gap-2'>
                                            no action required
                                    </nav> : 
                                        <nav className='text-blue-500 flex items-center gap-2'>
                                            <button onClick={() => setFlockControlId(record.flock_control_id)}>Grade product</button>
                                            <FontAwesomeIcon icon='arrow-right' className='text-blue-500' size='sm' />
                                        </nav>
                                    }
                                    </td>
                                </tr>

                            )
                        })}

                    </tbody>
                </table>

                <Simplepagination
                    from={records.from}
                    to={records.to}
                    next_page_url={records.next_page_url}
                    prev_page_url={records.prev_page_url}
                    total={records.total}
                    only='records'
                />
            </SimpleBar>


        </div>
    )
}
