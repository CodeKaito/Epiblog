import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./styles.css";
import BlogList from "../../components/blog/blog-list/BlogList";
import PopularPosts from "../../components/sidebar/popular/PopularPosts";
import Topics from "../../components/sidebar/topics/Topics";
import Follows from "../../components/sidebar/follow/Follows";
import SavedPosts from "../../components/sidebar/saved/SavedPosts";

const Home = () => {
  return (
    <Container className="page">
      <Row>
        <Col sm={12} lg={8}>
          <div className="m-5">
            <BlogList />
          </div>
        </Col>
        <Col md={4} className="d-none d-lg-block sidebar-container">
          <div className="m-5">
            <PopularPosts />
            <Topics />
            <Follows />
            <SavedPosts />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
