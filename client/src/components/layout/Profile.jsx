import React from 'react'
import profile from "../../assets/profile.png"
import { MdAlternateEmail } from "react-icons/md";
import { MdOutlineFaceUnlock } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import moment from "moment"
import { transformImage } from '../../lib/features';

function Profile({user}) {
  return (
    <div className='flex flex-col gap-y-8 items-center'>
       <img
        src={transformImage(user?.avatar?.url)}
        className='w-[200px] aspect-square object-contain mb-4 border-[5px] border-white rounded-full'
      />
      <ProfileCard heading={"Bio"} text={user?.bio}/>
      <ProfileCard heading={"Username"} text={user?.username} Icon={<MdAlternateEmail/>}/>
      <ProfileCard heading={"Name"} text={user?.name} Icon={<MdOutlineFaceUnlock/>}/>
      <ProfileCard heading={"Joined"} text={moment(user?.createdAt).fromNow()} Icon={<SlCalender/>}/>
    </div>
  )
}

const ProfileCard=({text,Icon,heading})=>(
  <div className='flex items-center gap-4 text-white text-center'>
    {Icon&&Icon}

    <div>
      <h1>{text}</h1>
      <h2 className='text-gray-600'>{heading}</h2>
    </div>
  </div>
)

export default Profile