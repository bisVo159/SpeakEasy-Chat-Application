import { Schema,model ,models,Types} from "mongoose";

const Shema=new Shema({
    content:String,
    attachments:[
        {
            public_id:{
                type:String,
                requird:true,
               },
               url:{
                type:String,
                requird:true,
               }
        }
    ],
    sender:{
        type:Types.ObjectId,
        ref:"User",
        required:true
    },
    chat:{
        type:Types.ObjectId,
        ref:"Chat",
        required:true
    },
},{
    timestamps:true
});

export const Message=models.Message||model("Message",Schema)