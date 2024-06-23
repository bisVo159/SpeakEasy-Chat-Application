
import React, { useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import UserTable from "../../components/shared/Table"

const columns=[{
  field:"id",
  headerName:"ID",
  headerClassName:"table-header",
  width:100
}]

function UserManagement() {
  // const [rows,setRows]=useState([])
  
  return (
    <AdminLayout>
        <UserTable heading={"All Users"} columns={columns}/>
    </AdminLayout>
  )
}

export default UserManagement