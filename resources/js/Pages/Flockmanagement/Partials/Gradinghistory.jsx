import React,{useEffect} from 'react'
import Api from '../../../api/Api'

export default function Gradinghistory() {
    useEffect(() => {
        Api.get('/grading/history').then(res=>{
            console.log(res)
        }).catch(err=>console.log(err))
    }, [])
    
  return (
    <div>Gradinghistory</div>
  )
}
