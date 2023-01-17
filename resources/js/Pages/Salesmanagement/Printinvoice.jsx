import React,{useState,useEffect,useContext,forwardRef} from 'react'
import { printContext } from './context/Printcontext'
import { formatcurrency,dateReformat } from '../../api/Util'
import Primarybutton from '../../components/Primarybutton'

 const Printinvoice = forwardRef ((props,ref)=>{
    const [invoiceData,setInvoiceData] =useState([])
    const [products,setProducts] = useState([])
    const {printdata, setPrintdata} = useContext(printContext)
    useEffect(() => {
        if(printdata){
          const {invoice,products}= printdata
          setInvoiceData(invoice[0])
          setProducts(products)
        }
    }, [])
  return (
    <div ref={ref} className=' container mx-auto pt-5'>
            <div className='max-w-3xl mx-auto p-10'>
              <nav className='flex items-center justify-between'>
              <nav className='flex items-center gap-2'>
                <h1 className="text-4xl font-bold text-gray-600  flex flex-col justify-center items-center mb-1 space-x-3">
                  <span>Poultry</span>
                  <span className='text-sm block text-center'>Farm House</span>
                </h1>
                <h1 className='text-4xl text-gray-600 border-gray-400 border-l-2 pl-1 '>INVOICE</h1>
                </nav>

                <nav className='text-xs text-gray-500'>
                  <nav className=' gap-1 italic'>
                    <span>GK-0256-6568-6555</span>
                  </nav>
                  <nav className=' gap-1 italic'>
                    <span>P.O BOX poultry house c/o house of newyork</span>
                  </nav>
                  <nav className='flex items-center gap-1 italic'>
                    <span>contact us on</span>
                    <span>0203843143,0544082734</span>
                  </nav>
                </nav>
              </nav>

                <nav className='mt-20  text-gray-800'>
                    <nav className='text-sm '>
                        <nav className=' mb-5 flex items-center justify-between'>
                            <span className='text-xl'>Customer Name
                            <span className='text-sm block uppercase'>{invoiceData.customer_name}</span>
                            <span className='text-sm block uppercase'>0{invoiceData.customer_contact}</span>
                            </span>
                        </nav>  
                        <nav>
                        <span>Date Issued</span>
                        <span className='ml-3 font-semibold'>{dateReformat(invoiceData.date)}</span>
                        </nav>  
                        <nav>
                          <span> Invoice number</span>    
                          <span className='ml-3 font-semibold'>{invoiceData.invoice_number}</span>    
                        </nav>  

                    </nav>
               
                </nav>

                <nav className='mt-20 text-gray-800 flex flex-col gap-3'>
                    <nav className='flex items-center gap-1 text-sm py-2 mb-4 border-b-2'>
                      <span className='  basis-[40%]'>product</span>
                      <span className='  basis-[20%] '>unit price</span>
                      <span className='  text-center basis-[20%]' >quantity</span>
                      <span className='  basis-[20%] ' >amount</span>
                    </nav>
                    {products && products.map((product,i)=>{
                      return(
                      <nav key={i} className='flex items-center gap-1 font-semibold text-sm'>
                        <span className=' basis-[40%]'>{product.name[0].product_name} <span className='text-text-gray-500'>{product.name[0].definition_name}</span> </span>
                        <span className=' basis-[20%]'>{formatcurrency(product.unit_price)}</span>
                        <span className=' basis-[20%] text-center' >{new Intl.NumberFormat().format(product.quantity)}</span>
                        <span className=' basis-[20%]' >{formatcurrency(product.amount)}</span>
                      </nav>
                      )
                    })}
                 
                 </nav>
                 <nav className='flex items-center justify-end mt-10 text-grey-700 font-semibold'>
                      <nav className='flex items-center gap-1'>
                        <span>Total</span>
                        <span>{formatcurrency(invoiceData.total_amount)}</span>
                      </nav>
                 </nav>
                 

            </div>
            <div className=' print:hidden flex items-center justify-center '>
                    <Primarybutton icon="print" text="print invoice" className="text-xs rounded-lg my-5" onClick={()=>props.printInvoice()}/>
            </div>

    </div>
  )
  
}) 

export default Printinvoice;
