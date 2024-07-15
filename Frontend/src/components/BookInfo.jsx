import PropTypes from "prop-types";
import axios from "axios";
import { serverURL } from "../data/constants";
import { useState, useEffect } from "react";
import StarRating from "./StarRating";
import { toast } from "react-hot-toast";

const BookInfo = ({ bookId }) => {
  const [bookInfo, setBookInfo] = useState({});
  const [rating, setRating] = useState(0);
  const [starHover, setStarHover] = useState(0);
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    axios
      .get(`${serverURL}/books/${bookId}`, {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((response) => {
        setBookInfo(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [bookId]);

  const handleRatingSubmit = async () => {
    const data = {
      ratings: rating,
    };
    const accessToken = localStorage.getItem("accessToken");
    try {
      const response = await axios.put(
        `${serverURL}/books/${bookId}/rating`,
        data,
        {
          headers: {
            Authorization: accessToken,
          },
        },
      );
      toast.success("Rating submitted successfully!");
      console.log(response.data);
    } catch (error) {
      toast.error("Failed to submit rating.");
      console.error(error);
    }
  };

  const { imageURL, title, author, description, category, ratings } = bookInfo;

  return (
    <div className="flex gap-8">
      <div className="h-72 w-[11.3rem] rounded-md bg-gray-300">
        <img
          src={imageURL}
          alt="book"
          className="max-h-72 w-auto cursor-pointer rounded-md shadow-books"
        />
      </div>
      <div className="flex w-80 flex-col items-start justify-between">
        <div>
          <h1 className="mb-2 text-3xl font-semibold">{title}</h1>
          <h2>
            <strong>Author Name:</strong> {author}
          </h2>
          <p>
            <strong>Category:</strong> {category} | <strong>Ratings:</strong>{" "}
            {ratings}
          </p>
          <p>
            <strong>Description:</strong> {description}
          </p>
        </div>
        <StarRating
          rating={rating}
          starHover={starHover}
          setRating={setRating}
          setStarHover={setStarHover}
          handleRatingSubmit={handleRatingSubmit}
        />
      </div>
    </div>
  );
};

BookInfo.propTypes = {
  bookId: PropTypes.string.isRequired,
};

export default BookInfo;
