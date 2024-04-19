import React, { useState, useEffect } from "react";
import { Container, Col, Row, Spinner } from "react-bootstrap";
import ProfileNavbar from "../../components/navbar/ProfileNavbar";
import ProfileRight from "../../components/profile/profile-right/ProfileRight";
import ProfileLeft from "../../components/profile/profile-left/ProfileLeft";

const Profile = () => {
  const [authorData, setAuthorData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Recupera l'ID dall'ambiente React
    const userLoggedInId = process.env.REACT_APP_USER_LOGGED_IN_ID;
    // URL dell'API
    const apiUrl = `https://epicode-api.onrender.com/api/authors/${userLoggedInId}`;

    // Effettua la richiesta GET
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Errore nella richiesta");
        }
        const data = await response.json();
        setAuthorData(data);
      } catch (error) {
        console.error("Si è verificato un errore:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <ProfileNavbar />
      <Container className="page">
        {loading ? (
          <div className="loader-overlay">
            <Spinner animation="border" role="status" className="loader" />
          </div>
        ) : (
          <Row>
            <Col sm={12} lg={8}>
              <ProfileLeft />
            </Col>
            <Col md={4} className="d-none d-lg-block sidebar-container">
              <ProfileRight {...authorData} />
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
};

export default Profile;
