import React, { useState, useEffect } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import NewPostNavbar from "../../components/navbar/NewPostNavbar";
import CustomAlert from "../../utils/CustomAlert";
import CustomLoader from "../../utils/CustomLoader";
import "./styles.css";

const EditPost = () => {
  const [blog, setBlog] = useState({});
  const initialFormData = {
    category: blog.category || "",
    title: blog.title || "",
    cover: "",
    readTime: {
      value: blog.readTime ? blog.readTime.value : 1,
      unit: blog.readTime ? blog.readTime.unit : "min",
    },
    author: blog.author || "",
    content: blog.content || "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [showSuccessAlert, setshowSuccessAlert] = useState(false);
  const [showErrorAlert, setshowErrorAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();

  const token = localStorage.getItem("token");

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

  useEffect(() => {
    const fetchBlogPost = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:5000/api/blogPosts/${params.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setBlog(data);
          setFormData({
            category: data.category,
            title: data.title,
            cover: data.cover,
            readTime: {
              value: data.readTime.value,
              unit: data.readTime.unit,
            },
            author: data.author,
            content: data.content,
          });
          setLoading(false);
        } else {
          throw new Error("Failed to fetch blog post");
        }
      } catch (error) {
        console.error("Error fetching blog post:", error);
        setshowErrorAlert(true);
        setLoading(false);
      }
    };

    fetchBlogPost();
  }, [params.id]);

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
      form.append("author", formData.author._id);
      form.append("cover", formData.cover);

      const response = await fetch(
        `https://epicode-api.onrender.com/api/blogPosts/${params.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: form,
        }
      );

      if (response.ok) {
        setshowSuccessAlert(true);
      } else {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      console.log(formData);
      setshowErrorAlert(true);
    } finally {
      setLoading(false);
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

  return (
    <>
      <NewPostNavbar />
      <Container className="new-blog-container">
        {loading && <CustomLoader />}
        {showSuccessAlert && (
          <CustomAlert
            type="success"
            message="Post successfully edited."
            show={showSuccessAlert}
          />
        )}

        {showErrorAlert && (
          <CustomAlert
            type="danger"
            message="Error while editing the post, try again later."
            show={showErrorAlert}
          />
        )}
        <Form className="mt-3" onSubmit={handleSubmit}>
          <Form.Group controlId="formCover">
            <Form.Control
              type="file"
              accept="image/*"
              name="cover"
              onChange={handleChange}
            />
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
                  name="readTimeValue"
                  placeholder="Enter read time"
                  value={formData.readTime.value}
                  onChange={handleReadTimeChange}
                  required
                />
                <Form.Control
                  as="select"
                  className="form-container input-readtime"
                  size="lg"
                  name="readTimeUnit"
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

export default EditPost;
