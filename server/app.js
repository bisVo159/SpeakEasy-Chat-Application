import express from "express"
import { connectDB } from "./utils/features.js"
import dotenv from 'dotenv'
import { errorMiddleware } from "./middlewares/error.js"
import cookieParser from "cookie-parser"
import { v4 as uuid } from "uuid"
import cors from 'cors'
import {v2 as cloudinary} from "cloudinary"
import { CHAT_JOINED, CHAT_LEAVED, NEW_MESSAGE, NEW_MESSAGE_ALERT, ONLINE_USERS, START_TYPING, STOP_TYPING } from "./constants/events.js"
import {getSockets} from "./lib/helper.js"
import { Message } from "./modals/message.js"
import { corsOptions } from "./constants/config.js"
import { socketAuthenticator } from "./middlewares/auth.js"

import { Server } from "socket.io"
import { createServer } from "http"

import userRoutes from "./routes/user.js"
import chatRoute from "./routes/chat.js"
import adminRoute from "./routes/admin.js"

const userSocketIDs=new Map();
const onlineUsers=new Set();

dotenv.config({
    path: './.env'
})
const mongoURI=process.env.MONGO_URI
const port=process.env.PORT||3000
export const envMode=process.env.NODE_ENV.trim()||"PRODUCTION"

export const adminSecretKey=process.env.ADMIN_SECRET_KEY||"hbregiwhebigwhg"

connectDB(mongoURI)

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const app=express()
const server=createServer(app)
const io=new Server(server,{cors:corsOptions})

app.set("io",io)

// to access all api usig middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOptions))

app.use("/api/v1/user",userRoutes)
app.use("/api/v1/chat",chatRoute)
app.use("/api/v1/admin",adminRoute)

app.get('/',(req,res)=>{
    res.send("Home")
})

io.use((socket,next)=>{
    cookieParser()(
        socket.request,
        socket.request.res,
        async(err)=>await socketAuthenticator(err,socket,next)
    )
})

io.on("connection",(socket)=>{
    const user={
        _id:"jherkgehg",
        name:"mandoza",
    }
    // console.log("socket.user",socket.user)
    userSocketIDs.set(socket.user._id.toString(),socket.id);

    socket.on(NEW_MESSAGE,async({chatId,members,message})=>{

        const messageForRealTIme={
            content:message,
            _id:uuid(),
            sender:{
                _id:socket.user._id,
                name:socket.user.name
            },
            chat:chatId,
            createdAt:new Date().toISOString()
        }

        const messageForDB={
            content:message,
            sender:socket.user._id,
            chat:chatId,
        }

        // console.log("Emitting Message for real time ",messageForRealTIme)
        const memberSocket=getSockets(members)
        io.to(memberSocket).emit(NEW_MESSAGE,{
            chatId,message:messageForRealTIme
        });
        io.to(memberSocket).emit(NEW_MESSAGE_ALERT,{chatId})
        
        try {
            await Message.create(messageForDB);
        } catch (error) {
            throw new Error(error)
        }
    })

    socket.on(START_TYPING,({members,chatId})=>{
        const memberSocket=getSockets(members)
        socket.to(memberSocket).emit(START_TYPING,{chatId})
    })
    socket.on(STOP_TYPING,({members,chatId})=>{
        const memberSocket=getSockets(members)
        socket.to(memberSocket).emit(STOP_TYPING,{chatId})
    })

    socket.on(CHAT_JOINED,({userId,members})=>{
        onlineUsers.add(userId.toString())

        const membersSocket=getSockets(members);
        io.to(membersSocket).emit(ONLINE_USERS,Array.from(onlineUsers))
    })
    socket.on(CHAT_LEAVED,({userId,members})=>{
        onlineUsers.delete(userId.toString());

        const membersSocket=getSockets(members);
        io.to(membersSocket).emit(ONLINE_USERS,Array.from(onlineUsers))
    })
    
    socket.on("disconnect",()=>{
        console.log("User Disconnected")
        onlineUsers.delete(socket.user._id.toString());
        userSocketIDs.delete(socket.user._id.toString());
        socket.broadcast.emit(ONLINE_USERS,Array.from(onlineUsers))
    });
});

app.use(errorMiddleware)
server.listen(port,()=>{
    console.log(`Server is running on port ${port} in ${envMode} mode`)
})

export {userSocketIDs}