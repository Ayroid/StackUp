import { Router } from "express";

// CONTROLLERS
import {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} from "../controllers/bookController.js";

// ROUTER
const bookRouter = Router();

// ROUTES
bookRouter.route("/").get(getBooks).post(createBook);
bookRouter.route("/:id").get(getBookById).put(updateBook).delete(deleteBook);

// EXPORT
export default bookRouter;
