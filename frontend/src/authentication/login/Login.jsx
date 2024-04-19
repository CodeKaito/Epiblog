import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import CustomLoader from "../../utils/CustomLoader";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../styles.css";

const Login = ({ showSignupModal }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Perform login logic here
      // For demonstration purposes, I'm just console logging the formData
      console.log("Login Data:", formData);

      // After successful login, navigate to the main page
      navigate("/"); // Redirect to main page
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
