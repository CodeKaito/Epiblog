import React, { useState, useEffect } from "react";
import Follow from "./Follow";

const Follows = () => {
  const [authors, setAuthors] = useState([]);
  const loggedInUser = process.env.REACT_APP_USER_LOGGED_IN_ID;

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await fetch(
          "https://epicode-api.onrender.com/api/authors"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch authors");
        }
        const data = await response.json();
        const filteredAuthors = data.filter(
          (author) => author.id !== loggedInUser
        );
        const randomAuthors = filteredAuthors
          .sort(() => 0.5 - Math.random())
          .slice(0, 3);
        setAuthors(randomAuthors);
      } catch (error) {
        console.error("Error fetching authors:", error);
      }
    };

    fetchAuthors();
  }, [loggedInUser]);

  return (
    <div className="mt-5">
      <h3 className="follows-name">Who to follow</h3>
      <div>
        {authors.map((author) => (
          <Follow key={author._id} {...author} />
        ))}
      </div>
    </div>
  );
};

export default Follows;
