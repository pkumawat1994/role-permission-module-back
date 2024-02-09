import jwt from "jsonwebtoken"

export const generateToken=(payload,option)=>{
    console.log(payload,"payloadd")
   const userdata={userId:payload.userId.toString(),roleType:payload.roleType}
   return jwt.sign(userdata,process.env.JWT_SECREAT||"abcdef")
}

export const verifyToken=(token)=>{
    return jwt.verify(token, process.env.JWT_SECRET||"abcdef"); 
}