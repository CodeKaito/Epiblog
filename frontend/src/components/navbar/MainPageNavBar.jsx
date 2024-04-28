import React from "react";
import { Navbar, Container, Image, Button } from "react-bootstrap";
import logo from "../../assets/logo2.png";

import "./styles.css";

const HomeNavBar = ({ showSignupModal, showLoginModal }) => {
  return (
    <div className="navbar-mainpage-container">
      <Navbar expand="lg" className="sticky-top top-0 me-auto">
        <Container>
          <Navbar.Brand href="/">
            <Image className="blog-navbar-brand ms-3" alt="logo" src={logo} />
          </Navbar.Brand>

          <div className="me-auto" />
          <div className="btn-group d-flex align-items-center">
            <div className="d-none d-md-block mx-2">
              <p>Our Story</p>
            </div>
            <div className="d-none d-md-block mx-2">
              <p>Membership</p>
            </div>
            <div className="d-none d-md-block mx-2">
              <p>Write</p>
            </div>
            <div className="mx-2 pointer" onClick={showLoginModal}>
              <p>Sign in</p>
            </div>
            <div className="mx-2">
              <Button className="getstarted-button" onClick={showSignupModal}>
                Get Started
              </Button>
            </div>
          </div>
        </Container>
      </Navbar>
    </div>
  );
};

export default HomeNavBar;
