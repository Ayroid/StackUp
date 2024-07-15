import { Book, BookCategory, Loading, BookInfo, Popup } from "../components";
import { useState, useEffect } from "react";
import bookCategories from "../data/bookCategories";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { serverURL } from "../data/constants";

const CategoryPage = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [popupOpen, setPopupOpen] = useState(false);

  const [categoryBooks, setCategoryBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [bookId, setBookId] = useState("");

  const showBookDetails = (bookId) => {
    setBookId(bookId);
    setPopupOpen(true);
  };

  useEffect(() => {
    setLoading(true);
    const accessToken = localStorage.getItem("accessToken");
    axios
      .get(`${serverURL}/books?category=${path}`, {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((response) => {
        setCategoryBooks(response.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setLoading(false));
  }, [path]);

  const closePopup = () => {
    setPopupOpen(false);
  };

  return (
    <>
      {popupOpen ? (
        <Popup isOpen={popupOpen} onClose={closePopup} container>
          <BookInfo bookId={bookId} />
        </Popup>
      ) : null}
      <div className="ml-80 p-8">
        <h1 className="mb-6 ml-7 text-xl font-bold">
          {path[0].toUpperCase() + path.slice(1)}
        </h1>
        <div className="1 grid grid-flow-row place-items-center gap-y-8 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-7">
          {loading ? (
            <Loading />
          ) : categoryBooks.length === 0 ? (
            <h1 className="min-h-52 text-xl">No Books Found!</h1>
          ) : (
            categoryBooks.map((book, index) => (
              <Book
                key={index}
                imageURL={book.imageURL}
                bookId={book._id}
                popUpCallBack={() => showBookDetails(book._id)}
              />
            ))
          )}
        </div>
        <h1 className="mb-6 ml-7 mt-8 text-xl font-bold">Other Categories</h1>
        <div className="1 grid grid-flow-row place-items-center gap-y-8 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-7">
          {bookCategories.map((category, index) =>
            category !== path ? (
              <BookCategory key={index} categoryName={category} />
            ) : null,
          )}
        </div>
      </div>
    </>
  );
};

export default CategoryPage;
