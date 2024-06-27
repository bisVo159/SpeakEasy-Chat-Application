import express from "express"
import userRoutes from "./routes/user.js"

const app=express()


app.use("/user",userRoutes)

app.get('/',(req,res)=>{
    res.send("Home")
})
app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})