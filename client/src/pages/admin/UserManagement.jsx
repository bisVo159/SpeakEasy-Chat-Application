
import React, { useEffect, useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import UserTable from "../../components/shared/Table"
import { transformImage } from '../../lib/features'
import { useFetchData } from '6pp'
import { server } from '../../components/constants/config'
import { useErrors } from '../../hooks/hook'
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
  },

  {
    field: "name",
    headerName: "Name",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "username",
    headerName: "Username",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "friends",
    headerName: "Friends",
    headerClassName: "table-header",
    width: 150,
  },
  {
    field: "groups",
    headerName: "Groups",
    headerClassName: "table-header",
    width: 200,
  },
];
function UserManagement() {

  const {loading,data,error}=useFetchData(
    `${server}/admin/users`,
    "dashboard-users")

  useErrors([{
    isError:error,
    error:error
  }
  ])
  
  const [rows,setRows]=useState([])

  useEffect(()=>{
    if(data){
      setRows(
        data.users.map((i)=>({
          ...i,id:i._id,avatar:transformImage(i.avatar,50)
        })))
    }
  },[data])
  
  return (
    <AdminLayout>
        {
          loading
          ?<Spinner/>
          :<UserTable heading={"All Users"} columns={columns} rows={rows}/>
        }
    </AdminLayout>
  )
}

export default UserManagement