import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import CustomLoader from "../../utils/CustomLoader";
import CustomAlert from "../../utils/CustomAlert";
import "../styles.css";

const Signup = ({ showLoginModal }) => {
  const [loading, setLoading] = useState(false);
  const [showSuccessAlert, setshowSuccessAlert] = useState(false);
  const [showErrorAlert, setshowErrorAlert] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    username: "",
    email: "",
    password: "",
    avatar: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "avatar" && files && files[0]) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setshowSuccessAlert(false);
    setshowErrorAlert(false);
    setLoading(true);
    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("surname", formData.surname);
      form.append("username", formData.username);
      form.append("email", formData.email);
      form.append("password", formData.password);
      form.append("avatar", formData.avatar);

      const response = await fetch(
        "https://epicode-api.onrender.com/api/authors",
        {
          method: "POST",
          body: form,
        }
      );
      if (response.ok) {
        setshowSuccessAlert(true);
        const authorData = await response.json();
        console.log("Author created:", authorData);
      } else {
        throw new Error("Failed to upload form data");
      }
    } catch (error) {
      console.error("Errore durante la creazione dell'autore:", error);
      setshowErrorAlert(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const hideAlerts = setTimeout(() => {
      setshowSuccessAlert(false);
      setshowErrorAlert(false);
    }, 5000);

    return () => clearTimeout(hideAlerts);
  }, [showSuccessAlert, showErrorAlert]);

  return (
    <div className="w-100 container mt-4 mx-auto p-5">
      <h1 className="signup-title text-center mb-5">Signup on Epiblog</h1>

      {loading && <CustomLoader />}
      {showSuccessAlert && (
        <CustomAlert
          type="success"
          message="Post successfully created."
          show={showSuccessAlert}
        />
      )}

      {showErrorAlert && (
        <CustomAlert
          type="danger"
          message="Error while creating the post, try again later."
          show={showErrorAlert}
        />
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mt-2 d-flex justify-content-center">
          {formData.avatar ? (
            <div className="cover-image-container position-relative">
              <img
                src={URL.createObjectURL(formData.avatar)}
                height={100}
                alt="Avatar"
                name="avatar"
                className="cover-image object-fit-contain rounded-circle"
              />
              <Button
                variant="danger"
                className="remove-cover-button position-absolute top-50 start-50"
                onClick={() => setFormData({ ...formData, avatar: "" })}
              >
                Remove
              </Button>
            </div>
          ) : (
            <>
              <Form.Group className="mb-3">
                <Form.Control
                  type="file"
                  accept="image/*"
                  name="avatar"
                  onChange={handleChange}
                />
              </Form.Group>
            </>
          )}
        </Form.Group>
        <div className="mt-1 d-flex justify-content-center mx-auto">
          <Form.Group controlId="formName">
            <Form.Control
              type="text"
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-signup"
              required
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
              required
            />
          </Form.Group>
        </div>
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
