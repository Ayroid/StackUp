import "./Loading.css";
import PropTypes from "prop-types";

const Loading = ({ color, height, top }) => {
  return (
    <div
      className={`lds-ellipsis`}
      style={{
        color,
        top: `${top}px`,
      }}
    >
      <div style={{ height: `${height}px`, width: `${height}px` }}></div>
      <div style={{ height: `${height}px`, width: `${height}px` }}></div>
      <div style={{ height: `${height}px`, width: `${height}px` }}></div>
      <div style={{ height: `${height}px`, width: `${height}px` }}></div>
    </div>
  );
};

Loading.propTypes = {
  color: PropTypes.string,
  height: PropTypes.number,
  top: PropTypes.number,
};

export default Loading;
