import { Router } from "express";

import { loginUser, registerUser } from "../controllers/authController.js";
import {
  refreshAccessToken,
  verifyAccessToken,
} from "../middlewares/authentication.js";

const authRouter = Router();

authRouter.route("/login").post(loginUser);
authRouter.route("/signup").post(registerUser);
authRouter.route("/verify").post(verifyAccessToken);
authRouter.route("/refresh").post(refreshAccessToken);

export default authRouter;
