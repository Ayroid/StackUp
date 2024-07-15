import { Router } from "express";

import { readUser, readUserBooks } from "../controllers/userController.js";
import { verifyToken } from "../middlewares/authentication.js";

const userRouter = Router();

userRouter.route("/").get(verifyToken, readUser);
userRouter.route("/books").get(verifyToken, readUserBooks);

export default userRouter;
