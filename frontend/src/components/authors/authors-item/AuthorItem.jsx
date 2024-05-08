import React from "react";
import { Button, Card, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./styles.css";

const AuthorItem = ({ _id, name, surname, email, avatar }) => {
  return (
    <Link to={`/author/details/${_id}`} className="author-link">
      <Card className="card-author">
        <div className="image-background mb-5">
          <div className="mt-3 d-flex justify-content-center">
            <Image
              src={avatar}
              alt={name}
              width={100}
              height={100}
              className="rounded-circle object-fit-cover d-flex justify-content-center"
            />
          </div>
        </div>

        <div className="d-flex justify-content-center">
          <p className="fw-bold mt-1">
            {name} {surname}
          </p>
        </div>
        <div className="d-flex justify-content-center">
          <p className="card-email mt-1">{email}</p>
        </div>
        <div className="d-flex justify-content-center my-3">
          <Button className="card-button">Connect</Button>
        </div>
      </Card>
    </Link>
  );
};

export default AuthorItem;
