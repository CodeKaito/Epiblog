import React, { useState, useEffect } from "react";
import CommentSingle from "../comment-single/CommentSingle";
import { useCommentContext } from "../../../context/CommentContext";

const CommentList = (props) => {
  const { postId } = props;
  const [comments, setComments] = useState([]);
  const { comments: contextComments } = useCommentContext();
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(
          `https://epicode-api.onrender.com/api/blogPosts/${postId}/comments`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch comments");
        }
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [postId, contextComments]);

  return (
    <div className="comment-list-container">
      {comments
        .slice()
        .reverse()
        .map((comment) => (
          <CommentSingle
            key={comment._id}
            postId={postId}
            commentId={comment._id}
            setComments={setComments}
            {...comment}
          />
        ))}
    </div>
  );
};

export default CommentList;
