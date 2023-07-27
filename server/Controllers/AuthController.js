import userModel from "../Models/UserModel.js";
import createSecretToken from "../Utilities/SecretToken.js";
import bcrypt from "bcrypt";

const signup = async (req, res, next) => {
  try {
    const { email, password, username, createdAt } = req.body;
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const user = await userModel.create({
      email,
      password,
      username,
      createdAt,
    });
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
      sameSite: "none",
    });
    res
      .status(201)
      .json({ message: "Signed up successfully", success: true, user });
    next();
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ message: "Please fill in all fields" });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(403)
        .json({ message: "Incorrect password or user does not exist" });
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res
        .status(403)
        .json({ message: "Incorrect password or user does not exist" });
    }
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
      sameSite: "none",
    });
    res.json({ message: "User logged in successfully", success: true, user });
    next();
  } catch (error) {
    next(error);
  }
};

export { signup, login };
