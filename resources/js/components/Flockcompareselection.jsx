import React, { useEffect, useLayoutEffect, useMemo, useState, useContext } from 'react'
import { chartContext } from '../contexts/chartContext';
import Compareoveryears from './Compareoveryears';
import Compareoverayear from './Compareoverayear';
import Compareoveramonth from './Compareoveramonth';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import { data } from './flocksampledata';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export default function Flockcompareselection(props) {
    const [availableflocks, setavailableflocks] = useState(data)
    const { chartData, setchartData } = useContext(chartContext);

    let isAdded = (name) => {
        let isIncluded = false
        Object.values(chartData).forEach(item => {
            if (item.name == name) { isIncluded = true }
        })
        return isIncluded
    }

    let getValuesof = (arr) => Object.values(arr)

    let toggleflock = (name) => {
        if (isAdded(name)) {
            setchartData(getValuesof(chartData).filter((item) => item.name != name))
        } else {
            let find = getValuesof(availableflocks).find(item => item.name == name)
            console.log(find)
            setchartData([...chartData, find])
        }
    }

    useEffect(() => {
        setchartData([getValuesof(availableflocks)[0], getValuesof(availableflocks)[1]])
    }, [])
    return (
        <SimpleBar className='w-60 border h-full pr-5 p-3 pt-5' id='setTop'>
            <div className=''>
                <span className='text-gray-400 my-5 inline-block'>
                    {availableflocks.length} items discovered
                </span>
                <ul className='flex flex-wrap gap-3'>
                    {availableflocks.map((flock, i) => <li key={i}>
                        <button onClick={() => toggleflock(flock.name)} className={`border px-2 text-sm rounded-lg cursor   ${isAdded(flock.name) ? 'border-blue-400 text-center text-blue-600 shadow-md transition-all duration-500' : 'border text-center text-gray-400'}`} key={i}>
                            {isAdded(flock.name) && <FontAwesomeIcon icon='check' size='sm' />} <span>{flock.name}</span>
                        </button>
                    </li>)}
                </ul>
            </div>

            <div className='mt-10'>
                <span className='text-gray-400'>Compare Over</span>
                 <nav className='flex flex-col gap-3'>
                    <Compareoveryears />
                    <Compareoverayear />
                    <Compareoveramonth />
                 </nav>
            </div>
        </SimpleBar>
    )
}
