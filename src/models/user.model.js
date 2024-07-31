import mongoose, { Mongoose } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    username : {
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

// Pre-save middleware to hash the password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
  
    try {
      this.password = await bcrypt.hash(this.password, 10);
      next();
    } catch (error) {
      next(error);
    }
  });

// Method to check if the provided password is correct
userSchema.methods.isPasswordCorrect = async function(password){
  return await bcrypt.compare(password , this.password)
}

// Method to generate access token
  userSchema.methods.generateAccessToken = function(){
      return jwt.sign({
        _id : this._id,
        email : this.email,
        username : this.username,
        fullName : this.fullName
     },
     process.env.ACCESS_TOKEN_SECRET,
     {
        expiresIn : process.env.ACCESS_TOKEN_EXPIRY
     }
    )
  }
  userSchema.methods.generateRefreshToken = function(){

  }

// Method to generate refresh token



export const User = mongoose.model("User" , userSchema);