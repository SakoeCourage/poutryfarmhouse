import React,{useEffect,useState} from 'react'
import SimpleBar from 'simplebar-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Api from '../../../api/Api'
import axios from 'axios'
import Primarybutton from '../../../components/Primarybutton'


export function Loader(){
  return (
    <nav className="cursor-pointer z-10 animate-pulse bg-gray-100 shadow-sm rounded-md px-7 py-3  truncate flex items-center gap-2 relative productitem  ">
    <span  className=' bg-gray-200 rounded-full w-full h-3'> &nbsp; </span>
 </nav>
  )

}

export default function Sidebarproducts(props) {
  const [products,setProducts] = useState([])
  const [currentId, setCurrentId] = useState(null)
  const [nextPage,setNextPage] = useState(null)
  const [isLoading,setIsLoading] = useState(true)
  const [total,setTotal] = useState(null)
  const getProducts = () =>{
    Api.get('/product/all').then(res=>{
      console.log(res.data)
      setProducts(res.data.products.data)
      setNextPage(res.data.products.next_page_url)
      setTotal(res.data.products.total)
      setIsLoading(false)
    }).catch(err=>console.log(err))
  }
  const getMoreProducts = () =>{
    setIsLoading(true)
    axios.get(nextPage).then(res=>{
      console.log(res.data)
      setProducts((cp)=>cp=[...cp,...res.data.products.data])
      setNextPage(res.data.products.next_page_url)
      setIsLoading(false)
    }).catch(err=>console.log(err))
  }

  const handleProductChange = (id) =>{
    props.setProduct(id)
    setCurrentId(id)
  }
  useEffect(() => {
    getProducts()
  }, [])

  
  return (
    <SimpleBar className=' w-[15rem] sticky top-0 h-full bg-white'>
    <nav className='h-full w-full  sticky top-0 flex flex-col gap-1  '>
       <nav  className="cursor-pointer sticky top-0 bg-indigo-100 z-20 shadow-sm rounded-md px-7 py-2  truncate flex items-center gap-2    ">
          <FontAwesomeIcon className='h-4 w-4 p-1 opacity-70 shadow-md rounded-full text-indigo-400 bg-white' icon='tags' size='xs'/>
           <span className='font-semibold flex items-center justify-between'><span>Products</span>  <span className='text-xs text-gray-400 ml-3'>  {total && "found " + total}</span></span>
        </nav>
        { products.map(product=>{
          return(
            <nav onClick={()=>handleProductChange(product.id)} key={product.id} className={`cursor-pointer hover:shadow-md z-10 bg-gray-100 shadow-sm rounded-md px-7 py-2  truncate flex items-center gap-2 relative productitem ${currentId == product.id && 'active'}  `}  >
            <span>{product.name}</span>
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
