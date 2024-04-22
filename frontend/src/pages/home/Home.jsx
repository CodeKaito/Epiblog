import React, { useState, useEffect } from "react";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import "./styles.css";
import BlogList from "../../components/blog/blog-list/BlogList";
import PopularPosts from "../../components/sidebar/popular/PopularPosts";
import Topics from "../../components/sidebar/topics/Topics";
import Follows from "../../components/sidebar/follow/Follows";
import SavedPosts from "../../components/sidebar/saved/SavedPosts";
import HomeNavBar from "../../components/navbar/HomeNavbar";
import { useAuth } from "../../context/AuthenticationContext.js";

const Home = () => {
  const { isAuthenticated, userData } = useAuth();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      setShowModal(true);
    }
  }, [isAuthenticated]);
  const handleModalClose = () => setShowModal(false);

  return (
    <>
      <HomeNavBar />
      <Container className="page">
        <Row>
          <Col sm={12} lg={8}>
            <div className="m-5 main">
              <BlogList />
            </div>
          </Col>
          <Col md={4} className="d-none d-lg-block sidebar-container sidebar">
            <div className="m-5">
              {isAuthenticated && (
                <Modal show={showModal} onHide={handleModalClose} centered>
                  <Modal.Header closeButton>
                    <Modal.Title>
                      Welcome back, {userData.name} {userData.surname}!
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    You have successfully logged in. Enjoy your stay!
                  </Modal.Body>
                </Modal>
              )}
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

export default Home;
