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
import { setIsMobile, setIsSearch } from '../../redux/reducer/misc';
import Loaders from './Loaders';

const SearchDialog= lazy(()=>import('../specific/SearchDialog')) ;
const Notifications= lazy(()=>import('../specific/Notifications')) ;
const NewGroup= lazy(()=>import('../specific/NewGroup')) ;

function Header() {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const {isSearch}=useSelector(state=>state.misc)
    const [isNewGroup,setIsNewGroup]=useState(false)
    const [isNotification,seIsNotification]=useState(false)

    const handleMobile=()=>dispatch(setIsMobile(true))
    
    const openSearch=()=>dispatch(setIsSearch(true))
    
    const openNewGroup=()=>{
        setIsNewGroup(prev=>!prev)
    }
    const openNotification=()=>{
        seIsNotification(prev=>!prev)
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
        <div className='h-16 bg-[#ea7070] static flex items-center px-8 text-white rounded-t-xl'>
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
                <IconBtn icon={<IoIosNotifications size={26}/>} title={"Notifications"} onclick={openNotification}/>
                <IconBtn icon={<MdOutlineLogout size={26}/>} title={"Logout"} onclick={logOutHandler}/>
            </div>
        </div>
        {
            isSearch&&(
                <Suspense fallback={<Loaders/>}>
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

const IconBtn=({title,icon,onclick})=>{
    return(
        <button
        className='text-white relative group'
        onClick={onclick}
        >
            {icon}
            <div className='absolute hidden group-hover:block bg-black opacity-5
             text-white  h-fit px-1 text-xs top-12'>{title}</div>
        </button>
    )
}

export default Header