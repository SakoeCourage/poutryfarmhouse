import React, { useState, useEffect, useMemo } from 'react'
import Custominput from '../../components/Custominput'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Buttonsubmit from '../../components/Buttonsubmit'
import { useForm, usePage } from '@inertiajs/inertia-react'
import { formatcurrency } from '../../api/Util'
import { motion } from 'framer-motion'
import { Link } from '@inertiajs/inertia-react'
import Modal from '../../components/Modal'
import Api from '../../api/Api'

export default function Newexpense() {
  const [resetcustominput, setResetcustominput] = useState(false)
  const [expensibleList, setExpensibleList] = useState([]);
  const [expense, setExpenses] = useState([{
    item: '',
    amount: '',
  }])
  const { data, setData, errors, post, processing, reset } = useForm({
    description: '',
    items: null,
    total: null,
  })
  let addNewItem = () => {
    setExpenses((ci => ci = [...ci, {
      item: '',
      amount: '',
    }]))

  }

  let calculateTotalAmount = () => {
    let totalamout = 0;
    for (const { amount } of expense) {
      totalamout += Number(amount)
    }
    setData('total', totalamout)
    return totalamout;
  }

  const totalAmount = useMemo(() => calculateTotalAmount(), [expense])

  let removeItemat = (i) => {
    if (!(expense.length <= 1)) {
      let newitems = [...expense];
      newitems.splice(i, 1);
      setExpenses(newitems)
    }
  }
  let handlereset = () => {
    reset(),
      setExpenses([{
        item: '',
        amount: '',
      }])
    setResetcustominput(!resetcustominput)

  }

  let handleChange = (i, [name, value]) => {
    let newitems = [...expense];
    newitems[i][name] = value;
    setExpenses(newitems);
  }
  useEffect(() => {
    setData('items', expense)
  }, [expense])
  useMemo(() => {

  }, [expense])

  function getExpensibleList() {
    Api.get('/expensibles/all').then(res => {
      setExpensibleList(res.data.items)
    }).catch(err => console.log(err.response))

  }
  

  useEffect(getExpensibleList, [])
  const submit = () => {
    post('/expenses/create', {
      onSuccess: () => handlereset()
    })
  }

  return (
    <div className=''>
      {/* <Modal>
          Hello
        </Modal> */}
      <nav className="flex ml-10 mb-10" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <Link href="/expenses" as='button' className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 ">
              <FontAwesomeIcon icon="grip" />
              Home
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
              <a href="#" className="ml-1 text-sm font-medium text-gray-700 hover:text-gray-900 md:ml-2 ">new expense</a>
            </div>
          </li>
        </ol>
      </nav>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: 1, scale: 1,
          transition: {
            type: 'spring',
            mass: 0.9,
            damping: 8
          }
        }}
        exit={{ opacity: 0, scale: 0.8 }}
        className='flex flex-col gap-5 max-w-3xl px-5 mx-auto'>

        <nav className=''>
          <Custominput reset={resetcustominput} label="description" error={errors.description} getValue={(value) => setData('description', value)} />
        </nav>
        <div>
          <nav className='flex items-center justify-between'>
            <span className='w-full '>Items</span>
            <span className='w-full '>Amount</span>
          </nav>
          {expense.map((expense, i) => <div key={i} className='flex items-center gap-2 mt-4'>
            <span className="space-y-1 text-sm w-full">
              {errors[`items.${i}.item`] && <div className=' mt-2 relative '>
                <nav className="cursor-pointer z-10 font-awesome  gap-1  flex items-center absolute right-2 top-3">
                  <FontAwesomeIcon icon="warning" className="text-red-400 h-5 w-5 order-2 " />
                  <span className="  text-sm text-red-400 backdrop-blur-sm bg-white/30 error ">{errors[`items.${i}.item`]}</span>
                </nav>
              </div>}
              <select onChange={(e) => handleChange(i, ['item', e.target.value])} className=" block relative border border-gray-200 px-5 min-w-[12rem] py-3 focus:border-none outline-none rounded w-full ring-offset-1 focus:ring-2 transition-all ease-out duration-150" type="text" placeholder="Enter user first name" >
                <option value='' >select an item</option>
                {expensibleList.map((list, i) => {
                  return (
                      <option key={i} value={list.item}>{list.item}</option>
                  )
                })}
              </select>
            </span>
            <Custominput type="number" error={errors[`items.${i}.amount`]} value={expense.amount} placeholder="expense Amount" getValue={(value) => handleChange(i, ["amount", value])} />
            <nav className='flex items-center gap-1'>
              <FontAwesomeIcon onClick={() => removeItemat(i)} className='p-3 rounded-full bg-white text-red-400 hover:text-red-600 shadow-md cursor-pointer' icon="trash" />
            </nav>
          </div>
          )}
        </div>
        <nav className='self-end  flex items-center gap-5 user-select-none pointer-events-none '>
          <span>Total</span>
          <span className='bg-white p-1 px-2 min-w-[12rem] '>{formatcurrency(totalAmount)}</span>
        </nav>
        <div className='flex items-center justify-center mt-5'>
          <button onClick={addNewItem} className="  bg-blue-300 self-center text-white  border border-gray-300  text-xs rounded-full shadow-lg ">
            <FontAwesomeIcon icon="plus-circle" className='h-8 w-8' size="2xl" />
          </button>
        </div>
        <Buttonsubmit onClick={submit} processing={processing} className=" self-end " text="submit" />
      </motion.div>
    </div>

  )
}
