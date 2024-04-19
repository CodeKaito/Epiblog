import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import BlogItem from "../../components/blog/blog-item/BlogItem";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import "./styles.css";
import PopularPosts from "../../components/sidebar/popular/PopularPosts";
import Topics from "../../components/sidebar/topics/Topics";
import Follows from "../../components/sidebar/follow/Follows";
import SavedPosts from "../../components/sidebar/saved/SavedPosts";
import HomeNavBar from "../../components/navbar/HomeNavbar";

const Posts = () => {
  const location = useLocation();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const query = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `https://epicode-api.onrender.com/api/blogPosts?searchTitle=${query}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        console.log("Query from URL:", query);

        const data = await response.json();
        console.log(data);
        setPosts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
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
                  <PopularPosts />
                  <Topics />
                  <Follows />
                  <SavedPosts />
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
