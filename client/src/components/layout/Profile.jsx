import React from 'react'
import profile from "../../assets/profile.png"
import { MdAlternateEmail } from "react-icons/md";
import { MdOutlineFaceUnlock } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import moment from "moment"

function Profile() {
  return (
    <div className='flex flex-col gap-y-8 items-center'>
       <img
        src={profile}
        className='w-[200px] aspect-square object-contain mb-4 border-[5px] border-white rounded-full'
      />
      <ProfileCard heading={"Bio"} text={"Noob Society"}/>
      <ProfileCard heading={"Username"} text={"bisVo159"} Icon={<MdAlternateEmail/>}/>
      <ProfileCard heading={"Name"} text={"Anik Biswas"} Icon={<MdOutlineFaceUnlock/>}/>
      <ProfileCard heading={"Joined"} text={moment('2024-06-17T00:00:00.000Z').fromNow()} Icon={<SlCalender/>}/>
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