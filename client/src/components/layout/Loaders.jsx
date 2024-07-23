import React from 'react'

 function LayOutLoader() {
  return (
    <div className="flex h-screen justify-center items-center bg-[#a5b4fc]">
      <div className='loader'></div>
    </div>
  )
}

const Spinner=()=>{
  return(
    <div className='flex h-full justify-center items-center'>
      <div className='spinner'> </div>
    </div>
    )
}
 const TypingLoader=()=>{
    return <div className='space-x-2 flex p-2 justify-center self-center'> 
      <p className='bounce delay-100 w-2 h-2 rounded-full bg-neutral-500'></p>
      <p className='bounce delay-200 w-2 h-2 rounded-full bg-neutral-500'></p>
      <p className='bounce delay-400 w-2 h-2 rounded-full bg-neutral-500'></p>
      <p className='bounce delay-600 w-2 h-2 rounded-full bg-neutral-500'></p>
      </div>
 }

export {LayOutLoader,TypingLoader,Spinner}
