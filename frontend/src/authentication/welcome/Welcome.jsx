import React from "react";
import { Modal } from "react-bootstrap";

const WelcomeModal = ({ show, onHide, name, surname }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          Welcome back, {name} {surname}!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>You have successfully logged in. Enjoy your stay!</Modal.Body>
    </Modal>
  );
};

export default WelcomeModal;
