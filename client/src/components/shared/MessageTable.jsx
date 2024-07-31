import React from 'react'
import AvatarCard from './AvatarCard'
import { fileFormat } from '../../lib/features';
import RenderAttachment from './RenderAttachment';

function MessageTable({rows=[],columns=[],heading,rowHeight=52}) {
  return (
    <div className='h-screen'>
        <div className='shadow-2xl py-4 px-16 rounded-2xl m-auto w-full h-full overflow-scroll custom-scrollbar2'>
            <h1 className='text-4xl  m-8 uppercase text-center'>{heading}</h1>
            <div className='w-screen grid grid-rows-* gap-4 overflow-scroll custom-scrollbar2 divide-y-2 divide-y-reverse'>
              <div className={`flex  justify-items-start text-white bg-slate-950 gap-4`}>
                  {
                    columns.map((column, index) => (
                      <div key={index} className={`w-[${column.width}px] p-2 text-nowrap`}>{column.headerName}</div>
                    ))
                  }
              </div>

              <div className='h-screen w-full overflow-scroll custom-scrollbar2 divide-y-2'>
                {
                  rows.map((row)=>(
                    <div 
                    className={`flex  gap-4 `}
                    key={row.id}>
                      <div className={`w-[${columns[0].width}px] p-2 flex items-center`}>{row.id}</div>
                      <div className={`w-[${columns[1].width}px] h-[100px] p-2 flex items-center overflow-hidden text-nowrap`}>
                          {
                          row.attachments?.length > 0
                            ? row.attachments.map((i) => {
                              const url = i.url;
                              const file = fileFormat(url);
                  
                              return (
                                <div>
                                  <a
                                    href={url}
                                    download
                                    target="_blank"
                                    style={{
                                      color: "black",
                                    }}
                                  >
                                    {RenderAttachment(file, url)}
                                  </a>
                                </div>
                              );
                            })
                            : "No Attachments"
                          }
                      </div>
                      <div className={`w-[${columns[2].width}px] p-2 flex items-center`}>{row.content}</div>
                      <div className={`w-[${columns[3].width}px] p-2 flex items-center gap-2`}>
                          <img
                          src={row.sender.avatar}
                          className='w-[50px] rounded-full '
                          alt='image'
                          />
                          <span>{row.sender.name}</span>
                      </div>
                      <div className={`w-[${columns[4].width}px] p-2 flex items-center`}>{row.chat}</div>
                      <div className={`w-[${columns[5].width}px] p-2 flex items-center`}>
                          {row.groupChat?"Group":"Chat"}
                      </div>
                      <div className={`w-[${columns[6].width}px] p-2 flex items-center`}>{row.createdAt}</div>
                    </div>
                  ))
                }
              </div>
            </div>
        </div>
    </div>
  )
}

export default MessageTable