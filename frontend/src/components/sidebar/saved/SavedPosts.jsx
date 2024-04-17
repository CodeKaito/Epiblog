import React from "react";
import "../styles.css";
import SavedPost from "./SavedPost";

const SavedPosts = () => {
  return (
    <div>
      <h3 className="recentlysaved-name mt-5">Recently Saved</h3>
      <div>
        <SavedPost />
      </div>
    </div>
  );
};

export default SavedPosts;
