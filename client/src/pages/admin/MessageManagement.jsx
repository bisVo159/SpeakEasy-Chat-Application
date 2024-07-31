import React, { useEffect, useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import { transformImage } from '../../lib/features'
import MessageTable from '../../components/shared/MessageTable'
import moment from 'moment'
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
    field: "attachments",
    headerName: "Attachments",
    headerClassName: "table-header",
    width: 200,
  },

  {
    field: "content",
    headerName: "Content",
    headerClassName: "table-header",
    width: 400,
  },
  {
    field: "sender",
    headerName: "Sent By",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "chat",
    headerName: "Chat",
    headerClassName: "table-header",
    width: 220,
  },
  {
    field: "groupChat",
    headerName: "Group Chat",
    headerClassName: "table-header",
    width: 100,
  },
  {
    field: "createdAt",
    headerName: "Time",
    headerClassName: "table-header",
    width: 250,
  },
];


function MessageManagement() {
  const [rows,setRows]=useState([])

  const {loading,data,error}=useFetchData(
    `${server}/admin/messages`,
    "dashboard-messages")

  useErrors([{
    isError:error,
    error:error
  }
  ])

  useEffect(()=>{
    if(data){
      setRows(data.messages.map((i)=>({
        ...i,
        id:i._id,
        sender:{
          name:i.sender.name,
          avatar:transformImage(i.sender.avatar,50)
        },
        createdAt:moment(i.createdAt).format("MMMM Do YYYY, h:mm:ss a")
    })))
    }
  },[data])
  
  return (
    <AdminLayout>
        {
          loading?<Spinner/>:
          <MessageTable heading={"All Messages"} columns={columns} rows={rows}/>
        }
    </AdminLayout>
  )
}


export default MessageManagement