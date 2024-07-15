import PropTypes from "prop-types";
import { FaUser } from "react-icons/fa";
import { Popup, SignOut, AddBook } from "./index";
import { useState } from "react";

const Sidebar = ({ username, userBooks }) => {
  const [showLogOutPopup, setShowLogOutPopup] = useState(false);
  const [showAddBookPopup, setShowAddBookPopup] = useState(false);

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
            {userBooks.map((book, index) => (
              <li key={index} className="py-1 pl-4">
                <span className="text-white">{book}</span>
              </li>
            ))}
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

Sidebar.propTypes = {
  username: PropTypes.string.isRequired,
  userBooks: PropTypes.array.isRequired,
};

export default Sidebar;
