import mongoose from "mongoose";
// import { createSlider } from "../controller/User.controller";

const SliderShema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true,
  },
  email: {
    type: String,
    require: true,
    trim: true,
  },
  userImage: {
    type: String,
    require: false,
  },
  resumeUpload: {
    type: String,
    require: false,

  },
//   slideImage: {
//     type: String,
//     require: false,
//   },
});
export const ResumeProfileModel = mongoose.model("multifieldsImg", SliderShema);
