import moment from "moment";
import { UserModel } from "../model/UserModel.js";
import { hashCompare, hashGenerate } from "../services/hash.js";
import { generateToken } from "../services/jwt.js";
import crypto from "crypto";
import { ResumeProfileModel } from "../model/SliderModel.js";
import { promises as fsPromises } from "fs";

const createUser = async (req, res) => {
  const { name, email, mobile, password } = req.body;
  console.log(req, 123456);

  try {
    console.log(req.file, 1071995);
    let profileImage = req.file.filename;
    const findUserData = await UserModel.findOne({ email });
    if (findUserData) {
      await fsPromises.unlink(req.file.path);

      return res
        .status(400)
        .send({ status: 400, message: "User is already axist try again..." });
    }
    let hashPassword = await hashGenerate(password);
    const result = await UserModel({
      name,
      email,
      mobile,
      profilePic: profileImage,
      password: hashPassword,
    }).save();
    if (result) {
      res.status(201).send({
        status: 201,
        users: result,
        message: "user created successfully",
      });
    }
  } catch (err) {
    return res.status(500).send({
      status: 500,
      message: "internal server error",
      error: err.message,
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log("req.body-login", req.body);

  const data = await UserModel.findOne({ email });
  console.log(data, "find-data-from db");
  if (!data) {
    res.status(404).send({ status: 404, message: "User not found" });
  } else {
    const campareHashResult = await hashCompare(password, data.password);
    console.log(campareHashResult);
    if (campareHashResult) {
      let payload = { userId: data._id, roleType: data.roleType };
      let option = { expiresIn: "1h" };
      let token = generateToken(payload, option);
      let userData = { ...data._doc, token };
      return res.status(200).send({
        status: 200,
        message: "User login successfully",
        user: userData,
      });
    } else {
      return res
        .status(401)
        .send({ status: 401, message: "Password incorrect" });
    }
  }
};

const getUser = async (req, res) => {
  console.log(req.user, 555);

  try {
    let data = await UserModel.find({ isDeleted: false }).select("-password");
    if (data) {
      return res
        .status(200)
        .send({ status: 200, message: "User fetch successfully", users: data });
    }
  } catch (err) {
    return res
      .status(500)
      .send({ status: 500, message: "Internal server error" });
  }
};

const deleteUser = async (req, res) => {
  // if(req.params.id==req.user.userId){
  //    return res.status(400).send({status:400,message:"User not deleted own yourself "})
  // }
  try {
    if (req.params.id) {
      const data = await UserModel.findByIdAndUpdate(
        { _id: req.params.id },
        { $set: { isDeleted: true, deletedAt: new Date() } },
        { new: true, select: "-password" }
      );
      if (data) {
        res.status(200).send({ status: 200, message: "Deleted successfully" });
      }
    } else {
      res.status(401).send({ status: 401, message: "Please provide id" });
    }
  } catch (err) {
    res.status(500).send({ status: 500, message: "Internal server error" });
  }
};

const updateUser = async (req, res) => {
  console.log(req.body);
  console.log(req.params.id);
  try {
    const data = await UserModel.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: { updatedAt: new Date(), ...req.body } },
      { new: true, select: "-password" }
    );
    if (data) {
      res
        .status(200)
        .send({ status: 200, message: "User updated successfully" });
    }
  } catch (err) {
    res.status(500).send({ status: 500, message: "Internal server error" });
  }
};

const getSingleUser = async (req, res) => {
  try {
    if (req.params.id) {
      let data = await UserModel.findOne({ _id: req.params.id }).select(
        "-password"
      );
      console.log(data, 123);
      if (data) {
        res
          .status(200)
          .send({user:data, satus: 200, message: "Fetch user successfully" });
      } else {
        res.status(404).send({ satus: 404, message: "User not found" });
      }
    }
  } catch (err) {
    res.status(500).send({ satus: 500, message: "Internal server error" });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    let user = await UserModel.findOne({ email }).select("-password");
    if (!user) {
      return res.status(404).send({
        status: 404,
        message: "User not found please enter valid email",
      });
    }

    let tokenForForgot = crypto.randomBytes(15).toString("hex");
    console.log(tokenForForgot, "tokenByteee");
    let tokenExpireTime = moment().add(1, "h"); //expire time of token
    console.log("tokenExpireTime", tokenExpireTime);

    //also add this key in Model
    user.tokenForReset = tokenForForgot;
    user.tokenExpireTime = tokenExpireTime;

    await user.save();
    res.status(200).send({
      status: 200,
      message: "Reset password successfully",
      expiryToken: tokenForForgot,
    });
  } catch (err) {
    res.status(500).send({
      status: 500,
      message: "Internal server error",
      error: err.message,
    });
  }
};

const resetPassword = async (req, res) => {
  const { tokenForReset, newPassword } = req.body;
  try {
    if (!tokenForReset) {
      return res
        .status(404)
        .send({ status: 404, message: "Token is required" });
    }

    let user = await UserModel.findOne({ tokenForReset });
    console.log(user, 456);
    if (user.tokenExpireTime > moment()) {
      (user.password = newPassword),
        (user.tokenForReset = null),
        (user.tokenExpireTime = null);
      await user.save();
      return res
        .status(200)
        .send({ status: 200, message: "Password reset successfully" });
    } else {
      return res
        .status(400)
        .send({ status: 400, message: "Token has been Expired" });
    }
  } catch (err) {
    return res.status(500).send({
      status: 500,
      message: "Internal server error",
      error: err.message,
    });
  }
};

const createSlider = async (req, res) => {
  const { name, email } = req.body;
  const userImage = req.files["userImage"][0].filename;
  const resumeUpload = req.files["resumeUpload"][0].filename;
  // const sliderImagePaths = req.files['slideImage'] ? req.files['slideImage'].map(file => file.path) : [];

  console.log(userImage);
  console.log(resumeUpload);
  try {
    const userResult = await ResumeProfileModel.findOne({ email });
    if (userResult) {
      // if user exist remove to unlink from upload folder like this----
      await fsPromises.unlink(req.files["userImage"][0].path);
      await fsPromises.unlink(req.files["resumeUpload"][0].path);
      // for (const sliderImagePath of sliderImagePaths) {
      //   await fsPromises.unlink(sliderImagePath);
      // }

      return res
        .status(404)
        .send({
          status: 404,
          message: "User already exists !!",
        });
    }

    let user = await ResumeProfileModel({
      name,
      email,
      userImage,
      resumeUpload,
      slideImage:sliderImagePaths
    }).save();
    if (user) {
      return res.status(201).send({
        status: 201,
        message: "user resigstered and resume upload successfully",
      });
    }
  } catch (err) {
    return res
      .status(500)
      .send({
        status: 500,
        message: "Internal server error",
        error: err.message,
      });
  }
};

export {
  createUser,
  loginUser,
  getUser,
  deleteUser,
  updateUser,
  getSingleUser,
  forgotPassword,
  resetPassword,
  createSlider,
};
