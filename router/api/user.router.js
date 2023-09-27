import jwt from "jsonwebtoken";
import isEmail from "validator/es/lib/isEmail";

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "3d" });
};
