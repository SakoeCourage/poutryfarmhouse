import React, { useState, useEffect } from 'react'
import Custominput from '../../components/Custominput'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Api from '../../api/Api'
import Loadingspinner from '../../components/Loadingspinner'

function Expenseitem(props) {
    const [isReadOnly, setisReadOnly] = useState(true)
    const [isLoading, setisLoading] = useState(false)
    const [errors, setErrors] = useState({})
    const [currentData, setCurrentData] = useState({
        name: '',
        amount: '',
        id: ''
    })
    useEffect(() => {
        setCurrentData((value => value = { ...value, name: props.name ?? '' }))
        setCurrentData((value => value = { ...value, amount: props.amount ?? '' }))
        setCurrentData((value => value = { ...value, id: props.id ?? '' }))
        setCurrentData((value => value = { ...value, stock_id: props.stock_id ?? '' }))
    }, [])

    let deleteExpense = () => {
      
            props.setLoading()
            Api.delete(`/expense/delete/${currentData.id}`).then(res => {
                setisLoading(false)
                console.log(res.data)
                props.reloadData()
            }).catch(err => {
                setisLoading(false)
                err.response?.data?.errors && setErrors(err.response.data.errors)

            })
        }
    
    
    let updateExpense = () => {
        if (!currentData.id) {
            console.log(currentData)
            setisLoading(true)
           Api.post('/expense/create',currentData).then(res=>{
                setCurrentData(res.data)
                setErrors({})
            setisLoading(false)
            setisReadOnly(true)
           }).catch(err=>{
            err.response?.data?.errors && setErrors(err.response.data.errors)
            setisLoading(false)
           })
        } else {
            setisLoading(true)
            Api.put(`/expense/update/${currentData.id}`, currentData).then(res => {
                console.log(res.data)
                setisLoading(false)
                setisReadOnly(true)
            }).catch(err => {
                err.response?.data?.errors && setErrors(err.response.data.errors)
                setisLoading(false)
            })
        }
    }
  



    


    return <div className='flex items-center gap-2'>
        <Custominput error={errors.name && errors.name[0]} value={currentData.name} readOnly={isReadOnly} placeholder="expense name" getValue={(value) => setCurrentData({ ...currentData, name: value })} />
        <Custominput error={errors.amount && errors.amount[0]} number={currentData.amount} readOnly={isReadOnly} placeholder="expense Amount" getValue={(value) => setCurrentData({ ...currentData, amount: value })} type="number" />
        {isLoading && <Loadingspinner />}
        {(isReadOnly && !isLoading) && <FontAwesomeIcon onClick={() => setisReadOnly(!isReadOnly)} className='p-3 rounded-full bg-white text-gray-400 hover:text-gray-700 shadow-md cursor-pointer' icon="pen" />}
        {(!isReadOnly && !isLoading) && <nav className='flex items-center gap-1'>
            <FontAwesomeIcon className='p-3 rounded-full bg-white text-gray-400 hover:text-gray-700 shadow-md cursor-pointer' icon="floppy-disk" onClick={() => updateExpense()} />
            <FontAwesomeIcon className='p-3 rounded-full bg-white text-red-400 hover:text-red-600 shadow-md cursor-pointer' icon="trash" onClick={() => deleteExpense()} />
        </nav>}
    </div>
}




export default function Editexpenses(props) {
    const [expenses, setExpenses] = useState([])
    const [isLoading ,setisLoading]=useState(true)

    let fetchExpensedata = () =>{
        setisLoading(true)
        Api.get(`/expense/${props.id}/fromstock`).then(res => {
            setExpenses(res.data.expenses)
          
            console.log(res.data.expenses)
            setisLoading(false)
        })
    }
    useEffect(() => {
        fetchExpensedata()
    }, [])

    let removeitemat = (i,name) => {
        setExpenses((values) => values.filter((value, index) =>  value.id != i ))
     
    }
    let addnewExpenses = () => {
        setExpenses((values => values = [...values,
            { 'stock_id': props.id, 'amount': '', name: '' }
        ]))   
    }

    
    
  

    return (
        <div className='w-full  relative isolate min-h-screen '>
                {isLoading && <div className=' h-full w-full absolute inset-0 z-20 backdrop-blur-sm flex items-center justify-center'>
                <Loadingspinner />
            </div>

            }
            <div className='mx-auto px-10 pt-10'>
            <dl>
                <div className='flex items-center p-2 text-gray-500'>
                    <span className='w-full'>Expense name</span>
                    <span className='w-full'>Amount</span>
                </div>
                <ul className="w-full flex flex-col gap-5">
                    {expenses.map((expense, i) => {
                        return <li key={i}>
                            <Expenseitem reloadData={()=>fetchExpensedata()} setLoading={()=>setisLoading(true)}  index={i} id={expense.id} name={expense.name} stock_id={expense.stock_id} removeitemat={removeitemat} amount={expense.amount}  />
                        </li>
                    })}
                </ul>
                <div className='flex items-center justify-center mt-5'>
                    <button onClick={() => addnewExpenses()} className="  bg-blue-300 self-center text-white  border border-gray-300  text-xs rounded-full shadow-lg ">
                        <FontAwesomeIcon icon="plus-circle" className='h-8 w-8' size="2xl" />
                    </button>
                </div>
            </dl>
            </div>
        </div>
    )
}
