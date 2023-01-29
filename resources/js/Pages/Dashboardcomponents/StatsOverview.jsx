import React,{useState,useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { usePage } from '@inertiajs/inertia-react'
import { formatcurrency } from '../../api/Util'
function StatsOverview() {
    const{todays_stats} = usePage().props

    
    function formatExpenseValue(value){
        let cv;
        if(value > 9){
            cv = "9+"
        }else{
            cv = value
        }
        return cv;
}
    return (
        <div className='grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:px-6'>
            <nav className='flex item-center gap-3 p-5 '>
                <nav className='flex items-center justify-center w-14 h-14   rounded-md shadow-md text-slate-700  p-5 bg-slate-200 '>
                    <FontAwesomeIcon icon="bag-shopping" />
                </nav >
                <nav className='flex flex-col justify-between'>
                    <nav className='text-muted text-sm flex items-center gap-3 justify-between'>
                        <span>
                            Today's sales
                        </span>
                        <span className='text-green-600  p-1 rounded-full text-xs w-8 h-8 grid place-items-center' > +30%</span>
                    </nav>
                    <nav className='text-slate-700 font-bold  '>{formatcurrency(todays_stats.todays_sale)}</nav>
                </nav>
            </nav>
            <nav className='flex item-center gap-3 p-5 '>
                <nav className='flex items-center justify-center w-14 h-14   rounded-md shadow-md text-slate-700  p-5 bg-slate-200 '>
                    <FontAwesomeIcon icon="money-check-dollar" />
                </nav >
                <nav className='flex flex-col justify-between'>
                    <nav className='text-muted text-sm flex items-center gap-3 justify-between'>
                        <span>
                            Today's expenses
                        </span>
                        <span className='text-white bg-red-500   p-1 rounded-full text-xs w-6 h-6 grid place-items-center ' >{formatExpenseValue(todays_stats.todays_expenses.number)}</span>
                    </nav>
                    <nav className='text-slate-700 font-bold  '>{formatcurrency(todays_stats.todays_expenses.amount)}</nav>
                </nav>
            </nav>
            <nav className='flex item-center gap-3 p-5 '>
                <nav className='flex items-center justify-center w-14 h-14   rounded-md shadow-md text-slate-700  p-5 bg-slate-200 '>
                    <FontAwesomeIcon icon="arrow-trend-up" />
                </nav >
                <nav className='flex flex-col justify-between'>
                    <nav className='text-muted text-sm flex items-center gap-3 justify-between'>
                        <span>
                            current stock value
                        </span>
                    </nav>
                    <nav className='text-slate-700 font-bold  '>{formatcurrency(todays_stats.current_stock_value)}</nav>
                </nav>
            </nav>

        </div>
    )
}

export default StatsOverview