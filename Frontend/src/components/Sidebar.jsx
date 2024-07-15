import { FaUser } from "react-icons/fa";
import { Popup, SignOut, AddBook, Loading } from "./index";
import { useState, useEffect } from "react";
import { serverURL } from "../data/constants";
import axios from "axios";

const Sidebar = () => {
  const username = localStorage.getItem("username");
  const [showLogOutPopup, setShowLogOutPopup] = useState(false);
  const [showAddBookPopup, setShowAddBookPopup] = useState(false);
  const [userBooks, setUserBooks] = useState(null);
  const [bookLoading, setBookLoading] = useState(false);

  const openSignOutPopup = () => {
    setShowLogOutPopup(true);
  };

  const closeSignOutPopup = () => {
    setShowLogOutPopup(false);
  };

  const openAddBookPopup = () => {
    setShowAddBookPopup(true);
  };

  const closeAddBookPopup = () => {
    setShowAddBookPopup(false);
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    setBookLoading(true);

    axios
      .get(`${serverURL}/user/books`, {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((response) => {
        setUserBooks(response.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setBookLoading(false));
  }, []);

  return (
    <>
      {showLogOutPopup && (
        <Popup isOpen={showLogOutPopup} onClose={closeSignOutPopup} container>
          {<SignOut closePopup={closeSignOutPopup} />}
        </Popup>
      )}

      {showAddBookPopup && (
        <Popup isOpen={showAddBookPopup} onClose={closeAddBookPopup} container>
          {<AddBook closePopup={closeAddBookPopup} />}
        </Popup>
      )}

      <div className="flex h-full flex-col justify-between bg-accentLight text-white">
        <div className="flex flex-col">
          <div className="flex h-24 items-center gap-5 border-l-4 border-blue-500 bg-accent p-5">
            <FaUser size="40" color="gray" />
            <h1 className="text-lg font-extrabold text-white">
              Welcome! <br />{" "}
              <span className="font-medium text-blue-500">{username}</span>
            </h1>
          </div>
          <h1 className="px-5 py-3 text-xl font-bold">Your Books</h1>

          <ul className="max-h-[65dvh] list-inside list-disc overflow-auto px-5 text-blue-500">
            {bookLoading ? (
              <Loading color={"white"} height={5} top={-10} />
            ) : (
              userBooks?.map((book, index) => (
                <li key={index} className="py-1 pl-4">
                  <span className="text-white">{book}</span>
                </li>
              ))
            )}
          </ul>
        </div>
        <div>
          <h1
            className="w-full cursor-pointer border-l-4 border-blue-500 bg-accent py-5 text-center font-semibold"
            onClick={() => {
              openAddBookPopup();
            }}
          >
            Add Book
          </h1>
          <h1
            className="w-full cursor-pointer border-l-4 border-red-500 bg-accent py-5 text-center font-semibold text-red-500"
            onClick={() => {
              openSignOutPopup();
            }}
          >
            Sign Out
          </h1>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
