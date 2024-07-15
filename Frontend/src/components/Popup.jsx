import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import "./Popup.css";

const Popup = ({ children, isOpen, onClose }) => {
  const [show, setShow] = useState(isOpen);

  useEffect(() => {
    setShow(isOpen);
  }, [isOpen]);

  return (
    <div
      className={`fixed flex h-screen w-screen items-center justify-center bg-[#2020208a]`}
      onClick={onClose}
    >
      <div
        className={`popup-content rounded-lg bg-white p-4 ${
          show ? "fade-in" : "fade-out"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

Popup.propTypes = {
  children: PropTypes.node,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Popup;
