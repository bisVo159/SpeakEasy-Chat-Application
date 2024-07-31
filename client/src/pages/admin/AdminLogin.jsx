import React, { useEffect } from 'react'
import { useInputValidation} from "6pp"
import {Navigate} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { adminLogin, getAdmin } from '../../redux/thunks/admin'

function AdminLogin() {

  const {isAdmin}=useSelector(state=>state.auth)
  const dispatch=useDispatch()
  
  const secretKey=useInputValidation('')

  const submitHandler=(e)=>{
      e.preventDefault()
      console.log("submit")
      dispatch(adminLogin(secretKey.value))
  }

  useEffect(()=>{
    dispatch(getAdmin())
  },[dispatch])

  if(isAdmin) return <Navigate to="/admin/dashboard"/>
  return (
    <div className='flex items-center mx-auto h-screen justify-center w-screen
    bg-gradient-to-r from-[#a5b4fc] to-[#13151f9a]'>
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
                            onChange={secretKey.changeHandler}
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