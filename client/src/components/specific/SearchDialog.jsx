import React, { useEffect, useRef, useState } from 'react'
import {useInputValidation} from "6pp"
import UserItem from '../shared/UserItem'
import { sampleUsers } from '../constants/sampleData'
import { useDispatch, useSelector } from 'react-redux'
import useOnClickOutside from '../../hooks/useOnClickOutside'
import { setIsSearch } from '../../redux/reducer/misc'
import { useLazySearchUserQuery } from '../../redux/api/api'
import { searchUser } from '../../../../server/controllers/user'
import axios from 'axios'
import { server } from '../constants/config'


function SearchDialog() {

  const {isSearch}=useSelector(state=>state.misc)
  const [searchUser]=useLazySearchUserQuery();

  const dispatch=useDispatch()
  const  search=useInputValidation("")
  const ref=useRef()
  useOnClickOutside(ref,()=>dispatch(setIsSearch(false)))

  let isLoadingFriendRequest=false
  const [users,setUsers]=useState(sampleUsers)

  const addFriendHandler=(is)=>{
    console.log(id)
  }

  useEffect(()=>{
    const timeOutId=setTimeout(() => {
      // searchUser(search.value).then(({data})=>console.log(data))
      // .catch((e)=>console.log(e))
      try {
        // axios.get(`${server}/user/search?name=${search.value}`)
        // .then(({data})=>console.log(data))
        // .catch((e)=>console.log(e))
        console.log("search.value",search.value)
      } catch (error) {
        console.log(error)
      }

    }, 1000);
    
    return ()=>{
      clearTimeout(timeOutId)
    }
  },[search.value])

  return (
    <div 
    className='fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm'>
      <div 
      ref={ref}
      className='flex flex-col items-center w-96 bg-white py-10 px-4 rounded-md gap-3'>
        <h1 className=''>Find People</h1>
        <div className="relative w-3/4">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
          </div>
          <input
          type="search"
          value={search.value}
          onChange={search.changeHandler}
          className='block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300
          rounded-lg bg-gray-50 focus:outline-none hover:border-gray-500'
          />
        </div>
        
        <ul className='flex flex-col gap-y-3 w-3/4 px-3'>
            {
              users?.map((user,i)=>(
                <li key={i}>
                  <UserItem user={user}
                   handler={addFriendHandler}
                    handlerIsLoading={isLoadingFriendRequest}/>
                </li>
              ))
            }
        </ul>
      </div>
    </div>
  )
}

export default SearchDialog