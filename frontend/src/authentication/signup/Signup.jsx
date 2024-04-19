import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    birth: "",
    avatar: "",
    bio: "",
  });

  const handleAvatarPatch = async (authorId, avatarFormData) => {
    try {
      const avatarResponse = await fetch(
        `http://localhost:5000/api/${authorId}/avatar`,
        {
          method: "PATCH",
          body: avatarFormData,
        }
      );
      const avatarData = await avatarResponse.json();
      console.log("Avatar uploaded:", avatarData);
    } catch (error) {
      console.error("Errore durante l'upload dell'avatar:", error);
    }
  };

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

      const authorId = authorData._id;

      const avatarFormData = new FormData();
      avatarFormData.append("avatar", formData.avatar);

      await handleAvatarPatch(authorId, avatarFormData);
    } catch (error) {
      console.error("Errore durante la creazione dell'autore:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Signup</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formSurname">
          <Form.Label>Surname</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter surname"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formBirth">
          <Form.Label>Birth</Form.Label>
          <Form.Control
            type="date"
            name="birth"
            value={formData.birth}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formAvatar">
          <Form.Label>Avatar</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            name="avatar"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formBio">
          <Form.Label>Bio</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Signup
        </Button>
      </Form>
    </div>
  );
};

export default Signup;
