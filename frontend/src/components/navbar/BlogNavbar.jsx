import React from "react";
import { Form, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { PiNotePencilThin } from "react-icons/pi";
import "./styles.css";
import User from "../user/User";

const NavBar = () => {
  return (
    <div className="navbar-container">
      <Navbar expand="lg" className="sticky-top top-0">
        <Navbar.Brand href="/">
          <img className="blog-navbar-brand" alt="logo" src={logo} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <Form className="d-flex mt-3 mt-lg-0">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2 form-control-navbar"
              aria-label="Search"
            />
          </Form>
            
          </Nav>
          <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/authors">Authors</Nav.Link>
            <Nav.Link href="/posts">Posts</Nav.Link>
          </Nav>
          <Link className="d-flex align-items-center pointer write" to="/new">
            <PiNotePencilThin className="PiNotePencilThin mx-1" /> Write  
          </Link>
          <div className="mt-2 mt-lg-0 ms-lg-5 me-2">
            <User />
          </div>
          
        </Navbar.Collapse>
    </Navbar>
    </div>
    
  );
}

  

export default NavBar;
