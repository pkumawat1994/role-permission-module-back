import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import { userRoutes } from "./src/routes/UserRoutes.js";
import { dbConnect } from "./src/config/DbConnect.js";
import { adminRoutes } from "./src/routes/AdminRoutes.js";
const app=express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
dotenv.config();
dbConnect()
app.use("/api/user",userRoutes)
app.use("/api/admin",adminRoutes)








app.listen(process.env.PORT,()=>console.log(`server is running `))