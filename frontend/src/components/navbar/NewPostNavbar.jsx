import React from "react";
import { Nav, Navbar, Dropdown, Container, Image } from "react-bootstrap";
import { RxPerson } from "react-icons/rx";
import { MdOutlineBookmarks } from "react-icons/md";
import { BsPeople } from "react-icons/bs";
import { Link } from "react-router-dom";
import logo from "../../assets/logo2.png";
import { useAuth } from "../../context/AuthenticationContext";
import { useUser } from "../../context/UserContext";

import "./styles.css";
import User from "../user/User";
import { SearchQueryProvider } from "../../context/SearchQueryContext";

const HomeNavBar = () => {
  const { logout } = useAuth();
  const { userData } = useUser();
  const userLoggedIn = userData ? userData.username : "";
  const userEmail = userData ? userData.email : "";
  const hiddenEmail = userEmail;

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="navbar-container">
      <SearchQueryProvider>
        <Navbar expand="lg" className="sticky-top top-0 me-auto">
          <Container>
            <div className="d-flex align-items-center">
              <Navbar.Brand href="/">
                <Image
                  className="blog-navbar-brand ms-3"
                  alt="logo"
                  src={logo}
                />
              </Navbar.Brand>
              <span>Draft in {userLoggedIn}</span>
            </div>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto"></Nav>
              <div className="d-flex btn-group justify-content-end">
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
                        <div onClick={handleLogout}>
                          <div className="mx-2 sign-out">
                            <p className="pointer">Sign Out</p>
                            <p className="userEmail mt-1">{hiddenEmail}</p>
                          </div>
                        </div>
                      </Container>
                    </div>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </SearchQueryProvider>
    </div>
  );
};

export default HomeNavBar;
