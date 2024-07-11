import UserModel from "../models/userModel.js";
import { genSalt, hash, compare } from "bcrypt";
import {
  GENERATEACCESSTOKEN,
  GENERATEREFRESHTOKEN,
} from "../middlewares/authentication.js";
import { StatusCodes } from "http-status-codes";

import dotenv from "dotenv";
dotenv.config();

const saltRounds = parseInt(process.env.SALT_ROUNDS, 10);

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const query = { email: email };

    const salt = await genSalt(saltRounds);
    const hashedPassword = await hash(password, salt);

    const recordExists = await UserModel.find(query);

    if (recordExists.length > 0) {
      return res.status(StatusCodes.CONFLICT).send("User already exists.");
    }

    const user = await UserModel.create({
      username,
      email,
      password: hashedPassword,
    });

    if (user) {
      console.log("User Registered", { user });

      return res
        .status(StatusCodes.CREATED)
        .send("User Registered Successfully.");
    } else {
      console.log("Error Creating User", { error });
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send("Internal Server Error");
    }
  } catch (error) {
    console.log("Error Creating User", { error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Internal Server Error");
  }
};

const loginUser = async (req, res) => {
  try {
    const username = req.body.username;
    const query = { username };
    const user = await UserModel.find(query);
    if (user.length > 0) {
      const password = req.body.password;
      const hashedPassword = user[0].password;
      const isMatch = await compare(password, hashedPassword);
      if (isMatch) {
        const payload = {
          email: user[0].email,
          id: user[0]._id,
        };
        const accessToken = GENERATEACCESSTOKEN(payload);
        const refreshToken = GENERATEREFRESHTOKEN(payload);

        console.log("User Logged In", { user });

        return res.status(StatusCodes.OK).send({ accessToken, refreshToken });
      } else {
        console.log("User Not Logged In", { user });
        return res.status(StatusCodes.UNAUTHORIZED).send("User Not Logged In");
      }
    } else {
      console.log("Account Does Not Exist", { user });
      return res.status(StatusCodes.NOT_FOUND).send("Account Does Not Exist");
    }
  } catch (error) {
    console.log("Error Logging In User", { error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Internal Server Error");
  }
};

const readUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).send("User not found.");
    }

    res.status(200).send(user);
  } catch (err) {
    console.error("Error getting user:", err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Failed to get user. Please try again later.");
  }
};

export { registerUser, loginUser, readUser };
