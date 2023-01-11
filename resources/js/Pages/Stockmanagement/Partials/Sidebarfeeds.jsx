import React,{useState,useEffect} from 'react'
import Api from '../../../api/Api'
import SimpleBar from 'simplebar-react'
import { Loader } from './Sidebarproducts'
import Primarybutton from '../../../components/Primarybutton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'

export default function Sidebarfeeds(props) {
    const [feeds,setFeeds] = useState([])
    const [currentId, setCurrentId] = useState(null)
    const [nextPage,setNextPage] = useState(null)
    const [isLoading,setIsLoading] = useState(true)
    const [total,setTotal] = useState(null)
    const getFeed = () =>{
      Api.get('/feed/all').then(res=>{
        console.log(res.data)
        setFeeds(res.data.feed.data)
        setNextPage(res.data.feed.next_page_url)
        setTotal(res.data.feed.total)
        setIsLoading(false)
      }).catch(err=>console.log(err))
    }
    const getMoreProducts = () =>{
      setIsLoading(true)
      axios.get(nextPage).then(res=>{
        console.log(res.data)
        setFeeds((cp)=>cp=[...cp,...res.data.feed.data])
        setNextPage(res.data.feed.next_page_url)
        setIsLoading(false)
      }).catch(err=>console.log(err))
    }
  
    const handleProductChange = (id) =>{
      props.setFeed(id)
      setCurrentId(id)
    }
    useEffect(() => {
      getFeed()
    }, [])
  
    
    return (
      <SimpleBar className=' w-[15rem] sticky top-0 h-full bg-white'>
      <nav className='h-full w-full  sticky top-0 flex flex-col gap-1  '>
         <nav  className="cursor-pointer sticky top-0 bg-indigo-100 z-20 shadow-sm rounded-md px-7 py-2  truncate flex items-center gap-2    ">
            <FontAwesomeIcon className='h-4 w-4 p-1 opacity-70 shadow-md rounded-full text-indigo-400 bg-white' icon='bowl-food' size='xs'/>
             <span className='font-semibold flex items-center justify-between'><span>Feeds</span>  <span className='text-xs text-gray-400 ml-3'>  {total && "found " + total}</span></span>
          </nav>
          { feeds.map(feed=>{
            return(
              <nav onClick={()=>handleProductChange(feed.id)} key={feed.id} className={`cursor-pointer hover:shadow-md z-10 bg-gray-100 shadow-sm rounded-md px-7 py-2  truncate flex items-center gap-2 relative productitem ${currentId == feed.id && 'active'}  `}  >
              <span>{feed.feed_name}</span>
              <FontAwesomeIcon className='text-indigo-600 absolute right-2 hidden iconforward' size='xs' icon='arrow-right'/>
              </nav>
              )
            })}
            {!isLoading && nextPage && <Primarybutton onClick={()=>getMoreProducts()} text=" more " className="self-center text-sm w-full rounded-md"/>}
  
            {isLoading && <Loader />}
            {isLoading && <Loader />}
            {isLoading && <Loader />}
            {isLoading && <Loader />}
      </nav>
  </SimpleBar>
    )
}
