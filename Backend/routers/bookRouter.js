import { Router } from "express";
import { UPLOAD } from "../middlewares/multer.js";

import {
  getBooks,
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
bookRouter.route("/:id").get(getBookById).put(updateBook).delete(deleteBook);

export default bookRouter;
