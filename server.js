import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import { userRoutes } from "./src/routes/UserRoutes.js";
import { dbConnect } from "./src/config/DbConnect.js";
const app=express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
dotenv.config();
dbConnect()
app.use("/api/user",userRoutes)







app.listen(process.env.PORT,()=>console.log(`server is running `))