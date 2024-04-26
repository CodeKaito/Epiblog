import React from "react";
import { Button, Form, Image } from "react-bootstrap";
import { useAuth } from "../../../context/AuthenticationContext";
import "../styles.css";
import CommentList from "../comment-list/CommentList";

const CommentArea = () => {
  const { userData } = useAuth();

  return (
    <div className="commentarea-container">
      <div>
        <h1 className="commentarea-title">Comments(0)</h1>
      </div>
      <div className="newcomment-area my-5">
        <div className="d-flex p-3">
          <Image
            src={userData.avatar}
            alt={userData.name}
            width={30}
            className="me-3 rounded-circle"
          />
          <p>
            {userData.name} {userData.surname}
          </p>
        </div>
        <div>
          <Form>
            <Form.Control
              as="textarea"
              placeholder="What's your thoughts?"
              rows={2}
              cols={50}
              className="biography-edit"
            />
          </Form>
        </div>
        <div className="d-flex justify-content-end align-items-center p-3">
          <div className="mx-3 comment-area-cancel-button pointer">Cancel</div>
          <Button className="comment-area-add-button">Add</Button>
        </div>
      </div>
      <hr />
      <div className="my-5">
        <CommentList />
      </div>
    </div>
  );
};

export default CommentArea;
