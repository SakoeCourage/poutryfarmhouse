import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Custominput from '../../../components/Custominput'
import { usePage } from '@inertiajs/inertia-react'
export default function Itemslist(props) {
  const { productsData, products } = usePage().props
  const [items, setItems] = useState([
    { product_id: '', definition_id: '', units: '', price: '', amount: '', price_per_crate: '', crates: '' }
  ])

  let addNewItem = () => {
    setItems((ci => ci = [...ci, { definition_id: '', units: '', price: '', amount: '', price_per_crate: '', crates: '' }]))
  }

  let removeItemat = (i) => {
    let newitems = [...items];
    newitems.splice(i, 1);
    setItems(newitems)
  }

  let handleChange = (i, data) => {
    let newitems = [...items];
    newitems[i]["definition_id"] = data.definition_id;
    newitems[i]["price_per_crate"] = data.price_per_crate;
    newitems[i]["price"] = data.unit_price;
    setItems(newitems)
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
    newitems[i][name] = data
    setItems(newitems)
  }

  let handleProductChange = (i, data) => {
    let newitems = [...items];
    newitems[i]['product_id'] = data
    newitems[i]['definition_id'] = ''
    newitems[i]['price'] = ''
    newitems[i]['units'] = ''
    newitems[i]['price_per_crate'] = ''
    setItems(newitems)

  }
  let checkIfInCrate = (index) => {
    return (Boolean(products.find(pro => pro.id == items[index].product_id)?.in_crates))
  }

  let calculateAmount = (i) => {
    return ((Number(items[i].price) * items[i].units) + (Number(items[i].price_per_crate) * Number(items[i].crates))).toFixed(2)
  }


  let getProductfromId = (id) => {
    return productsData.find((item => item.definition_id === Number(id)))
  }



  useEffect(() => {
    setItems([])
    setTimeout(()=>setItems([{ product_id: '', definition_id: '', units: '', price: '', amount: '', price_per_crate: '', crates: '' }])
    ,100)
  }, [props.reset])

  let getProductsDefintionsById = (id) => {
    return productsData.filter((data) => data.id == id)
  }

  let getProductIdfromDefinition = (index) => {
    let c_p = items[index].definition_id
    return c_p;
  }


  useEffect(() => {
    calculateTotalAmount()
    props.getData(items)
  }, [items])

  useEffect(() => {
    const w_q = items.map((item, i) => {
      if (item.definition_id) {
        let units_per_crate = productsData.find(pr => Number(pr.definition_id) == Number(item.definition_id))?.units_per_crate
        let quantity = (Number(units_per_crate) * Number(item.crates)) + Number(item.units)
        item.quantity = quantity
        item.in_crates = checkIfInCrate(i)
      }
    })
  }, [items])

  useEffect(() => {
    console.log(productsData)
  }, [productsData])


  return <dt className='w-full relative'>

    <div className='flex flex-col gap-5  ' >
      {items.map((item, i) => <div className={` bg-indigo-50/50 p-3 rounded-md shadow md:shadow-none salelist`} data-index={i + 1} key={i}>
        <div className='flex md:items-center flex-col   md:gap-7  gap-2 p-2 md:p-1 ' >
          <nav className='text-gray-500  flex flex-col md:flex-row w-full flex-auto items-center gap-10 '>
            <span className="space-y-1 text-sm w-full">
              <span className="space-y-1 text-sm">
                <div className='flex items-center justify-between relative'>
                  <label htmlFor="userrole" className="font-medium">Select a Product</label><abbr className='text-red-300' title='defines users role on the system'>*</abbr>
                </div>
                {props.errors[`customer_purchases.${i}.product_id`] && <div className=' mt-2 relative '>
                <nav className="cursor-pointer z-10 font-awesome  gap-1  flex items-center absolute right-2 top-3">
                  <FontAwesomeIcon icon="warning" className="text-red-400 h-5 w-5 order-2 " />
                  <span className="  text-sm text-red-400 backdrop-blur-sm bg-white/30 error ">{props.errors[`customer_purchases.${i}.definition_id`]}</span>
                </nav>
              </div>}
                <select onChange={(e) => handleProductChange(i, e.target.value)} className=" block relative border border-gray-200 px-5 min-w-[12rem] py-3 focus:border-none outline-none rounded w-full ring-offset-1 focus:ring-2 transition-all ease-out duration-150" type="text" placeholder="Enter user first name" >
                  <option value='' >Select product</option>
                  {products.map((product, i) => {
                    return (
                      <option key={i} value={product.id}>{product.name}</option>
                    )
                  })}
                </select>
              </span>
            </span>

            <span className="space-y-1 text-sm w-full">
                <div className='flex items-center justify-between relative'>
                  <label htmlFor="userrole" className="font-medium">Select a Type</label><abbr className='text-red-300' title='defines users role on the system'>*</abbr>
                </div>
              {props.errors[`customer_purchases.${i}.definition_id`] && <div className=' mt-2 relative '>
                <nav className="cursor-pointer z-10 font-awesome  gap-1  flex items-center absolute right-2 top-3">
                  <FontAwesomeIcon icon="warning" className="text-red-400 h-5 w-5 order-2 " />
                  <span className="  text-sm text-red-400 backdrop-blur-sm bg-white/30 error ">{props.errors[`customer_purchases.${i}.definition_id`]}</span>
                </nav>
              </div>}
              <select value={getProductIdfromDefinition(i)} onChange={(e) => handleChange(i, getProductfromId(e.target.value))} className=" block relative border border-gray-200 px-5 min-w-[12rem] py-3 focus:border-none outline-none rounded w-full ring-offset-1 focus:ring-2 transition-all ease-out duration-150" type="text" placeholder="Enter user first name" >
                <option value='' >Select type</option>
                {getProductsDefintionsById(items[i].product_id).map((product, i) => {
                  return (
                    <option key={i} value={product.definition_id}>{product.definition_name}</option>
                  )
                })}
              </select>
            </span>
          </nav>

          <nav className=" w-full flex flex-col gap-7 mt-7 md:flex-row">
            {checkIfInCrate(i) && <nav className='text-gray-500 w-full'>
              <Custominput value={item.crates} placeholder="enter crates" label="enter crates" getValue={(value) => handleValueChange(i, "crates", value)} />
            </nav>}
            <nav className='text-gray-500 w-full'>
              <Custominput error={props.errors[`customer_purchases.${i}.units`]} value={item.units} label="enter units" placeholder="enter units" getValue={(value) => handleValueChange(i, "units", value)} />
            </nav>
          </nav>
          <nav className='text-gray-500 basis-full md:basis-2/12 grow hidden'>
            <Custominput readOnly={true} value={calculateAmount(i)} placeholder="enter amount" getValue={(value) => handleValueChange(i, 'amount', value)} type="number" />
          </nav>
          <button onClick={() => removeItemat(i)} className='text-gray-500 text-center  md:shrink md:text-right '><FontAwesomeIcon className=' h-3 w-3 p-1 rounded-full bg-red-100 shadow-md text-red-300  ' icon="minus" /></button>
        </div>
      </div>)
      }
      <div className='flex items-center justify-center mt-5'>
        <button onClick={addNewItem} className="  bg-blue-300 self-center text-white  border border-gray-300  text-xs rounded-full shadow-lg ">
          <FontAwesomeIcon icon="plus-circle" className='h-8 w-8' size="2xl" />
        </button>
      </div>
    </div>
  </dt>
}
