import React, {  useRef } from 'react'
import Header from './Header'
import Title from '../shared/Title'
import ChatList from '../specific/ChatList'
import { useParams } from 'react-router-dom'
import Profile from './Profile'
import { useMyChatQuery } from '../../redux/api/api'
import Loaders from './Loaders'
import { useDispatch, useSelector } from 'react-redux'
import { setIsMobile } from '../../redux/reducer/misc'
import useOnClickOutside from '../../hooks/useOnClickOutside'
import { useErrors } from '../../hooks/hook'

const AppLayout=()=>WrappedComponent=> {
  return (props)=>{
    const params=useParams();
    const dispatch=useDispatch()
    const ref=useRef()
    const chatId=params.chatId;

    const {isMobile}=useSelector(state=>state.misc)
    const {user}=useSelector(state=>state.auth)
    
    const {isLoading,data,isError,error,refetch}=useMyChatQuery("")

    useErrors([{isError,error}]);

    const handleDeleteChat=(e,_id,groupChat)=>{
      e.preventDefault();
      console.log("Delete chat",_id,groupChat)
    }

    const handleMobileClose=()=>dispatch(setIsMobile(false))
    useOnClickOutside(ref,()=>handleMobileClose())

    return (
        <>
          <Title/>
          <Header/>

          {
            isLoading?<Loaders/>:
            <div 
            ref={ref}
            className={`${isMobile?"block":"hidden"} bg-white fixed -top-5 left-0  md:hidden w-[70vw] 
            transition delay-150 duration-700 ease-in-out`}>
                <ChatList 
                  chats={data?.chats}
                  chatId={chatId}
                  handleDeleteChat={handleDeleteChat}
                />
            </div>
          }
            
          <div className='grid  h-[calc(100vh-4rem)] grid-cols-12'>
              <div className='h-full hidden sm:block sm:col-span-4 md:col-span-3 overflow-y-auto custom-scrollbar'>
                  {
                    isLoading?<Loaders/>:(
                      <ChatList 
                      chats={data?.chats}
                      chatId={chatId}
                      handleDeleteChat={handleDeleteChat}
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