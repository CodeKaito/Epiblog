import React from "react";

const BiographyDetails = (props) => {
  const { bio } = props;
  return (
    <>
      <p>{bio ? bio : "No biography available"}</p>
    </>
  );
};

export default BiographyDetails;
