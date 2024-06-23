import React from 'react'
import { transformImage } from '../../lib/features'

// Todo Transform
function AvatarCard({avatar=[],max=4}) {
  return (
    <div>
        {avatar.slice(0,max).map((item,index)=>(
         <div key={index} className='w-20 h-12 relative'>
            <img src={transformImage(item)} alt={`avatar ${index}`}
            className={`w-12 h-12  border-2 border-white border-solid rounded-full
            absolute left-${0.5+index}rem sm:${index}rem `}
            />
         </div>
            ))}
    </div>
  )
}

export default AvatarCard