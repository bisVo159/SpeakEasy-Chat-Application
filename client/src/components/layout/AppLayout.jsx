import React from 'react'
import Header from './Header'
import Title from '../shared/Title'
import ChatList from '../specific/ChatList'
import { sampleChats } from '../constants/sampleData'
import { useParams } from 'react-router-dom'
import Profile from './Profile'

const AppLayout=()=>WrappedComponent=> {
  return (props)=>{
    const params=useParams()
    const chatId=params.chatId
    console.log("chatId",chatId)

    const handleDeleteChat=(e,_id,groupChat)=>{
      e.preventDefault();
      console.log("Delete chat",_id,groupChat)
    }

    return (
        <>
            <Title/>
            <Header/>
            <div className='grid  h-[calc(100vh-4rem)] grid-cols-4'>
                <div className='h-full hidden sm:block'>
                    <ChatList chats={sampleChats}
                     chatId={chatId}
                     newMessagesAlert={[
                      {
                        chatId,
                        count:4
                      }
                     ]}
                     handleDeleteChat={handleDeleteChat}
                     />
                </div>
                <div className='h-full col-span-4 sm:col-span-3 md:col-span-2'>
                <WrappedComponent {...props}/>
                </div>
                <div className='h-full hidden md:block p-8 bg-[rgba(0,0,0,.85)]'>
                  <Profile/>
                </div>
            </div>
        </>
    )
  }
}

export default AppLayout