import { signup, login } from "../Controllers/AuthController.js";
import { Router } from "express";
import userVerification from "../Middleware/AuthMiddleware.js";
const authRoute = Router();

authRoute.post("/signup", signup);
authRoute.post("/login", login);
authRoute.post("", userVerification);

export default authRoute;
