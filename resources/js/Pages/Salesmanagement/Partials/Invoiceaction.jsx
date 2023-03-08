import React, { useState, useEffect, useMemo,useContext } from 'react'
import Primarybutton from '../../../components/Primarybutton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Buttonsubmit from '../../../components/Buttonsubmit'
import { motion } from 'framer-motion'
import { useForm, Inertia, Link } from '@inertiajs/inertia-react'
import Api from '../../../api/Api'
import { formatcurrency } from '../../../api/Util'
import Getselectsitems from '../../../api/Getselectsitems'
import Modal from '../../../components/Modal'
import SimpleBar from 'simplebar-react'
import { printReceiptContext } from '../context/printReceiptContext'
import Productcollection from '../../../components/Productcollection'



function SaleListLoader() {
    return <tr role="status" className=" p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse ">
        <td className="py-2 px-6">
            <div className="h-2.5 bg-gray-300 rounded-full  w-24 mb-2.5"></div>
        </td>
        <td className="py-2 px-6">
            <div className="h-2.5 bg-gray-300 rounded-full  w-24 mb-2.5"></div>
        </td>
        <td className="py-2 px-6">
            <div className="h-2.5 bg-gray-300 rounded-full  w-24 mb-2.5"></div>
        </td>
        <td className="py-2 px-6">
            <div className="h-2.5 bg-gray-300 rounded-full  w-24 mb-2.5"></div>
        </td>

    </tr>
}

function PaymentOptions(props) {
    const [paymentMethods, setPaymentMethods] = useState([]);
    const getPaymentMethods = async () => {
        const req = await Getselectsitems.getPaymentMethods()
        setPaymentMethods(req.data)
    }
    useEffect(() => {
        getPaymentMethods()
    }, [])


    return <motion.div
        initial={{ opacity: 0, x: '100vw' }}
        animate={{
            opacity: 1, x: 0,
            transition: {
                type: 'spring',
                mass: 0.1,
                damping: 8
            }
        }}
        exit={{ opacity: 0, x: '100vw' }}
        className=''>
        <span className="space-y-1 text-sm">
            <div className='flex items-center justify-between relative'>
                <label htmlFor="userrole" className="font-medium">payment method</label><abbr className='text-red-300' title='defines users role on the system'>*</abbr>
            </div>
            <select onChange={(e) => props.getPaymentMethod(e.target.value)} className=" block relative border border-gray-200 px-5 min-w-[12rem] py-3 focus:border-none outline-none rounded leading-6 w-full ring-offset-1 focus:ring-2 transition-all ease-out duration-150" type="text" placeholder="Enter user first name" >
                <option value='' >select payment method</option>
                {paymentMethods.map(method => <option key={method.id} value={method.id}>{method.method} </option>)}

            </select>
        </span>

    </motion.div>
}


function OutOfStock(props) {

    return <div className='mx-5 p-5'>
        <div className='flex items-center flex-col gap-3 justify-center mb-5'>
            <FontAwesomeIcon icon='warning' className='text-orange-200' size='xl' />
            <nav className='text-sm text-gray-500 font-semibold'>
                One or more products are out of stock
            </nav>
        </div>
        <SimpleBar>

        <table className="px-5 w-full text-sm text-left text-gray-500 relative mb-5">
            <thead className="text-xs text-gray-700 bg-blue-50 sticky top-0 shadow-sm ">
                <tr className=''>
                    <th scope="col" className="py-3 px-6 min-w-[10rem]">
                        product
                    </th>
                    <th scope="col" className="py-3 px-6 min-w-[10rem]">
                        quantity in stock(units)
                    </th>
                    <th scope="col" className="py-3 px-6 min-w-[10rem]">
                        quantity required(units)
                    </th>
                </tr>
            </thead>
            <tbody>
                {props.data.map((data, i) => {
                    return (
                        <tr key={i} className={` border-b hover:bg-gray-200 ${i % 2 == 0 ? 'bg-gray-50' : 'white'}`}>
                            <td className="py-2 px-6 ">
                                {data.name}
                            </td>
                            <td className="py-2 px-6 text-red-300 ">
                                {new Intl.NumberFormat().format(data.quantity_in_stock)}
                            </td>
                            <td className="py-2 px-6 ">
                                {new Intl.NumberFormat().format(data.quantity)}

                            </td>

                        </tr>

                    )
                })}

            </tbody>
        </table>
            </SimpleBar>   
        <div className='flex items-center justify-center'>
            <Link as='button' href='/stock/products/manage' className='text-indigo-500 text-sm flex items-center gap-2  '>
                <span>update stock</span>
                <FontAwesomeIcon icon="arrow-right" />
            </Link>
        </div>
    </div>

}



