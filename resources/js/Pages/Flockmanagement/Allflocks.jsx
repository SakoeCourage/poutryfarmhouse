import React,{useEffect,useState} from 'react'
import { usePage } from '@inertiajs/inertia-react'
import { AnimatePresence } from 'framer-motion'
import Rightmodalwithbackdrop from '../../components/Rightmodalwithbackdrop'
import SimpleBar from 'simplebar-react'
import Simplepagination from '../../components/Simplepagination'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { dateReformat } from '../../api/Util'
import { setsort } from '../../api/Util'
import Editflock from './Editflock'
import Modal from '../../components/Modal'
import Createflock from './Createflock'
import { emitCustomEvent } from 'react-custom-events'


export default function Allflocks() {
    const {flocks} = usePage().props
    const [currentData,setCurrentData] = useState({
      id: null,
      type:null
  })
  const [showModal, setShowModal] = useState(false)

    useEffect(() => {
      console.log(flocks)
    }, [])

  
  return (
    <div className='w-full h-full z-50'>
             <AnimatePresence>
             {currentData.id && currentData.type=='edit' &&
            <Rightmodalwithbackdrop onClose={()=>setCurrentData(cu=>cu={id: null, type:null})} title={`Edit flock`}>
              <Editflock id={currentData.id} />
            </Rightmodalwithbackdrop>
             }
             </AnimatePresence>

             {showModal && <Modal closeModal={()=>setShowModal(false)}  title="add flock">
                <div>
                    <Createflock closeModal={()=>setShowModal(false)}  />
                </div>
            </Modal>}
            <SimpleBar className="  w-full h-full relative">
            <div className='flex items-center gap-5 my-5'>
                    <button className='bg-gray-100 text-sm text-gray-500 font-bold p-1 px-3 rounded-md shadow-sm flex items-center gap-2'>
                        <FontAwesomeIcon className=' h-3 w-3 p-1 rounded-full bg-gray-100 shadow-md  ' icon="list" />
                        <span> All flocks</span></button>
                    <button onClick={()=>setShowModal(true)} className='bg-red-100 text-sm text-gray-500 font-bold p-1 px-3 rounded-md shadow-sm flex items-center gap-1'>
                        <FontAwesomeIcon className=' h-3 w-3 p-1 rounded-full bg-gray-100 shadow-md  ' icon="plus" />
                        <span>New flock</span></button>
                </div>
                <table className="px-5 w-full text-sm text-left text-gray-500 relative">
                    <thead className="text-xs text-gray-700 bg-blue-50 sticky top-0 shadow-sm ">
                        <tr className=''>
                            <th scope="col" className="py-3  text-center  px-2 ">
                                <input type="checkbox" name="" id="" />
                            </th>
                            <th scope="col" className="py-3 px-6 min-w-[10rem] flex items-center justify-between">
                                start date
                                <span className='flex flex-col'>
                                    <FontAwesomeIcon className='cursor-pointer' onClick={() => setsort('start_asc')} icon='caret-up' />
                                    <FontAwesomeIcon className='cursor-pointer' onClick={() => setsort('start_desc')} icon='caret-down' />
                                </span>
                            </th>
                            <th scope="col" className="py-3 px-6 min-w-[10rem]">
                                flock name
                            </th>
                         
                            <th scope="col" className="py-3 px-6 min-w-[10rem]">
                              in shed
                            </th>
                            <th scope="col" className="py-3 px-6 min-w-[10rem]">
                              breed
                            </th>
                            
                            <th scope="col" className="py-3 px-6 min-w-[10rem]">
                                Action
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        {flocks.data.map((flock, i) => {
                            return (
                                <tr key={i} className={` border-b hover:bg-gray-200 ${i % 2 == 0 ? 'bg-gray-50' : 'white'}`}>
                                    
                                    <td scope="col" className="py-3  text-center  ">
                                        <input type="checkbox" name="" id="" />
                                    </td>
                                    <td className="py-2 px-6 ">
                                    {dateReformat(flock.start_date)}
                                      
                                    </td>
                                 
                                    <td className="py-2 px-6 ">
                                    {flock.flock_identification_name}

                                    </td>
                                   
                                 
                                    <td className="py-2 px-6 ">
                                        {flock.pen.shed_identification_name}
                                    </td>
                                    <td className="py-2 px-6 ">
                                       {flock.breed?.name}
                                    </td>
                                    <td className="py-2 px-6 ">
                                        <nav className='text-blue-500 flex items-center gap-2'>
                                            <button onClick={()=>setCurrentData(cu=>cu={id: flock.id, type:'edit'})}>Edit</button>
                                            <FontAwesomeIcon icon='arrow-right' className='text-blue-500' size='sm' />
                                        </nav>
                                    </td>
                                </tr>

                            )
                        })}

                    </tbody>
                </table>
                <Simplepagination
                    from={flocks.from}
                    to={flocks.to}
                    next_page_url={flocks.next_page_url}
                    prev_page_url={flocks.prev_page_url}
                    total={flocks.total}
                    only='flocks'
                />

            </SimpleBar>

        </div>

  )
}
