import PropTypes from "prop-types";
import { FaUser } from "react-icons/fa";

const Sidebar = ({ username, userBooks }) => {
  return (
    <div className="bg-accentLight flex h-full flex-col justify-between text-white">
      <div className="flex flex-col">
        <div className="bg-accent flex h-24 items-center gap-5 border-l-4 border-blue-500 p-5">
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
        <h1 className="bg-accent w-full cursor-pointer border-l-4 border-blue-500 py-5 text-center font-semibold">
          Add Book
        </h1>
        <h1 className="bg-accent w-full cursor-pointer border-l-4 border-red-500 py-5 text-center font-semibold text-red-500">
          Sign Out
        </h1>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  username: PropTypes.string.isRequired,
  userBooks: PropTypes.array.isRequired,
};

export default Sidebar;
