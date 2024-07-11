import PropTypes from "prop-types";

const Book = ({ imageURL, popUpCallBack }) => {
  return (
    <div className="max-h-64" onClick={popUpCallBack}>
      <img
        src={imageURL}
        alt="book"
        className="max-h-64 w-auto cursor-pointer shadow-books transition-transform duration-500 ease-in-out hover:scale-105"
      />
    </div>
  );
};

export default Book;

Book.propTypes = {
  imageURL: PropTypes.string.isRequired,
  popUpCallBack: PropTypes.func.isRequired,
};
