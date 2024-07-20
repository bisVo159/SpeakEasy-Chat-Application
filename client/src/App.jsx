import { Suspense, lazy, useEffect } from "react"
import {BrowserRouter,Routes,Route} from "react-router-dom"
import ProtectRoute from "./components/auth/ProtectRoute"
import LayOutLoader from "./components/layout/Loaders"
import { server } from "./components/constants/config"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { userExists, userNotExists } from "./redux/reducer/auth"
import {Toaster} from "react-hot-toast"
import { SocketProvider } from "./socket"

const Home=lazy(()=>import("./pages/Home"))
const Chat=lazy(()=>import("./pages/Chat"))
const Groups=lazy(()=>import("./pages/Groups"))
const Login=lazy(()=>import("./pages/Login"))
const NotFound=lazy(()=>import("./pages/NotFound"))
const AdminLogin=lazy(()=>import("./pages/admin/AdminLogin"))
const Dashboard=lazy(()=>import("./pages/admin/Dashboard"))
const UserManagement=lazy(()=>import("./pages/admin/UserManagement"))
const ChatManagement=lazy(()=>import("./pages/admin/ChatManagement"))
const MessagesManagement=lazy(()=>import("./pages/admin/MessageManagement"))


function App() {
  const {user,loader}=useSelector(state=>state.auth)
  const dispatch=useDispatch()
  
  useEffect(()=>{
    axios.get(`${server}/user/me`,{withCredentials:true})
    .then((res)=>dispatch(userExists(res?.data?.data)))
    .catch((err)=>dispatch(userNotExists()))
  },[])
  
  
  return loader?<LayOutLoader/>:(
    <BrowserRouter>
      <Suspense fallback={<LayOutLoader/>}>
        <Routes>
          <Route
           element={
           <SocketProvider>
            <ProtectRoute user={user}/>
          </SocketProvider>
          }>
            <Route path="/" element={<Home/>}/>
            <Route path="/chat/:chatId" element={<Chat/>}/>
            <Route path="/groups" element={<Groups/>}/>
          </Route>
          <Route path="/login" 
          element={
          <ProtectRoute user={!user} redirect="/">
            <Login/>
          </ProtectRoute>
          }/>

          <Route path="/admin" element={<AdminLogin/>}/>
          <Route path="/admin/dashboard" element={<Dashboard/>}/>
          <Route path="/admin/users" element={<UserManagement/>}/>
          <Route path="/admin/chats" element={<ChatManagement/>}/>
          <Route path="/admin/messages" element={<MessagesManagement/>}/>

        <Route path="*" element={<NotFound/>}/>
        </Routes>
      </Suspense>

      <Toaster position="bottom-center"/>
    </BrowserRouter>
  )
}

export default App
