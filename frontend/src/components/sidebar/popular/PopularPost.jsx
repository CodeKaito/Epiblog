import React from "react";
import { Image } from "react-bootstrap";

const PopularPost = () => {
  return (
    <div className="my-3">
      <div className="d-flex align-items-center">
        <Image
          src="https://miro.medium.com/v2/resize:fill:20:20/1*ZIGYDEW6NDM89R7wXTOXhw.jpeg"
          className="rounded-circle"
        />
        <p className="mx-2 popularpost-name">Ryan Tripp</p>
      </div>
      <p className="fw-bold">The Perks of Being Capable Novice</p>
    </div>
  );
};

export default PopularPost;
