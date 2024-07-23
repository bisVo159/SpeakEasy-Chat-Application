import React, { useCallback, useEffect, useRef, useState } from 'react'
import AppLayout from '../components/layout/AppLayout'
import { MdAttachFile } from "react-icons/md";
import { IoSend } from "react-icons/io5";
import FileMenu from '../components/dialogs/FileMenu';
import { sampleMessage } from '../components/constants/sampleData';
import MessageComponent from '../components/shared/MessageComponent';
import { getSocket } from '../socket';
import { ALERT, NEW_MESSAGE, START_TYPING, STOP_TYPING } from '../components/constants/events';
import { useGetChatDetailsQuery, useGetMessegesQuery } from '../redux/api/api';
import { TypingLoader,LayOutLoader } from '../components/layout/Loaders';
import { useErrors, useSocketEvents } from '../hooks/hook';
import { useInfiniteScrollTop } from '6pp'
import { useDispatch } from 'react-redux';
import { setIsFileMenu } from '../redux/reducer/misc';
import { removeNewMessagesAlert } from '../redux/reducer/chat';
import { useNavigate } from 'react-router-dom';

function Chat({chatId,user}) {
  const containerRef=useRef(null)
  const bottomRef=useRef(null)

  const dispatch=useDispatch()
  const navigate=useNavigate()

  const socket=getSocket()

  const [message,setMessage]=useState("")
  const [messages,setMessages]=useState([])
  const [page,setPage]=useState(1)
  const [fileMenuAnchor,setFileMenuAnchor]=useState(null)

  const [IamTyping,SetIamTyping]=useState(false)
  const [userTyping,SetUserTyping]=useState(false)
  const typingTimeOut=useRef(null)

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

  const messageOnChage=(e)=>{
    setMessage(e.target.value)
    if(!IamTyping){
      socket.emit(START_TYPING,{members,chatId})
      SetIamTyping(true)
    }
    
    if(typingTimeOut.current){
      clearTimeout(typingTimeOut.current)
    }
    typingTimeOut.current=setTimeout(() => {
      socket.emit(STOP_TYPING,{members,chatId})
      SetIamTyping(false)
    }, 2000);
  }

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
    dispatch(setIsFileMenu(false))
  }

  useEffect(()=>{
    dispatch(removeNewMessagesAlert(chatId))
    // to avoid on first render
    return ()=>{
      setMessage("")
      setMessages([])
      setPage(1)
      setOldMessages([])
    }
  },[chatId])

  useEffect(()=>{
    if(bottomRef.current) bottomRef.current.scrollIntoView({behavior:"smooth"})
  },[messages])

  useEffect(()=>{
    if(chatDetails.isError) return navigate('/')
  },[chatDetails.isError])

  const newMessagesHandler=useCallback((data)=>{
    if(data.chatId!==chatId) return;
    
    setMessages(prev=>[...prev,data.message])
  },[chatId])

  const startTypingListener=useCallback((data)=>{
    if(data.chatId!==chatId) return;
    
    SetUserTyping(true);
  },[chatId])

  const stopTypingListener=useCallback((data)=>{    
    SetUserTyping(false)
  },[chatId])


  const alertListner=useCallback((data)=>{    
    if(data.chatId!==chatId) return;

    const messageForAlert={
      content:data.message,
      sender:{
          _id:"adminId",
          name:"Admin"
      },
      chat:data.chatId,
      createdAt:new Date().toISOString()
  }

  setMessages(prev=>[...prev,messageForAlert])
  },[chatId])

  const eventHandler={
    [ALERT]:alertListner,
    [NEW_MESSAGE]:newMessagesHandler,
    [START_TYPING]:startTypingListener,
    [STOP_TYPING]:stopTypingListener,
  }

  useSocketEvents(socket,eventHandler)

  useErrors(errors)

  const allMessages=[...oldMessages,...messages]

  return chatDetails.isLoading?<LayOutLoader/>:(
    <>
      <div
      ref={containerRef}
      className={`box-border p-4 flex flex-col space-y-4 bg-gray-100 h-[90%] overflow-x-hidden relative custom-scrollbar`}
      >
        {
          allMessages?.map((i)=>(
            <MessageComponent key={i._id} message={i}user={user}/>
          ))
        }

        {
          userTyping&&<TypingLoader/>
        }

        <div ref={bottomRef}/>
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
          onChange={messageOnChage}
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