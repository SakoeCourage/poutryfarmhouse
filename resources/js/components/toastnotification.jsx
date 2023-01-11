import React, { useEffect, useState } from 'react'
import { AnimatePresence,motion } from 'framer-motion'
import { usePage } from '@inertiajs/inertia-react'

export default function toastnotification(props) {
    const { flash } = usePage().props
    const [showtoast, setShowtoast] = useState(false)

    function dispose() {
        setTimeout(() => {
            setShowtoast(false)
        }
            , 3000)

    }
    useEffect(() => {
        if (flash.message) {
            setShowtoast(true)
            dispose()
        }
    }, [flash])
    
    useEffect(() => {
        if (props.message) {
            setShowtoast(true)
            dispose()
        }
    }, [props.message])

    return (
        <AnimatePresence>
            {showtoast && <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
            className='fixed z-50 bottom-20 py-1 flex items-center inset-x-1/4 mx-auto w-max max-w-md px-3 bg-black/50 text-white text-sm rounded-lg pointer-events-none  '>
                <span className='w-full text-center'>{flash.message?.text ?? props.message}</span>
            </motion.div>}
        </AnimatePresence>
    )
}
