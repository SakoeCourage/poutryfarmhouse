import React, { useState } from 'react'
import Tableloader from './Partials/Tableloader'
import Modal from '../../components/Modal'
import Noselectedproduct from './Partials/Noselectedproduct'
import ProductMetaDataLoader from './Partials/ProductMetaDataLoader'
import Primarybutton from '../../components/Primarybutton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Datepicker from '../../components/Datepicker'
import SimpleBar from 'simplebar-react'
import { dateReformat, formatcurrency } from '../../api/Util'
import Sidebarfeeds from './Partials/Sidebarfeeds'
import axios from 'axios'
import Api from '../../api/Api'
import Addtofeedform from './Partials/Addtofeedform'

export default function Feedstock() {

    const [isLoading, setIsLoading] = useState(true);
    const [LoadingHistory, setLoadingHistory] = useState(true)
    const [LoadingMore, setLoadingMore] = useState(false)
    const [feedData, setFeedData] = useState(null)
    const [feedHistoryData, setFeedHistoryData] = useState(null)
    const [nextPage, setNextPage] = useState(null)
    const [showform, setShowForm] = useState(false)
    const getFeed = (id) => {
        setNextPage(null)
        setIsLoading(true)
        setLoadingHistory(true)
        const product = Api.get(`/feed/get/${id}`)
        const productHistory = Api.get(`/feed/history/${id}`)
        axios.all([product, productHistory]).then(axios.spread(function (res_feed, res_feedHistory) {
            setFeedData(res_feed.data.feed)
            setFeedHistoryData(res_feedHistory.data.feed_history?.data)
            setNextPage(res_feedHistory.data.feed_history?.next_page_url)
            console.log(res_feed, res_feedHistory);
        })).catch(error => console.log(error))
            .finally(() => {
                setIsLoading(false)
                setLoadingHistory(false)
            })
    }

    const handleOnUpdateFinish = (id) => {
        setShowForm(false)
        getFeed(id)
    }

    const MoreHistory = () => {
        setLoadingMore(true)
        axios.get(nextPage).then((res) => {
            setFeedHistoryData(cd => cd = [...cd, ...res.data.feed_history?.data])
            setNextPage(res.data.feed_history?.next_page_url)
            setLoadingMore(false)
        }).catch(err => console.log(err))
    }
    const handleFilterByDate = (date) => {
        const id = feedData.id
        if (date) {
            let Ndate = new Date(date)
            let dateString = `${Ndate.getFullYear()}-${Ndate.getUTCMonth() + 1}-${Ndate.getDate()}`
            Api.get(`/feed/history/${id}?date=${dateString}`).then(res => {
                setFeedData(res.data.feed)
                setNextPage(res.data.feed_history?.next_page_url)
            }).catch(err => console.log(err))
        }
    }

    return (
        <div className='flex items-center relative overflow-hidden w-full h-full '>
            {showform && <Modal closeModal={() => setShowForm(false)}>
                <Addtofeedform handleOnSucess={(id) => handleOnUpdateFinish(id)} feedDetails={{
                    'id': feedData.id,
                    'quantity': feedData.quantity_in_stock,
                }} />
            </Modal>
            }
            <Sidebarfeeds setFeed={(id) => getFeed(id)} />
            <div className='h-full  overflow-x-hidden grow px-4 relative'>
                <div className='container mx-auto h-full'>
                    {!feedData && <Noselectedproduct />}
                    {feedData && <div className="h-full ">
                        {isLoading ? <ProductMetaDataLoader /> :
                            <div className='grid grid-cols-1  lg:grid-cols-3  gap-10 py-2'>
                                <nav className=' bg-indigo-200/40 p-10 rounded-md shadow-sm'>
                                    <nav className='text-sm text-gray-400'>feed</nav>
                                    <nav className='font-semibold text-indigo-900 text-2xl'>{feedData.feed_name}</nav>
                                </nav>
                                <nav className=' bg-indigo-200/40 p-10 rounded-md shadow-sm'>
                                    <nav className='text-sm text-gray-400'>cost per kg</nav>
                                    <nav className='font-semibold text-indigo-900 text-2xl'>{formatcurrency(feedData.cost_per_kg)}</nav>
                                </nav>
                                <nav className=' bg-indigo-200/40 p-10 rounded-md shadow-sm'>
                                    <nav className='text-sm text-gray-400'>quantity in stock</nav>
                                    <nav className='font-semibold text-indigo-900 text-2xl'>{new Intl.NumberFormat('en-GB', {
                                        style: 'unit',
                                        unit: 'kilogram',
                                        unitDisplay: 'short',
                                    }).format(feedData.quantity_in_stock)}</nav>
                                    <Primarybutton onClick={() => setShowForm(true)} text="update" className="mt-2" />
                                </nav>
                            </div>
                        }
                        <nav className='mt-20 flex items-center justify-between sticky top-0 bg-white z-20'>
                            <nav className='flex items-center gap-2 p-2 shadow text-sm text-indigo-700 bg-indigo-50 mb-2'>
                                <span>feed history</span>
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
                                            quantity
                                        </th>
                                        <th scope="col" className="py-3 px-6 min-w-[10rem]">
                                            quantity after
                                        </th>
                                        <th scope="col" className="py-3 px-6 min-w-[10rem]">
                                            description
                                        </th>



                                    </tr>
                                </thead>
                                <tbody>

                                    {!LoadingHistory && feedHistoryData.map((item, i) => {
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
                                                    {item.action == 'addition' ? <span className='text-green-300 font-bold'>+</span > : <span className='text-red-300 font-bold'>-</span>} {item.quantity}
                                                </td>
                                                <td className="py-2 px-6 ">
                                                    {new Intl.NumberFormat().format(item.net_quantity)}
                                                </td>
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
