// Aync  handler using promises 
 const asynhandler = (requestHandler)=>{
     return (req,res,next)=>{
       Promise.resolve(requestHandler(req,res,next)).catch((error)=>next(error))
    }
 }

 export {asynhandler}

// Async handler using try catch 

// const asyncHandler = (requestHandler)=> async (req,res,next)=>{
//    try {
//      await requestHandler(req,res,next)
//    } catch (error) {
//      res.status(error.status || 500).json({
//         success : false ,
//         message : error.message
//      })
//    }
// }

// Basic Function 
// const asyncHandler = ()=>{}

// Higher order function 
// const asyncHandler = () => {()=>{}}

// simplified syntax 
// const asyncHandler = ()=>()=>{}

/*
Example :
// using try catch 
    const asyncHandler1 = (requestHandler)=> async(req,res,next)=>{
        try {
           await requestHandler(req,res,next) 
        } catch (error) {
        res.status(error.status || 500).json({
            success : false ,
            message : error.message
        }) 
        }
    }

    // using promises 

    const asyncHandler2 = (requestHandler)=>{
        return (req,res,next)=>{
         Promise.resolve(requestHandler(req,res,next)).catch((error)=>next(error))
        }
    }
*/