import React, {Suspense, lazy, useState } from 'react'
import { AiOutlineMenu } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import { IoAddOutline } from "react-icons/io5";
import { MdGroups2 } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { MdOutlineLogout } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";
import axios from "axios"
import {server} from "../constants/config"
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { userNotExists } from '../../redux/reducer/auth';
import { setIsMobile, setIsNewGroup, setIsSearch, setNotification } from '../../redux/reducer/misc';
import {LayOutLoader} from './Loaders';
import { resetNotification } from '../../redux/reducer/chat';

const SearchDialog= lazy(()=>import('../specific/SearchDialog')) ;
const Notifications= lazy(()=>import('../specific/Notifications')) ;
const NewGroup= lazy(()=>import('../specific/NewGroup')) ;

function Header() {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const {isSearch,isNotification}=useSelector(state=>state.misc)
    const {notificationsCount}=useSelector(state=>state.chat)
    const {isNewGroup}=useSelector(state=>state.misc)

    const handleMobile=()=>dispatch(setIsMobile(true))
    
    const openSearch=()=>dispatch(setIsSearch(true))
    
    const openNewGroup=()=>{
        dispatch(setIsNewGroup(true))
    }
    const openNotification=()=>{
        dispatch(setNotification(true))
        dispatch(resetNotification())
    }
    const navigateToGroup=()=>navigate("/groups")

    const logOutHandler=async()=>{
        try {
            const {data}=await axios.get(`${server}/user/logout`,
                {withCredentials:true})
            
                dispatch(userNotExists())
            toast.success(data.message)
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }

  return (
    <>
        <div className='h-16 bg-[#a5b4fc] static flex items-center px-8 text-white rounded-t-xl'>
            <h1 className='hidden sm:block text-white text-lg font-semibold '>Speak-Easy</h1>
            <button
            className='sm:hidden'
            onClick={handleMobile}
            >
                <AiOutlineMenu size={26}/>
            </button>

            <div className='flex-1 flex justify-end gap-x-3'>
                <IconBtn icon={<CiSearch size={26}/>} title={"Search"} onclick={openSearch}/>
                <IconBtn icon={<IoAddOutline size={26}/>} title={"Add Group"} onclick={openNewGroup}/>
                <IconBtn icon={<MdGroups2 size={26}/>} title={"Manage Groups"} onclick={navigateToGroup}/>
                <IconBtn icon={<IoIosNotifications size={26}/>} title={"Notifications"} onclick={openNotification} value={notificationsCount}/>
                <IconBtn icon={<MdOutlineLogout size={26}/>} title={"Logout"} onclick={logOutHandler}/>
            </div>
        </div>
        {
            isSearch&&(
                <Suspense fallback={<div>Loading...</div>}>
                    <SearchDialog/>
                </Suspense>
            )
        }
        {
            isNotification&&(
                <Suspense fallback={<div>Loading...</div>}>
                    <Notifications/>
                </Suspense>
            )
        }
        {
            isNewGroup&&(
                <Suspense fallback={<div>Loading...</div>}>
                    <NewGroup/>
                </Suspense>
            )
        }
    </>
  )
}

const IconBtn=({title,icon,onclick,value})=>{
    return(
        <button
        className='text-white relative group flex flex-col items-center '
        onClick={onclick}
        >
            <div className="relative">
                {icon}
                {value>0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold leading-none
                 text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full animate-bounce">
                    {value}
                </span>
                )}
            </div>
            <div className='absolute hidden group-hover:block bg-neutral-600
             text-white  p-1 text-xs top-8  rounded-sm transition delay-150 duration-300 ease-in-out text-nowrap'>
            {title}</div>
        </button>
    )
}

export default Header