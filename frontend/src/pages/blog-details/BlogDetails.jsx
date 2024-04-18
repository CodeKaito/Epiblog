import React, { useEffect, useState } from "react";
import { Container, Image, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import "./styles.css";
import CommentArea from "../../components/comments/comment-area/CommentArea";

const BlogDetails = () => {
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(
          `https://epicode-api.onrender.com/api/blogPosts/${params.id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch blog");
        }
        const data = await response.json();
        setBlog(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchBlog();
  }, [params.id, navigate]);

  return (
    <>
      {loading ? (
        <div className="loader-overlay">
          <Spinner animation="border" role="status" className="loader" />
        </div>
      ) : (
        <div className="mt-5 page">
          <Container className="blog-container">
            <h1 className="mt-5 blog-title">{blog.title}</h1>
            <div className="d-flex align-items-center">
              <Image
                src={blog.author.avatar}
                className="rounded-circle object-fit-cover"
                width={50}
                height={50}
              />
              <h1 className="fs-4 mx-3 my-5 blog-author-name">
                {blog.author.name}
              </h1>
            </div>

            <p>{blog.content}</p>
            {blog.cover && (
              <div className="blog-cover-container mt-4">
                <Image
                  src={blog.cover}
                  alt="cover-img"
                  className="blog-cover"
                />
              </div>
            )}
            <CommentArea />
          </Container>
        </div>
      )}
    </>
  );
};

export default BlogDetails;
