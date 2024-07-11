import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
  {
    userPublisher: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    ratings: {
      type: Number,
      default: 0,
    },
    imageURL: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const BooksModel = mongoose.model("books", bookSchema);

export default BooksModel;
