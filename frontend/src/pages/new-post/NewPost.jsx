import React, { useState, useEffect } from "react";
import { Button, Container, Form, Spinner } from "react-bootstrap";
import NewPostNavbar from "../../components/navbar/NewPostNavbar";
import CustomAlert from "../../utils/CustomAlert";
import { useAuth } from "../../context/AuthenticationContext";
import "./styles.css";

const NewPost = () => {
  const { userData } = useAuth();
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    cover: "",
    readTime: {
      value: 1,
      unit: "min",
    },
    author: "",
    content: "",
  });
  const [showSuccessAlert, setshowSuccessAlert] = useState(false);
  const [showErrorAlert, setshowErrorAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (userData && userData._id) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        author: userData._id,
      }));
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "cover") {
      setFormData({ ...formData, [name]: files[0] });
    } else if (name === "readTimeValue" || name === "readTimeUnit") {
      setFormData({
        ...formData,
        readTime: {
          ...formData.readTime,
          [name === "readTimeValue" ? "value" : "unit"]: value,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Read Time before submission:", formData.readTime);
    console.log("Author before submission:", formData.author);
    setshowSuccessAlert(false);
    setshowErrorAlert(false);
    setIsLoading(true);

    try {
      const form = new FormData();
      form.append("category", formData.category);
      form.append("title", formData.title);
      form.append("cover", formData.cover);
      form.append("author", formData.author);
      form.append("readTime", JSON.stringify(formData.readTime));
      form.append("content", formData.content);

      // Invia i dati del form al backend
      const response = await fetch("http://localhost:5000/api/blogPosts", {
        method: "POST",
        body: form,
      });

      if (response.ok) {
        setshowSuccessAlert(true);
        const blogPostsData = await response.json();
        console.log(blogPostsData);
        // Aggiorna eventualmente lo stato dopo il successo dell'upload
      } else {
        // Gestisci eventuali errori nel caso la richiesta non sia andata a buon fine
        throw new Error("Failed to upload form data");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setshowErrorAlert(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      category: "",
      title: "",
      cover: "",
      readTime: { value: 1, unit: "min" },
      author: userData ? userData._id : "",
      content: "",
    });
  };

  useEffect(() => {
    const hideAlerts = setTimeout(() => {
      setshowSuccessAlert(false);
      setshowErrorAlert(false);
    }, 5000);

    return () => clearTimeout(hideAlerts);
  }, [showSuccessAlert, showErrorAlert]);

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
          <Form.Group className="mt-3 d-flex justify-content-center">
            {formData.cover ? (
              <img
                src={formData.cover}
                width={1000}
                height={300}
                alt="Cover"
                className="cover-image"
              />
            ) : (
              <>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="file"
                    accept="image/*"
                    name="cover"
                    onChange={
                      ((e) => console.log(e.target.files), handleChange)
                    }
                  />
                </Form.Group>
              </>
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

            <Form.Group controlId="readTimeValue" className="mt-3">
              <Form.Label>Read Time in minutes</Form.Label>
              <div className="d-flex">
                <Form.Control
                  className="form-container input-readtime"
                  size="lg"
                  type="number"
                  name="readTimeValue"
                  placeholder="Enter read time"
                  value={formData.readTime.value}
                  onChange={handleChange}
                  required
                />
                <Form.Control
                  as="select"
                  className="form-container input-readtime"
                  size="lg"
                  name="readTimeUnit"
                  value={formData.readTime.unit}
                  onChange={handleChange}
                  required
                >
                  <option value="min">min</option>
                  <option value="hour">hour</option>
                </Form.Control>
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
