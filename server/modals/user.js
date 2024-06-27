import { Schema,model ,models} from "mongoose";

const Shema=new Shema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        requird:true,
        unique:true
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

export const User=models.User||model("User",Schema)