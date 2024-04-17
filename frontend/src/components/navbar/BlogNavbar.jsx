import React from "react";
import { Form, Nav, Navbar, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { PiNotePencilThin } from "react-icons/pi";
import { TfiBell } from "react-icons/tfi";
import "./styles.css";
import User from "../user/User";
import {
  SearchQueryProvider,
  useSearchQuery,
} from "../../context/SearchQueryContext";

const NavBar = () => {
  const { searchQuery, setSearchQuery } = useSearchQuery();

  return (
    <div className="navbar-container">
      <SearchQueryProvider>
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
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </Form>
            </Nav>
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/authors">Authors</Nav.Link>
              <Nav.Link href="/posts">Posts</Nav.Link>
            </Nav>
            <Link
              className="d-flex align-items-center pointer write"
              to="/new-blog"
            >
              <PiNotePencilThin className="PiNotePencilThin mx-1" /> Write
            </Link>
            <TfiBell className="mx-0 my-2 my-lg-0 mx-lg-3 TfiBell pointer" />
            <div className="btn-group">
              <Dropdown align="end">
                <Dropdown.Toggle
                  className="dropdown-toggle"
                  variant="light"
                  id="dropdown-basic"
                >
                  <User />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <div className="d-flex align-items-center px-2">
                    <User />
                    <div className="mx-2">
                      <span className="pointer">Jerome Decinco</span>
                      <br />
                    </div>
                  </div>
                  <hr />
                  <div className="mx-2">
                    <Link to="/profile">
                      <div className="d-flex pointer">
                        <p className="ms-3">Profile</p>
                      </div>
                    </Link>
                  </div>
                  <hr />
                  <Link to="/login">
                    <div className="d-flex mx-2">
                      <p className="ms-3 pointer">Sign Out</p>
                    </div>
                  </Link>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Navbar.Collapse>
        </Navbar>
      </SearchQueryProvider>
    </div>
  );
};

export default NavBar;
