import React from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import { MdAdminPanelSettings } from "react-icons/md";
import moment from 'moment';
import { IoIosNotifications } from "react-icons/io";
import { MdGroups } from "react-icons/md";
import { IoPerson } from "react-icons/io5";
import { MdMessage } from "react-icons/md";
import {LineChart,DoughnutChart} from "../../components/specific/Charts"
import { useFetchData } from '6pp';
import { server } from '../../components/constants/config';
import {  Spinner } from '../../components/layout/Loaders';
import { useErrors } from '../../hooks/hook';

function Dashboard() {

  const {loading,data,error}=useFetchData(`${server}/admin/stats`,"dashboard-stats")

  const {stats}=data||{};

  useErrors([{
    isError:error,
    error:error
  }
  ])
  
  const Appbar=<div className='p-8 my-8 rounded-2xl shadow-2xl'>
    <div className='flex items-center gap-4'>
      <MdAdminPanelSettings size={60}/>
      <input
      className='py-2 px-8 w-48 border-none outline-none rounded-3xl bg-gray-200 text-[1.1rem]'
      placeholder='Search...'
       type='text'/>
      <button 
      className='py-2 px-8 border-none outline-none rounded-3xl text-[1.1rem]
       cursor-pointer bg-[rgba(0,0,0,0.75)] text-white hover:bg-[rgba(0,0,0,0.8)]'
      >
        Search</button>
        <div className='flex-1'></div>
      <p className='hidden lg:block text-center text-[rgba(0,0,0,0.7)]'>{moment().format("dddd, D MMMM YYYY")}</p>
      <IoIosNotifications size={30}/>
    </div>
  </div>

  const Widgets=<div className='flex flex-col sm:flex-row gap-8 justify-between items-center my-8'>
      <Widget title={"Users"} value={stats?.usersCount} Icon={<IoPerson size={20}/>}/>
      <Widget title={"Chats"} value={stats?.totalChatsCount} Icon={<MdGroups size={20}/>}/>
      <Widget title={"Messages"} value={stats?.messagesCount} Icon={<MdMessage size={20}/>}/>
  </div>

  return (
    <AdminLayout>
        {
          loading?<Spinner/>:
          <div className='px-4'>
          {Appbar}

          <div className='flex flex-col lg:flex-row flex-wrap gap-8 justify-center items-center sm:items-stretch'>
            <div className='shadow-2xl py-8 px-14 rounded-2xl w-full max-w-[45rem]'>
              <p className='my-8  text-2xl'>Last Messages</p>
              <LineChart value={stats?.messageChart||[]}/>
            </div>

            <div className='shadow-2xl p-4 rounded-2xl flex justify-center items-center w-full sm:w-1/2 relative max-w-[25rem]'>
                <DoughnutChart 
                labels={['Single Chats','Group Chats']}
                 value={[stats?.totalChatsCount-stats?.groupsCount||0,stats?.groupsCount||0]}/>
                <div className='absolute flex justify-center items-center gap-2 w-full h-full '>
                    <MdGroups size={20}/>
                    <p>Vs</p>
                    <IoPerson size={20}/>
                </div>
            </div>
          </div>

          {Widgets}
        </div>
        }
    </AdminLayout>
  )
}

const Widget=({title,value,Icon})=>{
  return(
  <div className='flex flex-col items-center gap-4 p-8 my-8 rounded-3xl w-80 shadow-2xl'>
    <p
    className='text-[rgba(0,0,0,0.7)] rounded-[50%] border-[5px] border-solid border-[rgba(0,0,0,0.9)] 
    w-20 aspect-square flex justify-center items-center'
    >{value}</p>
    <div className='flex gap-4  items-center'>
      {Icon}
      <p>{title}</p>
    </div>
  </div>)
}

export default Dashboard