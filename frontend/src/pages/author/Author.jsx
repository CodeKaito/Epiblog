import React from "react";
import { Container } from "react-bootstrap";
import "./styles.css";
import AuthorList from "../../components/authors/authors-lists/AuthorList";

const Author = () => {
  return (
    <Container>
      <h1 className="author-main-title mb-2">List of authors in this blog!</h1>
      <AuthorList />
    </Container>
  );
};

export default Author;