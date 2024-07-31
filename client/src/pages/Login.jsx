import React, { useState,useRef } from 'react'
import { IoMdCamera } from "react-icons/io";
import {useFileHandler, useInputValidation,useStrongPassword} from "6pp"
import { usernameValidator } from '../utils/validators';
import profileImg from "../assets/profile.png"
import axios from 'axios';
import { server } from '../components/constants/config';
import { useDispatch } from 'react-redux';
import { userExists } from '../redux/reducer/auth';
import toast from 'react-hot-toast';

function Login() {
    const [isLogin,setIsLogin]=useState(true)
    const [isLoading,setIsLoading]=useState(false)
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
    const dispatch=useDispatch()

    const handleLogin=async(e)=>{
        e.preventDefault()

        setIsLoading(true)
        const toastId=toast.loading("Logging In...")
        const config={
            withCredentials:true,
            headers:{
                "Content-Type":"application/json"
            }
        }

        try {
            const {data}=await axios.post(
                `${server}/user/login`,
                {
                username:username.value,
                password:password.value
                },
                config
            )

            dispatch(userExists(data?.user))
            toast.success(data.message,{
                id:toastId
            })
        } catch (error) {
            toast.error(error?.response?.data?.message||"Something Went Wrong",{
                id:toastId
            })
        }finally{
            setIsLoading(false)
        }
    }
    
    const handleSignUp=async(e)=>{
        e.preventDefault()

        const config={
            withCredentials:true,
            headers:{
                "Content-Type":"multipart/form-data"
            }
        }
        setIsLoading(true)
        const formData=new FormData()
        formData.append("name",name.value)
        formData.append("bio",bio.value)
        formData.append("username",username.value)
        formData.append("password",password.value)
        formData.append("avatar",avatar.file)
        const toastId=toast.loading("Signing Up...");
        try {
            const {data}=await axios.post(
                `${server}/user/new`,
                formData,
                config
            )

            dispatch(userExists(data?.user))
            toast.success(data.message,{
                id:toastId
            })
        } catch (error) {
            toast.error(error?.response?.data?.message||"Something Went Wrong",{
                id:toastId
            })
        }finally{
            setIsLoading(false)
        }
    }

  return (
    <div className='flex items-center mx-auto h-screen justify-center w-screen
    bg-gradient-to-r from-[#a5b4fc] to-[#13151f9a]'>
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
                        disabled={isLoading}
                        >LogIn</button>
                        <p className='text-center m-4'>OR</p>
                        <button
                        className='mt-[1rem] w-full'
                        onClick={toggleLogin}
                        disabled={isLoading}
                        >Sign Up Instead</button>
                    </form>
                    </>)
                    :(
                        <>
                        <h1 className='font-bold mb-2'>Sign Up</h1>
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
                                w-8 h-8 flex items-center rounded-full -translate-y-4 -translate-x-1'>
                                    <IoMdCamera
                                    onClick={()=>fileInputRef.current.click()}
                                     className='w-full object-cover'/>
                                    <input
                                    type='file'
                                    ref={fileInputRef}
                                    accept="image/png, image/gif, image/jpeg"
                                    onChange={avatar.changeHandler}
                                    className='overflow-hidden p-0 h-1 m-[-1] absolute whitespace-nowrap w-1'
                                    disabled={isLoading}
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
                            disabled={isLoading}
                            >Sign Up</button>
                            <p className='text-center m-4'>OR</p>
                            <button
                            className='mt-[1rem] w-full'
                            onClick={toggleLogin}
                            disabled={isLoading}
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