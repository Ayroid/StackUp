import UserModel from "../models/userModel.js";
import dotenv from "dotenv";
import { StatusCodes } from "http-status-codes";
import { genSalt, hash, compare } from "bcrypt";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../middlewares/authentication.js";

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
        const accessToken = generateAccessToken(payload);
        const refreshToken = generateRefreshToken(payload);

        console.log("User Logged In", { user });

        // DELAY A DELAY OF 5 SECONDS
        const delay = (ms) => new Promise((res) => setTimeout(res, ms));
        await delay(5000);

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

export { registerUser, loginUser };
