import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CustomLoader from "../../utils/CustomLoader";
import ProfileDetailsRight from "./AuthorDetailsRight";
import ProfileDetailsLeft from "./AuthorDetailsLeft";
import ProfileNavbar from "../../components/navbar/ProfileNavbar";
import { Col, Container, Row } from "react-bootstrap";

const AuthorDetails = () => {
  const [author, setAuthor] = useState({});
  const [loading, setLoading] = useState(true);
  const params = useParams();
  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const response = await fetch(
          `https://epicode-api.onrender.com/api/authors/${params.id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch author details");
        }
        const data = await response.json();
        setAuthor(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching author:", error);
      }
    };

    fetchAuthor();
  }, [params.id]);

  return (
    <>
      <ProfileNavbar />
      <Container className="page">
        {loading ? (
          <CustomLoader />
        ) : (
          <Row>
            <Col sm={12} lg={8}>
              <ProfileDetailsLeft {...author} />
            </Col>
            <Col lg={4} className="sidebar-container">
              <ProfileDetailsRight {...author} />
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
};

export default AuthorDetails;
