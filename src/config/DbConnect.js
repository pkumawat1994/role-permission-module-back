import mongoose from "mongoose"

export const dbConnect=()=>{
    try{
        mongoose.connect(process.env.MONGO_URL);
        console.log("connect db")

    }catch(err){
        console.log("Mongo connect error",err)
    }
}