export default function Invoiceaction(props) {
    const [showPaymentOption, setShowPaymentOption] = useState(true)
    const [invoiceData, setInvoiceData] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [outOfStock, setOutOfStock] = useState(null);
    const {setReceiptData} = useContext(printReceiptContext)

    const { data, reset, setData, processing, post, errors, clearErrors } = useForm({
        'payment_method': null,
        'sale_id': null
    })

    useMemo(() => invoiceData.sale_id && setData('sale_id', invoiceData.sale_id), [invoiceData])

    const getInvoice = () => {
        Api.get(`/invoice/${props.id}/show`).then(res => {
            setInvoiceData(res.data.invoice[0])
            console.log(res.data.invoice[0])
            setIsLoading(false)
        }).catch(err => {
            console.log(err)
        })
    }

    const submit = () => {
        post('/invoice/process', {
            onSuccess: () => {
                setReceiptData({invoice_id:invoiceData.invoice_id,sale_id:invoiceData.sale_id})
                props.closeModal()
            },
        })
    }

    useEffect(() => {
        getInvoice()

    }, [])

    useEffect(() => {
        console.log(errors)
    }, [errors])




    return (
        <div className='mx-auto max-w-xl p-5 flex flex-col gap-10 pb-20 relative  '>
            {errors.out_of_stock && <Modal closeModal={() => clearErrors()} className=" bg-gray-100/30" title="out of stock">
                <OutOfStock data={errors.out_of_stock} />
            </Modal>}
            <div className='grid grid-cols-1 md:grid-cols-2 border p-2 gap-5 '>
                <nav className=''>
                    <nav className='text-lg font-semibold mb-3'>sale representative</nav>
                    <nav className='bg-violet-100 p-2'>{invoiceData.sale_representative ??
                        <div className=' animate-pulse bg-white w-full h-full opacity-50 '>&nbsp; </div>
                    }</nav>
                </nav>
                <nav className=''>
                    <nav className='text-lg font-semibold mb-3'>Invoice Number</nav>
                    <nav className='p-2 '>{invoiceData.invoice_number ?? <div className=' animate-pulse bg-white w-full h-full opacity-50 '>&nbsp; </div>}</nav>
                </nav>
                <nav className='mt-10'>
                    <nav className='text-lg font-semibold mb-3'>Customer name</nav>
                    <nav className='bg-orange-100/40 p-2'>{invoiceData.customer_name ?? <div className=' animate-pulse bg-white w-full h-full opacity-50 '>&nbsp; </div>}</nav>
                </nav>
                <nav className='mt-10'>
                    <nav className='text-lg font-semibold mb-3'>Amount payable</nav>
                    <nav className='text-green-900 font-semibold p-2'>{formatcurrency(invoiceData.amount_payable ?? 0)}</nav>
                </nav>
            </div>
            <div className='flex flex-col gap-5 p-1  mt-5 justify-between   '>
                <table className="w-full text-sm text-left text-gray-500  leading-3 ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 ">
                        <tr>
                            <th scope="col" className="py-3 px-6 rounded-l-lg">
                                Product
                            </th>

                            <th scope="col" className="py-3 px-6 rounded-r-lg">
                                Quantity
                            </th>
                            {/* <th scope="col" className="py-3 px-6 rounded-r-lg">
                               Unit Price
                            </th> */}
                            <th scope="col" className="py-3 px-6 rounded-r-lg">
                                Amount
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {isLoading &&  <SaleListLoader />}
                    {isLoading &&  <SaleListLoader />}
                        {invoiceData.sale_items?.map((item, i) => <tr key={i} className="bg-white ">
                            <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap flex items-center gap-2 ">
                                <span>{item.name.product_name} </span>
                               <span className='text-gray-500'> {item.name.definition_name}</span>
                            </th>
                            <td className="py-4 px-6">
                                   <Productcollection in_collections={item.name.in_collections}
                                    collection_type ={item.name.collection_type}
                                    units_per_crate ={item.name.units_per_crate}
                                    quantity ={item.quantity}
                                />
                            </td>
                            {/* <td className="py-4 px-6">
                                {formatcurrency(item.price)}
                            </td> */}
                            <td className="py-4 px-6">
                                {formatcurrency(item.amount)}
                            </td>
                        </tr>
                        )}


                    </tbody>
                 
                </table>
                <div className=' mt-5'>
                        <div className="font-semibold text-gray-900 flex items-center justify-between bg-indigo-50 ">
                            <div  className="py-3 px-6 text-sm text-gray-700">Sub Total</div>
                            <div className="py-3 px-6">{formatcurrency(invoiceData.sub_total ?? 0)}</div>
                        </div>
                        <div className="font-semibold text-gray-900 flex items-center justify-between bg-indigo-50 ">
                            <div  className="py-3 px-6 text-sm text-gray-700">Sale discount</div>
                            <div className="py-3 px-6">{invoiceData.discount_rate} %</div>
                        </div>
                        <div className="font-semibold text-gray-900 flex items-center justify-between bg-indigo-50 ">
                            <div  className="py-3 px-6 text-base">Total</div>
                            <div className="py-3 px-6">{formatcurrency(invoiceData.amount_payable ?? 0)}</div>
                        </div>
                    </div>
            </div>
            

            {!isLoading && !invoiceData.payment_verified && <nav className=' bg-orange-50/30 shadow-sm p-5 py-20  gap-2 flex flex-col'>
                <nav className={`flex items-center  ease-linear ${showPaymentOption ? 'flex-auto justify-between' : 'justify-end'}`}>
                    <nav >
                        <nav className={`font-semibold mb-1 text-sm ${showPaymentOption && 'opacity-50 text-xs pointer-events-none '}`}>Payment not verified</nav>
                        <Primarybutton icon="arrow-right" onClick={() => setShowPaymentOption(!showPaymentOption)} className={`w-full py-3 rounded-none ${showPaymentOption && 'opacity-50 text-xs pointer-events-none '}`} text="make payment" />
                    </nav>
                    {showPaymentOption && <PaymentOptions getPaymentMethod={(value) => setData('payment_method', value)} />}
                </nav>
                {data.payment_method && <Buttonsubmit onClick={submit} processing={processing} className="rounded-none py-3 mt-5 self-end" text="done" />}

            </nav>}

            {!isLoading && Boolean(invoiceData.payment_verified) ? <nav className=' self-center flex items-center justify-center gap-1 p-2 border text-sm border-green-800 text-green-800 w-max  rounded-full'>
                <span>Payment Verified</span> <FontAwesomeIcon icon='check' /> 
            </nav>: null}


        </div>
    )
}
