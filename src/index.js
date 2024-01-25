import dotenv from "dotenv"
import ConnectionDB from './db/index.js';
dotenv.config({path: "./env"})
import express from "express"
import { DB_URI } from "./constants.js";
import mongoose from "mongoose";
import { app } from "./app.js";





ConnectionDB()
.then(()=>{
    app.on("error",(error)=>{
        console.log(error)
    })
    app.listen(process.env.PORT,()=>{
        console.log(`Server is running at http://localhost:${process.env.PORT}`)
    })
})
.catch((error)=>{
    console.log(error)
})



// const app = express()

// (async()=>{
//     try {
//         await mongoose.connect(`${process.env.MONGODB_CONNECTION}/${DB_URI}`)
//         // app.on("eroor", (error)=>{
//         //     console.log(error) 
//         // })
//         // app.listen(process.env.PORT,()=>{
//         //     console.log("the app is connected successfully")
//         // })
//         console.log("connected");
//     } catch (error) {
//         console.log("Error ", error)
//         throw error
//     }
// })()

