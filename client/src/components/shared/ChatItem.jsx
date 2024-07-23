import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import AvatarCard from './AvatarCard'

function ChatItem({
  avatar=[],
  name,
  _id,
  groupChat=false,
  sameSender,
  isOnline,
  newMessageAlert,
  newMessage,index=0,
  handleDeleteChat
}) {
  return (
    <Link 
    to={`/chat/${_id}`}
    onContextMenu={(e)=>handleDeleteChat(e,_id,groupChat)}
    className='text-black'>
    <div className={`flex items-center justify-between p-4 hover:bg-[rgba(0,0,0,0.1)] ${sameSender ? 'bg-black text-white' : 'unset text-black'} gap-4`}>        
      {/* Avatar Card */}
      <div 
      className='flex gap-3 items-center w-fit p-3' 
      >
        <AvatarCard avatar={avatar} />

        <div className='flex flex-col items-center '>
          <h1>{name}</h1>
          {
            newMessageAlert && (
              <h2 className='text-red-500'>{newMessageAlert.count} New Message</h2>
            )
          }
        </div>
      </div>

      {
        isOnline && (
          <div className='absolute top-1/2 right-4 w-[10px] h-[10px] rounded-lg bg-green-900 -translate-y-1/2'>
          </div>
        )
      }
    </div>

  </Link>
  )
}
export default  memo(ChatItem)