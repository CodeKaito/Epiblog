import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";

const NewBlogPost = () => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    birth: "",
    avatar: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("http://localhost:5000/api/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      console.log(JSON.stringify(formData));
      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error while submitting the form!");
    }
  };

  return (
    <Container className="new-blog-container">
      <Form className="mt-5" onSubmit={handleSubmit}>
        <Form.Group controlId="name" className="mt-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            size="lg"
            type="text"
            name="name"
            placeholder="Enter name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="surname" className="mt-3">
          <Form.Label>Surname</Form.Label>
          <Form.Control
            size="lg"
            type="text"
            name="surname"
            placeholder="Enter surname"
            value={formData.surname}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="email" className="mt-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            size="lg"
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="birth" className="mt-3">
          <Form.Label>Birth</Form.Label>
          <Form.Control
            size="lg"
            type="text"
            name="birth"
            placeholder="Enter birth"
            value={formData.birth}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="avatar" className="mt-3">
          <Form.Label>Avatar</Form.Label>
          <Form.Control
            size="lg"
            type="text"
            name="avatar"
            placeholder="Enter avatar"
            value={formData.avatar}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="d-flex mt-3 justify-content-end">
          <Button type="reset" size="lg" variant="outline-dark">
            Reset
          </Button>
          <Button
            type="submit"
            size="lg"
            variant="dark"
            style={{
              marginLeft: "1em",
            }}
          >
            Submit
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default NewBlogPost;
