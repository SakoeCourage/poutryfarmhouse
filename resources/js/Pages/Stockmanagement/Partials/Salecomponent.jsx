import React,{useEffect,useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion } from 'framer-motion'

export default function Salecomponent(props) {
    const [showAllProducts, setShowAllProducts] = useState(false)
    const [units, setUnits] = useState(0)
    const [amount, setAmount] = useState(0)
    useEffect(() => {
        let CumulatedAmount = 0
        let CumulatedUnits = 0
        for (const { amount, units } of Object.values(props.definitions)) {
            CumulatedAmount += amount
            CumulatedUnits += units
        }
        setUnits(CumulatedUnits)
        setAmount(CumulatedAmount)
    }, [])



    return <nav className='bg-white shadow-lg rounded-lg flex items-center w-max gap-2 custom_box_shadow '>
        <nav className=' p-3 min-w-[10rem] max-w-max h-44 flex flex-col relative'>
            <button onClick={() => { setShowAllProducts(!showAllProducts) }} className={`absolute top-3 right-1 bg-gray-100 shadow-md opacity-60 backdrop:blur-md text-gray-400 rounded-full h-7 w-7  p-2 grid items-center justify-center
                   transform transition-transform duration-300 ${showAllProducts && 'rotate-45  border-2 border-indigo-400'}
            `}>
                <FontAwesomeIcon size='sm' icon='up-right-and-down-left-from-center' />
            </button>
            <nav className='flex items-center gap-3 rounded-lg w-full p-1 px-2 bg-indigo-50'>
                <FontAwesomeIcon className='text-indigo-700' icon="tags" />
                <span>{props.productname}</span>
            </nav>
            <nav className=' my-auto flex '>
                <span className='text-xs text-gray-500'>GHS</span>
                <span className='pl-2 leading-5 font-semibold text-2xl text-gray-900 text-center'>
                    {new Intl.NumberFormat().format(amount)}
                </span>
            </nav>
            <nav className=' h-auto  w-full mt-auto  flex items-center justify-between  text-semibold'>
                <span>{new Intl.NumberFormat().format(units)}<span className='text-xs text-gray-500'>units</span></span>

            </nav>
        </nav>
        {showAllProducts && Object.entries(props.definitions).map((definition, i) => {
            return <motion.div key={i}
                initial={{ opacity: 0, x: '50px' }}
                animate={{
                    opacity: 1, x: 0,
                    transition: {
                        type: 'spring',
                        mass: 0.1,
                        damping: 8
                    }
                }}
                exit={{ opacity: 0, x: '100vw' }} className={`w-full flex items-center  flex-grow h-full bg-indigo-50/50 gap-1 overflow-hidden`}>
                <nav className='w-full min-w-[10rem] p-3  max-w-max h-44 flex flex-col'>
                    <nav className='flex items-center gap-3 rounded-lg w-full p-1 px-2 bg-indigo-50'>
                        <FontAwesomeIcon className='text-indigo-400' icon="tag" />
                        <span>{definition[0]}</span>
                    </nav>
                    <nav className=' my-auto flex '>
                        <span className='text-xs text-gray-500'>GHS</span>
                        <span className='pl-2 leading-5 font-semibold text-2xl text-gray-900'>
                            {new Intl.NumberFormat().format(definition[1].amount)}
                        </span>
                    </nav>
                    <nav className=' h-auto  w-full mt-auto  flex items-center justify-between  text-semibold'>
                        <span>{new Intl.NumberFormat().format(definition[1].units)} <span className='text-xs text-gray-500'>units</span></span>

                    </nav>
                </nav>
            </motion.div>
        })
        }
    </nav>


}