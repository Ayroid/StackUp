import { Book, BookCategory, BookInfo, Loading, Popup } from "../components";
import { useEffect, useState } from "react";
import bookCategories from "../data/bookCategories";
import axios from "axios";
import { serverURL } from "../data/constants";

const HomePage = () => {
  const [popupOpen, setPopupOpen] = useState(false);
  const [bookId, setBookId] = useState("");

  const [recentlyPublishedBooks, setRecentlyPublishedBooks] = useState([]);
  const [loadingRecentlyPublishedBooks, setLoadingRecentlyPublishedBooks] =
    useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    axios
      .get(`${serverURL}/books/recent`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setRecentlyPublishedBooks(response.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setLoadingRecentlyPublishedBooks(false));
  }, []);

  const [highestRatedBooks, setHighestRatedBooks] = useState([]);
  const [loadingHighestRatedBooks, setLoadingHighestRatedBooks] =
    useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setLoadingHighestRatedBooks(true);
    axios
      .get(`${serverURL}/books/highestRated`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setHighestRatedBooks(response.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setLoadingHighestRatedBooks(false));
  }, []);

  const showBookDetails = (bookId) => {
    setBookId(bookId);
    setPopupOpen(true);
  };

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
          Recently Published Books
        </h1>
        <div className="1 grid grid-flow-row place-items-center gap-y-8 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-7">
          {loadingRecentlyPublishedBooks ? (
            <Loading />
          ) : (
            recentlyPublishedBooks.map((book, index) => (
              <Book
                key={index}
                imageURL={book.imageURL}
                bookId={book._id}
                popUpCallBack={() => showBookDetails(book._id)}
              />
            ))
          )}
        </div>
        <h1 className="mb-6 ml-7 mt-8 text-xl font-bold">
          Highest Rated Books
        </h1>
        <div className="1 grid grid-flow-row place-items-center gap-y-8 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-7">
          {loadingHighestRatedBooks ? (
            <Loading />
          ) : (
            highestRatedBooks?.map((book, index) => (
              <Book
                key={index}
                imageURL={book.imageURL}
                bookId={book._id}
                popUpCallBack={() => showBookDetails(book._id)}
              />
            ))
          )}
        </div>
        <h1 className="mb-6 ml-7 mt-8 text-xl font-bold">Book Categories</h1>
        <div className="1 grid grid-flow-row place-items-center gap-y-8 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-7">
          {bookCategories.map((category, index) => (
            <BookCategory key={index} categoryName={category} />
          ))}
        </div>
      </div>
    </>
  );
};

export default HomePage;
