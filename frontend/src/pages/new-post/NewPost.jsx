import React, { useState, useEffect } from "react";
import { Button, Container, Form } from "react-bootstrap";
import NewPostNavbar from "../../components/navbar/NewPostNavbar";
import CustomAlert from "../../utils/CustomAlert";
import CustomLoader from "../../utils/CustomLoader";
import { useUser } from "../../context/UserContext";
import "./styles.css";

const NewPost = () => {
  const { userData } = useUser();
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
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

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
    if (name === "cover" && files && files[0]) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    console.log(formData);
  };

  const handleReadTimeChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      readTime: {
        ...formData.readTime,
        [name]: value,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setshowSuccessAlert(false);
    setshowErrorAlert(false);
    setLoading(true);

    try {
      const form = new FormData();
      form.append("category", formData.category);
      form.append("title", formData.title);
      form.append("readTime.value", formData.readTime.value);
      form.append("readTime.unit", formData.readTime.unit);
      form.append("content", formData.content);
      form.append("author", formData.author);
      form.append("cover", formData.cover);

      const response = await fetch(
        "https://epicode-api.onrender.com/api/blogPosts",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: form,
        }
      );

      if (response.ok) {
        setshowSuccessAlert(true);
        const blogPostsData = await response.json();
        console.log(blogPostsData);
      } else {
        throw new Error("Failed to upload form data");
      }
    } catch (error) {
      console.error("Error submitting form:", error);

      console.log("Form data:", formData);
      setshowErrorAlert(true);
    } finally {
      setLoading(false);
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

  const handleAlertClose = () => {
    setshowErrorAlert(false);
    setshowSuccessAlert(false);
  };

  return (
    <>
      <NewPostNavbar />
      <Container className="new-blog-container">
        {loading && <CustomLoader />}
        {showSuccessAlert && (
          <CustomAlert
            type="success"
            message="Post successfully created."
            show={showSuccessAlert}
            onClose={handleAlertClose}
          />
        )}

        {showErrorAlert && (
          <CustomAlert
            type="danger"
            message="Error while creating the post, try again later."
            show={showErrorAlert}
            onClose={handleAlertClose}
          />
        )}
        <Form className="mt-3" onSubmit={handleSubmit}>
          <Form.Group className="mt-3 d-flex justify-content-center">
            {formData.cover ? (
              <div className="cover-image-container position-relative">
                <img
                  src={URL.createObjectURL(formData.cover)}
                  width={800}
                  height={300}
                  alt="Cover"
                  name="cover"
                  className="cover-image object-fit-contain"
                />
                <Button
                  variant="danger"
                  className="remove-cover-button position-absolute top-50 start-50"
                  onClick={() => setFormData({ ...formData, cover: "" })}
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
                    name="cover"
                    onChange={handleChange}
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
          <div className="d-md-flex justify-content-between">
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
              <Form.Label className="readtime">Read Time in minutes</Form.Label>
              <div className="d-flex">
                <Form.Control
                  className="form-container input-readtime"
                  size="lg"
                  type="number"
                  name="value"
                  placeholder="Enter read time"
                  value={formData.readTime.value}
                  onChange={handleReadTimeChange}
                  required
                />
                <Form.Control
                  as="select"
                  className="form-container input-readtime"
                  size="lg"
                  name="unit"
                  value={formData.readTime.unit}
                  onChange={handleReadTimeChange}
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
              size="md"
              variant="outline-dark"
              className="newpost-button"
              onClick={handleReset}
            >
              Reset
            </Button>
            <Button
              type="submit"
              size="md"
              variant="dark"
              className="newpost-button"
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
