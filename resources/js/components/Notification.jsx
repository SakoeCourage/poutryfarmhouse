import React, { useEffect, useState ,useLayoutEffect} from 'react'
import SimpleBar from 'simplebar-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ExpenseNotification from './notificationcomponents/ExpenseNotification'
import Api from '../api/Api'
import axios from 'axios'
import Dotanination from './Dotanimation'
import Buttonsubmit from './Buttonsubmit'
import NewExpense from './notificationcomponents/NewExpense'
import { formatnumber } from '../api/Util'

const notificationTypes = [
    {
        type: "App\\Notifications\\NewUnApprovedExpense",
        component: ExpenseNotification
    },
    {
        type: "App\\Notifications\\ExpenseApproved",
        component: NewExpense
    }
]


function NotificationComponent(props) {
    const Component = notificationTypes.find((item) => item.type == props.type).component ?? 'div'
    return <Component data={props.data} />
}

export default function Notification(props) {
    const [notifications, setNotifications] = useState([])
    const [nextPageUrl, setNextPageUrl] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [fetchmore, setfectchmore] = useState(false)
    const [total, setTotal] = useState(0)

    let fetchMoreNotifications = () => {
        setfectchmore(true)
        axios.get(nextPageUrl).then(res => {
            setIsLoading(false)
            setfectchmore(false)
            setNotifications([...notifications, ...res.data?.data])
            
            setNextPageUrl(res.data?.next_page_url)
        })
    }

    let fetchUserNotifications=()=>{
        Api.get('/notifications/uread').then(res => {
            setNotifications(res.data?.data)
            setNextPageUrl(res.data?.next_page_url)
            setIsLoading(false)
            console.log(res.data)
            setTotal(res.data?.total)
        }).catch(err => console.log(err.response.data))

    }

    let markNotificationsAsRead = () =>{
        Api.get('/notifications/uread/markasread').then(res=>{
            props.setUnreadCount(res.data)
        }).catch(err=>console.log(err))
    } 
    useEffect(() => {
        fetchUserNotifications()
        return ()=> markNotificationsAsRead()
    }, [])





    return (
        <div className='mt-2 bg-gray-50 fixed md:absolute min-w-[100vw] p-1 notificationbar   inset-0  md:h-auto md:min-w-[25rem] md:max-w-[25rems] md:rounded-md custom_box_shadow md:left-auto md:top-auto md:bottom-auto   md:right-32  '>
            <SimpleBar className="notificationheight w-full pb-4 relative ">
                <div className="w-full flex items-center justify-between bg-white px-5 sticky top-0 z-20 py-2 ">
                    <span className="font-medium text-sm text-slate-400">New Notifications({formatnumber(total)})</span>
                    <button onClick={()=>props.onClose()} className="  text-slate-400 hover:text-slate-600 h-full w-max rounded-full flex justify-center items-center">
                        <FontAwesomeIcon className='h-4 w-4' icon="times" />
                    </button>
                </div>
                <div className='px-2'>
                 {isLoading && <Dotanination />}
                {Boolean(notifications.length) && notifications.map((notification, i) => {
                        return <NotificationComponent key={i} type={notification.type} data={notification.data} />
                    })}
                </div>
                {nextPageUrl && <div className='w-full flex items-center justify-center'>
                        <Buttonsubmit processing={fetchmore} onClick={() => fetchMoreNotifications()} className="text-xs w-full my-4" text="load more data" />
                </div>}
            </SimpleBar>
        </div>
    )
}
