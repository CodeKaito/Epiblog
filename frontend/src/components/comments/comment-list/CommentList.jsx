import React from "react";
import CommentSingle from "../comment-single/CommentSingle";

const CommentList = () => {
  return (
    <div className="comment-list-container">
      <CommentSingle />
      <CommentSingle />
      <CommentSingle />
      <CommentSingle />
    </div>
  );
};

export default CommentList;
