import React, { useState, useEffect } from "react";
import "../styles.css";
import PopularPost from "./PopularPost";
import CustomLoader from "../../../utils/CustomLoader";

const PopularPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          "https://epicode-api.onrender.com/api/blogPosts"
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
  }, []);

  return (
    <div>
      {loading ? (
        <CustomLoader />
      ) : (
        <div>
          <h3 className="popularposts-title">Staff Picks</h3>
          {posts.map((post) => (
            <PopularPost key={post._id} {...post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PopularPosts;
