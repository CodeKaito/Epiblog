import React, { useState, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import "./styles.css";

const Biography = () => {
  const [bioData, setBioData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedBio, setEditedBio] = useState("");

  useEffect(() => {
    const userId = process.env.REACT_APP_USER_LOGGED_IN_ID;
    const fetchBio = async () => {
      try {
        const response = await fetch(
          `https://epicode-api.onrender.com/api/authors/${userId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setBioData(data);
        setEditedBio(data.bio);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching biography:", error);
        setError("Failed to fetch biography");
        setLoading(false);
      }
    };

    fetchBio();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const userId = process.env.REACT_APP_USER_LOGGED_IN_ID;
      await fetch(`https://epicode-api.onrender.com/api/authors/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bio: editedBio }),
      });
      console.log("Bio saved:", editedBio);
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving biography:", error);
    }
  };

  return (
    <>
      {loading ? (
        <div>Loading biography...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <Container className="my-5 px-3 biography-container">
          <div className="my-5">
            {isEditing ? (
              <input
                type="text"
                value={editedBio}
                onChange={(e) => setEditedBio(e.target.value)}
                className="form-control biography-edit"
              />
            ) : (
              <p>{bioData ? bioData.bio : "No biography available"}</p>
            )}
          </div>
          <div className="d-flex justify-content-end mb-3">
            {isEditing ? (
              <Button onClick={handleSave} className="biography-button">
                Save
              </Button>
            ) : (
              <Button onClick={handleEdit} className="biography-button">
                Edit
              </Button>
            )}
          </div>
        </Container>
      )}
    </>
  );
};

export default Biography;
