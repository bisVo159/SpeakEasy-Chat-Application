import React, { useRef } from 'react'
import useOnClickOutside from '../../hooks/useOnClickOutside'

function ConfirmDeleteDialog({handleClose,deleteHandler}) {
    const ref=useRef(null)
    useOnClickOutside(ref,()=>handleClose(false))
  return (
    <div 
    onClick={(e) => e.stopPropagation()}
    className='fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto 
    rounded-lg bg-white bg-opacity-10 backdrop-blur-sm'>
        <div
        ref={ref}
         className='bg-white p-6 w-fit space-y-3 '>
            <p className='text-xl font-semibold'>Confirm Delete</p>
            <p>Are you sure you want to delete this group?</p>

            <div className='flex items-center gap-x-3 text-end w-full'>
            <button onClick={handleClose}>NO</button>
            <button onClick={deleteHandler} className='text-red-950'>YES</button>
          </div>
        </div>
    </div>
  )
}

export default ConfirmDeleteDialog