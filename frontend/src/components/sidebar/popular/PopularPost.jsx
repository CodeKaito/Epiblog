import React from "react";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const PopularPost = (props) => {
  const { _id, author, title } = props;
  const { name, avatar } = author;
  return (
    <>
      <Link to={`/details/${_id}`} className="author-link">
        <div className="my-3">
          <div className="d-flex align-items-center">
            <Image
              src={avatar}
              className="rounded-circle object-fit-cover"
              width={30}
              height={30}
            />
            <p className="mx-2 popularpost-name">{name}</p>
          </div>
          <p className="fw-bold">{title}</p>
        </div>
      </Link>
    </>
  );
};

export default PopularPost;
