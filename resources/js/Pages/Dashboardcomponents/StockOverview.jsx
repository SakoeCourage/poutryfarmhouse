import React, { useEffect ,useContext} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { formatcurrency, formatnumber } from '../../api/Util'
import { Link } from '@inertiajs/inertia-react'
import { usePage } from '@inertiajs/inertia-react'
import { DashboardContext } from './DashboardContext'
export default function StockOverview() {
    const {dashboarData} = useContext(DashboardContext)

    return (
        <div className='bg-slate-200/50 rounded-lg shadow-sm min-h-[16rem] p-7'>

            <div className='grid grid-cols-1 lg:grid-cols-3 my-5 gap-10 '>
                <nav className="p-5  w-full h-full   " >
                    <nav className='my-auto'>
                        <nav className="text-slate-800 font-bold text-lg" >Stock data </nav>
                        <nav className='text-muted mt-5 text-xs'>
                            Current stock data is show here
                        </nav>
                    </nav>
                </nav>
                <nav className="grid grid-col-1 xl:grid-cols-2 gap-5 lg:col-span-2">
                    <nav className='flex relative flex-col isolate gap-2 p-2 w-full h-full shadow-md rounded-lg  aspect-[4/2]  '>
                        <nav className='absolute -z-10  inset-0 opacity-90 blur-[1px] rounded-md shadow-md bg-gradient-to-br from-purple-300 via-indigo-500 to-indigo-600'></nav>
                        <nav className='flex items-center justify-between'>
                            <nav className='flex items-center gap-2 w-max p-1 px-2 rounded-full bg-pink-50  '>
                                <FontAwesomeIcon icon="cart-shopping" className='text-gray-400' />
                                <span className='bg-pink-100 rounded-full p-1 px-2 shadow-sm text-gray-500'>products stock</span>
                            </nav>
                            <nav className='flex items-center gap-2 text-pink-50'>
                                <FontAwesomeIcon icon="clock" />
                                <span>today</span>
                            </nav>
                        </nav>

                        <nav className='mt-auto px-5 text-white'>
                            <nav className='text-sm mb-2'>approximated value in stock</nav>
                            <nav className='font-semibold text-2xl'>
                                {formatcurrency(dashboarData?.feed_and_stock.product_stock.value_in_stock)}
                            </nav>
                        </nav>

                        <nav className='mt-auto bg-indigo-300/90 border border-indigo-200 rounded-md p-5 text-sm'>
                            <nav className='flex items-center gap-2'><FontAwesomeIcon className='text-indigo-100' icon='check-double' /><span>{formatnumber(dashboarData?.feed_and_stock.product_stock.number_of_products)} products found</span></nav>
                            <nav className='flex items-center gap-2'><FontAwesomeIcon className='text-indigo-100' icon='check-double' /><span>{formatnumber(dashboarData?.feed_and_stock.product_stock.quantity_of_products)} products quantity in stock</span></nav>
                        </nav>

                        <Link as='button' href='/stock/products/manage' className=' flex ring-1 ring-indigo-400 ring-offset-1 p-2 bg-indigo-600 mt-auto text-xl rounded-md text-white items-center justify-center gap-2'>
                            <span className='font-semibold'>manage</span>
                            <FontAwesomeIcon size="sm" icon="arrow-right" />
                        </Link>
                    </nav>


                    <nav className='flex relative flex-col isolate gap-2 p-2 w-full h-full shadow-md rounded-lg  aspect-[4/2]  '>
                        <nav className='absolute -z-10  inset-0 opacity-90 blur-[1px] rounded-md shadow-md bg-gradient-to-br from-violet-300 via-blue-500 to-blue-600'></nav>
                        <nav className='flex items-center justify-between'>
                            <nav className='flex items-center gap-2 w-max p-1 px-2 rounded-full bg-blue-50  '>
                                <FontAwesomeIcon icon="bowl-food" className='text-gray-400' />
                                <span className='bg-blue-100 rounded-full p-1 px-2 shadow-sm text-gray-500'>feeds stock</span>
                            </nav>
                            <nav className='flex items-center gap-2 text-green-50'>
                                <FontAwesomeIcon icon="clock" />
                                <span>today</span>
                            </nav>
                        </nav>

                        <nav className='mt-auto px-5 text-white'>
                            <nav className='text-sm mb-2'>approximated value in stock</nav>
                            <nav className='font-semibold text-2xl'>
                                {formatcurrency(dashboarData?.feed_and_stock.feed_stock.value_in_stock)}
                            </nav>
                        </nav>

                        <nav className='mt-auto bg-blue-300/90 border border-blue-200 rounded-md p-5 text-sm'>
                            <nav className='flex items-center gap-2'><FontAwesomeIcon className='text-blue-100' icon='check-double' /><span>{formatnumber(dashboarData?.feed_and_stock.feed_stock.number_of_feeds)} feeds types </span></nav>
                            <nav className='flex items-center gap-2'><FontAwesomeIcon className='text-blue-100' icon='check-double' /><span>{new Intl.NumberFormat('en-GB', {
                                style: 'unit',
                                unit: 'kilogram',
                                unitDisplay: 'short',
                            }).format(dashboarData?.feed_and_stock.feed_stock.quantity_of_feeds_left)} of all feeds left</span></nav>
                        </nav>

                        <Link as='button' href='/stock/feeds/manage' className=' flex ring-1 ring-blue-400 ring-offset-1 p-2 bg-blue-600 mt-auto text-xl rounded-md text-white items-center justify-center gap-2'>
                            <span className='font-semibold'>manage</span>
                            <FontAwesomeIcon size="sm" icon="arrow-right" />
                        </Link>
                    </nav>
                </nav>

            </div>

        </div>

    )
}
