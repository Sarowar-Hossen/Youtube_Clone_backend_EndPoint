const asyncHandler = (requestHandler)=>{
    return (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next)).catch((error)=>next(error))
    }
}

export {asyncHandler}

// const asyncHandler = (fn) => async(error,req,res,next) => {
//     try {
//         fn(req,res,next)
//     } catch (error) {
//         res
//         .status(500)
//         .send(json({message:"the server is a problem"}))
//     }
// }
