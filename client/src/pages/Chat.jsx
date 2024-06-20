import React, { useRef } from 'react'
import AppLayout from '../components/layout/AppLayout'
import { MdAttachFile } from "react-icons/md";
import { IoSend } from "react-icons/io5";
import FileMenu from '../components/dialogs/FileMenu';
import { sampleMessage } from '../components/constants/sampleData';
import MessageComponent from '../components/shared/MessageComponent';

const user={
  _id:"jbsrfhqbe",
  name:"Anik Biswas"
}

function Chat() {
  const containerRef=useRef(null)
  const fileMenuRef=useRef(null)

  return (
    <>
      <div
      ref={containerRef}
      className={`box-border p-4 flex flex-col space-y-4 bg-gray-100 h-[90%] overflow-x-hidden overflow-y-auto`}
      >
        {
          sampleMessage.map((i)=>(
            <MessageComponent key={i._id} message={i}user={user}/>
          ))
        }
      </div>

      <form
      className='h-[10%]'
      >
      <div className='flex h-full p-4 items-center relative'>
        <button
        className='absolute left-6 rotate-[30deg]'
        ref={fileMenuRef}
        >
            <MdAttachFile size={20}/>
          </button>

          <input
          placeholder='Type Message Here...'
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

      <FileMenu anchorEl={fileMenuRef.current}/>
    </>
  )
}

export default AppLayout()(Chat)