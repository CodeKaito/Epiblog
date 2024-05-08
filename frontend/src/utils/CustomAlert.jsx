import React from "react";
import "./styles.css";
import { Button } from "react-bootstrap";

const CustomAlert = ({ type, message, onClose }) => {
  return (
    <div className="modal-overlay d-flex justify-content-center align-items-center">
      <div className={`alert alert-${type}`} role="alert">
        <div className="d-flex">
          <Button
            onClick={onClose}
            className={`btn-close me-2 btn-${type}`}
            aria-label="Close"
          ></Button>{" "}
          <div>{message}</div>
        </div>
      </div>
    </div>
  );
};

export default CustomAlert;
