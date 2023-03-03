import React, { useState, useEffect } from 'react'
import SimpleBar from 'simplebar-react'
import Sidebarproducts from './Partials/Sidebarproducts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Primarybutton from '../../components/Primarybutton'
import Datepicker from '../../components/Datepicker'
import Modal from '../../components/Modal'
import Addtostockform from './Partials/Addtostockform'
import Api from '../../api/Api'
import { formatcurrency } from '../../api/Util'
import Noselectedproduct from './Partials/Noselectedproduct'
import ProductMetaDataLoader from './Partials/ProductMetaDataLoader'
import Tableloader from './Partials/Tableloader'
import axios from 'axios'
import { dateReformat, formatnumber } from '../../api/Util'



export default function Productstock() {
    const [isLoading, setIsLoading] = useState(true);
    const [LoadingHistory, setLoadingHistory] = useState(true)
    const [LoadingMore, setLoadingMore] = useState(false)
    const [productData, setProductData] = useState(null)
    const [productHistoryData, setProductHistoryData] = useState(null)
    const [nextPage, setNextPage] = useState(null)
    const [showform, setShowForm] = useState(false)
    const getProduct = (id) => {
        setNextPage(null)
        setIsLoading(true)
        setLoadingHistory(true)
        const product = Api.get(`/product/get/${id}`)
        const productHistory = Api.get(`/product/history/${id}`)
        axios.all([product, productHistory]).then(axios.spread(function (res_products, res_productHistory) {
            setProductData(res_products.data.definition)
            setProductHistoryData(res_productHistory.data.product_history?.data)
            setNextPage(res_productHistory.data.product_history?.next_page_url)
            console.log(res_products, res_productHistory.data.product_history);
        })).catch(error => console.log(error))
            .finally(() => {
                setIsLoading(false)
                setLoadingHistory(false)
            })
    }

    const handleOnUpdateFinish = (id) => {
        setShowForm(false)
        getProduct(id)
    }

    const MoreHistory = () => {
        setLoadingMore(true)
        axios.get(nextPage).then((res) => {
            setProductHistoryData(cd => cd = [...cd, ...res.data.product_history?.data])
            setNextPage(res.data.product_history?.next_page_url)
            setLoadingMore(false)
        }).catch(err => console.log(err))
    }
    const handleFilterByDate = (date) => {
        const id = productData.id
        if (date) {
            let Ndate = new Date(date)
            let dateString = `${Ndate.getFullYear()}-${Ndate.getUTCMonth() + 1}-${Ndate.getDate()}`
            Api.get(`/product/history/${id}?date=${dateString}`).then(res => {
                setProductHistoryData(res.data.product_history?.data)
                setNextPage(res.data.product_history?.next_page_url)
            }).catch(err => console.log(err))
        }
    }

    return (
        <div className='flex items-center relative overflow-hidden w-full h-full '>
            {showform && <Modal closeModal={() => setShowForm(false)}>
                <Addtostockform handleOnSucess={(id) => handleOnUpdateFinish(id)} productDetails={{
                    'id': productData.id,
                    'quantity': productData.quantity_in_stock,
                    'in_crates': Boolean(productData.product?.in_crates),
                    'units_per_crate': productData.units_per_crate
                }} />
            </Modal>
            }
            <Sidebarproducts setProduct={(id) => getProduct(id)} />
            <div className='h-full  overflow-x-hidden grow px-4 relative'>
                <div className='container mx-auto h-full'>
                    {!productData && <Noselectedproduct />}
                    {productData && <div className="h-full ">
                        {isLoading ? <ProductMetaDataLoader /> :
                            <div className='grid grid-cols-1  lg:grid-cols-3  gap-10 py-2'>
                                <nav className=' bg-indigo-200/40 p-10 rounded-md shadow-sm'>
                                    <nav className='text-sm text-gray-400'>product</nav>
                                    <nav className='font-semibold text-indigo-900 text-2xl '><span>{productData.product?.name}</span><span className='text-indigo-700 text-xl ml-2'>{productData.name}</span></nav>
                                </nav>
                                <nav className=' bg-indigo-200/40 p-10 rounded-md shadow-sm flex flex-col gap-2'>
                                    <nav className="p-2 bg-indigo-100 rounded-md ">
                                        <nav className='text-sm text-gray-400'>price per unit</nav>
                                        <nav className='font-semibold text-indigo-900 text-2xl'>{formatcurrency(productData.unit_price)}</nav>
                                    </nav>
                                    {Boolean(productData.product?.in_crates) && <nav className="p-2 bg-indigo-100 rounded-md ">
                                        <nav className='text-sm text-gray-400'>price per crate</nav>
                                        <nav className='font-semibold text-indigo-900 text-2xl'>{formatcurrency(productData.price_per_crate)}</nav>
                                    </nav>}
                                </nav>
                                <nav className=' bg-indigo-200/40 p-10 rounded-md shadow-sm'>
                                    <nav className='text-sm text-gray-400'>quantity in stock </nav>
                                    <nav className='font-semibold text-indigo-900 text-2xl'>
                                        {Boolean(productData.product?.in_crates) ?
                                            <span className='font-semibold text-xl'>{formatnumber(Math.floor(productData.quantity_in_stock / (productData.units_per_crate ?? 1)))} <span className="text-xs mx-1">crates</span> &nbsp; <div className="block">{productData.quantity_in_stock % (productData.units_per_crate ?? 1)} <span className="text-xs mx-1">units</span></div> </span>
                                            :
                                            new Intl.NumberFormat().format(productData.quantity_in_stock)
                                        }
                                    </nav>
                                    <Primarybutton onClick={() => setShowForm(true)} text="update" className="mt-5" />
                                </nav>
                            </div>
                        }
                        <nav className='mt-20 flex items-center justify-between sticky top-0 bg-white z-20'>
                            <nav className='flex items-center gap-2 p-2 shadow text-sm text-indigo-700 bg-indigo-50 mb-2'>
                                <span>product history</span>
                                <FontAwesomeIcon icon='history' />
                            </nav>
                            {!isLoading && <nav className='flex items-center gap-2 text-sm'>
                                <span className='bg-indigo-100 p-1 px-2  rounded-xl w-max'>filter by date</span>
                                <Datepicker format="yyyy-MM-dd" placeholder="select date" getdateData={(data) => handleFilterByDate(data)} />
                            </nav>}
                        </nav>
                        <SimpleBar>
                            <table className="px-5 w-full text-sm text-left text-gray-500  ">
                                <thead className="text-xs text-gray-700 bg-indigo-50  shadow-sm ">
                                    <tr className=''>
                                        <th scope="col" className="py-3  text-center  px-2 ">
                                            <FontAwesomeIcon icon="arrow-trend-up" />
                                        </th>
                                        <th scope="col" className="py-3 px-6 min-w-[10rem] flex items-center justify-between">
                                            date
                                        </th>
                                        <th scope="col" className="py-3 px-6 min-w-[10rem]">
                                            time
                                        </th>
                                        <th scope="col" className="py-3 px-6 min-w-[10rem]">
                                            quantity(units)
                                        </th>
                                        {Boolean(productData.product?.in_crates) && <th scope="col" className="py-3 px-6 min-w-[10rem]">
                                            quantity after {Boolean(productData.product?.in_crates) && <span>(crates)</span>}
                                        </th>}
                                        <th scope="col" className="py-3 px-6 min-w-[10rem]">
                                            quantity after (units)
                                        </th>

                                        <th scope="col" className="py-3 px-6 min-w-[10rem]">
                                            description
                                        </th>



                                    </tr>
                                </thead>
                                <tbody>

                                    {!LoadingHistory && productHistoryData.map((item, i) => {
                                        return (
                                            <tr key={i} className={` border-b hover:bg-gray-200 ${i % 2 == 0 ? 'bg-gray-50' : 'white'}`}>
                                                <td scope="col" className="py-3  text-center  ">
                                                    {item.action == 'addition' ? <FontAwesomeIcon icon="arrow-up" className='text-green-300' />
                                                        : <FontAwesomeIcon icon="arrow-down" className='text-red-300' />
                                                    }

                                                </td>
                                                <td className="py-2 px-6">
                                                    {dateReformat(item.date)}
                                                </td>
                                                <td className="py-2 px-6 ">
                                                    {item.time}
                                                </td>
                                                <td className="py-2 px-6 ">
                                                    {item.action == 'addition' ? <span className='text-green-300 font-bold'>+</span > : <span className='text-red-300 font-bold'>-</span>} {formatnumber(item.quantity)}
                                                </td>
                                                {
                                                    Boolean(productData.product?.in_crates) && <td className="py-2 px-6 ">
                                                        {Boolean(productData.product?.in_crates) ?
                                                            <span className=''>{formatnumber(Math.floor(item.net_quantity / (productData.units_per_crate ?? 1)))} </span>
                                                            :
                                                            new Intl.NumberFormat().format(item.net_quantity)
                                                        }
                                                    </td>
                                                }

                                                {Boolean(productData.product?.in_crates) ?
                                                    <td className="py-2 px-6 ">
                                                        {item.net_quantity % (productData.units_per_crate ?? 1)}
                                                    </td> :
                                                    <td className="py-2 px-6 ">
                                                        {item.net_quantity}
                                                    </td>


                                                }
                                                <td className="py-2 px-6 ">
                                                    {item.description}
                                                </td>


                                            </tr>

                                        )
                                    })}

                                    {(LoadingHistory || LoadingMore) && <Tableloader />}
                                    {(LoadingHistory || LoadingMore) && <Tableloader />}
                                    {(LoadingHistory || LoadingMore) && <Tableloader />}

                                </tbody>
                            </table>
                            {nextPage && !LoadingMore && <div className='flex items-center justify-center'>
                                <Primarybutton className='text-sm ' text="load more" onClick={() => MoreHistory()} />
                            </div>}
                        </SimpleBar>

                    </div>}
                </div>
            </div>

        </div>
    )
}
