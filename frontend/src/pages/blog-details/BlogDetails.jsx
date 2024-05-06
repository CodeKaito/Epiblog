import React, { useEffect, useState } from "react";
import { Container, Image, Row, Col } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import HomeNavBar from "../../components/navbar/HomeNavbar";
import { RiDeleteBin7Line } from "react-icons/ri";
import Sidebar from "../../components/comments/Sidebar";
import CustomLoader from "../../utils/CustomLoader";
import { IoChatbubbleOutline } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import "./styles.css";

const BlogDetails = () => {
  const { userData } = useUser();
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const createdDate = new Date(blog.createdAt);

  const formattedCreatedAt = `${createdDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })} - ${createdDate.toLocaleDateString("it-IT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })}`;

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

  const isAuthor = userData && blog.author && userData._id === blog.author._id;

  const handleToggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/blogPosts/${params.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete blog");
      }
      navigate("/");
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  return (
    <>
      {loading ? (
        <CustomLoader />
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
                      <div className="my-5 mx-3">
                        <h1 className="fs-4 blog-author-name">
                          {blog.author.name} {blog.author.surname}
                        </h1>
                        <div className="me-2 createdat">
                          Created at {formattedCreatedAt}
                        </div>
                      </div>
                    </div>
                    <div className="mb-5 comments-box d-flex align-items-center">
                      {(isAuthor ||
                        (userData && userData.role === "admin")) && (
                        <>
                          <div className="mx-3 mypost px-3">
                            <p>
                              {userData.role === "admin"
                                ? "Admin Privileges"
                                : "My post"}
                            </p>
                          </div>
                          <div className="mx-2 pointer">
                            <Link to={`/edit-blog/${blog._id}`}>
                              <FaRegEdit />
                            </Link>
                          </div>
                          <div className="mx-2 pointer" onClick={handleDelete}>
                            <RiDeleteBin7Line />
                          </div>
                        </>
                      )}
                      <div className="mx-2">
                        <IoChatbubbleOutline
                          onClick={handleToggleSidebar}
                          className="pointer"
                        />
                      </div>
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
