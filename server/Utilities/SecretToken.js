import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

const createSecretToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_KEY, {
    // 3 days
    expiresIn: process.env.JWT_TOKEN_EXPIRES_IN || "3d",
  });
};

export default createSecretToken;
