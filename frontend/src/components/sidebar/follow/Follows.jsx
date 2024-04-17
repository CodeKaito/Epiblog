import React from "react";
import Follow from "./Follow";

const Follows = () => {
  return (
    <div className="mt-5">
      <h3 className="follows-name">Who to follow</h3>
      <div>
        <Follow />
        <Follow />
        <Follow />
      </div>
    </div>
  );
};

export default Follows;
