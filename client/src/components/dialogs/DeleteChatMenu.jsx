import React, { useEffect, useRef, useState } from 'react'
import useOnClickOutside from '../../hooks/useOnClickOutside'
import { setIsDeleteMenu } from '../../redux/reducer/misc'
import { useSelector } from 'react-redux'
import { IoMdExit } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useAsyncMutation } from '../../hooks/hook';
import { useDeleteChatMutation, useLeaveGroupMutation } from '../../redux/api/api';

function DeleteChatMenu({dispatch,deleteMenuAnchor}) {
    const ref=useRef(null)
    const navigate=useNavigate()

    const {seletedDeleteChat}=useSelector(state=>state.misc)
    const [deleteChat,_,deleteChatData]=useAsyncMutation(useDeleteChatMutation)
    const [leaveGroup,__,leaveGroupData]=useAsyncMutation(useLeaveGroupMutation)
    const isGroup=seletedDeleteChat.groupChat

    const closeHandler=()=>{
        dispatch(setIsDeleteMenu(false))
        deleteMenuAnchor.current=null
    }

    const leaveGroupHandler=()=>{
        closeHandler()
        leaveGroup("Leaving Group...",seletedDeleteChat.chatId)
    }
    const deleteChatHandler=()=>{
        closeHandler()
        deleteChat("Deleting Chat...",seletedDeleteChat.chatId)
    }

    useOnClickOutside(ref,()=>closeHandler())

    useEffect(()=>{
        if(deleteChatData||leaveGroupData) navigate('/')
    },[deleteChatData,leaveGroupData])
  return (
    <div
    ref={ref}
    style={{
        top: `${deleteMenuAnchor.current.getBoundingClientRect().top}px`,
        left: `${deleteMenuAnchor.current.getBoundingClientRect().left+250}px`,
        zIndex: 1000
      }}
      onClick={isGroup?leaveGroupHandler:deleteChatHandler}
    className={`bg-white w-40 p-2 cursor-pointer flex items-center gap-2 shadow-xl absolute`}
    >
        {
            isGroup?
            <div className='flex items-center gap-2'>
                <IoMdExit size={26}/>
                <p>Leave Group</p>
            </div>:
            <div className='flex items-center gap-2'>
               <MdDelete size={26}/>
               <p>Delete Chat</p>
           </div>
        }
    </div>
  )
}

export default DeleteChatMenu