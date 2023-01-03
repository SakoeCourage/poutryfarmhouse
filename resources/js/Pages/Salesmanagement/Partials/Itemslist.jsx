import React,{useState,useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Custominput from '../../../components/Custominput'
export default function Itemslist(props) {
  const [items, setItems] = useState([
    { product_id: '', quantity: '', price: '', amount: '' }
  ])

  let addNewItem = () => {
    setItems((ci => ci = [...ci, { product_id: '', quantity: '', price: '', amount: '' }]))
  }

  let removeItemat = (i) => {
    let newitems = [...items];
    newitems.splice(i, 1);
    setItems(newitems)
  }

  let handleChange = (i, data) => {
    let newitems = [...items];
    if (data) {
      newitems[i]["product_id"] = data.id;
      newitems[i]["price"] = data.unit_price;
      setItems(newitems)
    }
  }
  let calculateTotalAmount = () => {
    let totalamount = 0;
    if (items) {
      for (const { amount } of items) {
        totalamount += Number(amount)
      }
    }
    props.getTotal(totalamount.toFixed(2))
  }

  let handleValueChange = (i, name, data) => {
    let newitems = [...items];
    if (data) {
      newitems[i][name] = data
      setItems(newitems)
    }
  }

  let calculateAmount = (i) => {
    if (items[i].price && items[i].quantity) {

      return ((Number(items[i].price) * Number(items[i].quantity)).toFixed(2))
    }else{
        return ''
    }
  }
  let getProductfromId = (id) => {
    return props.products.find((item => item.id === Number(id)))
  }
  useEffect(() => {
    setItems([{ product_id: '', quantity: '', price: '', amount: '' }])
    console.log('reset')
  }, [props.reset])


  useEffect(() => {
    calculateTotalAmount()
    props.getData(items)
  }, [items])

  return <dt className='w-full relative'>
    <dl className='flex items-center gap-1 ml-10'>
      <dd className='text-indigo-500  basis-5/12  '>product</dd>
      <dd className='text-indigo-500  basis-2/12 ml-5 '>quantity</dd>
      <dd className='text-indigo-500  basis-2/12 ml-5 '>price</dd>
      <dd className='text-indigo-500  basis-2/12 ml-5  grow'>amount</dd>
      <button onClick={() => addNewItem()} className='text-gray-500  shrink text-right '><FontAwesomeIcon className=' h-3 w-3 p-1 rounded-full bg-gray-100 shadow-md  ' icon="plus" /></button>
    </dl>

    <div className='flex flex-col gap-3 ' >
      {items.map((item, i) => <div className={`flex items-center gap-1  salelist `} data-index={i + 1} key={i}>
        <nav className='text-gray-500 basis-5/12 '>
          <span className="space-y-1 text-sm">

            {props.errors[`customer_purchases.${i}.product_id`] && <div className=' mt-2 relative '>
              <nav className="cursor-pointer z-30 font-awesome  gap-1  flex items-center absolute right-2 top-3">
                <FontAwesomeIcon icon="warning" className="text-red-400 h-5 w-5 order-2 " />
                <span className="  text-sm text-red-400 backdrop-blur-sm bg-white/30 error ">{props.errors[`customer_purchases.${i}.product_id`]}</span>
              </nav>
            </div>}

            <select onChange={(e) => handleChange(i, getProductfromId(e.target.value))} className=" block relative border border-gray-200 px-5 min-w-[12rem] py-3 focus:border-none outline-none rounded w-full ring-offset-1 focus:ring-2 transition-all ease-out duration-150" type="text" placeholder="Enter user first name" >
              <option value='' >select product</option>
              {props.products.map((product) => {
                return (
                  <option key={product.id} value={product.id}>{product.name}</option>
                )
              })}
            </select>
          </span>
        </nav>
        <nav className='text-gray-500 basis-2/12'>
          <Custominput error={props.errors[`customer_purchases.${i}.quantity`]} value={item.quantity} placeholder="enter quantity" getValue={(value) => handleValueChange(i, "quantity", value)} />
        </nav>
        <nav className='text-gray-500 basis-2/12'>
          <Custominput readOnly={true} value={item.price} placeholder="enter price" getValue={() => void (0)} />
        </nav>
        <nav className='text-gray-500 basis-2/12 grow'>
          <Custominput readOnly={true} value={calculateAmount(i)} placeholder="enter amount" getValue={(value) => handleValueChange(i, 'amount', value)} type="number" />
        </nav>
        <button onClick={() => removeItemat(i)} className='text-gray-500  shrink text-right '><FontAwesomeIcon className=' h-3 w-3 p-1 rounded-full bg-gray-100 shadow-md  ' icon="minus" /></button>
      </div>)
      }
    </div>
  </dt>
}
