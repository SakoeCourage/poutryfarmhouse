import React, { useEffect, useState } from 'react'
import { usePage } from '@inertiajs/inertia-react'
import SimpleBar from 'simplebar-react'
import Simplepagination from '../../components/Simplepagination'
import { setsort } from '../../api/Util'
import { dateReformat, diffForHumans, formatcurrency,removeURLParameter } from '../../api/Util'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Inertia } from '@inertiajs/inertia'
import { useDebounce } from '@react-hook/debounce'
import Datepicker from '../../components/Datepicker'


export function Datebar(props) {
    const [searchKey, setsearchKey] = useState(null)
    const [processing, setProcessing] = useState(false)
    const [sendSearchRequest, setsendSearchRequest] = useDebounce(false, 300)
    const { filters } = usePage().props
    const sendRequest = () => {
        let CurrentRoute = () => location.href.toString()
        let newRouteUrlwithoutpages = removeURLParameter('page', CurrentRoute())
        Inertia.get(newRouteUrlwithoutpages, { day: searchKey }, {
            preserveState: true,
            replace: true,
            onFinish: () => { setProcessing(false) },  
        })
    }
    const handlesearchrequest = (searchKey) => {
        setProcessing(true)
        setsearchKey(searchKey)
        setsendSearchRequest(!sendSearchRequest)
    }
    useEffect(() => {
        if (searchKey !== null) {
            sendRequest()
        }
    }, [sendSearchRequest])

    return (
        <nav className='flex items-center gap-2 text-sm'>
            <span className='bg-blue-100 p-1 px-2  rounded-xl w-max'>filter by date</span>
            <Datepicker value={filters.day} format="yyyy-MM-dd" placeholder="select record date" getdateData={(data) => handlesearchrequest(data)} />
        </nav>
    )
}

export default function Payments() {
    const { payments } = usePage().props
    useEffect(() => {
        console.log(payments)
    }, [])

    return (
        <div>
            
            <SimpleBar className="  w-full  h-auto min-h-[32rem] relative">
                  <nav className='m-2'><Datebar/></nav>
                <table className="px-5 w-full text-sm text-left text-gray-500 relative">
                    <thead className="text-xs text-gray-700 bg-blue-50 sticky top-0 shadow-sm ">
                        <tr className=''>
                            <th scope="col" className="py-3  text-center  px-2 ">
                                <input type="checkbox" name="" id="" />
                            </th>
                            <th scope="col" className="py-3 px-6 min-w-[10rem] flex items-center justify-between">
                                recorded at
                                <span className='flex flex-col'>
                                    <FontAwesomeIcon className='cursor-pointer' onClick={() => setsort('created_asc')} icon='caret-up' />
                                    <FontAwesomeIcon className='cursor-pointer' onClick={() => setsort('created_desc')} icon='caret-down' />
                                </span>
                            </th>

                            <th scope="col" className="py-3 px-6 min-w-[10rem]">
                                from
                            </th>
                            <th scope="col" className="py-3 px-6 min-w-[10rem]">
                                amount
                            </th>
                            <th scope="col" className="py-3 px-6 min-w-[10rem]">
                                method
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        {payments.data.map((payment, i) => {
                            return (
                                <tr key={i} className={` border-b hover:bg-gray-200 ${i % 2 == 0 ? 'bg-gray-50' : 'white'}`}>
                                    <td scope="col" className="py-3  text-center  ">
                                        <input type="checkbox" name="" id="" />
                                    </td>
                                    <td className="py-2 px-6">
                                        {diffForHumans(payment.created_at)}
                                    </td>
                                    <td className="py-2 px-6 ">
                                        {payment.from}
                                    </td>
                                    <td className="py-2 px-6 ">
                                        {formatcurrency(payment.amount)}
                                    </td>
                                    <td className="py-2 px-6 ">
                                        {payment.method}
                                    </td>

                                </tr>

                            )
                        })}

                    </tbody>
                </table>
                <Simplepagination
                    from={payments.from}
                    to={payments.to}
                    next_page_url={payments.next_page_url}
                    prev_page_url={payments.prev_page_url}
                    total={payments.total}
                    only='payments'
                />

            </SimpleBar>

        </div>
    )
}
