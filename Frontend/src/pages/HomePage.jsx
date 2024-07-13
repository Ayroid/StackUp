import { Book } from "../components";
import { useState } from "react";

const HomePage = () => {
  const [popupOpen, setPopupOpen] = useState(false);

  const bookData = [
    {
      imageURL:
        "https://www.designforwriters.com/wp-content/uploads/2017/10/design-for-writers-book-cover-tf-2-a-million-to-one.jpg",
    },
    {
      imageURL:
        "https://www.designforwriters.com/wp-content/uploads/2017/10/design-for-writers-book-cover-tf-2-a-million-to-one.jpg",
    },
    {
      imageURL:
        "https://www.designforwriters.com/wp-content/uploads/2017/10/design-for-writers-book-cover-tf-2-a-million-to-one.jpg",
    },
    {
      imageURL:
        "https://www.designforwriters.com/wp-content/uploads/2017/10/design-for-writers-book-cover-tf-2-a-million-to-one.jpg",
    },
    {
      imageURL:
        "https://www.designforwriters.com/wp-content/uploads/2017/10/design-for-writers-book-cover-tf-2-a-million-to-one.jpg",
    },
    {
      imageURL:
        "https://www.designforwriters.com/wp-content/uploads/2017/10/design-for-writers-book-cover-tf-2-a-million-to-one.jpg",
    },
    {
      imageURL:
        "https://www.designforwriters.com/wp-content/uploads/2017/10/design-for-writers-book-cover-tf-2-a-million-to-one.jpg",
    },
    {
      imageURL:
        "https://www.designforwriters.com/wp-content/uploads/2017/10/design-for-writers-book-cover-tf-2-a-million-to-one.jpg",
    },
    {
      imageURL:
        "https://www.designforwriters.com/wp-content/uploads/2017/10/design-for-writers-book-cover-tf-2-a-million-to-one.jpg",
    },
    {
      imageURL:
        "https://www.designforwriters.com/wp-content/uploads/2017/10/design-for-writers-book-cover-tf-2-a-million-to-one.jpg",
    },
    {
      imageURL:
        "https://www.designforwriters.com/wp-content/uploads/2017/10/design-for-writers-book-cover-tf-2-a-million-to-one.jpg",
    },
    {
      imageURL:
        "https://www.designforwriters.com/wp-content/uploads/2017/10/design-for-writers-book-cover-tf-2-a-million-to-one.jpg",
    },
    {
      imageURL:
        "https://www.designforwriters.com/wp-content/uploads/2017/10/design-for-writers-book-cover-tf-2-a-million-to-one.jpg",
    },
    {
      imageURL:
        "https://www.designforwriters.com/wp-content/uploads/2017/10/design-for-writers-book-cover-tf-2-a-million-to-one.jpg",
    },
    {
      imageURL:
        "https://www.designforwriters.com/wp-content/uploads/2017/10/design-for-writers-book-cover-tf-2-a-million-to-one.jpg",
    },
    {
      imageURL:
        "https://www.designforwriters.com/wp-content/uploads/2017/10/design-for-writers-book-cover-tf-2-a-million-to-one.jpg",
    },
    {
      imageURL:
        "https://www.designforwriters.com/wp-content/uploads/2017/10/design-for-writers-book-cover-tf-2-a-million-to-one.jpg",
    },
    {
      imageURL:
        "https://www.designforwriters.com/wp-content/uploads/2017/10/design-for-writers-book-cover-tf-2-a-million-to-one.jpg",
    },
    {
      imageURL:
        "https://www.designforwriters.com/wp-content/uploads/2017/10/design-for-writers-book-cover-tf-2-a-million-to-one.jpg",
    },
    {
      imageURL:
        "https://www.designforwriters.com/wp-content/uploads/2017/10/design-for-writers-book-cover-tf-2-a-million-to-one.jpg",
    },
  ];

  return (
    <div>
      <div className="grid grid-flow-row grid-cols-2 gap-12 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
        {bookData.map((book, index) => (
          <Book
            key={index}
            imageURL={book.imageURL}
            popUpCallBack={() => setPopupOpen(!popupOpen)}
          />
        ))}
      </div>

      <div className={`${popupOpen ? "text-red-500" : "text-blue-500"}`}>
        Popup
      </div>
    </div>
  );
};

export default HomePage;
