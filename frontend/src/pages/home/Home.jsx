import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./styles.css";
import BlogList from "../../components/blog/blog-list/BlogList";
import PopularPosts from "../../components/sidebar/popular/PopularPosts";
import Topics from "../../components/sidebar/topics/Topics";
import Follows from "../../components/sidebar/follow/Follows";
import SavedPosts from "../../components/sidebar/saved/SavedPosts";
import HomeNavBar from "../../components/navbar/HomeNavbar";
import WelcomeModal from "../../authentication/welcome/Welcome";
import { useAuth } from "../../context/AuthenticationContext";

const Home = () => {
  const { isAuthenticated, userData, isLoading } = useAuth();
  const [showModal, setShowModal] = useState(true);

  console.log(userData);

  useEffect(() => {
    const hasShownModal = localStorage.getItem("hasShownModal");
    if (hasShownModal === true && isAuthenticated) {
      setShowModal(true);
      localStorage.setItem("hasShownModal", "false");
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
              {isLoading ? (
                <div>Loading...</div>
              ) : (
                <WelcomeModal
                  show={showModal}
                  onHide={handleModalClose}
                  {...userData}
                />
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
