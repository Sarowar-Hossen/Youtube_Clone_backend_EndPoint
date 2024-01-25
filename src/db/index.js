import mongoose from "mongoose";
import { DB_URI } from "../constants.js";

const ConnectionDB = async()=>{
    try {
        const ConnectionInstance = await mongoose.connect(`${process.env.MONGODB_CONNECTION}/${DB_URI}`)
        console.log(`\n Mongodb Connected !! DB HOST:${ConnectionInstance}`)
    } catch (error) {
        console.log("ConnectionError ",error)
        process.exit()
    }
}

export default ConnectionDB