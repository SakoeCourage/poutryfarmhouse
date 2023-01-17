import { useState,useEffect,useRef,useMemo } from 'react'
import React from 'react'
import Custominput from '../../components/Custominput'
import Buttonsubmit from '../../components/Buttonsubmit'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Primarybutton from '../../components/Primarybutton'
import { Link } from '@inertiajs/inertia-react'
import { usePage } from '@inertiajs/inertia-react'
import {formatcurrency} from '../../api/Util'

export default function Newstock() {
  const {product_stock,feed_stock} =usePage().props
  
  useEffect(() => {
    console.log(product_stock)
  }, [])
  
  return (
    <div className='container  h-auto py-10 md:py-0 mx-auto flex items-center justify-center md:h-full '>
      <div className=' max-w-3xl flex-col md:flex-row flex items-center gap-10 flex-auto  mx-auto w-max justify-center '>
          
          <nav className='flex transform hover:scale-105 transition-transform  relative flex-col isolate gap-2 p-2 w-full h-full shadow-md rounded-md  aspect-square  '>    
           <nav className='absolute -z-10  inset-0 opacity-90 blur-[1px] rounded-md shadow-md bg-gradient-to-br from-purple-300 via-pink-400 to-pink-500'></nav>
        <nav className='flex items-center justify-between'>
        <nav className='flex items-center gap-2 w-max p-1 px-2 rounded-full bg-pink-50  '>
              <FontAwesomeIcon icon="cart-shopping" className='text-gray-400'/>
              <span className='bg-pink-100 rounded-full p-1 px-2 shadow-sm text-gray-500'>products stock</span>
            </nav>
          <nav className='flex items-center gap-2 text-pink-50'>
              <FontAwesomeIcon icon="clock"/>
              <span>today</span>
          </nav>
        </nav>

            <nav className='mt-auto px-5 text-white'>
              <nav className='text-sm mb-2'>approximated value in stock</nav>
              <nav className='font-semibold text-3xl'>
                {formatcurrency(product_stock.value_in_stock)}
              </nav>
            </nav>
            
            <nav className='mt-auto bg-pink-300/90 border border-pink-200 rounded-md p-5 text-sm'>
              <nav className='flex items-center gap-2'><FontAwesomeIcon className='text-pink-100' icon='check-double'/><span>{new Intl.NumberFormat().format(product_stock.number_of_products)} products found</span></nav>
              <nav className='flex items-center gap-2'><FontAwesomeIcon className='text-pink-100' icon='check-double'/><span>{new Intl.NumberFormat().format(product_stock.quantity_of_products)} products quantity in stock</span></nav>
            </nav>

            <Link as='button' href='/stock/products/manage' className=' flex ring-1 ring-pink-400 ring-offset-1 p-2 bg-pink-600 mt-auto text-xl rounded-md text-white items-center justify-center gap-2'>
              <span className='font-semibold'>manage</span>
              <FontAwesomeIcon size="sm" icon="arrow-right"/>
            </Link>
          </nav>


          <nav className='flex transform hover:scale-105 transition-transform  relative flex-col isolate gap-2 p-2 w-full h-full shadow-md rounded-md  aspect-square  '>    
           <nav className='absolute -z-10  inset-0 opacity-90 blur-[1px] rounded-md shadow-md bg-gradient-to-br from-violet-300 via-green-400 to-green-500'></nav>
        <nav className='flex items-center justify-between'>
        <nav className='flex items-center gap-2 w-max p-1 px-2 rounded-full bg-green-50  '>
              <FontAwesomeIcon icon="bowl-food" className='text-gray-400'/>
              <span className='bg-green-100 rounded-full p-1 px-2 shadow-sm text-gray-500'>feeds stock</span>
            </nav>
          <nav className='flex items-center gap-2 text-green-50'>
              <FontAwesomeIcon icon="clock"/>
              <span>today</span>
          </nav>
        </nav>

            <nav className='mt-auto px-5 text-white'>
              <nav className='text-sm mb-2'>approximated value in stock</nav>
              <nav className='font-semibold text-3xl'>
                {formatcurrency(feed_stock.value_in_stock)}
              </nav>
            </nav>
            
            <nav className='mt-auto bg-green-300/90 border border-green-200 rounded-md p-5 text-sm'>
              <nav className='flex items-center gap-2'><FontAwesomeIcon className='text-green-100' icon='check-double'/><span>{new Intl.NumberFormat().format(feed_stock.number_of_feeds)} feeds types </span></nav>
              <nav className='flex items-center gap-2'><FontAwesomeIcon className='text-green-100' icon='check-double'/><span>{new Intl.NumberFormat('en-GB',{
               style: 'unit',
               unit: 'kilogram',
               unitDisplay: 'short',
              }).format(feed_stock.quantity_of_feeds_left)} of all feeds left</span></nav>
            </nav>

            <Link as='button' href='/stock/feeds/manage' className=' flex ring-1 ring-green-400 ring-offset-1 p-2 bg-green-600 mt-auto text-xl rounded-md text-white items-center justify-center gap-2'>
              <span className='font-semibold'>manage</span>
              <FontAwesomeIcon size="sm" icon="arrow-right"/>
            </Link>
          </nav>
    

      </div>

    </div>
  )
}
