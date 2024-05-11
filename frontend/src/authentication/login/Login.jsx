import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import CustomLoader from "../../utils/CustomLoader";
import { useNavigate } from "react-router-dom";
import "../styles.css";
import { useAuth } from "../../context/AuthenticationContext.js";
import CustomAlert from "../../utils/CustomAlert.jsx";
import GoogleLogin from "../googleLogin/googleLogin.jsx";

const Login = ({ showSignupModal }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        "https://epicode-api.onrender.com/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to log in");
      }

      const userData = await response.json();

      // Controllo se il token è presente nella risposta
      if (!userData.token) {
        throw new Error("Token not found in response");
      }

      // Utilizzo la funzione di login dal contesto di autenticazione per impostare lo stato di autenticazione
      login(userData.token, userData);

      // Reindirizzo l'utente alla home page
      navigate("/");
    } catch (error) {
      setError(true);
      console.error("Error during login:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAlertClose = () => {
    setError(false);
  };

  return (
    <div className="w-100 container mt-4 mx-auto p-5">
      {error && (
        <CustomAlert
          type="danger"
          message="Invalid username or password."
          onClose={handleAlertClose}
        />
      )}
      <h1 className="signup-title text-center mb-3">Login to Epiblog</h1>

      {loading && <CustomLoader />}

      <div className="d-flex justify-content-center">
        <GoogleLogin />
      </div>

      <Form onSubmit={handleSubmit} className="mt-4">
        <div className="mt-1">
          <Form.Group controlId="formUsername">
            <Form.Control
              type="text"
              placeholder="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="form-signup"
            />
          </Form.Group>
        </div>
        <div className="mt-1">
          <Form.Group controlId="formPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-signup"
            />
          </Form.Group>
        </div>
        <div className="text-center">
          <Button
            variant="primary"
            type="submit"
            className="signup-button mt-5"
          >
            Login
          </Button>
        </div>
      </Form>
      <div className="mt-3">
        Don't have an account?{" "}
        <span className="login-here" onClick={showSignupModal}>
          Sign up here
        </span>
      </div>
    </div>
  );
};

export default Login;
