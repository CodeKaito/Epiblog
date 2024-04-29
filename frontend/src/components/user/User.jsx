import React from "react";
import { Image } from "react-bootstrap";
import { useAuth } from "../../context/AuthenticationContext";
import "./style.css";

const User = () => {
  const { userData } = useAuth();

  return (
    <div className="image-container pointer">
      {userData && userData.avatar && (
        <Image src={userData.avatar} alt="user-img" />
      )}
    </div>
  );
};

export default User;
