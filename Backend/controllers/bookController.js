import BooksModel from "../models/booksModel.js";
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

    res.status(200).send("Book deleted successfully.");
  } catch (err) {
    console.error("Error deleting book:", err);
    res.status(500).send("Failed to delete book. Please try again later.");
  }
};

export { getBooks, getBookById, createBook, updateBook, deleteBook };

// SAMPLE DATA FOR TESTING

// {
//   "title": "The Alchemist",
//   "description": "A book about following your dreams.",
//   "author": "Paulo Coelho",
//   "category": "Fiction"
// }

// {
//   "title": "The Lean Startup",
//   "description": "A book about starting a business.",
//   "author": "Eric Ries",
//   "category": "Business"
// }

// {
//   "title": "The Da Vinci Code",
//   "description": "A book about"
//   "author": "Dan Brown",
//   "category": "Mystery"
// }

// {
//   "title": "The 4-Hour Workweek",
//   "description": "A book about productivity.",
//   "author": "Tim Ferriss",
//   "category": "Business"
// }

// {
//   "title": "The Art of War",
//   "description": "A book about strategy.",
//   "author": "Sun Tzu",
//   "category": "Strategy"
// }

// {
//   "title": "The Power of Now",
//   "description": "A book about living in the present.",
//   "author": "Eckhart Tolle",
//   "category": "Self-Help"
// }

// {
//   "title": "The Subtle Art of Not Giving a F*ck",
//   "description": "A book about not caring about everything.",
//   "author": "Mark Manson",
//   "category": "Self-Help"
// }
