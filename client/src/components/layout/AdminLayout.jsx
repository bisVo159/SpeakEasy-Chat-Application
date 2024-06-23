import React, { useRef, useState } from 'react'
import { AiOutlineMenu } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import useOnClickOutside from '../../hooks/useOnClickOutside';
import { useLocation,Link, Navigate } from 'react-router-dom';
import { MdDashboard } from "react-icons/md";
import { MdManageAccounts } from "react-icons/md";
import { MdGroups } from "react-icons/md";
import { MdMessage } from "react-icons/md";
import { TbLogout } from "react-icons/tb";

const adminTab=[
    {
        name:"Dashboard",
        path:"/admin/dashboard",
        icon:<MdDashboard size={30}/>
    },
    {
        name:"Users",
        path:"/admin/users",
        icon:<MdManageAccounts size={30}/>
    },
    {
        name:"Chats",
        path:"/admin/chats", 
        icon:<MdGroups size={30}/>
    },
    {
        name:"Messages",
        path:"/admin/messages",
        icon:<MdMessage size={30}/>
    },
]

const Sidebar=({w="100%"})=>{
    const location=useLocation()

    const logoutHandler=()=>{
        console.log("logout")
    }

    return (
        <div className={`w-[${w}] flex flex-col p-12 gap-12`}>
                <h1 className='uppercase text-2xl font-semibold'>SPEAK-EASY</h1>
                <div className='flex flex-col px-1 gap-6'>
                    {
                        adminTab.map((tab,i)=>(
                            <Link key={i} to={tab.path} className={ `flex gap-3 px-8 py-4 text-black rounded-[8rem] items-center 
                            hover:bg-[rgba(0,0,0,0.54)] ${location.pathname==tab.path&&"bg-black text-white hover:bg-black "} hover:text-gray-200 font-[1.2rem]`}>
                                {tab.icon}
                                <p>{tab.name}</p>
                            </Link>
                        ))
                    }
                    <Link className='flex gap-3 px-8 py-4 text-black rounded-[8rem] items-center hover:bg-[rgba(0,0,0,0.54)] hover:text-gray-200 font-[1.2rem]'>
                        <TbLogout size={30}/>
                        <p>LogOut</p>
                    </Link>
                </div>
        </div>
    )
}

function AdminLayout({children}) {
    const [isMobile,setIsMobile]=useState(false)
    const isAdmin=true;
    const ref=useRef();
    useOnClickOutside(ref,()=>setIsMobile(false))
    
    const handleMobile=()=>{
        setIsMobile(!isMobile)
    }

    if(!isAdmin) return <Navigate path='/admin'/>

  return (
    <div className='grid min-h-screen grid-cols-12'>
        <div className='md:hidden fixed right-4 top-4'>
            <button onClick={handleMobile} className='z-50'>
            {
                isMobile?<IoMdClose size={30} />:<AiOutlineMenu size={30} />

            }
            </button>
        </div>
        <div className='hidden md:block md:col-span-4 lg:col-span-3'>
            <Sidebar/>
        </div>
        <div className='col-span-12 md:col-span-8 lg:col-span-9 bg-gray-100 h-screen overflow-scroll'>
            {children}
        </div>

        <div 
        ref={ref}
        className={`${isMobile?"block":"hidden"} md:hidden bg-white fixed top-0 left-0 h-screen`}>
            <Sidebar w='50vw'/>
        </div>
    </div>
  )
}

export default AdminLayout