import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const BookCategory = ({ categoryName }) => {
  const navigate = useNavigate();
  return (
    <div
      className="flex h-64 w-40 cursor-pointer items-center justify-center bg-gray-300 font-semibold transition-transform duration-500 ease-in-out hover:scale-105"
      onClick={() => {
        navigate(`/category/${categoryName}`);
      }}
    >
      {categoryName}
    </div>
  );
};

export default BookCategory;

BookCategory.propTypes = {
  categoryName: PropTypes.string.isRequired,
};
