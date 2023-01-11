import React,{useEffect,useState} from 'react'
import Api from '../../api/Api'
import axios from 'axios';
import Emptyresults from '../../components/Emptyresults';
import SimpleBar from 'simplebar-react';
import Primarybutton from '../../components/Primarybutton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { dateReformat } from '../../api/Util';
import Buttonsubmit from '../../components/Buttonsubmit';
import Modal from '../../components/Modal';
import Breedform from './Definitionforms/Breedform';
export default function BreedDefinition() {
    const [breeds,setBreeds] =useState([]);
    const [nextPage,setNextPage] = useState(null);
    const [isLoading,setIsLoading] = useState(true)
    const [showform,setShowForm] = useState(false)
    
    const getAllBreeds = () =>{     
    Api.get('/breed/all').then(res=>{
        setIsLoading(false)
        setBreeds(res.data.breeds.data)
        setNextPage(res.data.breeds.next_page_url)
    }).catch(error=>console.log(error))
   } 
    const fetchMoreProducts = () =>{
        setIsLoading(true)
    axios.get(nextPage).then(res=>{
        setIsLoading(false)
        setBreeds((cd)=>cd =[...cd,...res.data.breeds.data])
        setNextPage(res.data.breeds.next_page_url)
    }).catch(error=>console.log(error))
   } 
   const handleCloseModal=() =>{
        setShowForm(false)
        getAllBreeds()
   } 


   useEffect(() => {
    getAllBreeds()
}, [])
  return (
    <div>
        {showform && <Modal closeModal={() => setShowForm(false)}>
                <Breedform closeModal={handleCloseModal} />
            </Modal>
            }
       <div className='flex items-start flex-auto flex-col md:flex-row  justify-center'>
                <nav className={`w-[100%] transition-all md:w-4/12 ${!Boolean(breeds.length) && 'md:w-[100%]'}`}>
                    <nav className={`flex flex-col justify-start ${!Boolean(breeds.length) && 'items-center'} `}>
                        <h1 className='font-semibold'>Poultry Breeds</h1>
                        <span className='mt-10 text-sm text-gray-500 max-w-md'>
                            Define poulty breeds  each with type
                            in the colum provided. Click on define new breed to add new breed
                        </span>
                        <Primarybutton onClick={() =>setShowForm(true)} className="w-full mt-10" text="Define new breed" />
                    </nav>
                </nav>
                {Boolean(breeds.length) && <SimpleBar className='w-full basis-8/12 min-h-full bg-indigo-100   rounded-md'>
                    <table className="px-5 w-full text-sm text-left text-gray-500 relative rounded-md">
                        <thead className="sticky top-0 bg-indigo-100 ">
                            <tr className='text-xs text-gray-700   shadow-sm'>

                                <th scope="col" className="py-3 px-6 min-w-[10rem]">
                                    record date
                                </th>
                                <th scope="col" className="py-3 px-6 min-w-[10rem]">
                                    breed type
                                </th>
                                <th scope="col" className="py-3 px-6 min-w-[10rem]">
                                    Action
                                </th>

                            </tr>
                        </thead>
                        <tbody>
                            {breeds.map((breed, i) => {
                                return (
                                    <tr key={i} className={` border-b hover:bg-gray-200 ${i % 2 == 0 ? 'bg-gray-50' : 'bg-gray-50'}`}>

                                        <td className="py-2 px-6">
                                            {dateReformat(breed.created_at)}
                                        </td>
                                        <td className="py-2 px-6 ">
                                            {breed.type}
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
            }
            </div>
           

    </div>
  )
}

