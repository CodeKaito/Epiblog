import React from "react";
import { Container } from "react-bootstrap";
import "./styles.css";

const Footer = () => {
  return (
    <footer
      style={{
        paddingTop: 40,
        paddingBottom: 40,
      }}
    >
      <Container>
        <p className="footer">
          {`${new Date().getFullYear()} - © Epiblog | Developed by CodeKaito`}
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
