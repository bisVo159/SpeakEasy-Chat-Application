import React from 'react';

function UserTable({ rows = [], columns = [], heading, rowHeight = 52 }) {
  return (
    <div className='h-screen'>
      <div className='shadow-2xl py-4 px-16 rounded-2xl m-auto w-full h-full overflow-hidden'>
        <h1 className='text-4xl m-8 uppercase text-center'>{heading}</h1>
        <div className='w-full'>
          <div className='grid grid-rows-* gap-4'>
            <div className='flex justify-items-start text-white bg-slate-950 gap-4 overflow-x-auto'>
              {columns.map((column, index) => (
                <div key={index} className={`w-[${column.width}px] p-2 text-nowrap`}>{column.headerName}</div>
              ))}
            </div>
          </div>
          <div className='h-screen w-full overflow-y-scroll custom-scrollbar2 divide-y-2'>
            {rows.map((row) => (
              <div className='flex justify-items-start gap-4' key={row.id}>
                <div className={`w-[${columns[0].width}px] p-2`}>{row.id}</div>
                <div className={`w-[${columns[1].width}px] p-2`}>
                  <img className='w-[50px] rounded-full p-2' alt='image' src={row.avatar} />
                </div>
                <div className={`w-[${columns[2].width}px] p-2`}>{row.name}</div>
                <div className={`w-[${columns[3].width}px] p-2`}>{row.username}</div>
                <div className={`w-[${columns[4].width}px] p-2`}>{row.friends}</div>
                <div className={`w-[${columns[5].width}px] p-2`}>{row.groups}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserTable;
