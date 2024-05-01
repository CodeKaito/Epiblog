import React from "react";
import { Image } from "react-bootstrap";
import { useUser } from "../../context/UserContext";
import "./style.css";

const User = () => {
  const { userData } = useUser();

  return (
    <div className="image-container pointer">
      {userData && userData.avatar && (
        <Image src={userData.avatar} alt="user-img" />
      )}
    </div>
  );
};

export default User;
