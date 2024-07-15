import PropTypes from "prop-types";
import { Toaster } from "react-hot-toast";
import { FaStar } from "react-icons/fa";

const StarRating = ({
  rating,
  starHover,
  setRating,
  setStarHover,
  handleRatingSubmit,
}) => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex space-x-1">
        {[...Array(5)].map((_, index) => {
          const starValue = index + 1;
          return (
            <FaStar
              key={starValue}
              size={30}
              className={`cursor-pointer ${
                starValue <= (starHover || rating)
                  ? "text-yellow-500"
                  : "text-gray-300"
              }`}
              onClick={() => setRating(starValue)}
              onMouseEnter={() => setStarHover(starValue)}
              onMouseLeave={() => setStarHover(0)}
            />
          );
        })}
      </div>
      <button
        onClick={handleRatingSubmit}
        className="mt-4 rounded bg-blue-500 px-8 py-2 text-white"
      >
        Submit Rating
      </button>
      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  );
};

StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
  starHover: PropTypes.number.isRequired,
  setRating: PropTypes.func.isRequired,
  setStarHover: PropTypes.func.isRequired,
  handleRatingSubmit: PropTypes.func.isRequired,
};

export default StarRating;
