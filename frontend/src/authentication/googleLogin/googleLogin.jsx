import React from "react";
import { useAuth } from "../../context/AuthenticationContext";
import { useLocation } from "react-router-dom";
import { Button } from "react-bootstrap";

const GoogleLogin = () => {
  const { login } = useAuth();

  const location = useLocation();

  const getAccessTokenFromQuery = () => {
    const searchParams = new URLSearchParams(location.search);
    const accessToken = searchParams.get("accessToken");

    if (accessToken) {
      // Imposta il token in localStorage
      localStorage.setItem("token", accessToken);
      // Imposta isLogged a true in localStorage
      localStorage.setItem("isLogged", "true");
      // Effettua il login con l'accessToken
      login(accessToken);
    }

    return accessToken;
  };

  const handleGoogleLogin = () => {
    const googleAuthUrl = "https://epicode-api.onrender.com/api/googleLogin";
    window.open(googleAuthUrl, "_self");
  };

  // Ottieni l'accessToken e gestisci il login
  getAccessTokenFromQuery();

  return (
    <>
      <Button className="login-with-google-btn" onClick={handleGoogleLogin}>
        Login with Google
      </Button>
    </>
  );
};

export default GoogleLogin;
