import { asynhandler } from "../utils/asyncHandler.js";
import {ApiError} from '../utils/apierror.js';
import {User} from'../models/user.model.js';
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { apiResponse } from "../utils/apiresponse.js";

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

  const avatarLocalPath = req.files?.avatar[0]?.path ;
  const coverImageLocalPath = req.files?.coverImage[0]?.path ;

if(!avatarLocalPath){
  throw new ApiError(400 , "Avatar file is required");
}

// upload them to cloudinary 

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if(!avatar){
    throw new ApiError(400 , "Avatar file is required")
  }

// create user object - create entry in db 

   const user = await User.create({
    fullName : fullName ,
    avatar : avatar.url ,
    coverImage : coverImage?.url || "",
    email,
    password,
    username 
   })

  //  To check whether the user is actually created or not  and  remove password and refresh token field from response and check for user creation 

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  )

  if(!createdUser){
    throw new ApiError(500 , "Something went wrong while registering the user!");
  }
// return response 

return res.status(201).json(
  new apiResponse(200,createdUser,"User registered successfully")
)


})

export {registerUser}