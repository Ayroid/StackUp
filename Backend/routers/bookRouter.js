import { Router } from "express";
import { UPLOAD } from "../middlewares/multer.js";

import {
  getBooks,
  getHighestRatedBooks,
  getRecentlyPublishedBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} from "../controllers/bookController.js";

const bookRouter = Router();

bookRouter
  .route("/")
  .get(getBooks)
  .post(UPLOAD.fields([{ name: "bookCover", maxCount: 1 }]), createBook);

bookRouter.route("/highestRated").get(getHighestRatedBooks);
bookRouter.route("/recent").get(getRecentlyPublishedBooks);

bookRouter.route("/:id").get(getBookById).put(updateBook).delete(deleteBook);

bookRouter.route("/:id/rating").put(updateBook);

export default bookRouter;
