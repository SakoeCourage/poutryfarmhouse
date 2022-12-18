import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SimpleBar from 'simplebar-react'
import { usePage } from '@inertiajs/inertia-react';
import Simplepagination from '../../components/Simplepagination';
import { setsort, formatcurrency, dateReformat } from '../../api/Util';

export default function Allstock() {
    const { stocks } = usePage().props
    useEffect(() => {
        console.log(stocks)
    }, [])
    return (
        <div className='w-full h-full'>
            <SimpleBar className="  w-full overflow-x-scroll overflow-y-scroll h-full   flex flex-col justify-between ">
                <table className="px-5 w-full text-sm text-left text-gray-500 relative flex-grow ">
                    <thead className="text-xs text-gray-700 bg-blue-50 sticky top-0 shadow-sm ">
                        <tr className=''>
                            <th scope="col" className="py-3  text-center  px-2 ">
                                <input type="checkbox" name="" id="" />
                            </th>
                            <th scope="col" className="py-3 px-6 min-w-[10rem] flex items-center justify-between">
                                date <span className='flex flex-col'>
                                    <FontAwesomeIcon className='cursor-pointer' onClick={() => setsort('created_asc')} icon='caret-up' />
                                    <FontAwesomeIcon className='cursor-pointer' onClick={() => setsort('created_desc')} icon='caret-down' />
                                </span>
                            </th>
                            <th scope="col" className="py-3 px-6 min-w-[10rem]">
                                opening stock
                            </th>
                            <th scope="col" className="py-3 px-6 min-w-[10rem]">
                                closing stock
                            </th>
                            <th scope="col" className="py-3 px-6 min-w-[10rem] flex items-center justify-between">
                                daily production
                                <span className='flex flex-col'>
                                    <FontAwesomeIcon className='cursor-pointer' onClick={() => setsort('prod_asc')} icon='caret-up' />
                                    <FontAwesomeIcon className='cursor-pointer' onClick={() => setsort('prod_desc')} icon='caret-down' />
                                </span>

                            </th>
                            <th scope="col" className="py-3 px-6 min-w-[10rem]">
                                birds sold
                            </th>
                            <th scope="col" className="py-3 px-6 min-w-[10rem]">
                                broken
                            </th>
                            <th scope="col" className="py-3 px-6 min-w-[10rem]">
                                defect
                            </th>
                            <th scope="col" className="py-3 px-6 min-w-[10rem]">
                                eggs sold
                            </th>
                            <th scope="col" className="py-3 px-6 min-w-[10rem]">
                                expenses
                            </th>
                            <th scope="col" className="py-3 px-6 min-w-[10rem]">
                                <span>Action</span>
                                <span className="sr-only">Action</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {stocks.data.map((stock, i) => {
                            return (
                                <tr key={i} className={` border-b hover:bg-gray-200 ${i % 2 == 0 ? 'bg-gray-50' : 'white'}`}>

                                    <td scope="col" className="py-3  text-center  ">
                                        <input type="checkbox" name="" id="" />
                                    </td>

                                    <td className="py-2 px-6">
                                        {dateReformat(stock.date)}
                                    </td>
                                    <td className="py-2 px-6 ">
                                        {formatcurrency(stock.opening_stock)}
                                    </td>
                                    <td className="py-2 px-6 ">
                                        {formatcurrency(stock.closing_stock)}
                                    </td>
                                    <td className="py-2 px-6 ">
                                        {formatcurrency(stock.daily_production)}
                                    </td>
                                    <td className="py-2 px-6 ">
                                        {new Intl.NumberFormat().format(stock.birds_sold)}
                                    </td>
                                    <td className="py-2 px-6 ">
                                        {new Intl.NumberFormat().format(stock.broken)}
                                    </td>
                                    <td className="py-2 px-6 ">
                                        {new Intl.NumberFormat().format(stock.other_defects)}
                                    </td>
                                    <td className="py-2 px-6 ">
                                        {new Intl.NumberFormat().format(stock.eggs_sold)}
                                    </td>
                                    <td className="py-2 px-6 ">
                                        {!stock.expense.length ? <div>none</div> :
                                            <button className='border-2 border-gray-300 p-2 px-4 rounded-full text-xs'>
                                                <span>view </span>
                                            </button>
                                        }
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
                    from={stocks.from}
                    to={stocks.to}
                    next_page_url={stocks.next_page_url}
                    prev_page_url={stocks.prev_page_url}
                    total={stocks.total}
                    only='stocks'
                />
            </SimpleBar>

        </div>
    )
}
