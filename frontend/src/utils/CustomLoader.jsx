import React from "react";
import { Spinner } from "react-bootstrap";
import "./styles.css";

const CustomLoader = () => {
  return (
    <div className="loader-overlay">
      <Spinner animation="border" role="status" className="loader" />
    </div>
  );
};

export default CustomLoader;
