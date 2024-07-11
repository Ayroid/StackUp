import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "books",
    },
    rating: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ReviewsModel = mongoose.model("reviews", reviewSchema);

export default ReviewsModel;
