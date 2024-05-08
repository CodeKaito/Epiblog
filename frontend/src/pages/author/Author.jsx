import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./styles.css";
import AuthorList from "../../components/authors/authors-lists/AuthorList";
import HomeNavBar from "../../components/navbar/HomeNavbar";
import PopularPosts from "../../components/sidebar/popular/PopularPosts";
import Topics from "../../components/sidebar/topics/Topics";
import Follows from "../../components/sidebar/follow/Follows";
import SavedPosts from "../../components/sidebar/saved/SavedPosts";

const Author = () => {
  return (
    <>
      <HomeNavBar />
      <Container className="page">
        <Row>
          <Col sm={12} lg={8}>
            <div className="m-5 main">
              <AuthorList />
            </div>
          </Col>
          <Col lg={4} className="d-none d-lg-block sidebar-container sidebar">
            <div className="m-5">
              <PopularPosts />
              <Topics />
              <Follows />
              <SavedPosts />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Author;
