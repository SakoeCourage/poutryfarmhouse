import React, { useEffect, useState } from 'react'
import Api from '../../api/Api'
import axios from 'axios'
import Buttonsubmit from '../../components/Buttonsubmit'
import Modal from '../../components/Modal'
import { dateReformat } from '../../api/Util'
import Primarybutton from '../../components/Primarybutton'
import SimpleBar from 'simplebar-react'
import Emptyresults from '../../components/Emptyresults'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Rolesform from './Definitionforms/Rolesform'
import Slideover from '../../components/Slideover'
import EditPermissions from './Partials/EditPermissions'


export default function RolesAndPermissions() {
  const [roles, setRoles] = useState([])
  const [nextPage, setNextPage] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showform, setShowForm] = useState(false)
  const [currentRoleName, setCurrentRoleName] = useState(null)
  const getAllRoles = () => {
    setIsLoading(true)
    Api.get('/roles/all').then(res => {
      setIsLoading(false)
      console.log(res.data)
      setRoles(res.data.roles.data);
      setNextPage(res.data.roles.next_page_url)
    }).catch(err => console.log(err))
  }
  const getMoreData = () => {
    setIsLoading(true)
    axios.get(nextPage).then(res => {
      setIsLoading(false)
      setRoles((cd) => cd = [...cd, ...res.data.roles.data])
      setNextPage(res.data.roles.next_page_url)
    }).catch(err => console.log(err))
  }
 
  const handleCloseModal = () => {
    setShowForm(false)
    getAllRoles()
  }

  useEffect(() => {
    getAllRoles()
  }, [])

  return (
    <div>
      {showform && <Modal closeModal={() => setShowForm(false)}>
        <Rolesform closeModal={handleCloseModal} />
      </Modal>
      }
      {
        currentRoleName && <Slideover onClose={() => setCurrentRoleName(null)} title={currentRoleName}>
          <EditPermissions roleName={currentRoleName}/>
        </Slideover>
      }
  
      <div className='flex items-start flex-auto flex-col md:flex-row  justify-center'>
        <nav className={`w-[100%] transition-all md:w-4/12 ${!Boolean(roles.length) && 'md:w-[100%]'}`}>
          <nav className={`flex flex-col justify-start ${!Boolean(roles.length) && 'items-center'} `}>
            <h1 className='font-semibold'>User roles</h1>
            <span className='mt-10 text-sm text-gray-500 max-w-md'>
              Define Roles with permissions that can be assigned to a user.
              Permissions defines part of the system where a user can or cannot have
              acees to.
            </span>
            <Primarybutton onClick={() => setShowForm(true)} className="w-full mt-10" text="New role" />
          </nav>
        </nav>
        {Boolean(roles.length) && <SimpleBar className='w-full basis-8/12 min-h-full bg-indigo-100   rounded-md'>
          <table className="px-5 w-full text-sm text-left text-gray-500 relative rounded-md">
            <thead className="sticky top-0 bg-indigo-100 ">
              <tr className='text-xs text-gray-700   shadow-sm'>

                <th scope="col" className="py-3 px-6 min-w-[10rem]">
                  record date
                </th>
                <th scope="col" className="py-3 px-6 min-w-[10rem]">
                  Roles
                </th>
                <th scope="col" className="py-3 px-6 min-w-[10rem]">
                  Action
                </th>

              </tr>
            </thead>
            <tbody>
              {roles.map((role, i) => {
                return (
                  <tr key={i} className={` border-b hover:bg-gray-200 ${i % 2 == 0 ? 'bg-gray-50' : 'bg-gray-50'}`}>
                    <td className="py-2 px-6">
                      {dateReformat(role.created_at)}
                    </td>
                    <td className="py-2 px-6 ">
                      {role.name}
                    </td>
                    <td className="py-2 px-6 ">
                      <nav onClick={() => setCurrentRoleName(role.name)} className='text-blue-500 flex items-center gap-2'>
                        <span >Permissions</span>
                        <FontAwesomeIcon icon='arrow-right' className='text-blue-500' size='sm' />
                      </nav>
                    </td>

                  </tr>

                )
              })}
            </tbody>
          </table>
          {nextPage && <div className='w-full flex items-center justify-center'>
            <Buttonsubmit processing={isLoading} onClick={() => getMoreData(nextPage)} className="text-xs w-full my-4" text="load more data" />
          </div>}

        </SimpleBar>
        }
      </div>


    </div>
  )

}
