import multer from "multer";

let storage = multer.diskStorage({
  destination: (req, res, cb) => {
      cb(null, "./uploads");

    // if (res.fieldname === "profilePic") {
    //   cb(null, "./uploads/profile-images");
    // }
    // if (res.fieldname === "resumeUpload") {
    //   cb(null, "./uploads/resumes");
    // }

    // if (res.fieldname === "userImage") {
    //   cb(null, "./uploads/user-images");
    // }
  },
  filename: (req, res, cb) => {
    cb(null, Date.now() + "-" + res.originalname.toLowerCase());
  },
});
let maxSizeForFile = 1 * 1000 * 1000;

export const upload = multer({
  storage: storage,
  limits: { fileSize: maxSizeForFile },
});
