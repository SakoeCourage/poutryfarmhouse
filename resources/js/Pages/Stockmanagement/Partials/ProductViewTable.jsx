import React, { useEffect } from 'react'

export default function ProductViewTable(props) {
    useEffect(() => {
        console.log(props.entries)
    }, [props.entries])

    return (
        <table className="px-5 w-full text-sm text-left text-gray-500 relative">
            <thead className="text-xs text-gray-700 bg-blue-50 sticky top-0 shadow-sm ">
                <tr className=''>

                    <th scope="col" className="py-3 px-6 min-w-[10rem]">
                        Type
                    </th>
                    <th scope="col" className="py-3 px-6 min-w-[10rem]">
                        quantity
                    </th>
                </tr>
            </thead>
            <tbody>
                {props.entries.map((entry, i) => {
                    return (
                        <tr key={i} className={` border-b hover:bg-gray-200 ${i % 2 == 0 ? 'bg-gray-50' : 'white'}`}>
                            <td className="py-2 px-6">
                                {entry[0]}
                            </td>
                            <td className="py-2 px-6 ">
                                {entry[1]['quantity']}
                            </td>
                        </tr>
                    )
                })}

            </tbody>
        </table>
    )
}
