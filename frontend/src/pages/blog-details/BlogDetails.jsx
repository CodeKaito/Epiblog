import React, { useEffect, useState } from "react";
import { Container, Image, Spinner, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { IoChatbubbleOutline } from "react-icons/io5";
import "./styles.css";
import HomeNavBar from "../../components/navbar/HomeNavbar";
import Sidebar from "../../components/comments/Sidebar";

const BlogDetails = () => {
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false);
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
        console.log(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchBlog();
  }, [params.id, navigate]);

  const handleToggleSidebar = () => {
    setTimeout(() => {
      setShowSidebar(!showSidebar);
    }, 100);
  };

  return (
    <>
      {loading ? (
        <div className="loader-overlay">
          <Spinner animation="border" role="status" className="loader" />
        </div>
      ) : (
        <>
          <HomeNavBar />
          <Container>
            <Row>
              <Col md={7} className="mx-auto">
                <div className="mt-5 page">
                  <div className="blog-container">
                    <h1 className="mt-5 blog-title">{blog.title}</h1>
                    <div className="d-flex align-items-center">
                      <Image
                        src={blog.author.avatar}
                        className="rounded-circle object-fit-cover"
                        width={50}
                        height={50}
                      />
                      <h1 className="fs-4 mx-3 my-5 blog-author-name">
                        {blog.author.name} {blog.author.surname}
                      </h1>
                    </div>
                    <div className="mb-5 comments-box">
                      <IoChatbubbleOutline
                        onClick={handleToggleSidebar}
                        className="pointer"
                      />
                    </div>
                    <div className="mb-4 d-flex">
                      <p className="ellipsis px-3 category">{blog.category}</p>
                    </div>
                    <p>{blog.content}</p>
                    {blog.cover && (
                      <div className="d-flex justify-content-center mt-4">
                        <Image
                          src={blog.cover}
                          alt="cover-img"
                          width={500}
                          className="blog-cover"
                        />
                      </div>
                    )}
                    <Sidebar
                      isVisible={showSidebar}
                      handleClose={() => setShowSidebar(false)}
                      postId={params.id}
                    />
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </>
      )}
    </>
  );
};

export default BlogDetails;
