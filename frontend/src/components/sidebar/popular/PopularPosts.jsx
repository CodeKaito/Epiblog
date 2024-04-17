import React from "react";
import "../styles.css";
import PopularPost from "./PopularPost";

const PopularPosts = () => {
  return (
    <div>
      <h3 className="popularposts-title">Popular Posts</h3>
      <PopularPost />
      <PopularPost />
      <PopularPost />
    </div>
  );
};

export default PopularPosts;
