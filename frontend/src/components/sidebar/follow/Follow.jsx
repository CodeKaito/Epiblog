import React from "react";
import { Button, Image } from "react-bootstrap";
import "../styles.css";

const Follow = (props) => {
  const { name, surname, avatar } = props;
  return (
    <div className="d-flex justify-content-between mt-3">
      <div className="d-flex">
        <Image
          src={avatar}
          className="follow-image me-2 rounded-circle object-fit-cover"
        />
        <div>
          <p className="fw-bolder">
            {name} {surname}
          </p>
        </div>
      </div>
      <div>
        <Button className="follow-button">Follow</Button>
      </div>
    </div>
  );
};

export default Follow;
