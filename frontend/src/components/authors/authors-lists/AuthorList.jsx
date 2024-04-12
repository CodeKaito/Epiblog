import React, { useState, useEffect } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import AuthorItem from "../authors-item/AuthorItem";

const AuthorList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://epicode-api.onrender.com/api/authors");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setPosts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : (
        <Row>
          {posts.map((post) => (
            <Col
              key={post._id}
              md={4}
              style={{
                marginBottom: 50,
              }}
            >
              <AuthorItem {...post} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default AuthorList;
