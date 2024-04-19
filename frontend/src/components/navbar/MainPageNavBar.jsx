import React from "react";
import { Navbar, Container, Image, Button } from "react-bootstrap";
import logo from "../../assets/logo2.png";

import "./styles.css";

const HomeNavBar = () => {
  return (
    <div className="navbar-mainpage-container">
      <Navbar expand="lg" className="sticky-top top-0 me-auto">
        <Container>
          <Navbar.Brand href="/">
            <Image className="blog-navbar-brand" alt="logo" src={logo} />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <div className="me-auto" />
            <div className="btn-group d-flex align-items-center">
              <div className="mx-2">
                <p>Our Story</p>
              </div>
              <div className="mx-2">
                <p>Membership</p>
              </div>
              <div className="mx-2">
                <p>Write</p>
              </div>
              <div className="mx-2">
                <p>Sign in</p>
              </div>
              <div className="mx-2">
                <Button className="getstarted-button">Get Started</Button>
              </div>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default HomeNavBar;
