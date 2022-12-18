import React from 'react'
import { useForm } from '@inertiajs/inertia-react'
import Loadingspinner from '../components/Loadingspinner'
import Custominput from '../components/Custominput'


export default function Login() {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
    password: '',
    remember: false,
  })

  let submit = (e) => {
    e.preventDefault()
    post('/login')
  }

  return (
    <>
      <div className="flex flex-col mx-auto w-full min-h-screen bg-gray-100">

        <main className="flex flex-auto flex-col max-w-full">
          <div className="min-h-screen flex items-center justify-center relative overflow-hidden max-w-10xl mx-auto p-4 lg:p-8 w-full">

            <div className="pattern-dots-md text-gray-300 absolute top-0 right-0 w-32 h-32 lg:w-48 lg:h-48 transform translate-x-16 translate-y-16" />
            <div className="pattern-dots-md text-gray-300 absolute bottom-0 left-0 w-32 h-32 lg:w-48 lg:h-48 transform -translate-x-16 -translate-y-16" />

            <div className="py-6 lg:py-0 w-full md:w-8/12 lg:w-6/12 xl:w-4/12 relative">
              <div className="mb-8 text-center">
                <h1 className="text-4xl font-bold text-gray-600  flex flex-col justify-center items-center mb-1 space-x-3">
                  <span>Poulty</span>
                  <span className='text-sm block text-center'>Farm House</span>
                </h1>
                <p className="text-gray-500">
                  Welcome, please sign in to your dashboard
                </p>
              </div>
              <div className="flex flex-col rounded shadow-sm bg-white overflow-hidden">
                <div className="p-5 lg:p-6 grow w-full">
                  <div className="sm:p-5 lg:px-10 lg:py-8">
                    <form onSubmit={submit} className="space-y-6">

                      <Custominput label='email' error={errors.email} getValue={(value) => setData('email', value)} type='text' />
                      <Custominput label='password' error={errors.password} getValue={(value) => setData('password', value)} type='password' />
                      <div>
                        <button type="submit" className={`inline-flex justify-center items-center space-x-2 border font-semibold focus:outline-none w-full px-4 py-3 leading-6 rounded border-indigo-700 bg-indigo-500 text-white hover:text-white hover:bg-indigo-800 hover:border-indigo-800 focus:ring focus:ring-indigo-400 focus:ring-opacity-50 active:bg-indigo-700 active:border-indigo-700 ${processing && 'pointer-events-none opacity-[50%]'}`}>
                          {!processing && <span>Sign In</span>}  {processing && <Loadingspinner />}
                        </button>

                        <div className="space-y-2 sm:flex sm:items-center sm:justify-between sm:space-x-2 sm:space-y-0 mt-4 justify-center">
                          <a href="#" className="inline-block text-indigo-600 hover:text-indigo-400">Forgot Password?</a>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
