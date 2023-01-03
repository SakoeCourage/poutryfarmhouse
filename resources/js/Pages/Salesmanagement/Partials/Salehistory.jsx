import React, { useEffect, useState, useContext } from 'react'
import Api from '../../../api/Api';
import SimpleBar from 'simplebar-react';
import { diffForHumans, formatcurrency } from '../../../api/Util';
import Buttonsubmit from '../../../components/Buttonsubmit';
import axios from 'axios';
import { searchContext } from '../context/SearchContext'
import Viewsaleitems from './Viewsaleitems';
import Slideover from '../../../components/Slideover';
import Dotanimation from '../../../components/Dotanimation';


export default function Salehistory() {
    const [sales, setSales] = useState([])
    const [saleId, setSaleId] = useState(null)
    const [isLoading, setisLoading] = useState(false)
    const [sale, items] = useState([])
    const [nextPage, setNextPage] = useState(null)
    const { searchResults,setSearchResults,searchKey } = useContext(searchContext)
    const getAllSales = () => {
        setisLoading(true)
        Api.get('/sales/allsales').then(res => {
            setSearchResults(res.data)
            setisLoading(false)
        }).catch(err => {
            console.log(err.response)
        })
    }
    const getMoreSales = () => {
        setisLoading(true)
        axios.get(nextPage).then(res => {
            setSales([...sales, ...res.data.sales?.data])
            setNextPage(res.data.sales?.next_page_url)
            setisLoading(false)
        }).catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        if (searchResults) {
            const { data, next_page_url } = searchResults.sales
            setSales(data)
            setNextPage(next_page_url)
        }
    }, [searchResults])

    useEffect(() => {
        if (!searchKey) { getAllSales() }
    }, [])



    return (
        <div className='relative h-full'>
            {saleId && <Slideover onClose={()=>setSaleId(null)} title="sale items">
                    <Viewsaleitems closeModal={()=>setSaleId(null)} id={saleId} />
            </Slideover>}
            
            <SimpleBar className="  w-full  h-full  ">
                
                <table className="px-5 w-full text-sm text-left text-gray-500 relative">
                    <thead className="sticky top-0 ">
                        <tr className='text-xs  text-gray-700 bg-blue-50  shadow-sm'>
                            <th scope="col" className="py-3  text-center  px-2 ">
                                <input type="checkbox" name="" id="" />
                            </th>
                            <th scope="col" className="py-3 px-6 min-w-[10rem]">
                                recorded
                            </th>
                            <th scope="col" className="py-3 px-6 min-w-[10rem]">
                                customer name
                            </th>
                            <th scope="col" className="py-3 px-6 min-w-[10rem]">
                                customer contact
                            </th>
                            <th scope="col" className="py-3 px-6 min-w-[10rem]">
                                amount paid
                            </th>
                            <th scope="col" className="py-3 px-6 min-w-[10rem]">
                                sale representative
                            </th>
                            <th scope="col" className="py-3 px-6 min-w-[10rem]">
                                items
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        {sales.map((sale, i) => {
                            return (
                                <tr key={i} className={`newtr border-b hover:bg-gray-200 ${i % 2 == 0 ? 'bg-gray-50 newtr' : 'white'}`}>

                                    <td scope="col" className="py-3  text-center  ">
                                        <input type="checkbox" name="" id="" />
                                    </td>

                                    <td className="py-2 px-6">
                                        {diffForHumans(sale.created_at)}

                                    </td>
                                    <td className="py-2 px-6 ">
                                        {sale.customer_name}
                                    </td>
                                    <td className="py-2 px-6 ">
                                        0{sale.customer_contact}
                                    </td>
                                    <td className="py-2 px-6 ">
                                        {formatcurrency(sale.total_amount)}
                                    </td>
                                    <td className="py-2 px-6 ">
                                        {sale.salerepresentative?.name}
                                    </td>
                                    <td className="py-2 px-6 ">
                                        <button onClick={() => setSaleId(sale.id)} className='text-blue-500 flex items-center gap-2 border-2 px-2 py-2 rounded-full w-max'>
                                            <span >view</span>
                                            {/* <FontAwesomeIcon icon='arrow-right' className='text-blue-500' size='sm' /> */}
                                        </button>
                                    </td>

                                </tr>

                            )
                        })}

                    </tbody>
                </table>
                {isLoading && !nextPage && <div className=' relative w-full min-h-screen'>
                <Dotanimation />
            </div> }

                {nextPage &&
                    <div className='my-5 flex items-center justify-center'>
                        <Buttonsubmit text='load more' className="  text-sm" processing={isLoading} onClick={() => getMoreSales()} />
                    </div>
                }
            </SimpleBar>

        </div>
    );
}
