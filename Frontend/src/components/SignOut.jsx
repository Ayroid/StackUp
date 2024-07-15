import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const SignOut = ({ closePopup }) => {
  const navigate = useNavigate();

  const signOut = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    closePopup();
    navigate("/auth");
  };

  return (
    <div>
      <h1 className="text-xl">Sign Out</h1>
      <p>Are you sure you want to sign out?</p>
      <div className="mt-4 flex gap-2">
        <button
          className="w-full rounded-md bg-gray-300 px-4 py-1 text-white"
          onClick={closePopup}
        >
          No
        </button>
        <button
          className="w-full rounded-md bg-red-500 px-4 py-1 text-white"
          onClick={signOut}
        >
          Yes
        </button>
      </div>
    </div>
  );
};

SignOut.propTypes = {
  closePopup: PropTypes.func.isRequired,
};

export default SignOut;
