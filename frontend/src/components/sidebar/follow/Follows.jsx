import React, { useState, useEffect } from "react";
import Follow from "./Follow";
import { useUser } from "../../../context/UserContext";
import { Spinner } from "react-bootstrap";

const Follows = () => {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userData } = useUser();

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/authors");
        if (!response.ok) {
          throw new Error("Failed to fetch authors");
        }
        const data = await response.json();

        let filteredAuthors = data;
        if (userData) {
          filteredAuthors = data.filter(
            (author) => author._id !== userData._id
          );
        }

        const randomAuthors = filteredAuthors
          .sort(() => 0.5 - Math.random())
          .slice(0, 3);

        setAuthors(randomAuthors);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching authors:", error);
        setLoading(false);
      }
    };

    fetchAuthors();
  }, [userData]);

  return (
    <div className="mt-5">
      <h3 className="follows-name">Who to follow</h3>
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
          {authors.map((author) => (
            <Follow key={author._id} {...author} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Follows;
