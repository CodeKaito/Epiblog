import React, { useState, useEffect } from "react";
import "../styles.css";
import PopularPost from "./PopularPost";
import { Spinner } from "react-bootstrap";

const PopularPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          "https://epicode-api.onrender.com/api/blogPosts",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        const randomPosts = data.sort(() => 0.5 - Math.random()).slice(0, 3);
        setPosts(randomPosts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [token]);

  return (
    <div>
      <h3 className="popularposts-title">Staff Picks</h3>
      {loading ? (
        <div className="d-flex align-items-center justify-content-center sidebar">
          <Spinner
            animation="border"
            role="status"
            className="loader-sidebar"
          />
        </div>
      ) : (
        <div>
          {posts.map((post) => (
            <PopularPost key={post._id} {...post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PopularPosts;
