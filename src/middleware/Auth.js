import { verifyToken } from "../services/jwt.js";

//token permission middleware-
export const Auth = async (req, res, next) => {
  try {
    const token = req.headers.token;
    if (!token) {
      return res.send({ status: 401, message: "Please provide a token" });
    } else {
      const tokenVerifyData = verifyToken(token);
      console.log(tokenVerifyData, 123456);
      req.user = tokenVerifyData;
      next();
    }
  } catch (err) {
    console.log(123, err);
    return res.send({ status: 403, message: "Please provide a valid token" });
  }
};

//for role permission middleware-
export const restrict = (...rest) => {
  console.log("ppp", rest);
  return (req, res, next) => {
    console.log(req.user.roleType, "req");
    if (!rest.includes(req.user.roleType)) {
      return res.send({
        status: 403,
        message: "Not permission for this get list admin",
      });
    } else {
      next();
    }
  };
};
