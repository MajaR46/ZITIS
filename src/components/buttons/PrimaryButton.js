import React from "react";
import "./PrimaryButton.css";

const PrimaryButton = ({ onClick, text }) => {
  return (
    <button type="submit" className="primary-button" onClick={onClick}>
      {text}
    </button>
  );
};

export default PrimaryButton;
