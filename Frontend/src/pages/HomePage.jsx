import { Book, BookCategory, BookInfo, Popup } from "../components";
import { useState } from "react";
import bookCategories from "../data/bookCategories";

const HomePage = () => {
  const [popupOpen, setPopupOpen] = useState(false);
  const [bookId, setBookId] = useState("");

  const recentlyPublishedBooks = [
    {
      imageURL: "/bookImage/book1.jpg",
    },
    {
      imageURL: "/bookImage/book1.jpg",
    },
    {
      imageURL: "/bookImage/book1.jpg",
    },
    {
      imageURL: "/bookImage/book1.jpg",
    },
    {
      imageURL: "/bookImage/book1.jpg",
    },
    {
      imageURL: "/bookImage/book1.jpg",
    },
    {
      imageURL: "/bookImage/book1.jpg",
    },
  ];

  const highestRatedBooks = [
    {
      imageURL: "/bookImage/book1.jpg",
    },
    {
      imageURL: "/bookImage/book1.jpg",
    },
    {
      imageURL: "/bookImage/book1.jpg",
    },
    {
      imageURL: "/bookImage/book1.jpg",
    },
    {
      imageURL: "/bookImage/book1.jpg",
    },
    {
      imageURL: "/bookImage/book1.jpg",
    },
    {
      imageURL: "/bookImage/book1.jpg",
    },
  ];

  const showBookDetails = (bookId) => {
    setBookId(bookId);
    setPopupOpen(true);
  };

  return (
    <>
      {popupOpen ? (
        <Popup>
          <BookInfo bookId={bookId} />
        </Popup>
      ) : null}
      <div className="ml-80 p-8">
        <h1 className="mb-6 ml-7 text-xl font-bold">
          Recently Published Books
        </h1>
        <div className="1 grid grid-flow-row place-items-center gap-y-8 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-7">
          {recentlyPublishedBooks.map((book, index) => (
            <Book
              key={index}
              imageURL={book.imageURL}
              bookId={book._id}
              popUpCallBack={showBookDetails}
            />
          ))}
        </div>
        <h1 className="mb-6 ml-7 mt-8 text-xl font-bold">
          Highest Rated Books
        </h1>
        <div className="1 grid grid-flow-row place-items-center gap-y-8 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-7">
          {highestRatedBooks.map((book, index) => (
            <Book
              key={index}
              imageURL={book.imageURL}
              bookId={book._id}
              popUpCallBack={showBookDetails}
            />
          ))}
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
