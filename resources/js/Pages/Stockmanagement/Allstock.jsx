import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { usePage } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia'
import { motion } from 'framer-motion';
import Calendar from 'react-calendar';
import '../../../css/customcalendarstyle.css'
import dayjs, { Dayjs } from 'dayjs';
import { formatcurrency } from '../../api/Util'
import Api from '../../api/Api';
import SaleLoader from './Partials/SaleLoader';
import StockLoader from './Partials/StockLoader';
import Salecomponent from './Partials/Salecomponent'
import Emptyresults from '../../components/Emptyresults'
import Primarybutton from '../../components/Primarybutton';
import Modal from '../../components/Modal';
import ProductViewTable from './Partials/ProductViewTable';
import Stocksetup from './Partials/Stocksetup';




export default function Allstock() {
    // const { stocks, sales, filter } = usePage().props
    const [stocks, setStocks] = useState(null)
    const [culled, setculled] = useState(null)
    const [dead, setdead] = useState(null)
    const [defected, setdefected] = useState(null)
    const [missing, setmissing] = useState(null)
    const [usablegradedProducts, setusablegradedProducts] = useState(null)
    const { newdata } = usePage().props
    const [sales, setSales] = useState([])
    const [currentDate, setCurrentDate] = useState(new Date())
    const [isLoading, setIsLoading] = useState(false)
    const [currentProduct, setCurrentProduct] = useState(null)
    const [isempty, setIsEmpty] = useState(false);

    function nextDay() {
        let newDate = currentDate
        setCurrentDate(new Date(newDate.setDate(currentDate.getDate() + 1)))
        // fetchPerDate()
    }
    function prevDay() {
        let newDate = currentDate
        setCurrentDate(new Date(newDate.setDate(currentDate.getDate() - 1)))
        // fetchPerDate()
    }
    function handleDateChange(data) {
        setCurrentDate(data)
        // fetchPerDate()
    }



    useEffect(() => {
        fetchPerDate()
    }, [currentDate])


    function fetchPerDate() {
        setIsLoading(true)
        Api.get(`/stock/get?date=${dayjs(currentDate).format('YYYY-MM-DD')}`).then(res => {
            const { sales, stocks, defected_unusable, culled, dead, missing, usablegradedProducts, empty_stock } = res.data
            console.log(res.data)
            setSales(sales)
            setStocks(stocks)
            setdead(dead)
            setdefected(defected_unusable)
            setmissing(missing)
            setculled(culled)
            setusablegradedProducts(usablegradedProducts)
            setIsEmpty(empty_stock)
            setIsLoading(false)
        }).catch(err => console.log(err.response))
    }

    function getTotalProductFromKey(key) {
        let Total = 0;
        if (usablegradedProducts) {
            for (const { quantity } of Object.values(usablegradedProducts[`${key}`])) {
                Total += quantity
            }
        }
        return Total
    }

    useEffect(() => {
        if (usablegradedProducts) {
            console.log(Object.keys(usablegradedProducts))
        }
    }, [usablegradedProducts])








    return (<div className='min-h-full h-max  flex '>
        <main className='mx-auto max-w-4xl p-5  '>
            {
                currentProduct && <Modal title={currentProduct} closeModal={() => setCurrentProduct(null)}>
                    <ProductViewTable entries={Object.entries(usablegradedProducts[`${currentProduct}`])} />
                </Modal>
            }
            {isempty && <Modal closeModal={()=>void(0)}>
                <Stocksetup handleAfterSucess={() => { fetchPerDate(); setIsEmpty(false) }} />
            </Modal>}
            <nav className='flex items-center gap-10 my-auto mb-7 justify-between'>
                <button onClick={prevDay} className='p-2 flex items-center bg-gray-200 text-gray-700 shadow-sm rounded-md gap-2 justify-center  lg:w-auto lg:justify-start min-w-[7rem]'><FontAwesomeIcon icon='chevron-left' /><span className='hidden lg:block'>previous day</span></button>
                <span className='text-gray-700 font-bold'>{currentDate.toDateString()}</span>
                <button onClick={nextDay} className='p-2 flex items-center bg-gray-200 text-gray-700 shadow-sm rounded-md gap-2 justify-center  lg:w-auto lg:justify-end min-w-[7rem]'> <span className='hidden lg:block'>next day</span><FontAwesomeIcon icon="chevron-right" /></button>
            </nav>

            {isLoading && <StockLoader />}
            {!isLoading && <nav className=' grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 '>

                <nav className='text-slate-800 min-h-[12rem] min-w-[13rem] relative w-full flex flex-col p-8 px-10  custom_box_shadow rounded-lg gap-2 items-center justify-center'>
                    <nav className='absolute z-0 isolate   inset-0 opacity-30 blur-[1px] rounded-md shadow-md bg-gradient-to-br from-blue-200 via-indigo-300 to-indigo-400'></nav>
                    <nav className='my-2 font-bold'>opening stock</nav>
                    <nav className='font-bold text-xl text-center'>{formatcurrency(stocks?.opening_stock ?? 0)}</nav>
                </nav>
                <nav className='text-slate-800 min-h-[12rem] min-w-[13rem] relative w-full flex flex-col p-8 px-10 bg-white custom_box_shadow rounded-lg gap-2 items-center justify-center'>
                    <nav className='absolute z-0 isolate   inset-0 opacity-30 blur-[1px] rounded-md shadow-md bg-gradient-to-br from-indigo-200 via-emerald-300 to-emerald-400'></nav>

                    <nav className='my-2 font-bold'>sale production</nav>
                    <nav className='font-bold text-xl text-center'>{formatcurrency(stocks?.daily_production ?? 0)}</nav>
                    <nav className='flex items-center justify-center text-sm text-green-900 gap-1'>

                    </nav>
                </nav>
                <nav className='text-slate-800 min-h-[12rem] min-w-[13rem] w-full relative flex flex-col p-8 px-10 bg-white custom_box_shadow rounded-lg gap-2 items-center justify-center'>
                    <nav className='absolute z-0 isolate   inset-0 opacity-30 blur-[1px] rounded-md shadow-md bg-gradient-to-br from-indigo-200 via-sky-300 to-sky-400'></nav>
                    <nav className='my-2 font-bold'>closing stock</nav>
                    <nav className='font-bold text-xl text-center'>{formatcurrency(stocks?.closing_stock ?? 0)}</nav>
                </nav>
                <nav className='text-slate-800 min-h-[12rem] min-w-[13rem] relative w-full flex flex-col p-8 px-10 bg-white custom_box_shadow rounded-lg gap-2 items-center justify-center'>
                    <nav className='absolute z-0 isolate   inset-0 opacity-30 blur-[1px] rounded-md shadow-md bg-gradient-to-br from-red-200 via-pink-300 to-pink-400'></nav>
                    <nav className='my-2 font-bold'>Epenses</nav>
                    <nav className='font-bold text-xl text-center'>{formatcurrency(stocks?.expenses ?? 0)}</nav>
                </nav>
                {usablegradedProducts && Object.keys(usablegradedProducts).map((item, i) => {
                    return (<nav key={i} className='text-indigo-800 min-h-[12rem] min-w-[13rem] relative w-full flex flex-col p-8 px-10 bg-white custom_box_shadow rounded-lg gap-2 items-center justify-center'>
                        <nav className='absolute z-0 isolate   inset-0 opacity-30 blur-[1px] rounded-md shadow-md bg-gradient-to-br from-blue-200 via-indigo-300 to-indigo-400'></nav>
                        <nav className='my-2 font-bold'>{item}</nav>
                        <nav className='font-bold text-xl text-center'>{new Intl.NumberFormat().format(getTotalProductFromKey(item) ?? 0)}</nav>
                        <Primarybutton onClick={() => setCurrentProduct(item)} className="text-xs cursor-pointer z-20" text="view details" />
                    </nav>)
                })}

                <nav className='text-slate-800 min-h-[12rem] min-w-[13rem] relative w-full flex flex-col p-8 px-10 bg-white custom_box_shadow rounded-lg gap-2 items-center justify-center'>
                    <nav className='absolute z-0 isolate   inset-0 opacity-30 blur-[1px] rounded-md shadow-md bg-gradient-to-br from-red-200 via-pink-300 to-pink-400'></nav>

                    <nav className='my-2 font-bold'>culled</nav>
                    <nav className='font-bold text-xl text-center'>{new Intl.NumberFormat().format(culled ?? 0)}</nav>
                </nav>
                <nav className='text-slate-800 min-h-[12rem] min-w-[13rem] relative w-full flex flex-col p-8 px-10 bg-white custom_box_shadow rounded-lg gap-2 items-center justify-center'>
                    <nav className='absolute z-0 isolate   inset-0 opacity-30 blur-[1px] rounded-md shadow-md bg-gradient-to-br from-red-200 via-pink-300 to-pink-400'></nav>

                    <nav className='my-2 font-bold'>Dead</nav>
                    <nav className='font-bold text-xl text-center'>{new Intl.NumberFormat().format(dead ?? 0)}</nav>
                </nav>
                <nav className='text-slate-800 min-h-[12rem] min-w-[13rem] relative w-full flex flex-col p-8 px-10 bg-white custom_box_shadow rounded-lg gap-2 items-center justify-center'>
                    <nav className='absolute z-0 isolate   inset-0 opacity-30 blur-[1px] rounded-md shadow-md bg-gradient-to-br from-red-200 via-pink-300 to-pink-400'></nav>

                    <nav className='my-2 font-bold'>Defected</nav>
                    <nav className='font-bold text-xl text-center'>{new Intl.NumberFormat().format(defected ?? 0)}</nav>
                </nav>
            </nav>}

            <div className='text-gray-800 font-bold flex items-center justify-between my-10'>
                <span className='text-lg'>Sales</span>
                <span className='text-indigo-900 text-sm  font-semibold flex items-center gap-2'><span>Manage Products </span> <FontAwesomeIcon icon="arrow-right" /> </span>
            </div>
            <div className='flex items-center gap-5 flex-wrap'>
                {!isLoading && sales && Object.keys(sales).map((sale, i) => {
                    return <Salecomponent productname={sale} definitions={sales[`${sale}`]} key={i} />
                })}
                {isLoading && <SaleLoader />}
                {isLoading && <SaleLoader />}
                {!isLoading && (sales?.length == 0) && <Emptyresults caption="No Sales Made  " />}


            </div>

        </main>
        <div className='max-w-sm p-2 hidden md:block'>
            <nav className='text-indigo-600 text-sm flex items-center gap-1 mb-4 p-5  bg-indigo-50'>
                Choose Date from below
            </nav>
            <Calendar value={currentDate} onChange={handleDateChange} className='w-full   rounded-md outline-none border-none shadow-md' />
        </div>
    </div>
    )
}
