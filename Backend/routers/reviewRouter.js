import { Router } from "express";

import {
  getReview,
  getReviewById,
  createReview,
  updateReview,
} from "../controllers/reviewController.js";

const reviewRouter = Router();

reviewRouter.route("/").get(getReview);
reviewRouter
  .route("/:id")
  .get(getReviewById)
  .post(createReview)
  .put(updateReview);

export default reviewRouter;
