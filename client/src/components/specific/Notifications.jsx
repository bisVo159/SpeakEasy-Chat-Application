import React, { memo, useRef } from 'react'
import { useAcceptFriendRequestMutation, useGetNotificationsQuery } from '../../redux/api/api'
import { useAsyncMutation, useErrors } from '../../hooks/hook'
import useOnClickOutside from '../../hooks/useOnClickOutside'
import { useDispatch } from 'react-redux'
import { setNotification } from '../../redux/reducer/misc'
import {LayOutLoader} from '../layout/Loaders'
import toast from 'react-hot-toast'

function Notifications() {
  const ref=useRef()
  const dispath=useDispatch()
  useOnClickOutside(ref,()=>dispath(setNotification(false)))

  const {isLoading,data,error,isError}=useGetNotificationsQuery()
  useErrors([{error,isError}])

  const [acceptRequest]=useAsyncMutation(useAcceptFriendRequestMutation);

  const friendRequestHandler=async({_id,accept})=>{
    dispath(setNotification(false))
    acceptRequest("Accepting ...",{requestId:_id,accept})
  }
  
  return (
    <div className='fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm'>
      <div 
      ref={ref}
      className='flex flex-col items-center w-96 bg-white py-10 px-4 rounded-md gap-3'>
        <h1 className='font-bold'>Notifications</h1>
        <ul className='flex flex-col gap-y-3 w-3/4 box-content'>
        {
        isLoading?<LayOutLoader/>:<>
        {
          data?.allRequests?.length>0?(
            data?.allRequests?.map(({sender,_id})=>
            <NotificationItems sender={sender} _id={_id} handler={friendRequestHandler} key={_id}/>)
          )
          :(<p className='text-lg text-center text-gray-500'>No notifications</p>)
        }
        </>
      }
        </ul>
      </div>
    </div>
  )
}

const NotificationItems=memo(({sender,_id,handler})=>{
  const {avatar,name}=sender
  return (
    <div className='flex items-center  justify-between w-full'>
       <div className='flex gap-x-3 items-center'>
        <img
          src={avatar}
          className='w-8 aspect-square rounded-full '
          />
          <h1
          className=''
          >{name}</h1>
       </div>

       <div className='flex xs:flex-col sm:flex-row gap-3'>
        <button
        onClick={()=>handler({_id,accept:true})}
        >
          ACCEPT
        </button>
        <button
        className='text-red-950'
        onClick={()=>handler({_id,accept:false})}
        >
          REJECT
        </button>
       </div>
    </div>
    )
  }
)

export default Notifications