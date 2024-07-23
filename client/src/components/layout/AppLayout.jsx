import React, {  useCallback, useEffect, useRef } from 'react'
import Header from './Header'
import Title from '../shared/Title'
import ChatList from '../specific/ChatList'
import { useNavigate, useParams } from 'react-router-dom'
import Profile from './Profile'
import { useMyChatQuery } from '../../redux/api/api'
import {LayOutLoader} from './Loaders'
import { useDispatch, useSelector } from 'react-redux'
import { setIsDeleteMenu, setIsMobile } from '../../redux/reducer/misc'
import useOnClickOutside from '../../hooks/useOnClickOutside'
import { useErrors, useSocketEvents } from '../../hooks/hook'
import { getSocket } from '../../socket'
import { NEW_MESSAGE_ALERT, NEW_REQUEST, REFETCH_CHATS } from '../constants/events'
import { incrementNotification, setNewMessagesAlert } from '../../redux/reducer/chat'
import { getOrSaveFromStorage } from '../../lib/features'

const AppLayout=()=>WrappedComponent=> {
  return (props)=>{
    const params=useParams();
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const ref=useRef()
    const chatId=params.chatId;

    const socket=getSocket();

    const {isMobile}=useSelector(state=>state.misc)
    const {user}=useSelector(state=>state.auth)
    const {newMessagesAlert}=useSelector(state=>state.chat)
    
    const {isLoading,data,isError,error,refetch}=useMyChatQuery("")

    useErrors([{isError,error}]);

    const handleDeleteChat=(e,_id,groupChat)=>{
      e.preventDefault(setIsDeleteMenu(true));
      dispatch(setIsDe)
      console.log("Delete chat",_id,groupChat)
    }

    useEffect(()=>{
      getOrSaveFromStorage({key:NEW_MESSAGE_ALERT,value:newMessagesAlert})
    },[newMessagesAlert])

    const handleMobileClose=()=>dispatch(setIsMobile(false))
    useOnClickOutside(ref,()=>handleMobileClose())

    const newMessagesAlertListener=useCallback((data)=>{
      if(data.chatId===chatId) return;

      dispatch(setNewMessagesAlert(data))
    },[chatId])

    const newRequestListener=useCallback(()=>{
      dispatch(incrementNotification())
    },[])
    const refetchListener=useCallback(()=>{
      refetch()
      navigate("/")
    },[refetch,navigate])

    const eventHandlers={
      [NEW_MESSAGE_ALERT]:newMessagesAlertListener,
      [NEW_REQUEST]:newRequestListener,
      [REFETCH_CHATS]:refetchListener,
    }

    useSocketEvents(socket,eventHandlers)

    return (
        <>
          <Title/>
          <Header/>

          {
            isLoading?<LayOutLoader/>:
            <div 
            ref={ref}
            className={`${isMobile?"block":"hidden"} bg-white fixed -top-5 left-0  md:hidden w-[70vw] 
            transition delay-150 duration-700 ease-in-out`}>
                <ChatList 
                  chats={data?.chats}
                  chatId={chatId}
                  handleDeleteChat={handleDeleteChat}
                  newMessagesAlert={newMessagesAlert}
                />
            </div>
          }
            
          <div className='grid  h-[calc(100vh-4rem)] grid-cols-12'>
              <div className='h-full hidden sm:block sm:col-span-4 md:col-span-3 overflow-y-auto custom-scrollbar'>
                  {
                    isLoading?<LayOutLoader/>:(
                      <ChatList 
                      chats={data?.chats}
                      chatId={chatId}
                      handleDeleteChat={handleDeleteChat}
                      newMessagesAlert={newMessagesAlert}
                      />
                    )
                  }
              </div>
              <div className='h-full col-span-12 sm:col-span-8 md:col-span-5 lg:col-span-6 overflow-y-auto custom-scrollbar'>
              <WrappedComponent {...props} chatId={chatId} user={user}/>
              </div>
              <div className='h-full hidden md:block md:col-span-4 lg:col-span-3 p-8 bg-[rgba(0,0,0,.85)] overflow-y-auto'>
                <Profile user={user}/>
              </div>
          </div>
        </>
    )
  }
}

export default AppLayout