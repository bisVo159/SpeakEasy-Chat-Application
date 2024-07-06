import mongoose,{ Schema,model } from "mongoose";
import {hash} from "bcrypt"

const schema=new Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        requird:true,
        unique:true
    },
    bio:{
        type:String,
        requird:true,
    },
    password:{
        type:String,
        requird:true,
        select:false   // password wont be fetched
    },
    avatar:{
       public_id:{
        type:String,
        requird:true,
       },
       url:{
        type:String,
        requird:true,
       }
    },
},{
    timestamps:true
});

schema.pre("save",async function(next) {
    if(!this.isModified("password")) return next();

    this.password=await hash(this.password,10);
})

export const User=mongoose.models.User||model("User",schema)