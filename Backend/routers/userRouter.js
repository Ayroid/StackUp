import { Router } from "express";

import {
  loginUser,
  readUser,
  readUserBooks,
  registerUser,
} from "../controllers/userController.js";
import { VERIFYTOKEN } from "../middlewares/authentication.js";

const userRouter = Router();

userRouter.route("/:id").get(VERIFYTOKEN, readUser);
userRouter.route("/:id/books").get(VERIFYTOKEN, readUserBooks);
userRouter.route("/login").post(loginUser);
userRouter.route("/signup").post(registerUser);

export default userRouter;
