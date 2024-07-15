import PropTypes from "prop-types";
import { useState } from "react";
import bookCategories from "../../data/bookCategories";
import axios from "axios";
import toast from "react-hot-toast";
import { FormLoading } from "../index";
import { serverURL } from "../../data/constants";

const AddBook = ({ closePopup }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [bookCover, setBookCover] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const bookFormValidation = () => {
    if (!title || !description || !author || !category) {
      setError("Please fill all the fields.");
      return false;
    }
    return true;
  };

  const handleCreateBook = (event) => {
    event.preventDefault();
    if (!bookFormValidation()) {
      return;
    }

    setLoading(true);

    const data = {
      title,
      description,
      author,
      category,
    };

    const formData = new FormData();

    for (const key in data) {
      formData.append(key, data[key]);
    }

    console.log("Creating book with:", formData);

    formData.append("bookCover", bookCover);

    const accessToken = localStorage.getItem("accessToken");

    axios
      .post(`${serverURL}/books`, formData, {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((response) => {
        console.log(response.data);
        toast.success("Book created successfully!");
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.response.data);
      })
      .finally(() => {
        setLoading(false);
        closePopup();
      });

    setTitle("");
    setDescription("");
    setAuthor("");
    setCategory("");
  };

  return (
    <div>
      <h1 className="text-center text-xl font-semibold">Add new book</h1>
      <form
        onSubmit={handleCreateBook}
        className="flex w-96 flex-col items-center justify-center space-y-4 rounded-md p-8"
      >
        <input
          type="text"
          placeholder="Title"
          className="w-full rounded-md border border-gray-300 p-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={loading}
        />
        <textarea
          placeholder="Description"
          className="rows-10 size-36 w-full resize-none rounded-md border border-gray-300 p-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={loading}
        />
        <input
          type="text"
          placeholder="Author"
          className="w-full rounded-md border border-gray-300 p-2"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          disabled={loading}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-md border border-gray-300 p-2"
          disabled={loading}
        >
          <option value="" disabled>
            Select a category
          </option>
          {bookCategories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>

        <input
          type="file"
          className="w-full rounded-md border border-gray-300 p-2"
          onChange={(e) => setBookCover(e.target.files[0])}
          disabled={loading}
        />

        {error && <p className="text-sm text-red-500">{error}</p>}
        {loading ? (
          <FormLoading />
        ) : (
          <button
            type="submit"
            className="w-full rounded-md bg-blue-500 p-2 text-white"
          >
            {"Create Book"}
          </button>
        )}
      </form>
    </div>
  );
};

AddBook.propTypes = {
  closePopup: PropTypes.func.isRequired,
};

export default AddBook;
