import { userSocketIDs } from "../app.js"


export const getOtherMember=(members,userId)=>
    members.filter((member)=>member._id.toString()!==userId.toString())[0]

export const getSockets=(users=[])=>
    users.map(user=>userSocketIDs.get(user._id.toString()))

export const getBase64=(file)=>
    `data:${file.mimetype};base64,${file.buffer.toString("base64")}`