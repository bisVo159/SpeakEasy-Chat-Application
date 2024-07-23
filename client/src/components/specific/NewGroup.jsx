import React, {  useState } from 'react'
import UserItem from '../shared/UserItem'
import {useInputValidation} from "6pp"
import { useAvailFriendDetailsQuery, useNewGroupMutation } from '../../redux/api/api'
import { useAsyncMutation, useErrors } from '../../hooks/hook'
import { Spinner } from '../layout/Loaders'
import { useDispatch, useSelector } from 'react-redux'
import { setIsNewGroup } from '../../redux/reducer/misc'
import toast from 'react-hot-toast'

function NewGroup() {
  const dispatch=useDispatch();
  const {isError,isLoading,error,data}=useAvailFriendDetailsQuery();

  const [newGroup,isLoadingNewGroup]=useAsyncMutation(useNewGroupMutation)
  
  const groupName=useInputValidation("")

  const [selectedMembers,setSelectedMembers]=useState([])

  // console.log("data",data)

  const errors=[{
    isError,
    error
  }]
  useErrors(errors)
  
  const selectMemberHandler=(id)=>{
    setSelectedMembers(prev=>prev.includes(id)?prev.filter( member=>member!==id):[...prev,id])
  }

  const submitHandler=()=>{
    if(!groupName.value) return toast.error("Group name is required")
    if(selectedMembers.length<2) return toast.error("Select at least 2 members")

    // creating group
    newGroup("Creating New Group...",{name:groupName.value,members:selectedMembers})
    closeHandler();
  }

  const closeHandler=()=>{
    dispatch(setIsNewGroup(false));
  }
  return (
    <div className='fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm'>
      <div 
      className='flex flex-col items-center w-96 bg-white py-10 px-4 rounded-md gap-3'>
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
       {isLoading?<Spinner/>:
          data?.friends?.map((user)=>(
              <UserItem key={user._id} user={user}
                handler={selectMemberHandler}
                isAdded={selectedMembers.includes(user._id)}
                />
            ))
         }

          <div className='flex items-center gap-3 justify-evenly'>
            <button 
            onClick={closeHandler}
            className='text-red-950'>
              CANCEL</button>
            <button 
            onClick={submitHandler}
            disabled={isLoadingNewGroup}
            className='bg-blue-700 text-white text-center px-3 py-1 rounded-sm' >CREATE</button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default NewGroup