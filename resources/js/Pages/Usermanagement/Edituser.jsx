import React, { useRef, useEffect, useState, useMemo, useDeferredValue } from 'react'
import { useForm } from '@inertiajs/inertia-react'
import Custominput from '../../components/Custominput'
import Buttonsubmit from '../../components/Buttonsubmit'
import Getselectsitems from '../../api/Getselectsitems'
import Api from '../../api/Api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Loadingspinner from '../../components/Loadingspinner'
import Primarybutton from '../../components/Primarybutton'
import Buttondelete from '../../components/Buttondelete'
import Dialoge from '../../components/Dialoge'
import { Inertia } from '@inertiajs/inertia'

export default function Edituser(props) {
    const formEl = useRef()
    const [roles, setRoles] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [toggledelete, setToggledelete] = useState(false)
    const { errors, reset, processing, setData, data, put } = useForm({})
    const [togglereadonly, setTogglereadOnly] = useState(true)
    const [currentData, setCurrentData] = useState({
        name: '',
        id: '',
        email: '',
        firstname: '',
        lastname: '',
        contact: '',
        location: '',
        identification_number: '',
        jobposition: '',
        role: '',

    })


    const [jobPositions, setJobPositions] = useState([])
    const { getRoles, getJobPositions } = Getselectsitems
    let getUser = () => {
        Api.get(`/user/getuserinfo/${props.id}`).then(res => {
            const { user, profile, role } = res.data;
            setCurrentData(values => ({ ...values, name: user.name }))
            setCurrentData(values => ({ ...values, id: user.id }))
            setCurrentData(values => ({ ...values, email: user.email }))
            setCurrentData(values => ({ ...values, firstname: profile?.firstname }))
            setCurrentData(values => ({ ...values, lastname: profile?.lastname }))
            setCurrentData(values => ({ ...values, contact: profile?.contact }))
            setCurrentData(values => ({ ...values, identification_number: profile?.identification_number }))
            setCurrentData(values => ({ ...values, location: profile?.location }))
            setCurrentData(values => ({ ...values, jobposition: profile?.jobposition }))
            setCurrentData(values => ({ ...values, role: role[0] }))
            setIsLoading(false)
        }).catch(err => {
            console.log(err)
        })
    }
    const fetchData = async () => {
        let rolespromise = getRoles()
        let jobPositionspromise = getJobPositions()
        const roles = await rolespromise
        const jobs = await jobPositionspromise
        setRoles(roles.data.roles)
        setJobPositions(jobs.data.jobs)
        getUser()
    }

    let submitform = (e) => {
        e.preventDefault()
        console.log(data)
        put(`/user/edit/${currentData.id}`)


    }
 

    let sendDeleterequest =(e)=>{
        e.preventDefault()
        Inertia.delete(`/user/delete/${currentData.id}`,{
            onSuccess: ()=>{props.closeModal()}
        })
    }
    useEffect(() => {
        fetchData()
    }, [])
    useEffect(() => {
        setData({ ...currentData })
    }, [currentData])



    return (
        <div className=' relative isolate w-full h-full'>

            {isLoading && <div className=' h-full w-full absolute inset-0 z-20 bg-gray-200/50 flex items-center justify-center'>
                <Loadingspinner />
            </div>

            }
            <main className=' w-full mx-auto px-10'>

                <form ref={formEl} onSubmit={submitform} className=' class-name flex flex-col gap-5'>
                    <div className='flex md:flex-row items-center flex-col gap-10'>
                        <Custominput readOnly={togglereadonly} error={errors.firstname} required value={currentData.firstname} getValue={(value) => setCurrentData({ ...currentData, firstname: value })} label='first name' />
                        <Custominput readOnly={togglereadonly} error={errors.lastname} value={currentData.lastname} required getValue={(value) => setCurrentData({ ...currentData, lastname: value })} label='last name' />
                        <Custominput readOnly={togglereadonly} error={errors.name} value={currentData.name} required getValue={(value) => setCurrentData({ ...currentData, name: value })} label='user name' />
                    </div>
                    <div className='flex md:flex-row items-center flex-col gap-10'>
                        <Custominput readOnly={togglereadonly} error={errors.email} value={currentData.email} getValue={(value) => setCurrentData({ ...currentData, email: value })} label='email' />
                    </div>
                    <div className='mt-5'>
                        <Custominput readOnly={togglereadonly} required error={errors.contact} value={currentData.contact} getValue={(value) => setCurrentData({ ...currentData, contact: value })} label='contact' type='contact' min='0' />

                    </div>
                    <div className='mt-5'>
                        <Custominput readOnly={togglereadonly} value={currentData.identification_number} error={errors.identification_number} getValue={(value) => setCurrentData({ ...currentData, identification_number: value })} label='identification number' />
                    </div>
                    <div className='mt-5'>
                        <Custominput readOnly={togglereadonly} value={currentData.location} error={errors.location} getValue={(value) => setCurrentData((prevstate) => prevstate = { ...prevstate, location: value })} label='location' min='0' />
                    </div>
                    <div>

                    </div>

                    <div className='flex gap-10 mt-5'>
                        <span className="space-y-1 text-sm">
                            <div className='flex items-center justify-between relative'>
                                <label htmlFor="userrole" className="font-medium">user's role</label><abbr className='text-red-300' title='defines users role on the system'>*</abbr>
                                {errors.role && <div className=' mt-2'>
                                    <nav className="cursor-pointer font-awesome  gap-1  flex items-center absolute right-2 inset-y-0">
                                        <FontAwesomeIcon icon="warning" className="text-red-400 h-5 w-5 order-2 " />
                                        <span className="  text-sm text-red-400 backdrop-blur-sm bg-white/30 error ">{errors.role}</span>
                                    </nav>
                                </div>}
                            </div>
                            {currentData.role && <select defaultValue={currentData.role} onChange={(e) => setCurrentData({ ...currentData, role: e.target.value })} className={` block relative border border-gray-200 px-5 min-w-[12rem] py-3 focus:border-none outline-none rounded leading-6 w-full ring-offset-1 focus:ring-2 transition-all ease-out duration-150 ${togglereadonly && 'pointer-events-none focus-visible:none focus-within:none focus:none'}`} type="text" placeholder="Enter user first name" >
                                {roles && roles.map((role) => <option key={role.id} value={role.name}>{role.name}</option>)
                                }
                            </select>}
                        </span>
                        <span className="space-y-1 text-sm">
                            <div className='flex items-center justify-between relative'>
                                <label htmlFor="lastname" className="font-medium">job position</label>
                                {errors.jobposition && <div className=' mt-2'>
                                    <nav className="cursor-pointer font-awesome  gap-1  flex items-center absolute right-2 inset-y-0">
                                        <FontAwesomeIcon icon="warning" className="text-red-400 h-5 w-5 order-2 " />
                                        <span className="  text-sm text-red-400 backdrop-blur-sm bg-white/30 error ">{errors.jobposition}</span>
                                    </nav>
                                </div>}
                            </div>
                            {currentData.jobposition && <select onChange={(e) => setCurrentData({ ...currentData, jobposition: e.target.value })} defaultValue={currentData.jobposition} className={` block relative border border-gray-200 px-5 min-w-[12rem] py-3 focus:border-none outline-none rounded leading-6 w-full ring-offset-1 focus:ring-2 transition-all ease-out duration-150 ${togglereadonly && 'pointer-events-none focus-visible:none focus-within:none focus:none'}`} type="text" placeholder="Enter user first name" >
                                {jobPositions && jobPositions.map((position, i) => <option key={position.id} value={position.position}>{position.position} </option>)
                                }
                            </select>}
                        </span>
                    </div>
                    <div className='flex gap-5 w-full relative   mt-7 justify-end'>
                        {toggledelete && <Dialoge onDecline={()=>setToggledelete(false)} onConfirm={(e)=>sendDeleterequest(e)}>
                            <div className='py-5 flex flex-col justify-center'>
                                <FontAwesomeIcon className='text-red-500' size='xl' icon='warning' />
                                <nav>  Account will be permanently deleted </nav>
                                <nav className='text-xs text-gray-400 w-full text-center'> this action is irreversable </nav>
                            </div>
                        </Dialoge >}
                        {togglereadonly && <Primarybutton text='Edit' onClick={(e) => { e.preventDefault(); setTogglereadOnly(false) }} />}
                        {!togglereadonly && <Buttonsubmit processing={processing} text='update' />}
                        {!togglereadonly && <Buttondelete onClick={(e) =>{e.preventDefault();  setToggledelete(true)}} text='delete user account' />}
                    </div>
                </form>
            </main>
        </div>

    )
}
