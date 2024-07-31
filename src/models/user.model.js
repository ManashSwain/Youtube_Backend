import mongoose, { Mongoose } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    userName : {
        type: String ,
        required : true ,
        unique : true,
        lowercase : true,
        trim : true,
        index : true
    },
    email : {
        type: String ,
        required : true,
        unique : true ,
    },
    fullName : {
        type : String ,
        required  : true,
        trim : true,
        index : true
    },
    avatar : {
        type : String ,
        required : true,
    },
    coverImage : {
        type : String 
    },
    password : {
        type : String,
        required : [true , "Password is a required field"]
    },
    refreshToken : {
        type : String , 
        required : true 
    },
    watchHistory : [
        {
            type : mongoose.Schema.Types.ObjectId ,
            ref : "Video"
        }
    ]

},{timestamps:true});



export const User = mongoose.model("User" , userSchema);