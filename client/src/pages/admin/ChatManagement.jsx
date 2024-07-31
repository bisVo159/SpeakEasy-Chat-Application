
import React, { useEffect, useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import { transformImage } from '../../lib/features'
import ChatTable from '../../components/shared/ChatTable'
import { useFetchData } from '6pp'
import { useErrors } from '../../hooks/hook'
import { server } from '../../components/constants/config'
import { Spinner } from '../../components/layout/Loaders'

const columns = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "avatar",
    headerName: "Avatar",
    headerClassName: "table-header",
    width: 150,
    renderCell: (params) => <AvatarCard avatar={params.row.avatar} />,
  },

  {
    field: "name",
    headerName: "Name",
    headerClassName: "table-header",
    width: 300,
  },

  {
    field: "groupChat",
    headerName: "Group",
    headerClassName: "table-header",
    width: 100,
  },
  {
    field: "totalMembers",
    headerName: "Total Members",
    headerClassName: "table-header",
    width: 120,
  },
  {
    field: "members",
    headerName: "Members",
    headerClassName: "table-header",
    width: 400,
  },
  {
    field: "totalMessages",
    headerName: "Total Messages",
    headerClassName: "table-header",
    width: 120,
  },
  {
    field: "creator",
    headerName: "Created By",
    headerClassName: "table-header",
    width: 250,
  },
];

function ChatManagement() {
  const [rows,setRows]=useState([])

  const {loading,data,error}=useFetchData(
    `${server}/admin/chats`,
    "dashboard-chats")

  useErrors([{
    isError:error,
    error:error
  }
  ])

  useEffect(()=>{
    if(data){
      setRows(data.chats.map((i)=>({
        ...i,
        id:i._id,
        avatar:i.avatar.map(i=>transformImage(i,50)),
        members:i.members.map(i=>transformImage(i.avatar,50))
      })))
    }
  },[data])
  
  return (
    <AdminLayout>
        {
          loading?<Spinner/>:
          <ChatTable heading={"All Chats"} columns={columns} rows={rows}/>
        }
    </AdminLayout>
  )
}

export default ChatManagement
