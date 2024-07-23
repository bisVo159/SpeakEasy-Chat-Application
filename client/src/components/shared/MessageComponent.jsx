import moment from 'moment'
import React, { memo } from 'react'
import { fileFormat } from '../../lib/features'
import RenderAttachment from './RenderAttachment'
import {motion} from "framer-motion"

function MessageComponent({message,user}) {
    const {sender,content,attachments=[],createdAt}=message

    const sameSender=sender?._id===user?._id

    const timeAgo=moment(createdAt).fromNow()
  return (
    <motion.div
    initial={{ opacity: 0, x: "-100%" }}
    whileInView={{ opacity: 1, x: 0 }}
    className={`w-fit ${sameSender?'self-end':'self-start'} text-black bg-white rounded-[5px]  p-2`}>
        {
            !sameSender&&(
                <p className='text-[#2694ab] font-[600] text-xs'>{sender.name}</p>
            )
        }
        <p className=''>{content}</p>

        {
            attachments.length>0&&(
                attachments.map((attachment,index)=>{
                    const url=attachment.url
                    const file=fileFormat(url)

                    return (
                        <div key={index}>
                            <a
                            href={url}
                            target='_blank'
                            download
                            className='text-black'
                            >
                                {RenderAttachment(file,url)}
                            </a>
                        </div>
                    )
                })
            )
        }
        <p className='text-[#2694ab] font-[400] text-xs'>{timeAgo}</p>
    </motion.div>
  )
}

export default memo(MessageComponent)