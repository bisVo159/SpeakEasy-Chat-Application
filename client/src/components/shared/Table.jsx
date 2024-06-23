import React from 'react'
import { Table, Tbody,Th,Thead,Tr,Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

function UserTable({rows,columns,heading,rowHeight=52}) {
  return (
    <div className='h-screen'>
        <div className='shadow-2xl py-4 px-16 rounded-2xl m-auto w-full h-full overflow-hidden'>
            <h1 className='text-2xl m-8 uppercase'>{heading}</h1>
            <Table>
                <Thead>
                  <Tr className="bg-slate-900 text-white">
                        <Th>Table</Th>
                  </Tr>
                </Thead>
                <Tbody>
                <Tr className="bg-slate-900 text-white">
                        <Td>Body</Td>
                  </Tr>
                </Tbody>
            </Table>
        </div>
    </div>
  )
}

export default UserTable