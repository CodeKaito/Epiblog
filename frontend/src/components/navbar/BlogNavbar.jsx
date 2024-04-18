import React from "react";
import { Form, Nav, Navbar, Dropdown, Container } from "react-bootstrap";
import { RxPerson } from "react-icons/rx";
import { MdOutlineBookmarks } from "react-icons/md";
import { BsPeople } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo2.png";
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
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/posts?query=${searchQuery}`);
    }
  };

  const hideEmail = (email) => {
    const atIndex = email.indexOf("@");
    const firstChar = email.charAt(0);
    const domain = email.substring(atIndex);
    const hiddenUsername =
      firstChar + "*".repeat(atIndex - 2) + email.charAt(atIndex - 1);

    const hiddenEmail = hiddenUsername + domain;

    return hiddenEmail;
  };

  const userEmail = process.env.REACT_APP_USER_LOGGED_IN_EMAIL;
  const hiddenEmail = hideEmail(userEmail);

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
              <Form
                className="d-flex mt-3 mt-lg-0"
                onSubmit={handleSearchSubmit}
              >
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
            <Link
              className="d-flex align-items-center pointer write"
              to="/new-blog"
            >
              <PiNotePencilThin className="PiNotePencilThin fs-4 mx-1" /> Write
            </Link>
            <TfiBell className="mx-0 my-2 my-lg-0 fs-5 mx-lg-3 TfiBell pointer" />
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
                  <div className="my-4">
                    <Container>
                      <div className="mx-2">
                        <Link to="/profile">
                          <div className="d-flex align-items-center pointer font-weight">
                            <RxPerson className="fs-5" />
                            <p className="ms-3">Profile</p>
                          </div>
                        </Link>
                        <Link to="/authors">
                          <div className="mt-3 d-flex align-items-center pointer font-weight">
                            <BsPeople className="fs-5" />
                            <p className="ms-3">Authors</p>
                          </div>
                        </Link>
                        <Link to="/posts">
                          <div className="mt-3 d-flex align-items-center pointer font-weight">
                            <MdOutlineBookmarks className="fs-5" />
                            <p className="ms-3">Library</p>
                          </div>
                        </Link>
                      </div>
                    </Container>
                    <hr />
                    <Container>
                      <Link to="/signout">
                        <div className="mx-2 sign-out">
                          <p className="pointer">Sign Out</p>
                          <p className="userEmail mt-1">{hiddenEmail}</p>
                        </div>
                      </Link>
                    </Container>
                  </div>
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
