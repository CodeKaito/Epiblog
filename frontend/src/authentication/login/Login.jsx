import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import CustomLoader from "../../utils/CustomLoader";
import { useNavigate } from "react-router-dom";
import "../styles.css";
import { useAuth } from "../../context/AuthenticationContext.js";

const Login = ({ showSignupModal }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
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
        "https://epicode-api.onrender.com/api/authors"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const userData = await response.json();

      const user = userData.find((user) => user.email === formData.email);
      if (!user) {
        throw new Error("User not found");
      }

      login(user);
      localStorage.setItem("userData", JSON.stringify(user));
      localStorage.setItem("hasShownModal", "true");
      console.log(user);
      navigate("/");
    } catch (error) {
      console.error("Error during login:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-100 container mt-4 mx-auto p-5">
      <h1 className="signup-title text-center mb-5">Login to Epiblog</h1>

      {loading && <CustomLoader />}

      <Form onSubmit={handleSubmit}>
        <div className="mt-1">
          <Form.Group controlId="formEmail">
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={formData.email}
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
