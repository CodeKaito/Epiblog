import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import CustomLoader from "../../../utils/CustomLoader";
import { useUser } from "../../../context/UserContext";

const ProfileDataEdit = ({ onCancel }) => {
  const { userData, updateUser } = useUser();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    birth: "",
    password: "",
    avatar: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    setFormData({
      name: userData.name,
      surname: userData.surname,
      email: userData.email,
      birth: userData.birth,
      password: userData.password,
      avatar: userData.avatar,
    });
  }, [userData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "avatar" && files && files[0]) {
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
      form.append("password", formData.password);
      form.append("avatar", formData.avatar);

      const response = await fetch(
        `http://localhost:5000/api/authors/${userData._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: form,
        }
      );
      console.log("Profile updated successfully!");
      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      updateUser({
        ...userData,
        name: formData.name,
        surname: formData.surname,
        email: formData.email,
        birth: formData.birth,
        avatar: formData.avatar,
      });
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4">
      <h1 className="mb-5">Edit your profile</h1>

      {loading && <CustomLoader />}

      <Form onSubmit={handleSubmit}>
        <div className="d-flex gap-2">
          <Form.Group controlId="formName">
            <Form.Label className="text-center">Name</Form.Label>
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
            <Form.Label className="text-center">Surname</Form.Label>
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
            <Form.Label className="text-center">Email</Form.Label>
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
            <Form.Label className="text-center">Password</Form.Label>
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
        <div className="mt-2">
          <Form.Group controlId="formAvatar">
            <Form.Label className="text-center">
              Choose your avatar..
            </Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              name="avatar"
              onChange={handleChange}
              className="form-signup"
            />
          </Form.Group>
        </div>
        <div className="mt-1">
          <Form.Group controlId="formBirth">
            <Form.Label className="text-center">
              Insert your birthdate..
            </Form.Label>
            <Form.Control
              type="date"
              name="birth"
              value={formData.birth}
              onChange={handleChange}
              className="form-signup"
            />
          </Form.Group>
        </div>
        <div className="mt-2">
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
          <Button variant="secondary" className="mx-2" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ProfileDataEdit;
