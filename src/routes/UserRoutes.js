import { Router } from "express";
import {
  createSlider,
  createUser,
  deleteUser,
  forgotPassword,
  getSingleUser,
  getUser,
  loginUser,
  resetPassword,
  updateUser,
} from "../controller/User.controller.js";
import { Auth, restrict } from "../middleware/Auth.js";
import { upload } from "../middleware/upload.js";

const userRoutes = Router();
userRoutes.post("/add-user", upload.single("profilePic"), createUser);
userRoutes.post(
  "/upload-image-multiple-fields",
  upload.fields([
    {
      name: "userImage",
      maxCount: 1,
    },
    {
      name: "resumeUpload",
      maxCount: 1,
    }
  ]),
  createSlider
);

userRoutes.post("/login-user", loginUser);
userRoutes.get("/get-user", getUser);
userRoutes.post("/delete-user/:id", Auth, restrict("user"), deleteUser); //permision for access  this api token dekh lega ye user admin he ya user he
userRoutes.post("/update-user/:id", Auth, updateUser);
userRoutes.get("/get-single-user/:id", Auth, getSingleUser);
userRoutes.post("/forgot-password", forgotPassword);
userRoutes.post("/reset-password", resetPassword);

export { userRoutes };
