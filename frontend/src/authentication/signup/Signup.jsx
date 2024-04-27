import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import CustomLoader from "../../utils/CustomLoader";
import "../styles.css";

const Signup = ({ showLoginModal }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    birth: "",
    avatar: null,
    bio: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "avatar") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("surname", formData.surname);
      form.append("email", formData.email);
      form.append("birth", formData.birth);
      form.append("avatar", formData.avatar);
      form.append("bio", formData.bio);

      const response = await fetch(
        "https://epicode-api.onrender.com/api/authors",
        {
          method: "POST",
          body: form,
        }
      );
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
        <div className="d-flex gap-2">
          <Form.Group controlId="formName">
            <Form.Control
              type="text"
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-signup"
            />
          </Form.Group>
          <Form.Group controlId="formSurname">
            <Form.Control
              type="text"
              placeholder="Surname"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              className="form-signup"
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
            />
          </Form.Group>
        </div>
        <div className="mt-1">
          {" "}
          <Form.Group controlId="formBirth">
            <Form.Control
              type="date"
              name="birth"
              value={formData.birth}
              onChange={handleChange}
              className="form-signup"
            />
          </Form.Group>
        </div>
        <div className="mt-1">
          <Form.Group controlId="formAvatar">
            <Form.Control
              type="file"
              accept="image/*"
              name="avatar"
              onChange={handleChange}
              className="form-signup"
            />
          </Form.Group>
        </div>
        <div className="mt-3">
          <Form.Group controlId="formBio">
            <Form.Label className="text-center">
              Write something about yourself..
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="form-signup text-center"
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
