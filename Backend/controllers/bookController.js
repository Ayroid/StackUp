import BooksModel from "../models/booksModel.js";
import UserModel from "../models/userModel.js";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

const getBookById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).send("Invalid book ID.");
    }

    const book = await BooksModel.findById(id);

    if (!book) {
      return res.status(404).send("Book not found.");
    }
    res.status(200).send(book);
  } catch (err) {
    console.error("Error getting book:", err);
    res.status(500).send("Failed to get book. Please try again later.");
  }
};

const getBooks = async (req, res) => {
  try {
    const { category, sort } = req.query;
    const query = category ? { category } : {};

    const books = await BooksModel.find(query).sort({
      ratings: sort === "asc" ? 1 : -1,
    });

    if (!books) {
      return res.status(404).send("Books not found.");
    }

    res.status(200).send(books);
  } catch (err) {
    console.error("Error getting books:", err);
    res.status(500).send("Failed to get books. Please try again later.");
  }
};

const getHighestRatedBooks = async (req, res) => {
  try {
    const books = await BooksModel.find().sort({ ratings: -1 }).limit(7);

    if (!books) {
      return res.status(404).send("Books not found.");
    }

    res.status(200).send(books);
  } catch (err) {
    console.error("Error getting books:", err);
    res.status(500).send("Failed to get books. Please try again later.");
  }
};

const getRecentlyPublishedBooks = async (req, res) => {
  try {
    const books = await BooksModel.find().sort({ createdAt: -1 }).limit(7);

    if (!books) {
      return res.status(404).send("Books not found.");
    }

    res.status(200).send(books);
  } catch (err) {
    console.error("Error getting books:", err);
    res.status(500).send("Failed to get books. Please try again later.");
  }
};

const createBook = async (req, res) => {
  try {
    const { title, description, author, category } = req.body;

    if (!title || !author) {
      return res.status(400).send("Title and Author are required.");
    }

    const query = { title, author };
    const existingBook = await BooksModel.findOne(query);
    if (existingBook) {
      return res.status(400).send("Book already exists.");
    }

    const imageURL = `${process.env.SERVER_URI}/images/books/${req.files["bookCover"][0].filename}`;

    const newBook = new BooksModel({
      userPublisher: req.user.id,
      title,
      description,
      author,
      category,
      imageURL,
    });

    const bookCreated = await newBook.save();

    if (!bookCreated) {
      return res.status(500).send("Failed to create book.");
    }

    const userUpdated = await UserModel.findByIdAndUpdate(
      req.user.id,
      {
        $push: { publishedBooks: bookCreated._id },
      },
      { new: true }
    );

    if (!userUpdated) {
      await BooksModel.findByIdAndDelete(bookCreated._id);
      return res.status(500).send("Failed to create book.");
    }

    res.status(201).send("Book created successfully.");
  } catch (err) {
    console.error("Error creating book:", err);
    res.status(500).send("Failed to create book. Please try again later.");
  }
};

const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, author, category, ratings } = req.body;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).send("Invalid book ID.");
    }

    const book = await BooksModel.findById(id);

    if (!book) {
      return res.status(404).send("Book not found.");
    }

    book.title = title || book.title;
    book.description = description || book.description;
    book.author = author || book.author;
    book.category = category || book.category;
    book.ratings = ratings || book.ratings;

    const bookUpdated = await book.save();

    if (!bookUpdated) {
      return res.status(500).send("Failed to update book.");
    }

    res.status(200).send("Book updated successfully.");
  } catch (err) {
    console.error("Error updating book:", err);
    res.status(500).send("Failed to update book. Please try again later.");
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).send("Invalid book ID.");
    }

    const book = await BooksModel.findByIdAndDelete(id);

    if (!book) {
      return res.status(404).send("Book not found.");
    }

    const userUpdated = await UserModel.findByIdAndUpdate(
      req.user.id,
      {
        $pull: { publishedBooks: id },
      },
      { new: true }
    );

    // DELETE BOOK IMAGE FROM SERVER
    const imagePath =
      "public/images/books/" + book.imageURL.split("/images/books/")[1];

    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error("Error deleting book image:", err);
      }
    });

    if (!userUpdated) {
      await BooksModel.create(book);
      return res.status(500).send("Failed to delete book.");
    }

    res.status(200).send("Book deleted successfully.");
  } catch (err) {
    console.error("Error deleting book:", err);
    res.status(500).send("Failed to delete book. Please try again later.");
  }
};

export {
  getBooks,
  getBookById,
  getHighestRatedBooks,
  getRecentlyPublishedBooks,
  createBook,
  updateBook,
  deleteBook,
};
