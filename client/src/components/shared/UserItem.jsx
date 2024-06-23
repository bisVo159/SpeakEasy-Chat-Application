import React,{memo} from 'react'
import { IoAdd } from "react-icons/io5";
import { IoMdRemove } from "react-icons/io";

function UserItem({user,handler,handlerIsLoading,isAdded=false,styling}) {
    const {name,_id,avatar}=user
  return (
    <div className={`flex items-center justify-between w-full ${styling}`}>
       <div className='flex gap-x-3'>
        <img
          src={avatar}
          className='w-8 aspect-square rounded-full '
          />
          <h1
          className=''
          >{name}</h1>
       </div>
        <button
        className={`${isAdded?"bg-red-600":"bg-blue-600"} p-1 rounded-full text-white
         hover:${isAdded?'bg-red-800':'bg-blue-800'} flex`}
         onClick={()=>handler(_id)} disabled={handlerIsLoading}>
          {
            isAdded?<IoMdRemove size={20}/>:<IoAdd size={20}/>
          }
        </button>
    </div>
  )
}

export default memo(UserItem)