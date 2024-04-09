import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import BlogAuthor from "../blog-author/BlogAuthor";
import "./styles.css";

const BlogItem = ({ _id, name, surname, email, birth, avatar }) => {
  return (
    <Link to={`/details/${_id}`} className="blog-link">
      <Card className="blog-card">
        <Card.Img variant="top" src={avatar} className="blog-cover" />
        <Card.Body>
          <Card.Title>{name} {surname}</Card.Title>
        </Card.Body>
        <Card.Footer>
          <BlogAuthor avatar={avatar} name={name} surname={surname} email={email} birth={birth} />
        </Card.Footer>
      </Card>
    </Link>
  );
};

export default BlogItem;
