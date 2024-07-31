class ApiError extends Error {
   constructor(statusCode,
    message = "Something went wrong!",
    errors = [],
    stack = ''){
        super(message);
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false
        this.errors = errors
 // stack is not necessary we can skip this
        if(stack){
            this.stack = stack
        }
        else {
            Error.captureStackTrace(this,this.constructor)
        }
   }
}

export {ApiError}