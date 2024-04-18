import React, { useState, useEffect } from "react";
import "../styles.css";
import PopularPost from "./PopularPost";

const PopularPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/blogPosts");
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        setPosts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h3 className="popularposts-title">Popular Posts</h3>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {posts.map((post) => (
            <PopularPost key={post.id} {...post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PopularPosts;
