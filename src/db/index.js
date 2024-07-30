import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB =  async ()=>{
   try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    console.log("Data base is connected");
    console.log(` connected to host : ${connectionInstance.connection.host}`);
   }
   catch(error){
     console.error("Error is : " , error);
     process.exit(1);
   }
}

export default connectDB ;