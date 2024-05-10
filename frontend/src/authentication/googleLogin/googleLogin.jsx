import React from "react";
import { useAuth } from "../../context/AuthenticationContext";
import { useLocation } from "react-router-dom";
import { Button } from "react-bootstrap";

const GoogleLogin = () => {
  const { login } = useAuth();

  const location = useLocation();
  const getAccessTokenFromQuery = () => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get("accessToken");
  };
  const accessToken = getAccessTokenFromQuery();

  login(accessToken);

  const handleGoogleLogin = () => {
    const googleAuthUrl = "http://localhost:5000/api/googleLogin";
    window.open(googleAuthUrl, "_self");
  };

  return (
    <>
      <Button className="login-with-google-btn" onClick={handleGoogleLogin}>
        Login with Google
      </Button>
    </>
  );
};

export default GoogleLogin;
