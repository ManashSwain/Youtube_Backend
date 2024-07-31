import { asynhandler } from "../utils/asyncHandler.js";

const registerUser = asynhandler( async(req,res)=>{
  res.status(200).json({
    message : "Its working"
  })
})

export {registerUser}