import React, { useState } from 'react'
import { sampleUsers } from '../constants/sampleData'
import UserItem from '../shared/UserItem'
import {useInputValidation} from "6pp"

function NewGroup() {
  const groupName=useInputValidation("")

  const [members,setMembers]=useState(sampleUsers)
  const [selectedMembers,setSelectedMembers]=useState([])
  
  const selectMemberHandler=(id)=>{
    setSelectedMembers(prev=>prev.includes(id)?prev.filter( member=>member!==id):[...prev,id])
  }
  console.log("selectedMembers",selectedMembers)
  const submitHandler=()=>{

  }
  const closeHandler=()=>{

  }
  return (
    <div className='fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm'>
      <div className='flex flex-col items-center w-96 bg-white py-10 px-4 rounded-md gap-3'>
        <h1 className='font-semibold text-2xl'>New Group</h1>

        <input
        type='text'
        value={groupName.value}
        onChange={groupName.changeHandler}
        placeholder='Group Name'
        className='block p-4 border w-3/4 border-gray-500 rounded-md bg-gray-50 focus:outline-none'
        />

       <div className='flex flex-col gap-y-3 w-3/4'>
       <p>Members</p>
       {
          members?.map((user)=>(
              <UserItem key={user._id} user={user}
                handler={selectMemberHandler}
                isAdded={selectedMembers.includes(user._id)}
                />
            ))
         }

          <div className='flex items-center gap-3 justify-evenly'>
            <button className='text-red-950'>CANCEL</button>
            <button 
            onClick={submitHandler}
            className='bg-blue-700 text-white text-center px-3 py-1 rounded-sm' >CREATE</button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default NewGroup