import React from "react";
import MainPageNavBar from "../../components/navbar/MainPageNavBar";
import { Button, Container } from "react-bootstrap";
import "../styles.css";

const MainPage = () => {
  return (
    <>
      <MainPageNavBar />
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
                <Button className="start-reading-button">Start Reading</Button>
              </div>
            </div>
          </div>
        </Container>
      </main>
    </>
  );
};

export default MainPage;
