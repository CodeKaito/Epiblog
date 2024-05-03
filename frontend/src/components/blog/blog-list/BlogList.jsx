import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import BlogItem from "../blog-item/BlogItem";
import { useSearchQuery } from "../../../context/SearchQueryContext";
import "./styles.css";

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { searchQuery } = useSearchQuery();
  const [noResults, setNoResults] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = "https://epicode-api.onrender.com/api/blogPosts";

        if (searchQuery) {
          url += `?searchTitle=${encodeURIComponent(searchQuery)}`;
        }

        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();

        if (data.length === 0) {
          setNoResults(true);
        } else {
          setNoResults(false);
          setPosts(data);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [searchQuery, token]);

  // Aggiungi questa parte per reimpostare l'elenco dei post quando la query di ricerca è vuota
  useEffect(() => {
    if (!searchQuery) {
      const fetchAllPosts = async () => {
        try {
          const response = await fetch(
            "https://epicode-api.onrender.com/api/blogPosts",
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          const data = await response.json();

          setPosts(data);
          setNoResults(false);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          setLoading(false);
        }
      };

      fetchAllPosts();
    }
  }, [searchQuery, token]);

  return (
    <>
      {loading ? (
        <div className="loader-overlay">
          <Spinner animation="border" role="status" className="loader" />
        </div>
      ) : (
        <>
          {noResults ? (
            <div className="no-results">No results</div>
          ) : (
            posts.map((post) => <BlogItem key={post._id} {...post} />)
          )}
        </>
      )}
    </>
  );
};

export default BlogList;
