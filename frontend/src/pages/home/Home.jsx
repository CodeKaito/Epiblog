import React from "react";
import { Container } from "react-bootstrap";
import BlogList from "../../components/blog/blog-list/BlogList";
import "./styles.css";

const Home = props => {
  return (
    <Container>
      <h1 className="blog-main-title mb-2">Welcome to the blog!</h1>
      <BlogList />
    </Container>
  );
};

export default Home;
