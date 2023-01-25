import React from 'react'
import Custominput from '../../components/Custominput'
import { useState, useEffect, useRef } from 'react'
import getSelectItems from '../../api/Getselectsitems'
import { useForm } from '@inertiajs/inertia-react'
import Buttonsubmint from '../../components/Buttonsubmit'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Api from '../../api/Api'






export default function Createuser() {
    const formEl = useRef()
    const [defaultPasswordChecker, setDefaultPasswordChecker] = useState(true)
    const [roles, setRoles] = useState([])
    const [resetform,setresetform] =useState(false)
    const [jobPositions, setJobPositions] = useState([])
    const { getRoles, getJobPositions } = getSelectItems
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        firstname: '',
        lastname: '',
        contact: '',
        location: '',
        identification_number: '',
        jobposition: '',
        role: '',
        usedefault: 1
    })

    function changeDefaultpasswordChecker(e){
        setDefaultPasswordChecker(Boolean(e.target.checked))
        setData('usedefault', Number(e.target.checked))
    } 

    function resetAllData(e) {
        reset()
        formEl.current.reset()
        setresetform(!resetform)
    }

    let submit = (e) => {
        e.preventDefault()
        post('/createuser', {
            onSuccess: () => resetAllData(),
        })
    }

    const fetchData = async () => {
        let rolespromise = getRoles()
        let jobPositionspromise = getJobPositions()
        const roles = await rolespromise
        const jobs = await jobPositionspromise
        setRoles(roles.data.roles)
        setJobPositions(jobs.data.jobs)
    }

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        Api.get('/permission/all')
        .then(res=>{
          console.log(res.data)
        }).catch(err=>{
          console.log(err)
        })
      }, [])
      
 


    return (
        <div>

            <main className=' max-w-4xl mx-auto'>
                <form ref={formEl} onSubmit={submit} className=' class-name flex flex-col gap-5'>
                    <div className='flex md:flex-row items-center flex-col gap-10'>
                        <Custominput reset={resetform} error={errors.firstname} required getValue={(value) => setData('firstname', value)} label='first name' />
                        <Custominput reset={resetform} error={errors.lastname} required getValue={(value) => setData('lastname', value)} label='last name' />
                        <Custominput reset={resetform} error={errors.name} required getValue={(value) => setData('name', value)} label='user name' />
                    </div>
                    <div className='flex md:flex-row items-center flex-col gap-10'>
                        <Custominput reset={resetform} error={errors.email} getValue={(value) => setData('email', value)} label='email' />
                        <nav className='flex flex-col w-full'>
                            <nav className='flex gap-2 items-center'>
                                <label className='font-semibold text-sm' htmlFor="" >use default password</label>
                                <input type="checkbox" name="" id="" checked={defaultPasswordChecker} onChange={(e) => changeDefaultpasswordChecker(e) } />
                            </nav>
                            <Custominput reset={resetform} error={errors.password} placeholder="enter password " getValue={(value) => setData('password', value)} disabled={defaultPasswordChecker} readOnly={defaultPasswordChecker} type='password' />
                        </nav>
                    </div>
                    <div className='mt-5'>
                        <Custominput reset={resetform} required error={errors.contact} getValue={(value) => setData('contact', value)} label='contact' type='contact' min='0' />

                    </div>
                    <div className='mt-5'>
                        <Custominput reset={resetform} error={errors.location} getValue={(value) => setData('location', value)} label='location' min='0' />
                    </div>
                    <div className='mt-5'>
                        <Custominput reset={resetform} error={errors.identification_number} getValue={(value) => setData('identification_number', value)} label='identification number'  />
                    </div>
                    <div className='flex flex-wrap gap-10 mt-5'>
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
                            <select onChange={(e) => setData('role', e.target.value)} className=" block relative border border-gray-200 px-5 min-w-[12rem] py-3 focus:border-none outline-none rounded leading-6 w-full ring-offset-1 focus:ring-2 transition-all ease-out duration-150" type="text" placeholder="Enter user first name" >
                                <option value='' >select role</option>
                                <option onClick={()=>alert('hello')} >select role</option>
                                {roles && roles.map((role) => <option key={role.id} value={role.name}>{role.name}</option>)
                                }
                            </select>
                        </span>
                        <span className="space-y-1 text-sm">
                            <div className='flex items-center justify-between relative'>
                                <label htmlFor="lastname" className="font-medium">job title</label>
                                {errors.jobposition && <div className=' mt-2'>
                                    <nav className="cursor-pointer font-awesome  gap-1  flex items-center absolute right-2 inset-y-0">
                                        <FontAwesomeIcon icon="warning" className="text-red-400 h-5 w-5 order-2 " />
                                        <span className="  text-sm text-red-400 backdrop-blur-sm bg-white/30 error ">{errors.jobposition}</span>
                                    </nav>
                                </div>}
                            </div>
                            <select onChange={(e) => setData('jobposition', e.target.value)} className=" block relative border border-gray-200 px-5 min-w-[12rem] py-3 focus:border-none outline-none rounded leading-6 w-full ring-offset-1 focus:ring-2 transition-all ease-out duration-150"  type="text" placeholder="Enter user first name" >
                                <option value='' >select job title</option>
                                {jobPositions && jobPositions.map((position, i) => <option key={position.id} value={position.position}>{position.position} </option>)
                                }
                            </select>
                        </span>

                        <span>

                        </span>
                    </div>
                    <div className='flex w-full  mt-7 justify-end'>
                        <Buttonsubmint processing={processing} text='create' />
                    </div>



                </form>

            </main>
        </div>
    )
}
