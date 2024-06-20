import React,{useState} from 'react'
import { sampleUsers } from '../constants/sampleData'
import UserItem from "../shared/UserItem"

function AddMemberDialog({addMember,isLoadingAddMember,chatId}) {

    const [members,setMembers]=useState(sampleUsers)
    const [selectedMembers,setSelectedMembers]=useState([])
    
    const selectMemberHandler=(id)=>{
      setSelectedMembers(prev=>prev.includes(id)?prev.filter( member=>member!==id):[...prev,id])
    }

    const addMemberSubmitHandler=()=>{
        closeHandler()
    }
    const closeHandler=()=>{
        setSelectedMembers([])
        setMembers([])
    }

  return (
    <div
    onClick={(e) => e.stopPropagation()}
     className='fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto 
    rounded-lg bg-white bg-opacity-10 backdrop-blur-sm'>
        <div className='p-10 rounded-lg bg-white w-80 flex flex-col gap-y-4'> 
            <h1 className='text-center'>Add Member</h1>
            <div className='space-y-3'>
                {
                    members.length>0?sampleUsers.map(i=>(
                        <UserItem key={i._id} user={i} handler={selectMemberHandler}
                        isAdded={selectedMembers.includes(i._id)}
                        />
                    )):
                    <p className='text-center'>No Friends</p>
                }
            </div>

            <div className='flex items-center justify-evenly'>
                <button
                onClick={closeHandler}
                 className='text-red-950'>CANCEL</button>
                <button
                onClick={addMemberSubmitHandler}
                className='bg-blue-700 p-1 text-white px-2 rounded-sm'
                 disabled={isLoadingAddMember}>SUBMIT CHANGE</button>
            </div>
        </div>
    </div>
  )
}

export default AddMemberDialog