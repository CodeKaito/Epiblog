import React from "react";
import { Container } from "react-bootstrap";

const Footer = (props) => {
  return (
    <footer
      style={{
        paddingTop: 40,
        paddingBottom: 40,
      }}
    >
      <Container>{`${new Date().getFullYear()} - © Epiblog | Developed by CodeKaito`}</Container>
    </footer>
  );
};

export default Footer;
