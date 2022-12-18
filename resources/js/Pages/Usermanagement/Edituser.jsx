import React,{useRef,useEffect,useState} from 'react'
import Customsearchinput from '../../components/customsearchinput'
import { useForm } from '@inertiajs/inertia-react'
import Custominput from '../../components/Custominput'
import Buttonsubmit from '../../components/Buttonsubmit'
import Getselectsitems from '../../api/Getselectsitems'

export default function Edituser() {
    const formEl = useRef()
    const [roles, setRoles] = useState([])
    const [jobPositions, setJobPositions] = useState([])
    const {processing, submit, post ,data ,setData, errors} = useForm({
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

  return (
    <div>

    <main className=' w-full mx-auto px-10'>
        <form ref={formEl} onSubmit={submit} className=' class-name flex flex-col gap-5'>
            <div className='flex md:flex-row items-center flex-col gap-10'>
                <Custominput error={errors.firstname} required getValue={(value) => setData('firstname', value)} label='first name' />
                <Custominput error={errors.lastname} required getValue={(value) => setData('lastname', value)} label='last name' />
                <Custominput error={errors.name} required getValue={(value) => setData('name', value)} label='user name' />
            </div>
            <div className='flex md:flex-row items-center flex-col gap-10'>
                <Custominput error={errors.email} getValue={(value) => setData('email', value)} label='email' />
              
            </div>
            <div className='mt-5'>
                <Custominput required error={errors.contact} getValue={(value) => setData('contact', value)} label='contact' type='contact' min='0' />

            </div>
            <div className='mt-5'>
                <Custominput error={errors.location} getValue={(value) => setData('location', value)} label='location' min='0' />
            </div>
            <div className='mt-5'>
                <Custominput error={errors.identification_number} getValue={(value) => setData('identification_number', value)} label='identification number'  />
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
                    <select onChange={(e) => setData('role', e.target.value)} className=" block relative border border-gray-200 px-5 min-w-[12rem] py-3 focus:border-none outline-none rounded leading-6 w-full ring-offset-1 focus:ring-2 transition-all ease-out duration-150" type="text" placeholder="Enter user first name" >
                        <option value='' >select role</option>
                        {roles && roles.map((role) => <option key={role.id} value={role.name}>{role.name}</option>)
                        }
                    </select>
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
                    <select onChange={(e) => setData('jobposition', e.target.value)} className=" block relative border border-gray-200 px-5 min-w-[12rem] py-3 focus:border-none outline-none rounded leading-6 w-full ring-offset-1 focus:ring-2 transition-all ease-out duration-150"  type="text" placeholder="Enter user first name" >
                        <option value='' >select job position</option>
                        {jobPositions && jobPositions.map((position, i) => <option key={position.id} value={position.position}>{position.position} </option>)
                        }
                    </select>
                </span>
            </div>
            <div className='flex w-full  mt-7 justify-end'>
                <Buttonsubmit processing={processing} text='create' />
            </div>



        </form>

    </main>
</div>

  )
}
