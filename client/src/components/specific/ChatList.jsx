import React from 'react'
import ChatItem from '../shared/ChatItem'

export default function ChatList({
    w="100%",
    chats=[],
    chatId,
    onlineUsers=[],
    newMessagesAlert=[{
        chatId:1,
        count:0
    }],
    handleDeleteChat
}) {
  return (
    <div className='overflow-auto h-screen custom-scrollbar'>
        {
            chats.map((data, index)=>{
              const {avatar,_id,name,groupChat,members}=data

              const newMessageAlert=newMessagesAlert.find(({chatId})=>chatId===_id)
              const isOnline=members?.some((member)=>onlineUsers.includes(member))
             return (
                <ChatItem
                    index={index}
                    newMessageAlert={newMessageAlert}
                    isOnline={isOnline}
                    avatar={avatar}
                    name={name}
                    _id={_id}
                    key={_id}
                    groupChat={groupChat}
                    sameSender={chatId===_id}
                    handleDeleteChat={handleDeleteChat}
                   />
             )
            })
        }
    </div>
  )
}