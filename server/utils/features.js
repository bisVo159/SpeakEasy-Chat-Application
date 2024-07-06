import mongoose from "mongoose"
import jwt from "jsonwebtoken"

const cookieOptions={
    maxAge:15*24*60*60*1000,
    sameSite:"none",
    secure:true,
    httpOnly:true
}

const connectDB=(url)=>{
    mongoose.connect(url,{dbName:"SpeakEasy"})
    .then((data)=>console.log(`connected to DB: ${data.connection.host}`))
    .catch((err)=>{
        throw err;
    })
}

const sendToken=(res,user,code,message)=>{
    const token=jwt.sign({_id:user._id},process.env.JWT_SECRET)


    return res.status(code).cookie("speakEasy-token",token,cookieOptions).json({
        success:true,
        message
    })
}

const emitEvent=(req,event,users,data)=>{
    console.log("Emiting Event",event)
}

const deleteFilesFromCloudinary=async(public_ids)=>{

}


export {connectDB,sendToken,cookieOptions,emitEvent,deleteFilesFromCloudinary}