import React, { useEffect } from 'react'
import SimpleBar from 'simplebar-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { usePage } from '@inertiajs/inertia-react';
import Simplepagination from '../../components/Simplepagination';
import { formatcurrency, dateReformat } from '../../api/Util';
export default function Allshed() {
    const { sheds } = usePage().props
    useEffect(() => {
        console.log(sheds)
    }, [])

    return (
        <div className='w-full h-full'>
            <SimpleBar className="  w-full overflow-x-scroll overflow-y-scroll h-full ">

                <table className="px-5 w-full text-sm text-left text-gray-500 relative">
                    <thead className="text-xs text-gray-700 bg-blue-50 sticky top-0 shadow-sm ">
                        <tr className=''>
                            <th scope="col" className="py-3  text-center  px-2 ">
                                <input type="checkbox" name="" id="" />
                            </th>
                            <th scope="col" className="py-3 px-6 min-w-[10rem]">
                                date created
                            </th>
                            <th scope="col" className="py-3 px-6 min-w-[10rem]">
                                shed id
                            </th>
                            <th scope="col" className="py-3 px-6 min-w-[10rem]">
                                number of flocks
                            </th>
                            <th scope="col" className="py-3 px-6 min-w-[10rem]">
                                Action
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        {sheds.data.map((shed, i) => {
                            return (
                                <tr key={i} className={` border-b hover:bg-gray-200 ${i % 2 == 0 ? 'bg-gray-50' : 'white'}`}>

                                    <td scope="col" className="py-3  text-center  ">
                                        <input type="checkbox" name="" id="" />
                                    </td>

                                    <td className="py-2 px-6">
                                        {dateReformat(shed.date_created)}
                                    </td>
                                    <td className="py-2 px-6 ">
                                        {shed.shed_identification_name}
                                    </td>
                                    <td className="py-2 px-6 ">
                                        {new Intl.NumberFormat().format(shed.number_of_flocks)}
                                    </td>
                                    <td className="py-2 px-6 ">
                                        <nav className='text-blue-500 flex items-center gap-2'>
                                            <span >Edit</span>
                                            <FontAwesomeIcon icon='arrow-right' className='text-blue-500' size='sm' />
                                        </nav>
                                    </td>

                                </tr>

                            )
                        })}

                    </tbody>
                </table>
                <Simplepagination
                    from={sheds.from}
                    to={sheds.to}
                    next_page_url={sheds.next_page_url}
                    prev_page_url={sheds.prev_page_url}
                    total={sheds.total}
                    only='sheds'
                />

            </SimpleBar>

        </div>

    )
}

