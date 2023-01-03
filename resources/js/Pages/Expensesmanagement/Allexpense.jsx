import React,{useEffect,useState} from 'react'
import { Inertia } from '@inertiajs/inertia'
import { usePage } from '@inertiajs/inertia-react'
import SimpleBar from 'simplebar-react'
import Simplepagination from '../../components/Simplepagination'
import { formatcurrency,dateReformat,setsort } from '../../api/Util'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Rightmodalwithbackdrop from '../../components/Rightmodalwithbackdrop'
import Viewexpense from './Viewexpense'
import { Link } from '@inertiajs/inertia-react'
import Slideover from '../../components/Slideover'
export default function Allexpense() {
    const {expenses} = usePage().props
    const [showAction,setShowAction] =useState({
        id:null
    })

  return (
    <div>
    <nav className="flex ml-9 my-3 " aria-label="Breadcrumb">
  <ol className="inline-flex items-center space-x-1 md:space-x-3">
    <li className="inline-flex items-center">
      <Link href="/expenses" as='button' className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 ">
        <FontAwesomeIcon icon="grip"/>
        Home
      </Link>
    </li>
    <li>
      <div className="flex items-center">
        <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
        <a href="#" className="ml-1 text-sm font-medium text-gray-700 hover:text-gray-900 md:ml-2 ">all expense</a>
      </div>
    </li>
  </ol>
</nav>
     <SimpleBar className="  w-full  h-full relative">
                    {showAction.id &&
                      <Slideover title="Action" onClose={()=>setShowAction({id:null})}>
                            <Viewexpense id={showAction.id} closeModal={()=>setShowAction({id:null})} />
                        </Slideover>
                    }
                <table className="px-5 w-full text-sm text-left text-gray-500 relative ">
                    <thead className="text-xs text-gray-700 bg-blue-50 sticky top-0 shadow-sm ">
                        <tr className=''>
                            <th scope="col" className="py-3  text-center  px-2 ">
                                <input type="checkbox" name="" id="" />
                            </th>
                            <th scope="col" className="py-3 px-6 min-w-[10rem] flex items-center justify-between">
                                date
                                <span className='flex flex-col'>
                                    <FontAwesomeIcon className='cursor-pointer' onClick={() => setsort('created_asc')} icon='caret-up' />
                                    <FontAwesomeIcon className='cursor-pointer' onClick={() => setsort('created_desc')} icon='caret-down' />
                                </span>
                            </th>
                            <th scope="col" className="py-3 px-6 min-w-[10rem]">
                              author
                            </th>
                            <th scope="col" className="py-3 px-6 min-w-[10rem]">
                                description
                            </th>
                         
                            <th scope="col" className="py-3 px-6 min-w-[10rem]">
                             total
                            </th>
                            <th scope="col" className="py-3 px-6 min-w-[10rem] flex items-center justify-between">
                              status
                              <span className='flex flex-col'>
                                    <FontAwesomeIcon className='cursor-pointer' onClick={() => setsort('status_asc')} icon='caret-up' />
                                    <FontAwesomeIcon className='cursor-pointer' onClick={() => setsort('status_desc')} icon='caret-down' />
                                </span>
                            </th>
                            
                            <th scope="col" className="py-3 px-6 min-w-[10rem]">
                                Action
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        {expenses.data.map((expense, i) => {
                            return (
                                <tr key={i} className={` border-b hover:bg-gray-200 ${i % 2 == 0 ? 'bg-gray-50' : 'white'}`}>
                                    
                                    <td scope="col" className="py-3  text-center  ">
                                        <input type="checkbox" name="" id="" />
                                    </td>
                                    <td className="py-2 px-6 ">
                                    {dateReformat(expense.created_at)}
                                      
                                    </td>
                                 
                                    <td className="py-2 px-6 ">
                                    {expense.author?.name}

                                    </td>
                                    <td className="py-2 px-6 ">
                                    {expense.description}

                                    </td>
                                    <td className="py-2 px-6 ">
                                        {formatcurrency(expense.total)}
                                    </td>
                                    <td className="py-2 px-6 ">
                                 
                                      {expense.status == 2 ? 'pending': expense.status == 0 ? 'declined' :'approved'}
                                    </td>
                                    <td className="py-2 px-6 ">
                                        <nav className='text-blue-500 flex items-center gap-2 cursor-pointer' onClick={()=>setShowAction({id:expense.id})}>
                                            <button> view</button>
                                            <FontAwesomeIcon icon='arrow-right' className='text-blue-500' size='sm' />
                                        </nav>
                                    </td>
                                </tr>

                            )
                        })}

                    </tbody>
                </table>
                <Simplepagination
                    from={expenses.from}
                    to={expenses.to}
                    next_page_url={expenses.next_page_url}
                    prev_page_url={expenses.prev_page_url}
                    total={expenses.total}
                    only='expenses'
                />

            </SimpleBar>



    </div>
  )
}
