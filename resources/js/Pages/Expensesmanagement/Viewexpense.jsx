import React, { useEffect, useState } from 'react'
import Api from '../../api/Api'
import Custominput from '../../components/Custominput'
import { formatcurrency } from '../../api/Util'
import Buttonsubmit from '../../components/Buttonsubmit'
import { useForm } from '@inertiajs/inertia-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Dotanimation from '../../components/Dotanimation'

export default function Viewexpense(props) {
    const [expensedata, setExpenseData] = useState({})
    const [isLoading,setisLoading] = useState(true)
    const { process, put, data } = useForm({
    })
    let accept = () => {
        put(`/expenses/action/${props.id}/accept`, {
            onSuccess: () => { props.closeModal() }
        })
    }
    let decline = () => {
        put(`/expenses/action/${props.id}/decline`, {
            onSuccess: () => { props.closeModal() }
        })
    }

    useEffect(() => {
        Api.get(`/expense/show/${props.id}`).then(res => {
            console.log(res.data)
            setisLoading(false)
            setExpenseData(res.data)
        })
    }, [])

    return (
        <div className='flex flex-col gap-5 max-w-xl mx-auto h-full  relative'>
            {isLoading && <Dotanimation />}
            <Custominput label="expense description" readOnly value={expensedata.expense?.description} getValue={() => void (0)} />
            <Custominput label="author" readOnly value={expensedata.author?.name} getValue={() => void (0)} />
            <div className=" relative">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="py-3 px-6 rounded-l-lg">
                                item name
                            </th>

                            <th scope="col" className="py-3 px-6 rounded-r-lg">
                                Price
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {expensedata.items?.map((item, i) => <tr key={i} className="bg-white dark:bg-gray-800">
                            <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {item.item}
                            </th>
                            <td className="py-4 px-6">
                                {formatcurrency(item.amount)}
                            </td>
                        </tr>
                        )}


                    </tbody>
                    <tfoot>
                        <tr className="font-semibold text-gray-900 dark:text-white">
                            <th scope="row" className="py-3 px-6 text-base">Total</th>
                            <td className="py-3 px-6">{expensedata.expense && formatcurrency(expensedata.expense?.total)}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <nav >
                {expensedata.expense?.status === 2 ?    <nav className='flex gap-5 self-end justify-self-end flex-center items-center'>
                    <Buttonsubmit onClick={accept} text="approve" className=" bg-green-500 border-none active:bg-green-800 hover:bg-green-500 " />
                    <Buttonsubmit onClick={decline} text="decline" className="bg-red-500 border-none active:bg-red-800 hover:bg-red-500 " />
                </nav>: expensedata.expense?.status === 0 ? 
                    <nav className='flex items-center gap-1 p-2 border text-sm border-red-500 text-red-500 w-max  rounded-full'>
                    <span>declined</span> <FontAwesomeIcon icon='times'/>
                </nav> 
                :  <nav className='flex items-center gap-1 p-2 border text-sm border-green-500 text-green-500 w-max  rounded-full'>
                <span>approved</span> <FontAwesomeIcon icon='check'/>
            </nav> }
            </nav>


        </div>
    )
}
