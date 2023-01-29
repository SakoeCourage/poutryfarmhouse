import React, { useEffect, useState, useMemo } from 'react'
import Api from '../../../api/Api'
import Customswitch from '../../../components/Customswitch'
import Customchecbox from '../../../components/Customcheckbox'
import Buttonsubmit from '../../../components/Buttonsubmit'

function Loader() {
    return <div role="status" className=" p-4 space-y-4 border border-gray-200 divide-y divide-gray-50 rounded shadow animate-pulse  md:p-6 ">
        <div className="grid grid-cols-2 ">
            <div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                <div className="w-32 h-2 bg-gray-200 rounded-full "></div>
            </div>
            <div className="h-2.5 bg-gray-300 rounded-full  w-12 mx-auto"></div>
        </div>
        <span className="sr-only">Loading...</span>
    </div>
}


export default function EditPermissions(props) {
    const [allPermissions, setAllPermissions] = useState([])
    const [rolePermissions, setRolePermissions] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isAltered, setIsAltered] = useState(false)
    const [processing, setProcessing] = useState(false)

    function fetchData() {
        setIsLoading(true)
        Api.get(`roles/${props.roleName}/permissions`)
            .then(res => {
                setAllPermissions(res.data.permissions)
                setRolePermissions(res.data.rolePermissions)
                setIsLoading(false)
            }).catch(err => console.log(err))
    }

    function ApplyNewPermissions() {
        setProcessing(true)
        Api.post('/roles/permissions/new', {
            'roleName': props.roleName,
            'permissions': rolePermissions
        }).then(res => {
            console.log(res.data)
            setProcessing(false)
            setIsAltered(false)
        }).catch(err => console.log(err.response))
    }

    const togglePermission = (r_permission) => {
        rolePermissions.includes(r_permission) ? setRolePermissions(cv => cv = cv.filter(el => el !== r_permission)) :
            setRolePermissions(cv => cv = [...cv, r_permission])
            ;
        setIsAltered(true)
    }

    const checkStatus = (r_permission) => {
        return rolePermissions.includes(r_permission)
    }

    useEffect(() => {
        fetchData()
    }, [])


    return (
        <div className=' min-h-max pb-32'>
            <div className="grid grid-cols-2 sticky z-30 top-0 p-4 text-sm font-medium text-gray-900 bg-gray-100 border-t border-b border-gray-200 gap-x-16 ">
                <div className="flex items-center md:ml-10">Permissions</div>
                <div className='text-center'>Status</div>
            </div>

            {!isLoading && allPermissions && allPermissions.map((permission, i) => {
                return (
                    <React.Fragment key={i}>
                        <div className="grid grid-cols-2 px-4 py-5 text-sm text-gray-700 border-b border-gray-200 gap-x-16 ">
                            <div className="text-gray-800 md:ml-10 ">{permission} </div>
                            <Customchecbox checked={checkStatus(permission)} onChange={(e) => togglePermission(permission)} />
                        </div>
                    </React.Fragment>
                );
            })}
            {isAltered && <nav className='flex items-center mt-auto px-4'>
                <Buttonsubmit processing={processing} onClick={ApplyNewPermissions} text="Apply new permissions " className="mb-15 min-w-full py-6" />
            </nav>}
            {isLoading && <div>
                <Loader />
                <Loader />
                <Loader />
                <Loader />
                <Loader />
                <Loader />
            </div>}

        </div>

    )
}
