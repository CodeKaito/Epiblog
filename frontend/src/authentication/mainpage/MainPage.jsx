import React, { useState } from "react";
import MainPageNavBar from "../../components/navbar/MainPageNavBar";
import { Button, Container, Modal } from "react-bootstrap";
import "../styles.css";
import Signup from "../signup/Signup";
import Login from "../login/Login";

const MainPage = () => {
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleSignupModalToggle = () => {
    setShowSignupModal(!showSignupModal);
    setShowLoginModal(false);
  };

  const handleLoginModalToggle = () => {
    setShowLoginModal(!showLoginModal);
    setShowSignupModal(false);
  };

  return (
    <>
      <MainPageNavBar
        showSignupModal={handleSignupModalToggle}
        showLoginModal={handleLoginModalToggle}
      />
      <main>
        <Container className="main-container">
          <div className="d-flex flex-column align-items-start justify-content-center h-100">
            <h1 className="main-title">Stay curious.</h1>
            <div className="mt-3">
              <p className="main-paragraph">
                Discover stories, thinking, and expertise from writers on any
                topic.
              </p>
              <div className="mt-5">
                <Button
                  className="start-reading-button"
                  onClick={handleSignupModalToggle}
                >
                  Start Reading
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </main>
      <Modal show={showSignupModal} onHide={handleSignupModalToggle}>
        <Signup showLoginModal={handleLoginModalToggle} />
      </Modal>
      <Modal show={showLoginModal} onHide={handleLoginModalToggle}>
        <Login showSignupModal={handleSignupModalToggle} />
      </Modal>
    </>
  );
};

export default MainPage;
