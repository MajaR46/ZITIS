import React from "react";
import "./SaveButton.css";

const SaveButton = ({ onClick, text }) => {
  return (
    <button type="submit" className="save-button" onClick={onClick}>
      {text}
    </button>
  );
};

export default SaveButton;
