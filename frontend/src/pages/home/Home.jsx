import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./styles.css";
import BlogList from "../../components/blog/blog-list/BlogList";
import PopularPosts from "../../components/sidebar/popular/PopularPosts";
import Topics from "../../components/sidebar/topics/Topics";
import Follows from "../../components/sidebar/follow/Follows";
import SavedPosts from "../../components/sidebar/saved/SavedPosts";
import HomeNavBar from "../../components/navbar/HomeNavbar";
import WelcomeModal from "../../authentication/welcome/Welcome";
import CustomLoader from "../../utils/CustomLoader";
import { useUser } from "../../context/UserContext";

const Home = () => {
  const { userData } = useUser();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userData) {
      setLoading(false);
    }
  }, [userData]);

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
              {loading ? (
                <CustomLoader />
              ) : (
                <>
                  {userData && (
                    <WelcomeModal
                      show={showModal}
                      onHide={handleModalClose}
                      {...userData}
                    />
                  )}
                </>
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
