import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Posts = () => {
  const location = useLocation();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const query = new URLSearchParams(location.search).get("query");
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
  }, [location]);

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h1>Posts</h1>
          <ul>
            {posts.map((post) => (
              <li key={post._id}>{post.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Posts;
