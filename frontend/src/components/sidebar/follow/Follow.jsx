import React from "react";
import { Button, Image } from "react-bootstrap";
import "../styles.css";
import { Link } from "react-router-dom";

const Follow = (props) => {
  const { _id, name, surname, avatar } = props;
  return (
    <>
      <Link to={`/author/details/${_id}`} className="author-link">
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
      </Link>
    </>
  );
};

export default Follow;
