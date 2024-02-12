import mongoose from "mongoose"

export const dbConnect=()=>{
    try{
        // mongoose.connect(process.env.MONGO_URL);MONGO_COMPASS_URL
        mongoose.connect(process.env.MONGO_COMPASS_URL);

        console.log("connect db")

    }catch(err){
        console.log("Mongo connect error",err.message)
    }
}