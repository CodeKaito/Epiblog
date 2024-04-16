import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import BlogItem from "../blog-item/BlogItem";
import { useSearchQuery } from "../../../context/SearchQueryContext";

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { searchQuery } = useSearchQuery();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = "https://epicode-api.onrender.com/api/blogPosts";

        console.log("Sono searchQuery in BlogList: "+searchQuery);

        // Aggiungi la query di ricerca come parametro se presente
        if (searchQuery) {
          url += `?searchTitle=${encodeURIComponent(searchQuery)}`;
        }

        const response = await fetch(url);
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
  }, [searchQuery]);

  return (
    <>
      {loading ? (
        <div className="loader-overlay">
          <Spinner animation="border" role="status" className="loader" />
        </div>
      ) : (
        posts.map((post) => (
          <BlogItem key={post._id} {...post} />
        ))
      )}
    </>
  );
}

export default BlogList;
