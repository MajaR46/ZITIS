import React from "react";
import "./CancelButton.css";

const CancelButton = ({ onClick, text }) => {
  return (
    <button type="button" className="cancel-button" onClick={onClick}>
      {text}
    </button>
  );
};

export default CancelButton;
