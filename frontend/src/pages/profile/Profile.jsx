import React from "react";
import { Container, Col, Row, Spinner } from "react-bootstrap";
import ProfileNavbar from "../../components/navbar/ProfileNavbar";
import ProfileRight from "../../components/profile/profile-right/ProfileRight";
import ProfileLeft from "../../components/profile/profile-left/ProfileLeft";
import { useAuth } from "../../context/AuthenticationContext";

const Profile = () => {
  const { userData, isLoading } = useAuth();

  console.log(userData);

  return (
    <>
      <ProfileNavbar />
      <Container className="page">
        {isLoading ? (
          <div className="loader-overlay">
            <Spinner animation="border" role="status" className="loader" />
          </div>
        ) : (
          <Row>
            <Col sm={12} lg={8}>
              <ProfileLeft />
            </Col>
            <Col md={4} className="d-none d-lg-block sidebar-container">
              <ProfileRight {...userData} />{" "}
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
};

export default Profile;
