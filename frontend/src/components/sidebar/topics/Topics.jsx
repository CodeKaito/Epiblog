import React from "react";
import "../styles.css";

const Topics = () => {
  return (
    <div className="mt-5">
      <h3 className="recommendedtopics-name">Recommended topics</h3>
      <div className="recommendedtopics-container mt-4">
        <div className="m-1 topic-container">Programming</div>
        <div className="m-1 topic-container">Data Science</div>
        <div className="m-1 topic-container">Technology</div>
        <div className="m-1 topic-container">Self Improvement</div>
        <div className="m-1 topic-container">Writing</div>
        <div className="m-1 topic-container">Relationship</div>
        <div className="m-1 topic-container">Machine Learning</div>
      </div>
    </div>
  );
};

export default Topics;
