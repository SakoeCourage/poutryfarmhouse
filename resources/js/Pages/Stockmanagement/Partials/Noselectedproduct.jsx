import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from '@inertiajs/inertia-react'

export default function Noselectedproduct() {

    return <nav className='flex items-center justify-center  h-full'>
        <div>
            <nav className="text-sm text-gray-500 w-full">
                <span className=" mx-auto h-16 w-16 p-4  rounded-full mb-4 flex items-center justify-center text-gray-400 bg-gray-200  "><FontAwesomeIcon icon="tag" className="" size="xl" /></span>
                <span className=" text-lg block text-center">No item selected</span>
                <span className="mt-1 text-center test-sm  block">Select an item to view contents</span>
                <nav className='flex items-center justify-center'>
                    <Link href='/system/definitions' className=" text-sm block text-center mt-5 text-blue-500 underline">define new product</Link>
                </nav>
            </nav>
        </div>
    </nav>
}

