import React, { useEffect, useState } from 'react'
import { usePage } from '@inertiajs/inertia-react'
import SimpleBar from 'simplebar-react'
import Simplepagination from '../../components/Simplepagination'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { dateReformat, setsort, formatcurrency } from '../../api/Util'
import { SearchBar } from '../Usermanagement/Allusers'
import Invoiceaction from './Partials/Invoiceaction'
import Slideover from '../../components/Slideover'
import { setfilter } from '../../api/Util'



function Filterchip(props) {
    return <button onClick={() => props.onClick()} className={`px-3 py-2 border    shadow-md  text-sm rounded-full flex items-center gap-2 ${props.active ? 'bg-indigo-400 text-white border-none' : 'bg-white text-gray-500'}`}>
        <span>{props.text}</span>
        {props.value && <span className='opacity-50 text-xs max-w-[5rem] truncate'>{new Intl.NumberFormat('en',{ notation: 'compact' }).format(props.value)}</span>}
    </button>
}

export default function Invoice() {
    const [invoiceId, setInvoiceId] = useState(null)
    const { invoice, paid, unpaid, filters } = usePage().props

    useEffect(() => {
        console.log(filters)
    }, [filters])

    return (
        <div className=' h-full'>
            {invoiceId && <Slideover onClose={() => setInvoiceId(null)} title="Action">
                <Invoiceaction closeModal={() => setInvoiceId(null)} id={invoiceId} />
            </Slideover>}

            <SimpleBar className="   h-full ">
                <nav className='flex items-center  my-2 mx-2 w-full  '>
                    <nav className='sticky left-0 flex items-center gap-3 flex-wrap md:flex-nowrap'>
                        <SearchBar placeholder="invoice number or customer name " />
                        <Filterchip active={Boolean(filters.filter == 'all')} onClick={() => setfilter('all')} text="All" value={invoice.total} />
                        {!filters.search && <Filterchip active={Boolean(filters.filter=='paid')} onClick={()=>setfilter('paid')} text="paid" value={paid} />}
                        {!filters.search && <Filterchip active={Boolean(filters.filter=='unpaid')} onClick={()=>setfilter('unpaid')} text="unpaid" value={unpaid} />}
                    </nav>
                </nav>
                <table className="px-5 text-sm text-left text-gray-500 relative">
                    <thead className="sticky top-0 ">
                        <tr className='text-xs text-gray-700 bg-blue-50  shadow-sm'>
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
                                invoice number
                            </th>
                            <th scope="col" className="py-3 px-6 min-w-[10rem]">
                                customer name
                            </th>
                            <th scope="col" className="py-3 px-6 min-w-[10rem]">
                                customer contact
                            </th>
                            <th scope="col" className="py-3 px-6 min-w-[10rem]">
                                amount payable
                            </th>
                            <th scope="col" className="py-3 px-6 min-w-[10rem]">
                                payment
                            </th>
                            <th scope="col" className="py-3 px-6 min-w-[10rem]">
                                Action
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        {invoice.data.map((inv, i) => {
                            return (
                                <tr key={i} className={` border-b hover:bg-gray-200 ${i % 2 == 0 ? 'bg-gray-50' : 'white'}`}>

                                    <td scope="col" className="py-3  text-center  ">
                                        <input type="checkbox" name="" id="" />
                                    </td>

                                    <td className="py-2 px-6">
                                        {dateReformat(inv.date_created)}
                                    </td>
                                    <td className="py-2 px-6 ">
                                        {inv.invoice_number}
                                    </td>
                                    <td className="py-2 px-6 ">
                                        {inv.customer_name}
                                    </td>
                                    <td className="py-2 px-6 ">
                                        {inv.customer_contact}
                                    </td>
                                    <td className="py-2 px-6 ">
                                        {formatcurrency(inv.total_amount)}
                                    </td>
                                    <td className="py-2 px-6 ">
                                        {Boolean(inv.payment) ? 'verified' : 'not verified'}
                                    </td>
                                    <td className="py-2 px-6 ">
                                        <nav onClick={() => setInvoiceId(inv.id)} className='text-blue-500 flex items-center gap-2 cursor-pointer'>
                                            <span >Make Payment</span>
                                            <FontAwesomeIcon icon='arrow-right' className='text-blue-500' size='sm' />
                                        </nav>
                                    </td>

                                </tr>

                            )
                        })}

                    </tbody>
                </table>
                <Simplepagination
                    from={invoice.from}
                    to={invoice.to}
                    next_page_url={invoice.next_page_url}
                    prev_page_url={invoice.prev_page_url}
                    total={invoice.total}
                    only='invoice'
                />

            </SimpleBar>

        </div>

    )
}
