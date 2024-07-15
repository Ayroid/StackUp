import UserModel from "../models/userModel.js";

import { StatusCodes } from "http-status-codes";

const readUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await UserModel.findById(userId)
      .populate("publishedBooks")
      .populate("reviews");

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

const readUserBooks = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await UserModel.findById(userId).populate("publishedBooks");

    if (!user) {
      return res.status(404).send("User not found.");
    }
    const books = user.publishedBooks.map((book) => book.title);
    res.status(200).send(books);
  } catch (err) {
    console.error("Error getting user books:", err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Failed to get user books. Please try again later.");
  }
};

export { readUser, readUserBooks };
