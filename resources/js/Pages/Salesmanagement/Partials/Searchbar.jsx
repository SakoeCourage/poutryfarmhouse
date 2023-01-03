import React,{useState,useEffect,useContext} from 'react'
import Customsearchinput from '../../../components/customsearchinput'
import Api from '../../../api/Api'
import { useDebounce } from '@react-hook/debounce'
import { searchContext } from '../context/SearchContext'
import Datepicker from '../../../components/Datepicker'

export default function SearchBar(props) {

    const [processing, setProcessing] = useState(false)
    const [sendSearchRequest, setsendSearchRequest] = useDebounce(false, 300)
    const { searchResults, setSearchResults,searchKey, setSearchKey } = useContext(searchContext)
  
    const sendRequest = () => {
      Api.get(`/sales/allsales?search=${searchKey}`).then(res => {
        setSearchResults(res.data)
        setProcessing(false)
      }).catch(err => console.log(err))
    }

    const handleFilterByDate = (date) =>{
      if(date){
        Api.get(`/sales/allsales?day=${date}`).then(res => {
          setSearchResults(res.data)
          setProcessing(false)
        }).catch(err => console.log(err))
      }
    }
  
    const handlesearchrequest = (searchKey) => {
      setProcessing(true)
      setSearchKey(searchKey)
      setsendSearchRequest(!sendSearchRequest)
    }
    useEffect(() => {
      if (searchKey !== null) {
        sendRequest()
      }
    }, [sendSearchRequest])
  
    return (
      <div className='flex items-center gap-2'>
      <nav className='flex items-center gap-2 text-sm'>
        <span className='bg-blue-100 p-1 px-2  rounded-xl w-max'>filter by date</span>
        <Datepicker placeholder="select record date" getdateData={(data)=>handleFilterByDate(data)} />
      </nav>
      <Customsearchinput value={searchKey ?? ''} processing={processing}  getValue={(value) => { handlesearchrequest(value) }} placeholder="enter customer name here" />
      </div>
    )
  }