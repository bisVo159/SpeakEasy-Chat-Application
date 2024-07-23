import React from 'react'
import { transformImage } from '../../lib/features'

// Todo Transform
function AvatarCard({ avatar = [], max = 4 }) {
  return (
    <div className="relative  w-24 flex items-center ">
      {avatar.slice(0, max).map((item, index) => (
        <span
          key={index}
          style={{ left: `${index * 1.1}rem` }} 
          className="w-12 h-12 absolute "
        >
          <img
            src={transformImage(item)}
            alt={`avatar ${index}`}
            className="w-12 h-12 border-2 border-white border-solid rounded-full"
          />
        </span>
      ))}
    </div>
  );
}



export default AvatarCard