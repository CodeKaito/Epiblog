import React from "react";
import { Image } from "react-bootstrap";

const SavedPost = () => {
  return (
    <div className="mt-3">
      <div className="d-flex">
        <Image
          src="https://miro.medium.com/v2/resize:fill:20:20/1*gWsczPtaGeTLIs7ELHRb7g.png"
          className="savedpost-image"
        />
        <p className="mx-2 fw-bold">Serpentarius13</p>
      </div>
      <div className="mt-2">
        <h3 className="savedpost-title">Why I choose Vue over React</h3>
      </div>
      <div className="d-flex savedpost-meta">
        <p>Oct 9, 2023</p>
        <p className="d-flex mx-2 align-items-center">.</p>
        <p>11 min read</p>
      </div>
    </div>
  );
};

export default SavedPost;
