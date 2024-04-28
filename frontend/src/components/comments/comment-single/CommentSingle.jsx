import React from "react";
import { Image } from "react-bootstrap";

const CommentSingle = ({ author, createdAt, content }) => {
  const { name, surname, avatar } = author;

  const createdDate = new Date(createdAt);

  const formattedCreatedAt = `${createdDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })} - ${createdDate.toLocaleDateString("it-IT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })}`;

  return (
    <div className="comment-single-container mb-4">
      <div className="d-flex">
        <div className=" d-flex align-items-center">
          <Image
            src={avatar}
            width={30}
            height={30}
            className="rounded-circle object-fit-cover me-3"
          />
        </div>

        <div className="d-flex flex-column">
          <span className="comment-author">
            {name} {surname}
          </span>
          <span className="comment-createdat">{formattedCreatedAt}</span>
        </div>
      </div>
      <div className="mt-2">
        <p className="comment-content">{content}</p>
      </div>
    </div>
  );
};

export default CommentSingle;
