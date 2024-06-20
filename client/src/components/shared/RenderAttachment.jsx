import React from 'react'
import { transformImage } from '../../lib/features';

function RenderAttachment(file,url) {
  switch (file) {
    case "video":
        return <video src={url} preload='none' width={"200px"} controls/>
    case "video":
        return <img src={transformImage(url,200)} alt='Attachment' width={"200px"} height={"150px"}
        className='w-fit'
        />
    case "audio":
        return <audio src={url} preload='none' width={"200px"} controls/>
  
    default:
        return <img
        src={url}
        alt='Attachment'
        width={"200px"} height={"150px"}
        />;
  }
}

export default RenderAttachment