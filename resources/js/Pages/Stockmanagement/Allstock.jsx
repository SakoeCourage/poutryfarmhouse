import React, { useEffect,useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SimpleBar from 'simplebar-react'
import { usePage } from '@inertiajs/inertia-react';
import Simplepagination from '../../components/Simplepagination';
import { setsort, formatcurrency, dateReformat } from '../../api/Util';
import Rightmodalwithbackdrop from '../../components/Rightmodalwithbackdrop'
import { AnimatePresence } from 'framer-motion';
import Editstock from './Editstock';
import Editexpenses from './Editexpenses';

export default function Allstock() {
    const { stocks } = usePage().props
    const [currentData,setCurrentData]=useState({
        id: null,
        toggle: null,
    
    })
    return (
        <div className='w-full h-full'>
               <AnimatePresence>
             {(currentData.id && currentData.toggle === 'editStock') &&
            <Rightmodalwithbackdrop onClose={()=>setCurrentData({id:null,toggle:null})} title={`Edit stock data`}>
             <Editstock id={currentData.id} closeModal={()=>setCurrentData({id:null,toggle:null})} />
            </Rightmodalwithbackdrop>
             }
             {(currentData.id && currentData.toggle === 'expenses') &&
            <Rightmodalwithbackdrop onClose={()=>setCurrentData({id:null,toggle:null})} title={`Edit stock expenses`}>
                    <Editexpenses id={currentData.id} closeModal={()=>setCurrentData({id:null,toggle:null})} />
            </Rightmodalwithbackdrop>
             }
             </AnimatePresence>
            <SimpleBar className="  w-full  h-full   flex flex-col justify-between ">
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
                                        <button onClick={()=>setCurrentData({id:stock.id,toggle:"editStock"})} className='text-blue-500 flex items-center gap-2'>
                                            <span >Edit</span>
                                            <FontAwesomeIcon icon='arrow-right' className='text-blue-500' size='sm' />
                                        </button>
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
