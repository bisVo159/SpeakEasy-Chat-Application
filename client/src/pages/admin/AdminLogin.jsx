import React from 'react'
import { useInputValidation} from "6pp"
import {Navigate} from "react-router-dom"

const isAdmin=false
function AdminLogin() {
  const secretKey=useInputValidation('')

  const submitHandler=(e)=>{
      e.preventDefault()
      console.log("submit")
  }

  if(isAdmin) return <Navigate to="/admin/dashboard"/>
  return (
    <div className='flex items-center mx-auto h-screen justify-center w-screen
    bg-gradient-to-r from-blue-200 to-cyan-200'>
            <div className='shadow-xl p-6 flex flex-col justify-center items-center w-72 gap-5'>
              <h1 className='font-medium text-xl'>Admin Login</h1>
                <form className='space-y-3 w-full'
                    onSubmit={submitHandler}
                    >
                        <div className='flex flex-col gap-3'>
                          <input
                            id='secretkey'
                            type='text'
                            placeholder='Enter Secret Key'
                            className='shadow appearance-none border rounded w-full py-2 px-3
                            text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            value={secretKey.value}
                            onChange={secretKey.onChange}
                            required
                            />
                        </div>

                        <button
                        type='submit'
                        className='w-full font-semibold py-2 text-white bg-blue-900'
                        >LOGIN</button>
                  </form>                                  
            </div>
    </div>
  )
}

export default AdminLogin