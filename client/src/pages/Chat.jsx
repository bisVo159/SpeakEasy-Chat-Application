import React, { useCallback, useEffect, useRef, useState } from 'react'
import AppLayout from '../components/layout/AppLayout'
import { MdAttachFile } from "react-icons/md";
import { IoSend } from "react-icons/io5";
import FileMenu from '../components/dialogs/FileMenu';
import { sampleMessage } from '../components/constants/sampleData';
import MessageComponent from '../components/shared/MessageComponent';
import { getSocket } from '../socket';
import { NEW_MESSAGE } from '../components/constants/events';
import { useGetChatDetailsQuery, useGetMessegesQuery } from '../redux/api/api';
import Loaders from '../components/layout/Loaders';
import { useErrors, useSocketEvents } from '../hooks/hook';
import { useInfiniteScrollTop } from '6pp'
import { useDispatch } from 'react-redux';
import { setIsFileMenu } from '../redux/reducer/misc';

function Chat({chatId,user}) {
  const containerRef=useRef(null)
  const dispatch=useDispatch()

  const socket=getSocket()

  const [message,setMessage]=useState("")
  const [messages,setMessages]=useState([])
  const [page,setPage]=useState(1)
  const [fileMenuAnchor,setFileMenuAnchor]=useState(null)

  const chatDetails=useGetChatDetailsQuery({chatId,skip:!chatId})
  const oldMessagesChunk=useGetMessegesQuery({chatId,page})

  const {data:oldMessages,setData:setOldMessages}=useInfiniteScrollTop(
    containerRef,
    oldMessagesChunk.data?.totalPages,
    page,
    setPage,
    oldMessagesChunk.data?.messages
  )

  // console.log("page",page)

  const errors=[
    {isError:chatDetails.isError,error:chatDetails.error},
    {isError:oldMessagesChunk.isError,error:oldMessagesChunk.error},
  ]

  const members=chatDetails?.data?.chat?.members;

  const handleFileOpen=(e)=>{
      dispatch(setIsFileMenu(true))
      setFileMenuAnchor(e.currentTarget)
  }

  const submitHandler=(e)=>{
    e.preventDefault();
    if(!message.trim()) return;

    // Emiting message to server
    socket.emit(NEW_MESSAGE,{chatId,members,message})
    setMessage("")
  }

  const newMessagesHandler=useCallback((data)=>{
    console.log("data",data)
    setMessages(prev=>[...prev,data.message])
  },[])

  const eventHandler={[NEW_MESSAGE]:newMessagesHandler}

  useSocketEvents(socket,eventHandler)

  useErrors(errors)

  const allMessages=[...oldMessages,...messages]

  return chatDetails.isLoading?<Loaders/>:(
    <>
      <div
      ref={containerRef}
      className={`box-border p-4 flex flex-col space-y-4 bg-gray-100 h-[90%] overflow-x-hidden custom-scrollbar`}
      >
        {
          allMessages?.map((i)=>(
            <MessageComponent key={i._id} message={i}user={user}/>
          ))
        }
      </div>

      <form
      className='h-[10%]'
      onSubmit={submitHandler}
      >
      <div className='flex h-full p-4 items-center relative'>
        <button
        className='absolute left-6 rotate-[30deg]'
        onClick={handleFileOpen}
        >
            <MdAttachFile size={20}/>
        </button>

        <input
          placeholder='Type Message Here...'
          value={message}
          onChange={(e)=>setMessage(e.target.value)}
          className='w-full h-full border-none outline-none py-6 px-10 rounded-3xl bg-gray-100'
          />

          <button
          type='submit'
          className='bg-[#ea7070] rounded-full p-2 text-white ml-4 text-center
           hover:bg-[#8b6060] rotate-[-30deg]'
          >
            <IoSend size={20}/>
          </button>
      </div>
      </form>

      <FileMenu anchorEl={fileMenuAnchor} chatId={chatId}/>
    </>
  )
}

export default AppLayout()(Chat)