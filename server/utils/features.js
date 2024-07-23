import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import {v4 as uuid} from "uuid"
import {v2 as cloudinary} from "cloudinary"
import { getBase64, getSockets } from "../lib/helper.js"

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
        message,
        data:user
    })
}

const emitEvent=(req,event,users,data)=>{
    let io=req.app.get("io");
    const usersSocket=getSockets(users)
    io.to(usersSocket).emit(event,data)
}

const uploadFilesTOCloudinary=async(files=[])=>{
    const uploadPromises=files.map((file)=>{
        return new Promise((resolve,reject)=>{
                cloudinary.uploader.upload(
                getBase64(file),
                {
                    resource_type:"auto",
                    public_id:uuid(),
                },
                (error,result)=>{
                if(error) return reject(error);
                resolve(result)
            })
        })
    })

    try {
        const results=await Promise.all(uploadPromises)

        const formattedResults=results.map((result)=>({
            public_id:result.public_id,
            url:result.secure_url,
        }))

        return formattedResults;
    } catch (error) {
        throw new Error("Error uploading files to cloudinary",error)
    }
}

const deleteFilesFromCloudinary=async(public_ids)=>{

}


export {
    connectDB,
    sendToken,
    cookieOptions,
    emitEvent,
    uploadFilesTOCloudinary,
    deleteFilesFromCloudinary
}