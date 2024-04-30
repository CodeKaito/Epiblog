import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import CustomLoader from "../../utils/CustomLoader";
import "../styles.css";

const Signup = ({ showLoginModal }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/authors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const authorData = await response.json();
      console.log("Author created:", authorData);
    } catch (error) {
      console.error("Errore durante la creazione dell'autore:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-100 container mt-4 mx-auto p-5">
      <h1 className="signup-title text-center mb-5">Signup on Epiblog</h1>

      {loading && <CustomLoader />}

      <Form onSubmit={handleSubmit}>
        <div className="mt-1">
          <Form.Group controlId="formUsername">
            <Form.Control
              type="text"
              placeholder="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="form-signup"
              required
            />
          </Form.Group>
        </div>
        <div className="mt-1">
          <Form.Group controlId="formEmail">
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-signup"
              required
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
              required
            />
          </Form.Group>
        </div>
        <div className="text-center">
          <Button
            variant="primary"
            type="submit"
            className="signup-button mt-5"
          >
            Signup
          </Button>
        </div>
      </Form>
      <div className="mt-3">
        Already have an account?{" "}
        <span className="login-here" onClick={showLoginModal}>
          Login here
        </span>
      </div>
    </div>
  );
};

export default Signup;
