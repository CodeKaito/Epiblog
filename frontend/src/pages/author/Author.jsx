import React from "react";
import { Container } from "react-bootstrap";
import "./styles.css";
import AuthorList from "../../components/authors/authors-lists/AuthorList";
import HomeNavBar from "../../components/navbar/HomeNavbar";

const Author = () => {
  return (
    <>
      <HomeNavBar />
      <Container className="mt-5">
        <AuthorList />
      </Container>
    </>
  );
};

export default Author;
