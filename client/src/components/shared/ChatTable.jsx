import React from 'react'
import AvatarCard from './AvatarCard'

function ChatTable({rows=[],columns=[],heading,rowHeight=52}) {
  return (
    <div className='h-screen'>
        <div className='shadow-2xl py-4 px-16 rounded-2xl m-auto w-full h-full overflow-scroll  custom-scrollbar2'>
            <h1 className='text-4xl  m-8 uppercase text-center'>{heading}</h1>
            <div className='w-full grid grid-rows-* gap-4 overflow-x-scroll custom-scrollbar2'>
              <div className={`flex  justify-items-start text-white bg-slate-950 gap-4`}>
                  {
                    columns.map((column, index) => (
                      <div key={index} className={`w-[${column.width}px] p-2 text-nowrap`}>{column.headerName}</div>
                    ))
                  }
              </div>
                
                <div className='h-screen w-full overflow-y-scroll custom-scrollbar2 divide-y-2 '>
                    {
                    rows.map((row)=>(
                      <div 
                      className={`flex  gap-4 `}
                      key={row.id}>
                        <div className={`w-[${columns[0].width}px] p-2`}>{row.id}</div>
                        <div className={`w-[${columns[1].width}px] p-2 flex items-center overflow-scroll custom-scrollbar2`}>
                          <AvatarCard avatar={row.avatar}/>
                        </div>
                        <div className={`w-[${columns[2].width}px] p-2 flex items-center`}>{row.name}</div>
                        <div className={`w-[${columns[3].width}px] p-2 flex items-center`}>{row.groupChat?"Group":"Chat"}</div>
                        <div className={`w-[${columns[4].width}px] p-2 flex items-center`}>{row.totalMembers}</div>
                        <div className={`w-[${columns[5].width}px] p-2 flex items-center overflow-scroll custom-scrollbar2`}>
                            <AvatarCard avatar={row.members}/>
                        </div>
                        <div className={`w-[${columns[6].width}px] p-2 flex items-center`}>{row.totalMessages}</div>
                        <div className={`w-[${columns[7].width}px] p-2 flex items-center gap-2`}>
                            <img
                            src={row.creator.avatar}
                            className='w-[50px] rounded-full '
                            alt='image'
                            />
                            <span>{row.creator.name}</span>
                        </div>
                      </div>
                    ))
                  }
                </div>
            </div>
        </div>
    </div>
  )
}

export default ChatTable