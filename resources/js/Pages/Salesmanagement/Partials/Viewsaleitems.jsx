import React, { useEffect, useState ,useContext} from 'react'
import Api from '../../../api/Api'
import Dotanimation from '../../../components/Dotanimation'
import { formatcurrency } from '../../../api/Util'
import Buttonsubmit from '../../../components/Buttonsubmit'
import { printContext } from '../context/Printcontext'
import getInvoiceRoute from '../../../api/Getselectsitems'
import Toastnotification from '../../../components/toastnotification'
export default function Viewsaleitems(props) {
    const [isLoading, setIsLoading] = useState(true)
    const [saleItems, setSaleItems] = useState([])
    const [invoiceErrors,setInvoiceError] = useState(null)
    const [loadingInvoice,setLoaingInvoice] =useState(false)
    const {printdata, setPrintdata} = useContext(printContext)
    const fetchItems = () => {
        Api.get(`/saleitems/${props.id}/view`).then(res => {
            setSaleItems(res.data.saleitems)
            setIsLoading(false)
        }).catch(err => console.log(err))
    }
    
    const handleinvoice = () => {
        setLoaingInvoice(true)
        getInvoiceRoute.generateinvoice(props.id).then(res => {
            setLoaingInvoice(false)
             setPrintdata(res.data)
             props.closeModal()
        }).catch(err =>{
            if(err.response.status == 422){
                setLoaingInvoice(false)
                setInvoiceError(err.response.data.errors.invoice[0])
            }else{
                console.log(err)
            }
        })
    }

    useEffect(() => {
        fetchItems()
    }, [])

    return (
        <div className=" min-h-full mx-auto ">
            <Toastnotification message={invoiceErrors} />
            {isLoading && <Dotanimation />}
            <div className='flex flex-col gap-5 p-1  mx-auto mt-5 justify-between   '>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 leading-3 ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="py-3 px-6 rounded-l-lg">
                                Product
                            </th>

                            <th scope="col" className="py-3 px-6 rounded-r-lg">
                                Quantity
                            </th>
                            <th scope="col" className="py-3 px-6 rounded-r-lg">
                                Price
                            </th>
                            <th scope="col" className="py-3 px-6 rounded-r-lg">
                                Amount
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {saleItems?.map((item, i) => <tr key={i} className="bg-white dark:bg-gray-800">
                            <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {item.product}
                            </th>
                            <td className="py-4 px-6">
                                {item.quantity}
                            </td>
                            <td className="py-4 px-6">
                                {formatcurrency(item.price)}
                            </td>
                            <td className="py-4 px-6">
                                {formatcurrency(item.amount)}
                            </td>
                        </tr>
                        )}


                    </tbody>
                    <tfoot>
                        <tr className="font-semibold text-gray-900 dark:text-white">
                            <th scope="row" className="py-3 px-6 text-base">Total</th>
                            <td className="py-3 px-6">{saleItems[0] && formatcurrency(saleItems[0].total)}</td>
                        </tr>
                    </tfoot>
                </table>
                <Buttonsubmit processing={loadingInvoice} onClick={handleinvoice}  text="generate invoice" className=" w-full self-center" />
            </div>
        </div>
    )
}
