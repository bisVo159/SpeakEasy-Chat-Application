import React,{useState} from 'react'
import { sampleUsers } from '../constants/sampleData'
import UserItem from "../shared/UserItem"
import { useDispatch } from 'react-redux'
import { setIsAddMember } from '../../redux/reducer/misc';
import { useAddGroupMemberMutation, useAvailFriendDetailsQuery } from '../../redux/api/api';
import { useAsyncMutation, useErrors } from '../../hooks/hook';
import { Spinner } from '../layout/Loaders';

function AddMemberDialog({chatId}) {

    const dispatch=useDispatch();

    const [selectedMembers,setSelectedMembers]=useState([])

    const [addMembers,isLoadingAddMembers]=useAsyncMutation(useAddGroupMemberMutation)
    const {isLoading,data,isError,error}=useAvailFriendDetailsQuery(chatId)
    // console.log("data.friends",data.friends)
    
    const selectMemberHandler=(id)=>{
      setSelectedMembers(prev=>prev.includes(id)?prev.filter( member=>member!==id):[...prev,id])
    }

    const addMemberSubmitHandler=()=>{
        addMembers("Adding Members...",{chatId,members:selectedMembers})
        closeHandler()
    }
    const closeHandler=()=>{
        dispatch(setIsAddMember(false))
    }

    const errors=[{isError,error}]
    useErrors(errors)

  return (
    <div
    onClick={(e) => e.stopPropagation()}
     className='fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto 
    rounded-lg bg-white bg-opacity-10 backdrop-blur-sm'>
        <div className='p-10 rounded-lg bg-white w-80 flex flex-col gap-y-6'> 
            <h1 className='text-center'>Add Member</h1>
            <div className='space-y-5 min-h-20 flex flex-col justify-center'>
                {isLoading?<Spinner/>:
                    data?.friends?.length>0?data?.friends?.map(i=>(
                        <UserItem key={i._id} user={i} handler={selectMemberHandler}
                        isAdded={selectedMembers.includes(i._id)}
                        />
                    )):
                    <p className='text-center'>No Friends</p>
                }
            </div>

            <div className='flex items-center justify-evenly w-full'>
                <button
                onClick={closeHandler}
                 className='text-red-950'>CANCEL</button>
                <button
                onClick={addMemberSubmitHandler}
                className='bg-blue-700 p-1 text-white px-2 rounded-sm'
                 disabled={isLoadingAddMembers}>SUBMIT CHANGE</button>
            </div>
        </div>
    </div>
  )
}

export default AddMemberDialog