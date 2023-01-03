import React, { useState, useEffect, useRef } from 'react'
import Primarybutton from '../../components/Primarybutton'
import SimpleBar from 'simplebar-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Productform from './Definitionforms/Productform'
import Modal from '../../components/Modal';
import Api from "../../api/Api"
import axios from 'axios'
import { formatcurrency, dateReformat } from '../../api/Util'
import Buttonsubmit from '../../components/Buttonsubmit'
import Emptyresults from '../../components/Emptyresults'

export default function Productdefinition() {
    const [showform, setShowForm] = useState(false)
    const [products, setProducts] = useState([])
    const [nextPage, setNextPage] = useState(null)
    const [isLoading, setisLoading] = useState(false)
    const [fetchmore,setfectchmore] = useState(false)
    let fetchProducts = () => {
        setisLoading(true)
        Api.get('/definitions/product/all').then(res => {
            console.log(res.data)
            setisLoading(false)
            setProducts(res.data.products?.data)
            setNextPage(cv => res.data.products?.next_page_url)
        })

    }
    let fetchMoreProducts = (np) => {
       

            setisLoading(true)
            axios.get(np).then(res => {
                setisLoading(false)
                setfectchmore(false)
                setProducts([...products, ...res.data.products?.data])
                setNextPage(res.data.products?.next_page_url)
            })
    }
    let documentPage = useRef()
     function infinityScroll(){
        let scrolled = documentPage.current.scrollTop + documentPage.current.getBoundingClientRect().height
        let offsetY = documentPage.current.firstElementChild.offsetHeight
        let percentagescrolled = (scrolled / offsetY) * 100
        if ((percentagescrolled === 100) && (!isLoading)) {
            setfectchmore(true)
        }

    }
    useEffect(() => {
        fetchProducts()
        window.addEventListener('scroll', infinityScroll, true)
        return () => window.removeEventListener('scroll', infinityScroll, true)
    }, [])

    useEffect(() => {
        if(fetchmore && nextPage){
            fetchMoreProducts(nextPage)
        }
    }, [fetchmore])

   

    let handleCloseModal = () => {
        fetchProducts()
        setShowForm(false)
    }
    return (
        <div>
            {showform && <Modal closeModal={() => setShowForm(false)}>
                <Productform closeModal={handleCloseModal} />
            </Modal>
            }
            <div className='flex items-center flex-col md:flex-row'>
                <nav className=' basis-4/12'>
                    <nav className='flex flex-col justify-between'>
                        <h1 className='font-semibold'>Poultry products</h1>
                        <span className='mt-10 text-sm text-gray-500'>
                            Define poulty products  each with unit prices
                            in the colum provided. Click on define new product to new product
                        </span>
                        <Primarybutton onClick={() => setShowForm(true)} className="w-full mt-10" text="Define new product" />
                    </nav>
                </nav>
                {products.length ? <SimpleBar scrollableNodeProps={{ ref: documentPage }} className='w-full basis-8/12 min-h-full bg-indigo-100 max-h-[30rem]  rounded-md'>
                    <table className="px-5 w-full text-sm text-left text-gray-500 relative rounded-md">
                        <thead className="sticky top-0 bg-indigo-100 ">
                            <tr className='text-xs text-gray-700   shadow-sm'>

                                <th scope="col" className="py-3 px-6 min-w-[10rem]">
                                    record date
                                </th>
                                <th scope="col" className="py-3 px-6 min-w-[10rem]">
                                    product name
                                </th>
                                <th scope="col" className="py-3 px-6 min-w-[10rem]">
                                    unit price
                                </th>
                                <th scope="col" className="py-3 px-6 min-w-[10rem]">
                                    Action
                                </th>

                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, i) => {
                                return (
                                    <tr key={i} className={` border-b hover:bg-gray-200 ${i % 2 == 0 ? 'bg-gray-50' : 'bg-gray-50'}`}>

                                        <td className="py-2 px-6">
                                            {dateReformat(product.created_at)}
                                        </td>
                                        <td className="py-2 px-6 ">
                                            {product.name}
                                        </td>
                                        <td className="py-2 px-6 ">
                                            {formatcurrency(product.unit_price)}
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
                    {nextPage && <div className='w-full flex items-center justify-center'>
                        <Buttonsubmit processing={isLoading} onClick={() => fetchMoreProducts(nextPage)} className="text-xs w-full my-4" text="load more data" />
                    </div>}

                </SimpleBar>
                :
                <Emptyresults onClick={()=>setShowForm(true)} inscription="add new product" className="mt-10" />
}
            </div>

        </div>
    )
}
