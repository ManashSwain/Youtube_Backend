import { asynhandler } from "../utils/asyncHandler.js";
import {ApiError} from '../utils/apierror.js';
import {User} from'../models/user.model.js'

const registerUser = asynhandler( async(req,res)=>{
//   steps to follow for user creation 
// get user details from frontend 

const {username , email , fullName , password } = req.body 
//    console.log( "user name is : ",username)
//    console.log( " email is : ",email)
//    console.log( " full name is : ",fullName)
//    console.log( " password is : ",password)

// validate if the fields are not empty
// validating username 
 if(username === ""){
  throw new ApiError(400 , "username is a required field");
 }

 // validating email 
 if(email === ""){
    throw new ApiError(400 , "email is a required field");
   }

     // validating fullName 
   if(fullName === ""){
    throw new ApiError(400 , "fullname is a required field");
   }

   // validating password 
   if( password === ""){
    throw new ApiError(400 , "password is a required field");
   }
// check if the user already exists 

const existedUser = User.findOne({
    $or : [{username} , {email}]
})

if(existedUser){
    throw new ApiError( 409 , "User is already existing")
}
// check for images , check for avatar 
// upload them to cloudinary 
// create user object - create entry in db 
// remove password and refresh token field from response 
// check for user creation 
// return response 


})

export {registerUser}