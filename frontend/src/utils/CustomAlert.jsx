import React from "react";
import "./styles.css";

const CustomAlert = ({ type, message }) => {
  return (
    <div className="modal-overlay d-flex justify-content-center align-items-center">
      <div className={`alert alert-${type}`} role="alert">
        {message}
      </div>
    </div>
  );
};

export default CustomAlert;
