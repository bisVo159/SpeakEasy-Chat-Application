import { compare } from "bcrypt"
import {User} from "../modals/user.js"
import { cookieOptions, emitEvent, sendToken } from "../utils/features.js"
import { TryCatch } from "../middlewares/error.js"
import { ErrorHandler } from "../utils/utility.js"
import { Chat } from "../modals/chat.js"
import { Request } from "../modals/request.js"
import { NEW_REQUEST, REFETCH_CHATS } from "../constants/events.js"
import { getOtherMember } from "../lib/helper.js"
// create a new user and save it to the database and save in cookie
const newUser=TryCatch(async(req,res,next)=>{
    const {name,username,password,bio}=req.body
    
    const file=req.file
    console.log(file)

    if(!file){
        return next(new ErrorHandler("Please Upload Avatar"))
    }

    const avatar={
        public_id:"sdfsd",
        url:"asdfsd"
    }

    const user=await User.create({
        name,username,password,avatar,bio
    })

    sendToken(res,user,201,"User created successfully")
})
const login=TryCatch(
    async(req,res,next)=>{
        const {username,password}=req.body
    
        const user=await User.findOne({username}).select("+password");
    
        if(!user){
            return next(new ErrorHandler("Invalid Username",404))
        }
    
        const isMatch=await compare(password,user.password);
        if(!isMatch){
            return next(new ErrorHandler("Invalid Password",404))
        }
        sendToken(res,user,201,`Welcome Back ${user.name}`)
    }
)

const getMyProfile=TryCatch(
    async(req,res,next)=>{
        const user=await User.findById(req.user)
        if(!user) return next(new ErrorHandler("User not found",404))
        return res.status(200).json({
            success:true,
            data:user
        })
    }
)

const logOut=TryCatch(
    async(req,res)=>{
        return res.status(200).cookie("speakEasy-token","",{...cookieOptions,maxAge:0}).json({
            success:true,
            message:"Logged out successfully"
        })
    }
)
const searchUser=TryCatch(async(req,res)=>{
        const {name}=req.query;

        // finding all my chats
        const myChats=await Chat.find({groupChat:false,members:req.user})

        // extracting all users from chats means friend or people i chatted dwith
        const allUsersFromMyChats=myChats.flatMap((chat)=>chat.members)

        const allUsersExceptMyFriends=await User.find({
            _id:{$nin:allUsersFromMyChats},
            name:{$regex:name,$options:"i"}
        })

        const users=allUsersExceptMyFriends.map(({_id,name,avatar})=>({
            _id,
            name,
            avatar:avatar.url
            })
        )
        
        return res.status(200).json({
            success:true,
            users
        })
    })

const sendFriendRequest=TryCatch(async(req,res,next)=>{
    const {userId}=req.body;
    const request=await Request.findOne({
        $or:[
            {sender:req.user, receiver:userId},
            {receiver:req.user, sender:userId}
        ]
    })
    if(request){
        return next(new ErrorHandler("Request already sent",400));
    }

    await Request.create({
        sender:req.user,
        receiver:userId
    })

    emitEvent(req,NEW_REQUEST,[userId])

    return res.status(200).json({
        success:true,
        message:"Friend Request Sent"
    })
})

const acceptFriendRequest=TryCatch(
    async(req,res,next)=>{
        const {requestId,accept}=req.body
        const request=await Request.findById(requestId).populate("sender","name").populate("receiver","name");

        if(!request) return next(new ErrorHandler("Request not found",404))
        if(request.receiver._id.toString()!==req.user.toString()) 
            return next(new ErrorHandler("You are not authorized to accept this request",401))

        if(!accept){
            await request.deleteOne()

            return res.status(200).json({
                success:true,
                message:"Friend Request Rejected"
            })
        }

        const members=[request.sender._id,request.receiver._id]

        await Promise.all([
            Chat.create({
                members,
                name:`${request.sender.name} - ${request.receiver.name}`
            }),
            request.deleteOne()
        ])

        emitEvent(req,REFETCH_CHATS,members)

        return res.status(200).json({
            success:true,
            message:"Request Accepted",
            senderId:request.sender._id
        })
    }
)

const getMyNotifications=TryCatch(async(req,res,next)=>{
    const request=await Request.find({receiver:req.user}).populate("sender","name avatar");

    const allRequests=request.map(({_id,sender})=>({
        _id,
        sender:{
            _id:sender._id,
            name:sender.name,
            avatar:sender.avatar.url
        }
    }))

    return res.status(200).json({
        success:true,
        allRequests
    })
})

const getMyFriends=TryCatch(async(req,res,next)=>{
    const chatId=req.params.chatId;
    
    const chats=await Chat.find({
        members:req.user,groupChat:false
    }).populate("members","name avatar");

    const friends=chats.map(({members})=>{
        const otherUser=getOtherMember(members,req.user)

        return {
            _id:otherUser._id,
            name:otherUser.name,
            avatar:otherUser.avatar.url
        }
    })

    if(chatId){
        const chat=await Chat.findById(chatId);

        const availableFriends=friends.filter(
            (friend)=>!chat.members.includes(friend._id)
        )

        return res.status(200).json({
            success:true,
            friends:availableFriends
        })
    }else{
        return res.status(200).json({
            success:true,
            friends
        })
    }
})

export {
    newUser,
    login,
    getMyProfile,
    logOut,
    searchUser,
    sendFriendRequest,
    acceptFriendRequest,
    getMyNotifications,
    getMyFriends
}