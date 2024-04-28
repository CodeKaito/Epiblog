import React, { useState } from "react";
import { Button, Form, Image } from "react-bootstrap";
import { useAuth } from "../../../context/AuthenticationContext";
import { useCommentContext } from "../../../context/CommentContext";
import "../styles.css";

const CommentArea = (props) => {
  const { userData } = useAuth();
  const { addComment } = useCommentContext();
  const [commentContent, setCommentContent] = useState("");
  const { postId } = props;

  const handleAddComment = async () => {
    try {
      const newComment = {
        postId: postId,
        author: userData._id,
        content: commentContent,
      };

      const response = await fetch(
        `http://localhost:5000/api/blogPosts/${postId}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newComment),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add comment");
      }
      console.log("Comment added successfully");

      addComment(newComment);

      setCommentContent("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

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
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
            />
          </Form>
        </div>
        <div className="d-flex justify-content-end align-items-center p-3">
          <div className="mx-3 comment-area-cancel-button pointer">Cancel</div>
          <Button
            className="comment-area-add-button"
            onClick={handleAddComment}
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommentArea;
