import React from "react";
import { Container } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import CommentArea from "../comments/comment-area/CommentArea";
import "./styles.css";

const Sidebar = ({ isVisible, handleClose }) => {
  return (
    <div
      className="sidebar-comments"
      style={{ visibility: isVisible ? "visible" : "hidden" }}
    >
      <Container>
        <div>
          <div className="close-btn p-3" onClick={handleClose}>
            <FaTimes className="fatimes pointer" />
          </div>

          <div className="d-flex p-2">
            <div className="p-3">
              <CommentArea />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Sidebar;
