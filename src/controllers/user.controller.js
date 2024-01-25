import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import cloudinaryUpload from "../utils/cloudinary.js";

const registerUser = asyncHandler(async(req,res)=>{
    //collect data from from // get user detail from frontend
    // validation in frontend and don't miss backend not empty
    // check user already exist: check username and email
    // check for image and check for avatar // avatar and cover image  upload in cloudinary// check successfully upload and not // response url
    // avatar and cover image link an all other data save in mongodb
    // create user object - create entry in db
    // remove password and refresh token field from response
    // unlinkSync temp file from sarver
    // check for user creation
    // return response

    const {fullName, email, username,password} = req.body
    
    // if(fullName===""){
    //     throw new ApiError(400, "fullname is required")
    // }
    if([fullName, email, username,password].some((field)=>{
        field.trim()===""
    })){
        throw new ApiError(400,"All fields are compolsury")
    }
   const existedUser = await User.findOne({
        $or:[{username},{email}]
    })
    if(!existedUser){
        throw new ApiError(409,"UserName and email already existed")
    }

    const avatarLocation = req.files?.avatar[0]?.path;

    const coverImageLocation = req.files?.coverImage?.path;

    if(!avatarLocation){
        throw new ApiError(400,"Avatar file is required")
    }

    const avatar = await cloudinaryUpload(avatarLocation)

    const coverImage= await cloudinaryUpload(coverImageLocation)

    if(!avatar){
        throw new ApiError(400,"Avatar file is required")
    }
    
    User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })
})

export {registerUser} 