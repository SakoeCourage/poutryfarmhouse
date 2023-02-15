import React,{useEffect,useState} from 'react'
import Api from '../../api/Api'
import axios from 'axios'
import Buttonsubmit from '../../components/Buttonsubmit'
import Modal from '../../components/Modal'
import { dateReformat } from '../../api/Util'
import Primarybutton from '../../components/Primarybutton'
import SimpleBar from 'simplebar-react'
import Emptyresults from '../../components/Emptyresults'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Feedform from './Definitionforms/Feedform'

export default function FeedDefinition() {
    const [feeds,setFeeds] = useState([])
    const [nextPage,setNextPage] =useState(null)
    const [isLoading,setIsLoading] = useState(true)
    const [showform,setShowForm] = useState(false)
    const getAllFeed = () =>{
        setIsLoading(true)
        Api.get('/feed/all').then(res=>{
        setIsLoading(false)
            setFeeds(res.data.feed.data);
            setNextPage(res.data.feed.next_page_url)
        }).catch(err=>console.log(err))
    }
    const getMoreData = () =>{
        setIsLoading(true)
        axios.get(nextPage).then(res=>{
            setIsLoading(false)
            setFeeds((cd)=>cd =[...cd,...res.data.feed.data])
            setNextPage(res.data.feed.next_page_url)
        }).catch(err=>console.log(err))
    }

    const handleCloseModal=() =>{
        setShowForm(false)
        getAllFeed()
   } 

    useEffect(() => {
      getAllFeed()
    }, [])
    
  return (
<div>
        {showform && <Modal closeModal={() => setShowForm(false)}>
                <Feedform closeModal={handleCloseModal} />
            </Modal>
            }
         <div className='flex items-start flex-auto flex-col md:flex-row  justify-center'>
                <nav className={`w-[100%] transition-all md:w-4/12 ${!Boolean(feeds.length) && 'md:w-[100%]'}`}>
                    <nav className={`flex flex-col justify-start ${!Boolean(feeds.length) && 'items-center'} `}>
                        <h1 className='font-semibold'>Poultry Feeds</h1>
                        <span className='mt-10 text-sm text-gray-500 max-w-md'>
                            Define poulty feeds  each with type
                            in the colum provided. Click on define new feed to add new feed
                        </span>
                        <Primarybutton onClick={() =>setShowForm(true)} className="w-full mt-10" text="Define new feed" />
                    </nav>
                </nav>
                {Boolean(feeds.length) && <SimpleBar className='w-full basis-8/12 min-h-full bg-indigo-100   rounded-md'>
                    <table className="px-5 w-full text-sm text-left text-gray-500 relative rounded-md">
                        <thead className="sticky top-0 bg-indigo-100 ">
                            <tr className='text-xs text-gray-700   shadow-sm'>

                                <th scope="col" className="py-3 px-6 min-w-[10rem]">
                                    record date
                                </th>
                                <th scope="col" className="py-3 px-6 min-w-[10rem]">
                                    feed name
                                </th>
                                <th scope="col" className="py-3 px-6 min-w-[10rem]">
                                    cost per kg
                                </th>
                                <th scope="col" className="py-3 px-6 min-w-[10rem]">
                                    Action
                                </th>

                            </tr>
                        </thead>
                        <tbody>
                            {feeds.map((feed, i) => {
                                return (
                                    <tr key={i} className={` border-b hover:bg-gray-200 ${i % 2 == 0 ? 'bg-gray-50' : 'bg-gray-50'}`}>

                                        <td className="py-2 px-6">
                                            {dateReformat(feed.created_at)}
                                        </td>
                                        <td className="py-2 px-6 ">
                                            {feed.feed_name}
                                        </td>
                                        <td className="py-2 px-6 ">
                                            {feed.cost_per_kg}
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
                        <Buttonsubmit processing={isLoading} onClick={() => getMoreData(nextPage)} className="text-xs w-full my-4" text="load more data" />
                    </div>}
                </SimpleBar> 
            }
            </div>
           

    </div>
  )
}
