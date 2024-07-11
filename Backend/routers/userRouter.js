import { Router } from "express";

import {
  readUser,
  loginUser,
  registerUser,
} from "../controllers/userController.js";
import { VERIFYTOKEN } from "../middlewares/authentication.js";

const userRouter = Router();

userRouter.route("/:id").get(VERIFYTOKEN, readUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/signup").post(registerUser);

export default userRouter;
