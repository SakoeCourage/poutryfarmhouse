import React,{useState,useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Custominput from '../../components/Custominput'


function Invoiceitemslist() {
    const [items, setItems] = useState([
        {item_name:'',units: '' ,price:'',amount:''}
    ])

    let addNewItem = () =>{
        setItems((ci=> ci = [...ci,{item_name:'',units: '' ,price:'',amount:''}])) 
    }

    let removeItemat = (i) => {
        let newitems = [...items];
        newitems.splice(i, 1);
        setItems(newitems)
      }

    let handleChange = (i, [name,value]) => {
        let newitems = [...items];
        newitems[i][name] = value;
        setItems(newitems);
     }

     let calculateAmount = (i) =>{
        if(items[i]){
            return(items[i].price * items[i].units)
        }
     }

        useEffect(() => {
            console.log(items)
        }, [items])
        
    return <dt className='w-full'>
        <dl className='flex items-center gap-1'>
            <dd className='text-gray-500 basis-5/12'>items</dd>
            <dd className='text-gray-500 basis-2/12'>units</dd>
            <dd className='text-gray-500 basis-2/12'>price</dd>
            <dd className='text-gray-500 basis-2/12 grow'>amount</dd>
            <button onClick={()=>addNewItem()} className='text-gray-500  shrink text-right '><FontAwesomeIcon className=' h-3 w-3 p-1 rounded-full bg-gray-100 shadow-md  ' icon="plus"/></button>
        </dl>

            <div className='flex flex-col gap-3'>       
            {items.map((item,i)=><div className='flex items-center gap-1' key={i}>
            <nav className='text-gray-500 basis-5/12'>
                <Custominput value={item.item_name} placeholder="enter item name" getValue={(value)=>handleChange(i,['item_name',value])}/>
            </nav>
            <nav className='text-gray-500 basis-2/12'>
                <Custominput value={item.units} placeholder="enter unit" getValue={(value)=>handleChange(i,['units',value])} />
            </nav>
            <nav className='text-gray-500 basis-2/12'>
                <Custominput value={item.price} placeholder="enter price" getValue={(value)=>handleChange(i,['price',value])} />
            </nav>
            <nav className='text-gray-500 basis-2/12 grow'>
                <Custominput value={calculateAmount(i)} placeholder="enter amount" getValue={(value)=>handleChange(i,['amount',value])} type="number"  />
            </nav>
            <button onClick={()=>removeItemat(i)} className='text-gray-500  shrink text-right '><FontAwesomeIcon className=' h-3 w-3 p-1 rounded-full bg-gray-100 shadow-md  ' icon="minus"/></button>
            </div>)

            }

            </div>
        
        
    </dt>
}

export default function Createinvoice() {
    return (
        <div className='container mx-auto'>
            <div className=' max-w-4xl mx-auto p-5 flex flex-col gap-5'>
                <header className='flex items-center justify-between'>
                    <nav className='text-2xl font-semibold text-gray-500'>New Invoice</nav>
                    <nav className='flex items-center gap-3'>
                        <button className='bg-gray-100 text-sm text-gray-500 font-bold p-1 px-3 rounded-md shadow-sm'>Cancel</button>
                        <button className='bg-gray-100 text-sm text-gray-500 font-bold p-1 px-3 rounded-md shadow-sm'>Preview</button>
                        <button className='bg-gray-100 text-sm text-gray-500 font-bold p-1 px-3 rounded-md shadow-sm opacity-50'>Save</button>
                    </nav>
                </header>
                <section>
                    <div className="w-full space-y-1" >
                        <label htmlFor="lastname" className="font-medium text-gray-500 text-sm">client name
                            <abbr className='text-red-200 ml-1' title='this field is requred'>
                                <FontAwesomeIcon icon="question-circle" />
                            </abbr>
                        </label>
                        <nav className="block bg-gray-50 relative border border-gray-200  rounded leading-6 w-full  " >
                            <input className="px-5 py-3 text-sm bg-inherit w-full border-none focus:border-none focus:outline-none " />
                            <nav className="cursor-pointer  gap-1 font-awesome flex items-center absolute right-2 inset-y-0">
                                <FontAwesomeIcon icon="warning" className="text-red-400 h-5 w-5 order-2 " />
                                <span className="  text-sm text-red-400 backdrop-blur-sm bg-white/30 error ">error message here</span>
                            </nav>
                        </nav>
                    </div>
                    <div className="w-full space-y-1" >
                        <label htmlFor="lastname" className="font-medium text-gray-500 text-sm">invoice name</label>
                        <nav className="block bg-gray-50 relative border border-gray-200  rounded leading-6 w-full  " >
                            <input className="px-5 py-3 text-sm bg-inherit w-full border-none focus:border-none focus:outline-none " />
                            {/* <nav className="cursor-pointer  gap-1 font-awesome flex items-center absolute right-2 inset-y-0">
          <FontAwesomeIcon icon="warning" className="text-red-400 h-5 w-5 order-2 " />
          <span className="  text-sm text-red-400 backdrop-blur-sm bg-white/30 error ">error message here</span>
        </nav> */}
                        </nav>
                    </div>
                </section>

                <section className='w-full mt-10'>
                    <Invoiceitemslist />
                </section>
                <section className='w-full mt-10'>
                    
                </section>

            </div>

        </div>
    )
}
