import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setIsFileMenu, setUploadingLoader } from '../../redux/reducer/misc';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import { BiSolidImage } from "react-icons/bi";
import { MdAudioFile } from "react-icons/md";
import { MdVideoFile } from "react-icons/md";
import { MdUploadFile } from "react-icons/md";
import toast from 'react-hot-toast';
import { useSendAttachmentsMutation } from '../../redux/api/api';

export default function FileMenu({anchorEl,chatId}) {
  const {isFileMenu}=useSelector(state=>state.misc)

  const dispatch=useDispatch()
  const ref=useRef(null)
  const imageRef=useRef(null)
  const audioRef=useRef(null)
  const videoRef=useRef(null)
  const fileRef=useRef(null)

  const [sendAttachments]=useSendAttachmentsMutation()

  const closeFileMenu = () => {
    dispatch(setIsFileMenu(false));
  };
  useOnClickOutside(ref,()=>closeFileMenu())

  const selectRef=(ref)=>{
    ref.current?.click()
  }

  const fileChangeHandler=async(e,key)=>{
    console.log("hehe")
    const files=Array.from(e.target.files);
    console.log("files",files)
    if(files.length<=0) return;

    if(files.length>5) return toast.error(`You can only send 5 ${key} at a time`);

    dispatch(setUploadingLoader(true))

    const toastId=toast.loading(`Sending ${key} ...`)
    closeFileMenu();

    try {
      const myForm=new FormData()

      myForm.append("chatId",chatId)
      files.forEach(file=>myForm.append("files",file))
      console.log("myForm",myForm.values)
    
      const res=await sendAttachments(myForm)

      if(res.data) toast.success(`${key} sent successfully`,{id:toastId})
    } catch (error) {
      toast.error(error,{id:toastId})
    }finally{
      dispatch(setUploadingLoader(false))
    }
  }

  if(!isFileMenu) return null;

  return (
    <div  
    ref={ref}
    className='w-32 absolute bottom-3 translate-x-3 border-2  bg-white transition ease-in-out delay-500 shadow-md rounded-sm'>
        <ul className='flex flex-col gap-y-3 p-2'>
          <li 
          onClick={()=>selectRef(imageRef)}
          className='flex items- hover:bg-neutral-100 cursor-pointer'>
            <BiSolidImage size={20}/>
            <span className='ml-2'>Image</span>
            <input
            type='file'
            multiple
            accept='image/png,image/jpeg,image/gif'
            className='hidden'
            onChange={(e)=>fileChangeHandler(e,"Images")}
            ref={imageRef}
            />
          </li>

          <li 
          onClick={()=>selectRef(audioRef)}
          className='flex items-center hover:bg-neutral-100 cursor-pointer'>
            <MdAudioFile size={20}/>
            <span className='ml-2'>Audio</span>
            <input
            type='file'
            multiple
            accept='audio/mpeg,audio/wev'
            className='hidden'
            onChange={(e)=>fileChangeHandler(e,"Audios")}
            ref={audioRef}
            />
          </li>

          <li 
          onClick={()=>selectRef(videoRef)}
          className='flex items-center hover:bg-neutral-100 cursor-pointer'>
            <MdVideoFile size={20}/>
            <span className='ml-2'>Video</span>
            <input
            type='file'
            multiple
            accept='video/mp4,video/webm,video/ogg'
            className='hidden'
            onChange={(e)=>fileChangeHandler(e,"Videos")}
            ref={videoRef}
            />
          </li>
          <li 
          onClick={()=>selectRef(fileRef)}
          className='flex items-center hover:bg-neutral-100 cursor-pointer'>
            <MdUploadFile size={20}/>
            <span className='ml-2'>File</span>
            <input
            type='file'
            multiple
            accept='*'
            className='hidden'
            onChange={(e)=>fileChangeHandler(e,"Files")}
            ref={fileRef}
            />
          </li>
        </ul>
    </div>
  )
}
