import ReviewsModel from "../models/reviewsModel.js";
import BooksModel from "../models/booksModel.js";
import UserModel from "../models/userModel.js";
import dotenv from "dotenv";
dotenv.config();

const getReviewById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).send("Invalid review ID.");
    }

    const review = await ReviewsModel.findById(id);

    if (!review) {
      return res.status(404).send("Review not found.");
    }
    res.status(200).send(review);
  } catch (err) {
    console.error("Error getting review:", err);
    res.status(500).send("Failed to get review. Please try again later.");
  }
};

const getReview = async (req, res) => {
  try {
    const { book, user } = req.query;
    const query = {};

    if (book) {
      query.book = book;
    }

    if (user) {
      query.user = user;
    }

    const reviews = await ReviewsModel.find(query);

    if (!reviews.length) {
      return res.status(404).send("Reviews not found.");
    }

    res.status(200).send(reviews);
  } catch (err) {
    console.error("Error getting reviews:", err);
    res.status(500).send("Failed to get reviews. Please try again later.");
  }
};

const createReview = async (req, res) => {
  try {
    const { rating } = req.body;

    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).send("Invalid book ID.");
    }

    if (!id || !rating) {
      return res.status(400).send("Book and Rating are required.");
    }

    const bookExists = await BooksModel.findById(id).select("title");
    if (!bookExists) {
      return res.status(404).send("Book not found.");
    }

    const existingReview = await ReviewsModel.findOne({
      user: req.user.id,
      book: id,
    });

    if (existingReview) {
      return res.status(400).send("You have already reviewed this book.");
    }

    const newReview = new ReviewsModel({
      user: req.user.id,
      book: id,
      rating,
    });

    const reviewCreated = await newReview.save();

    if (!reviewCreated) {
      await ReviewsModel.deleteOne({ _id: reviewCreated._id });
      return res.status(500).send("Failed to create review.");
    }

    // Update book ratings

    const reviews = await ReviewsModel.find({ book: id }).select("rating");

    const totalRatings = reviews.reduce(
      (acc, review) => acc + review.rating,
      0
    );

    const averageRating = totalRatings / reviews.length;

    const ratingUpdated = await BooksModel.findOneAndUpdate(
      { _id: id },
      { ratings: averageRating }
    );

    if (!ratingUpdated) {
      await ReviewsModel.deleteOne({ _id: reviewCreated._id });
      return res.status(500).send("Failed to create review.");
    }

    // ADD REVIEW ID TO USER

    const user = await UserModel.findById(req.user.id);

    user.reviews.push(reviewCreated._id);

    const userUpdated = await user.save();

    if (!userUpdated) {
      await ReviewsModel.deleteOne({ _id: reviewCreated._id });
      return res.status(500).send("Failed to create review.");
    }

    res.status(201).send(reviewCreated);
  } catch (err) {
    console.error("Error creating review:", err);
    res.status(500).send("Failed to create review. Please try again later.");
  }
};

const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating } = req.body;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).send("Invalid review ID.");
    }

    const review = await ReviewsModel.findById(id);

    if (!review) {
      return res.status(404).send("Review not found.");
    }

    if (review.user.toString() !== req.user.id) {
      return res
        .status(403)
        .send("You are not authorized to update this review.");
    }

    review.rating = rating || review.rating;

    const reviewUpdated = await review.save();

    if (!reviewUpdated) {
      return res.status(500).send("Failed to update review.");
    }

    res.status(200).send(reviewUpdated);
  } catch (err) {
    console.error("Error updating review:", err);
    res.status(500).send("Failed to update review. Please try again later.");
  }
};

export { getReviewById, getReview, createReview, updateReview };
