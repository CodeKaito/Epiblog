import React, { useState, useEffect } from "react";
import { Button, Container, Form, Spinner } from "react-bootstrap";
import NewPostNavbar from "../../components/navbar/NewPostNavbar";
import CustomAlert from "../../utils/CustomAlert";
import { useAuth } from "../../context/AuthenticationContext";
import "./styles.css";

const NewPost = () => {
  const initialFormData = {
    category: "",
    title: "",
    cover: "",
    readTime: {
      value: 1,
      unit: "min",
    },
    author: {
      name: "",
      avatar: "",
    },
    content: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [showSuccessAlert, setshowSuccessAlert] = useState(false);
  const [showErrorAlert, setshowErrorAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { userData } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData({ ...formData, cover: reader.result });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setshowSuccessAlert(false);
    setshowErrorAlert(false);
    setIsLoading(true);

    try {
      await fetch("https://epicode-api.onrender.com/api/blogPosts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log(JSON.stringify(formData));
      setshowSuccessAlert(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      setshowErrorAlert(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFormData(initialFormData);
  };

  useEffect(() => {
    const hideAlerts = setTimeout(() => {
      setshowSuccessAlert(false);
      setshowErrorAlert(false);
    }, 5000);

    return () => clearTimeout(hideAlerts);
  }, [showSuccessAlert, showErrorAlert]);

  useEffect(() => {
    if (userData) {
      setFormData({
        ...formData,
        author: {
          id: userData._id,
          name: userData.name + " " + userData.surname,
          avatar: userData.avatar,
        },
      });
    }
  }, [formData, userData]);

  return (
    <>
      <NewPostNavbar />
      <Container className="new-blog-container">
        {isLoading && (
          <div className="loader-overlay">
            <Spinner animation="border" role="status" className="loader" />
          </div>
        )}
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
        <Form className="mt-3" onSubmit={handleSubmit}>
          <Form.Group
            controlId="cover"
            className="mt-3 d-flex justify-content-center"
          >
            {formData.cover ? (
              <img
                src={formData.cover}
                width={1000}
                height={300}
                alt="Cover"
                className="cover-image"
              />
            ) : (
              <div className="upload-container">
                <input
                  id="upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="upload-input"
                />
              </div>
            )}
          </Form.Group>
          <Form.Group controlId="title" className="mt-3">
            <Form.Control
              className="form-container title-container"
              size="lg"
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <div className="d-flex justify-content-between">
            <Form.Group controlId="category" className="mt-3">
              <Form.Control
                className="form-container"
                size="lg"
                type="text"
                name="category"
                placeholder="Enter category"
                value={formData.category}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="readTime" className="mt-3">
              <Form.Label>Read Time in minutes</Form.Label>
              <div className="d-flex">
                <Form.Control
                  className="form-container input-readtime"
                  size="lg"
                  type="number"
                  name="readTime"
                  placeholder="Enter read time"
                  value={formData.readTime.value}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      readTime: { ...formData.readTime, value: e.target.value },
                    })
                  }
                  required
                />
              </div>
            </Form.Group>
          </div>
          <Form.Group controlId="content" className="mt-3">
            <Form.Control
              className="form-container"
              as="textarea"
              rows={6}
              name="content"
              placeholder="Tell your story..."
              value={formData.content}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="d-flex mt-3 justify-content-end">
            <Button
              type="reset"
              size="lg"
              variant="outline-dark"
              onClick={handleReset}
            >
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
    </>
  );
};

export default NewPost;
