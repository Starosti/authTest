import userModel from "../Models/UserModel.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

const userVerification = async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ message: "No token found" });
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (err, decodedToken) => {
    if (err) {
      return res.json({ message: "Invalid token", status: false });
    } else {
      const user = await userModel.findById(decodedToken.id);
      if (user) return res.json({ status: true, user: user.username });
      return res.json({ status: false });
    }
  });
};

export default userVerification;
