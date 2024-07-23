import React, { Suspense, lazy, memo, useEffect, useState } from 'react'
import { MdKeyboardBackspace } from "react-icons/md";
import {Link, useNavigate, useSearchParams} from 'react-router-dom'
import { IoMdMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import profile from "../assets/profile.png"
import { MdEdit } from "react-icons/md";
import { MdDone } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import UserItem from '../components/shared/UserItem';
import { useDeleteChatMutation, useGetChatDetailsQuery, useMyGroupsQuery, useRemoveGroupMemberMutation, useRenameGroupMutation } from '../redux/api/api';
import { useAsyncMutation, useErrors } from '../hooks/hook';
import { LayOutLoader, Spinner } from '../components/layout/Loaders';
import { useDispatch, useSelector } from 'react-redux';
import { setIsAddMember } from '../redux/reducer/misc';
const ConfirmDeleteDialog=lazy(()=>import('../components/dialogs/ConfirmDeleteDialog'));
const AddMemberDialog=lazy(()=>import('../components/dialogs/AddMemberDialog'));

function Groups() {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const chatId=useSearchParams()[0].get('group')
  const {isAddMember}=useSelector(state=>state.misc)

  const myGroups=useMyGroupsQuery()
  const groupDetails=useGetChatDetailsQuery({chatId,populate:true},{skip:!chatId})

  const [renameGroup,isLoadingGroupName]=useAsyncMutation(useRenameGroupMutation)
  const [removeMember,isLoadingRemoveMember]=useAsyncMutation(useRemoveGroupMemberMutation)
  const [deleteGroup,isLoadingDeleteGroup]=useAsyncMutation(useDeleteChatMutation)

  const [isMobileMenuOpen,setIsMobileMenuOpen]=useState(false)
  const [isEdit,setIsEdit]=useState(false)
  const [groupName,setGroupName]=useState("")
  const [groupNameUpdatedValue,setGroupNameUpdatedValue]=useState("")
  const [confirmDeleteDialog,setConfirmDeleteDialog]=useState(false)

  const [members,setMembers]=useState([])

  const errors=[
    {
    isError:myGroups.isError,
    error:myGroups.error
  },
    {
    isError:groupDetails.isError,
    error:groupDetails.error
  },
]
  useErrors(errors)

  useEffect(()=>{
    const groupData=groupDetails.data
    if(groupDetails.data){
      setGroupName(groupData.chat.name)
      setGroupNameUpdatedValue(groupData.chat.name)
      setMembers(groupData.chat?.members)
    }

    return ()=>{
      setGroupName("")
      setGroupNameUpdatedValue("")
      setMembers([])
      setIsEdit(false)
    }
  },[groupDetails.data])
  console.log(groupDetails.data)

  const navigateBack=()=>{
    navigate('/')
  };

  const handleMobile=()=>{
    setIsMobileMenuOpen(prev=>!prev)
  }
  const handleMenuClose=()=>{
    setIsMobileMenuOpen(prev=>!prev)
  }

  const openConfirmDeleteHandler=()=>{
    setConfirmDeleteDialog(true)
  }
  const closeConfirmDeleteHandler=()=>{
    setConfirmDeleteDialog(false)
  }
  const openAddMemberHandler=()=>{
    dispatch(setIsAddMember(true))
  }
  const deleteHandler=()=>{
    deleteGroup("Deleting Group...",chatId)
    closeConfirmDeleteHandler();
    navigate("/groups")
  }

  const remmoveMemberHandler=(userId)=>{
    removeMember("Removing Members...",{chatId,userId})
  }


  const IconBtns=(
    <>
      <div className='block sm:hidden fixed right-4 top-4'>
        <button onClick={handleMobile}>
          <IoMdMenu size={26}/>
        </button>
      </div>
      <button className='absolute top-8 left-8 bg-[rgba(0,0,0,0.8)] 
      hover:bg-[rgba(0,0,0,0.7)] p-1 text-white rounded-full'
      onClick={navigateBack}
      >
        <MdKeyboardBackspace size={20}/>
      </button>
    </>
  )

  const updateGroupName=()=>{
    setIsEdit(false)
    renameGroup("Updating Group Name...",{chatId,name:groupNameUpdatedValue})
  }

  const GroupName=<div className='flex items-center justify-center p-12 gap-4'>
    {
      isEdit?<>
      <input
      value={groupNameUpdatedValue}
      onChange={(e)=>setGroupNameUpdatedValue(e.target.value)}
      className='border-2 p-2'
      />
      <button
       onClick={updateGroupName}>
        <MdDone/>
      </button>
      </>
      :<>
      <h1>{groupName}</h1>
      <button 
      disabled={isLoadingGroupName}
      onClick={()=>setIsEdit(true)}>
      <MdEdit/>
      </button>
      </>
    }
  </div>

  const ButtonGroup=<div
   className='flex flex-col-reverse sm:flex-row gap-4 xs:p-0 sm:p-4 md:py-1 md:px-16'>  
  <button
  onClick={openConfirmDeleteHandler}
   className='text-red-950 flex gap-x-2 items-center'>
    <MdDelete size={20}/>
    Delete Group
    </button>
  <button 
  onClick={openAddMemberHandler}
  className='bg-blue-700 p-2 text-white font-bold rounded-md flex gap-x-2 items-center'>
  <IoMdAdd size={20}/>
    Add Member</button>
  </div>

  return  (myGroups.isLoading)?<LayOutLoader/>:(
    <div className='h-screen grid grid-cols-12'>
      <div 
      className='hidden sm:block sm:col-span-4 bg-[#a5b4fc] overflow-auto'
      >
        <GroupsList myGroups={myGroups?.data?.groups} chatId={chatId}/>
      </div>

      <div 
      className='col-span-12 sm:col-span-8 flex flex-col items-center relative py-4 px-12 gap-y-2'
      >
        {IconBtns}

        {GroupName&&chatId&&<>
        {GroupName}
        <p className='m-8 self-start font-semibold'>Members</p>
        <div
        className='w-full box-border sm:p-4  space-y-8 h-[50vh] overflow-auto flex flex-col items-center custom-scrollbar'
        >
          {(groupDetails.isLoading||isLoadingRemoveMember)?<Spinner/>:
            members.map(i=>(
              <UserItem user={i}
              key={i._id}
               isAdded={true} 
              styling={"p-4 rounded-[1rem] shadow-xl max-w-screen-sm"}
              handler={remmoveMemberHandler}
              />
            ))
          }
        </div>

        {ButtonGroup}
        </>}
      </div>

      {isAddMember&&<Suspense fallback={<div>Loading...</div>}>
          <AddMemberDialog chatId={chatId}/>
        </Suspense>}

      {confirmDeleteDialog&&<Suspense fallback={<div>Loading...</div>}>
        <ConfirmDeleteDialog 
        handleClose={closeConfirmDeleteHandler}
        deleteHandler={deleteHandler}
        />
        </Suspense>}

      <div 
      className={`${isMobileMenuOpen?'block':'hidden'} sm:hidden fixed inset-0 w-full h-full bg-gray-600`}>
        <button onClick={handleMenuClose} className='fixed top-4 right-4 text-white '>
          <RxCross2 size={26}/>
        </button>

        <div className='min-h-screen w-fit bg-white'>
        <GroupsList w={"50%"} myGroups={myGroups?.data?.groups} chatId={chatId}/>
        </div>
      </div>
    </div>
  )
}

const GroupsList=({w="100%",myGroups=[],chatId})=>{
  return (
    <div className={`flex flex-col gap-3 w-[${w}] z-50 p-6`}>
      {myGroups.length>0?myGroups.map((group)=>(
        <GroupListItem group={group} chatId={chatId} key={group._id}/>
      ))
      :<p className='text-center p-4'>No Groups</p>}
    </div>
  )
}

const GroupListItem=memo(({group,chatId})=>{
  const {name,avatar,_id}=group

  return(
          <Link
          to={`?group=${_id}`}
          onClick={(e)=>{
            if(chatId===_id) e.preventDefault()
          }}
          >
              <div className='flex items-center gap-x-8 p-4 hover:bg-[rgba(0,0,0,0.2)]'>
              <div className="relative flex items-center" style={{ width: `${(avatar.slice(0, 4).length - 1) * 1.1 + 1}rem` }}>
                  {avatar.slice(0, 4).map((item, index) => (
                    <img
                      key={index}
                      src={item || profile}
                      alt="group image"
                      style={{ left: `${index * 1.1}rem` }}
                      className="h-8 aspect-square rounded-full absolute"
                    />
                  ))}
                </div>
                <p>{name}</p>
              </div>
            </Link>
  )
})

export default Groups