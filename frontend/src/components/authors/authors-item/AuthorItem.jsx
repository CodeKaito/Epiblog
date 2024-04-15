import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./styles.css";
import AuthorCard from "../author-card/AuthorCard";

const AuthorItem = ({ _id, name, surname, email, birth, avatar }) => {
  return (
    <Link to={`/details/${_id}`} className="author-link">
      <Card className="author-card">
        <Card.Img variant="top" src={avatar} className="author-cover" />
        <Card.Body>
          <Card.Title>{name} {surname}</Card.Title>
        </Card.Body>
        <Card.Footer>
          <AuthorCard avatar={avatar} name={name} surname={surname} email={email} birth={birth} />
        </Card.Footer>
      </Card>
    </Link>
  );
};

export default AuthorItem;
