import React, { useState,useRef } from 'react'
import { IoMdCamera } from "react-icons/io";
import {useFileHandler, useInputValidation,useStrongPassword} from "6pp"
import { usernameValidator,profileImg } from '../utils/validators';

function Login() {
    const [isLogin,setIsLogin]=useState(true)
    const fileInputRef = useRef(null)

    const toggleLogin=()=>{
        setIsLogin((prev)=>!prev)
    }

    const name=useInputValidation("")
    const bio=useInputValidation("")
    const username=useInputValidation("",usernameValidator)
    // const password=useStrongPassword()
    const password=useInputValidation("")
    const avatar=useFileHandler("single")

    const handleSignUp=(e)=>{
        e.preventDefault()
    }
    const handleLogin=(e)=>{
        e.preventDefault()
    }

  return (
    <div className='flex items-center mx-auto h-screen justify-center w-screen
    bg-gradient-to-r from-blue-200 to-cyan-200'>
            <div className='shadow-xl p-6 flex flex-col justify-center items-center max-w-xs'>
                {
                    isLogin?(
                    <>
                    <h1 className='font-bold'>Login</h1>
                    <form className='space-y-3 w-full'
                    onSubmit={handleLogin}
                    >
                        <div className='flex flex-col'>
                            <label htmlFor='username'>User Name</label>
                            <input
                            id='username'
                            type='text'
                            placeholder='Enter your user Username'
                            className='shadow appearance-none border rounded w-full py-2 px-3
                            text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            value={username.value}
                            onChange={username.changeHandler}
                            required
                            />
                        </div>
                        <div>
                            <label htmlFor='password'>Password</label>
                            <input
                            id='password'
                            type='password'
                            placeholder='Enter your password'
                            className='shadow appearance-none border rounded w-full py-2 px-3
                            text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            value={password.value}
                            onChange={password.changeHandler}
                            required
                            />
                        </div>

                        <button
                        type='submit'
                        className='w-full font-semibold py-2 text-white bg-blue-900'
                        >LOGIN</button>
                        <p className='text-center m-4'>OR</p>
                        <button
                        className='mt-[1rem] w-full'
                        onClick={toggleLogin}
                        >Sign Up Instead</button>
                    </form>
                    </>)
                    :(
                        <>
                        <h1 className='font-bold'>Sign Up</h1>
                        <form className='space-y-3 w-full'
                        onSubmit={handleSignUp}
                        >
                            <div className='relative w-40 m-auto'>
                                <img
                                src={avatar.preview||profileImg}
                                alt='profile-pic'
                                className='w-40 aspect-square rounded-full object-cover'
                                />
                                {
                                    avatar.error&&(
                                    <span className='mt-1 text-[12px] text-red-950'>{avatar.error}</span>
                                )
                                }
                                <button className='absolute bottom-0 right-0 text-white bg-[rgba(0,0,0,0.5)] hover:bg-[rgba(0,0,0,0.7)] 
                                w-8 h-8 flex items-center rounded-full -translate-y-5 -translate-x-2'>
                                    <IoMdCamera
                                    onClick={()=>fileInputRef.current.click()}
                                     className='w-full object-cover'/>
                                    <input
                                    type='file'
                                    ref={fileInputRef}
                                    accept="image/png, image/gif, image/jpeg"
                                    onChange={avatar.changeHandler}
                                    className='overflow-hidden p-0 h-1 m-[-1] absolute whitespace-nowrap w-1'
                                    />
                                </button>
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor='name'>Name</label>
                                <input
                                id='name'
                                type='text'
                                placeholder='Enter your user name'
                                className='shadow appearance-none border rounded w-full py-2 px-3
                                text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                value={name.value}
                                onChange={name.changeHandler}
                                required
                                />
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor='bio'>Bio</label>
                                <input
                                id='bio'
                                type='text'
                                placeholder='Enter your Bio'
                                className='shadow appearance-none border rounded w-full py-2 px-3
                                text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                value={bio.value}
                                onChange={bio.changeHandler}
                                required
                                />
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor='username'>User Name</label>
                                <input
                                id='username'
                                type='text'
                                placeholder='Enter your user Username'
                                className='shadow appearance-none border rounded w-full py-2 px-3
                                text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                value={username.value}
                                onChange={username.changeHandler}
                                required
                                />
                                {
                                    username.error&&(
                                    <span className='mt-1 text-[12px] text-red-950'>{username.error}</span>
                                )
                                }
                            </div>
                            <div>
                                <label htmlFor='password'>Password</label>
                                <input
                                id='password'
                                type='password'
                                placeholder='Enter your password'
                                className='shadow appearance-none border rounded w-full py-2 px-3
                                text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                value={password.value}
                                onChange={password.changeHandler}
                                required
                                />
                            </div>
    
                            <button
                            type='submit'
                            className='w-full font-semibold py-2 text-white bg-blue-900'
                            >SIGN UP</button>
                            <p className='text-center m-4'>OR</p>
                            <button
                            className='mt-[1rem] w-full'
                            onClick={toggleLogin}
                            >Login Instead</button>
                        </form>
                        </>
                    )
                }
            </div>
    </div>
  )
}

export default Login