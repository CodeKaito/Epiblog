import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import ProfileNavbar from "../../components/navbar/ProfileNavbar";
import ProfileRight from "../../components/profile/profile-right/ProfileRight";
import ProfileLeft from "../../components/profile/profile-left/ProfileLeft";
import { useAuth } from "../../context/AuthenticationContext";
import CustomLoader from "../../utils/CustomLoader";

const Profile = () => {
  const { userData, isLoading } = useAuth();

  return (
    <>
      <ProfileNavbar />
      <Container className="page">
        {isLoading ? (
          <CustomLoader />
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
