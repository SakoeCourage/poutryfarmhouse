import React, { useRef, useState, useEffect } from 'react'
import Custominput from '../../../components/Custominput'
import Buttonsubmit from '../../../components/Buttonsubmit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm } from '@inertiajs/inertia-react';
import Customcheckbox from '../../../components/Customcheckbox'
import Getselectsitems from '../../../api/Getselectsitems';

export default function Productform(props) {
  const [collectionTypes, setCollectionTypes] = useState([])
  const [definitions, setDefinitions] = useState([{
    name: '',
    unit_price: '',
    price_per_crate: '',
    units_per_crate: '',
  }])
  const { errors, setData, data, processing, post } = useForm({
    name: '',
    in_crates: null,
    collection_method: null,
    definitions: [],
    automated_stocking: null
  })
  // let quantityPerCrate = React.useMemo(()=>definitions[0]?.price_per_crate,[definitions])

  let addNewItem = () => {
    setDefinitions((ci => ci = [...ci, {
      name: '',
      unit_price: '',
      price_per_crate: '',
      units_per_crate: '',
    }]))
  }

  let handleValueChange = (i, name, current) => {
    let newitems = [...definitions];
    newitems[i][name] = current
    setDefinitions(newitems)
  }
  let removeItemat = (i) => {
    let newitems = [...definitions];
    newitems.splice(i, 1);
    setDefinitions(newitems)
  }

  useEffect(() => {
    setData('definitions', definitions)
  }, [definitions])

  let submit = (e) => {
    post('/definitions/product/create', {
      onSuccess: () => props.closeModal()
    });
  }

  let getCollectionTypes = () => {
    Getselectsitems.getCollectionTypes().then(res => {
      setCollectionTypes(res.data)
    }).catch(err => console.log(err))
  }
  useEffect(() => {
    getCollectionTypes();
  }, [])

  return (
    <main className='flex flex-col gap-10 max-w-4xl mx-auto pt-10 h-full '>
      <div className='p-5 w-full '>
        <nav className='flex flex-col  gap-5 md:gap-8 '>
          <Custominput className="" required error={errors.name} getValue={(value) => setData('name', value)} label='product name' />

          <div className="">
            <nav className="flex items-center justify-between my-2 text-sm font-semibold">Product selling options
              {errors.in_crates && <FontAwesomeIcon icon="warning" className="text-red-400 h-5 w-5 order-2 " />}
            </nav>
            <nav className='bg-indigo-50/70 rounded-md p-3 shadow-sm'>
              <nav className='text-indigo-600 text-sm flex items-center gap-1 mb-4'>
                <FontAwesomeIcon icon="question-circle" />
                <span>Is this product is sold in collection such as <strong>crates,boxes,pallete</strong> etc.. </span>
              </nav>

              <nav className="flex flex-col gap-5 px-5">
                <button key={1} onClick={() => setData('in_crates', true)} className="flex items-center bg-white justify-between border border-indigo-200 rounded-lg px-5 py-1 min-h-[3rem] gap-2 text-sm shadow-md hover:ring-1 hover:ring-indigo-300 hover:ring-offset-1 hover:border-none transition-all"> YES {data.in_crates && <Customcheckbox checked={true} />} </button>
                <button key={2} onClick={() => setData('in_crates', false)} className="flex items-center bg-white justify-between border border-indigo-200 rounded-lg px-5 py-1 min-h-[3rem] gap-2 text-sm shadow-md hover:ring-1 hover:ring-indigo-300 hover:ring-offset-1 hover:border-none transition-all">NO {data.in_crates == false && <Customcheckbox checked={true} />} </button>
              </nav>
            </nav>
          </div>
          {/* Multiple products definition  */}
          <nav>

             {data.in_crates && <nav className="space-y-1 text-sm my-6">
                <div className='flex items-center justify-between relative'>
                  <label htmlFor="" className="text-sm px-2 font-semibold">Product collection method</label><abbr className='text-red-300' title='define collection method of this product'>*</abbr>
                  {errors.collection_method && <div className=' mt-2'>
                    <nav className="cursor-pointer font-awesome  gap-1  flex items-center absolute right-2 inset-y-0">
                      <FontAwesomeIcon icon="warning" className="text-red-400 h-5 w-5 order-2 " />
                      <span className="  text-sm text-red-400 backdrop-blur-sm bg-white/30 error ">{errors.collection_method}</span>
                    </nav>
                  </div>}
                </div>
                <nav className='bg-indigo-50/70 rounded-md py-10 px-10 shadow-sm'>
                <select onChange={(e) => setData('collection_method', e.target.value)} className="  block relative border border-gray-200 px-7 min-w-[12rem] py-3 focus:border-none outline-none rounded leading-6 w-full ring-offset-1 focus:ring-2 transition-all ease-out duration-150" type="text" placeholder="Enter user first name" >
                  <option value='' >Select collection method</option>
                  {Boolean(collectionTypes.length) && collectionTypes.map((collection) => <option className=" capitalize" key={collection.id} value={collection.type}>{collection.type}</option>)}
                </select>
                </nav>
              </nav>
              }

            <nav className="text-sm font-semibold my-2">Product types</nav>
            <nav className='bg-indigo-50/70 rounded-md p-3 shadow-sm'>
              <nav className='text-indigo-600 text-sm flex items-center gap-1 mb-4'>
                <FontAwesomeIcon icon="question-circle" />
                <span>If product have more than one type click on the plus symbol to add more</span>
              </nav>
              {definitions.map((definition, i) => <nav key={i} className='flex items-center gap-2 my-5 bg-gray-50 p-2 py-4 rounded-md ring-2 ring-indigo-100  '>
                <div className="flex-grow  ">
                  <nav className="flex items-center gap-2 ">
                    <Custominput error={errors[`definitions.${i}.name`]} value={definition.name} getValue={(value) => handleValueChange(i, "name", value)} placeholder=" product type" />
                    <Custominput error={errors[`definitions.${i}.unit_price`]} value={definition.unit_price} getValue={(value) => handleValueChange(i, "unit_price", value)} placeholder="price per unit" />
                  </nav>
                  {data.in_crates &&
                    <nav className=" flex items-center gap-2 my-2">
                      <Custominput error={errors[`definitions.${i}.price_per_crate`]} value={definition.price_per_crate} getValue={(value) => handleValueChange(i, "price_per_crate", value)} placeholder={`price per ${data.collection_method ?? 'collection'} `} />
                      {i > 0 ?
                      <Custominput error={errors[`definitions.${i}.units_per_crate`]} value={definitions[0]?.units_per_crate}  getValue={(value) => handleValueChange(i, "units_per_crate", definitions[0]?.units_per_crate)}   placeholder={`units of this product per ${data.collection_method ?? 'collection'}`} />:
                      <Custominput error={errors[`definitions.${i}.units_per_crate`]} value={definition.units_per_crate} getValue={(value) => handleValueChange(i, "units_per_crate", value)} placeholder={`units of this product per ${data.collection_method ?? 'collection'}`} />
                    }                    
                    </nav>
                  }
                </div>
                <button onClick={(e) => removeItemat(i)} className='text-gray-500  shrink text-right  '><FontAwesomeIcon className=' h-3 w-3 p-1 rounded-full bg-red-100 shadow-md text-red-400  ' icon="minus" /></button>
              </nav>)}
              <div className='flex items-center justify-center mt-5'>
                <button onClick={addNewItem} className="  bg-blue-300 self-center text-white  border border-gray-300  text-xs rounded-full shadow-lg ">
                  <FontAwesomeIcon icon="plus-circle" className='h-8 w-8' size="2xl" />
                </button>
              </div>
            </nav>
          </nav>


          <div className="">
            <nav className=" my-2 text-sm font-semibold flex items-center justify-between ">Product stocking option
              {errors.automated_stocking && <FontAwesomeIcon icon="warning" className="text-red-400 h-5 w-5 order-2 " />}
            </nav>
            <nav className='bg-indigo-50/70 rounded-md p-3 shadow-sm'>
              <nav className='text-indigo-600 text-sm flex items-center gap-1 mb-4'>
                <FontAwesomeIcon icon="question-circle" />
                <span>Allow product to be stocked from flock control data
                </span>

              </nav>
              <nav className="text-indigo-600 p-5 text-xs my-4 bg-indigo-50/50 ">
                When this is checked, this product can be stocked while collecting flocks data. <br />
                Products such as Egg and Manure should have this option checked.
              </nav>
              <nav className="flex flex-col gap-5 px-5">
                <button key={1} onClick={() => setData('automated_stocking', true)} className="flex bg-white min-w-full items-center justify-between border border-indigo-200 rounded-lg px-5 py-2 min-h-[3rem] text-sm shadow-md hover:ring-1 hover:ring-indigo-300 hover:ring-offset-1 hover:border-none transition-all"> YES {data.automated_stocking && <Customcheckbox checked={true} />} </button>
                <button key={2} onClick={() => setData('automated_stocking', false)} className="flex bg-white min-w-full items-center justify-between border border-indigo-200 rounded-lg px-5 py-2 min-h-[3rem] text-sm shadow-md hover:ring-1 hover:ring-indigo-300 hover:ring-offset-1 hover:border-none transition-all"> NO {data.automated_stocking == false && <Customcheckbox checked={true} />} </button>
              </nav>
            </nav>
          </div>
        </nav>
      </div>
      <div className='mt-auto sticky bottom-0 rounded-b-lg flex justify-end items-center p-5 bg-gray-100 '>
        <nav className='flex items-center gap-3'>
          <button onClick={(e) => { e.preventDefault(); props.closeModal() }} className='px-4 py-1 border-2 text-gray-600 font-semibold rounded-lg'>
            cancel
          </button>
          <Buttonsubmit onClick={submit} processing={processing} text="create" className="rounded-lg" />
        </nav>
      </div>
    </main>
  )
}
