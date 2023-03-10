import React, { useState, useEffect } from 'react'
import Custominput from '../../../components/Custominput'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Getselectsitems from '../../../api/Getselectsitems'

export default function Controlfeeds(props) {
    const [data, setData] = useState([{
        feed_id: '',
        quantity: 0,
        description: 'from flock control'
    }])

    const [feeds, setFeeds] = useState([])

    let addNewItem = (e) => {
        e.preventDefault()
        setData((ci => ci = [...ci, {
            feed_id: '',
            quantity: 0,
            description: 'from flock control'
        }]))
    }

    let handleValueChange = (i, name, current) => {
        let newitems = [...data];
        newitems[i][name] = current
        setData(newitems)
    }


    let removeItemat = (e, i) => {
        e.preventDefault()
       
            let newitems = [...data];
            newitems.splice(i, 1);
            setData(newitems)
     
    }

    let getFeeds = () => {
        Getselectsitems.getFeeds().then(res => {
            setFeeds(res.data.feeds)
        }).catch(err => console.log(err))
    }


    useEffect(() => {
        getFeeds()
    }, [])
    useEffect(() => {
        props.getData(data)
    }, [data])

    return (
        <div>
            <fieldset className='border py-4 px-2'>
                <legend className='text-sm ml-3 px-1'>Feeding</legend>
                    {props.errors['feeds'] && <div className='flex items-center rounded-md gap-1 p-1 m-1 text-sm  bg-red-100/70 text-red-400'>
                        <FontAwesomeIcon icon="warning" className="text-red-400 h-5 w-5 " />
                        <nav>{props.errors['feeds']}</nav>
                    </div>
                }
                <div className='flex flex-col gap-3 ' >
                    {data.map((item, i) => <div className={`flex items-center gap-1  salelist `} data-index={i + 1} key={i}>
                        <nav className='text-gray-500 basis-6/12 '>
                            <span className="space-y-1 text-sm">
                                {props.errors[`feeds.${i}.feed_id`] && <div className=' mt-2 relative '>
                                    <nav className="cursor-pointer z-30 font-awesome  gap-1  flex items-center absolute right-2 top-3">
                                        <FontAwesomeIcon icon="warning" className="text-red-400 h-5 w-5 order-2 " />
                                        <span className="  text-sm text-red-400 backdrop-blur-sm bg-white/30 error ">{props.errors[`feeds.${i}.feed_id`]}</span>
                                    </nav>
                                </div>}
                                <select onChange={(e) => handleValueChange(i, 'feed_id', e.target.value)} className=" block relative border border-gray-200 px-5 min-w-[12rem] py-3 focus:border-none outline-none rounded w-full ring-offset-1 focus:ring-2 transition-all ease-out duration-150" type="text" placeholder="Enter user first name" >
                                    <option value='' >select feed</option>
                                    {feeds.map(feed => <option value={feed.id} key={feed.id}>{feed.feed_name}</option>)}
                                </select>
                            </span>
                        </nav>
                        <nav className='text-gray-500 basis-5/12'>
                            <Custominput error={props.errors[`feeds.${i}.quantity`]} value={item.quantity} placeholder="enter quantity" getValue={(value) => handleValueChange(i, "quantity", value)} />
                        </nav>
                        <button onClick={(e) => removeItemat(e, i)} className='text-gray-500  shrink text-right  '><FontAwesomeIcon className=' h-3 w-3 p-1 rounded-full bg-red-100 shadow-md text-red-400  ' icon="minus" /></button>
                    </div>)
                    }
                </div>
                <div className='flex items-center justify-center mt-5'>
                    <button onClick={addNewItem} className="  bg-blue-300 self-center text-white  border border-gray-300  text-xs rounded-full shadow-lg ">
                        <FontAwesomeIcon icon="plus-circle" className='h-8 w-8' size="2xl" />
                    </button>
                </div>
            </fieldset>
        </div>
    )

}
