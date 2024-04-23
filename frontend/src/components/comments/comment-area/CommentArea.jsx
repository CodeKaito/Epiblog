import React from "react";
import { Button, Form, Image } from "react-bootstrap";
import { useAuth } from "../../../context/AuthenticationContext";
import "../styles.css";

const CommentArea = () => {
  const { userData } = useAuth();

  return (
    <>
      <div>
        <h1 className="commentarea-title">Comments(0)</h1>
      </div>
      <div className="newcomment-area mt-4">
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
          <div className="mx-3 comment-area-cancel-button">Cancel</div>
          <Button className="comment-area-add-button">Add</Button>
        </div>
      </div>
    </>
  );
};

export default CommentArea;
