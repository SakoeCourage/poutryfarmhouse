import React,{useState,useEffect} from 'react'
import Discountform from './Definitionforms/Discountform'
import Primarybutton from '../../components/Primarybutton'
import SimpleBar from 'simplebar-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Modal from '../../components/Modal'
export default function Discountdefinition() {
  const [showform, setShowForm] = useState(false)
  useEffect(() => {
    console.log('mounted discount definition')
  }, [])
  
    return (
        <div>
            { showform && <Modal closeModal={()=>setShowForm(false)}>
               <Discountform closeModal={()=>setShowForm(false)}/>
                </Modal>
             }
            <div className='flex items-center flex-col md:flex-row'>
                <nav className=' basis-4/12'>
                    <nav className='flex flex-col justify-between'>
                        <h1 className='font-semibold'>Discount rate</h1>
                        <span className='mt-10 text-sm text-gray-500'>
                            Define new applicable discounted rates to be applied to a product
                             Click on define new discount to add new discount
                        </span>
                        <Primarybutton onClick={()=>setShowForm(true)} className="w-full mt-10" text="Define new discounts" />
                    </nav>
                </nav>
                <SimpleBar className='w-full basis-8/12 min-h-full bg-indigo-100 max-h-[30rem]  rounded-md'>
                    <table className="px-5 w-full text-sm text-left text-gray-500 relative rounded-md">
                        <thead className="sticky top-0 bg-indigo-100 ">
                            <tr className='text-xs text-gray-700   shadow-sm'>

                                <th scope="col" className="py-3 px-6 min-w-[10rem]">
                                    discount code
                                </th>
                                <th scope="col" className="py-3 px-6 min-w-[10rem]">
                                    discount rate
                                </th>
                                <th scope="col" className="py-3 px-6 min-w-[10rem]">
                                    applicable products
                                </th>
                                <th scope="col" className="py-3 px-6 min-w-[10rem]">
                                    Status
                                </th>
                                <th scope="col" className="py-3 px-6 min-w-[10rem]">
                                    Action
                                </th>

                            </tr>
                        </thead>
                        <tbody>
                            {[0, 0, 0, 0, 0, 0, 0, 0, 0, 0,].map((item, i) => {
                                return (
                                    <tr key={i} className={` border-b hover:bg-gray-200 ${i % 2 == 0 ? 'bg-gray-50' : 'bg-gray-50'}`}>

                                        <td className="py-2 px-6">
                                            20/12/1992
                                        </td>
                                        <td className="py-2 px-6 ">
                                            Bald Eggs
                                        </td>
                                        <td className="py-2 px-6 ">
                                        <button  className='border border-gray-500 p-2 rounded-full text-xs'>
                                           <span>view</span>
                                        </button>
                                        </td>
                                        <td className="py-2 px-6 ">
                                        <button  className='border border-green-500 p-2 rounded-full text-xs'>
                                           <span>active </span>
                                        </button>
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


                </SimpleBar>

            </div>

        </div>
    )
}
