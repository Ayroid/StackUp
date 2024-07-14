import PropTypes from "prop-types";

const BookCategory = ({ categoryName }) => {
  return (
    <div className="flex h-64 w-40 cursor-pointer items-center justify-center bg-gray-300 font-semibold transition-transform duration-500 ease-in-out hover:scale-105">
      {categoryName}
    </div>
  );
};

export default BookCategory;

BookCategory.propTypes = {
  categoryName: PropTypes.string.isRequired,
};
