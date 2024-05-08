import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import BlogItem from "../../components/blog/blog-item/BlogItem";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import HomeNavBar from "../../components/navbar/HomeNavbar";
import "./styles.css";
import Follow from "../../components/sidebar/follow/Follow";

const Posts = () => {
  const location = useLocation();
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const query = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsResponse = await fetch(
          `https://epicode-api.onrender.com/api/blogPosts?searchTitle=${query}`
        );
        if (!postsResponse.ok) {
          throw new Error("Failed to fetch posts");
        }
        const postsData = await postsResponse.json();
        setPosts(postsData);

        const usersResponse = await fetch(
          `https://epicode-api.onrender.com/api/authors/?searchAuthor=${query}`
        );
        if (!usersResponse.ok) {
          throw new Error("Failed to fetch users");
        }
        const usersData = await usersResponse.json();
        setUsers(usersData);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPosts();
  }, [location, query]);

  return (
    <>
      {loading ? (
        <div className="loader-overlay">
          <Spinner animation="border" role="status" className="loader" />
        </div>
      ) : (
        <>
          <HomeNavBar />
          <Container fluid="lg">
            <Row>
              <Col sm={12} lg={8}>
                <div className="m-5 main">
                  <div className="posts-title-container mx-auto">
                    <h1 className="posts-title mb-5">
                      Posts of{" "}
                      <span className="posts-title-result">{query}</span>
                    </h1>
                  </div>

                  {posts.map((post) => (
                    <BlogItem key={post._id} {...post} />
                  ))}
                </div>
              </Col>
              <Col
                md={4}
                className="d-none d-lg-block sidebar-container sidebar"
              >
                <div className="m-5">
                  <div className="posts-title-container mx-auto">
                    <h1 className="posts-title mb-5">
                      Users: <span className="posts-title-result">{query}</span>
                    </h1>
                  </div>
                  {users.map((user) => (
                    <Follow key={user._id} {...user} />
                  ))}
                </div>
              </Col>
            </Row>
          </Container>
        </>
      )}
    </>
  );
};

export default Posts;
