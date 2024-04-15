import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./styles.css";
import BlogList from "../../components/blog/blog-list/BlogList";

const Home = () => {
  return (
    <Container className="page">
      <Row>
        <Col md={8}>
          <div className="m-5">
            <BlogList />
          </div>
        </Col>
        <Col md={4} className="sidebar-container">
          <div className="m-5">
            Hello
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
