import React,{useEffect} from 'react'
import Api from '../api/Api'

export default function Editprofile() {
    useEffect(() => {
      Api.get('/user/profile').then(res=>{
        console.log(res.data)
      }).catch(err=>{
        console.log(err.response)
      })
    }, [])
    
  return (
    <div>Editprofile</div>
  )
}
