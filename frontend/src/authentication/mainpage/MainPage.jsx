import React, { useState } from "react";
import MainPageNavBar from "../../components/navbar/MainPageNavBar";
import { Button, Container, Modal } from "react-bootstrap";
import "../styles.css";
import Signup from "../signup/Signup";

const MainPage = () => {
  const [showModal, setShowModal] = useState(false);

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <MainPageNavBar show={handleModalOpen} />
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
                  onClick={handleModalOpen}
                >
                  Start Reading
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </main>
      <Modal show={showModal} onHide={handleModalClose}>
        <Signup />
      </Modal>
    </>
  );
};

export default MainPage;
