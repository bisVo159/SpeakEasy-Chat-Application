import express from "express"
import { connectDB } from "./utils/features.js"
import dotenv from 'dotenv'
import { errorMiddleware } from "./middlewares/error.js"
import cookieParser from "cookie-parser"

import userRoutes from "./routes/user.js"
import chatRoute from "./routes/chat.js"
import adminRoute from "./routes/admin.js"

dotenv.config({
    path: './.env'
})
const mongoURI=process.env.MONGO_URI
const port=process.env.PORT||3000
export const envMode=process.env.NODE_ENV.trim()||"PRODUCTION"

export const adminSecretKey=process.env.ADMIN_SECRET_KEY||"hbregiwhebigwhg"

connectDB(mongoURI)

const app=express()

// to access all api usig middleware
app.use(express.json())
app.use(cookieParser())

app.use("/user",userRoutes)
app.use("/chat",chatRoute)
app.use("/admin",adminRoute)

app.get('/',(req,res)=>{
    res.send("Home")
})

app.use(errorMiddleware)
app.listen(port,()=>{
    console.log(`Server is running on port ${port} in ${envMode} mode`)
})