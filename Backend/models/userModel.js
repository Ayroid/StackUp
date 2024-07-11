import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    publishedBooks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "books",
      },
    ],
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "reviews",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("users", userSchema);

export default UserModel;
