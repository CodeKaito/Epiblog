import React from "react";
import { Col, Image, Row } from "react-bootstrap";
import "./styles.css";

const AuthorCard = props => {
  const { name, surname, email, avatar } = props;
  return (
    <Row>
      <Col xs={"auto"} className="pe-0">
        <div className="author-card-img">
          <Image src={avatar} roundedCircle />
        </div>
        
      </Col>
      <Col>
        <h6>{name} {surname}</h6>
        <p>{email}</p>
      </Col>
    </Row>
  );
};

export default AuthorCard;
