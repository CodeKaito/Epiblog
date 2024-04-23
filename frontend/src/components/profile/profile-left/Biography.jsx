import React, { useState, useEffect } from "react";
import { Button, Container, Form } from "react-bootstrap";
import CustomAlert from "../../../utils/CustomAlert";
import "./styles.css";

const Biography = (props) => {
  const { _id } = props;
  const [bioData, setBioData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedBio, setEditedBio] = useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  useEffect(() => {
    const fetchBio = async () => {
      try {
        const response = await fetch(
          `https://epicode-api.onrender.com/api/authors/${_id}`
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
  }, [_id]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      await fetch(`https://epicode-api.onrender.com/api/authors/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bio: editedBio }),
      });
      console.log("Bio saved:", editedBio);
      setShowSuccessAlert(true);
      setIsEditing(false);

      const updatedResponse = await fetch(
        `https://epicode-api.onrender.com/api/authors/${_id}`
      );
      if (!updatedResponse.ok) {
        throw new Error("Failed to fetch updated bio");
      }
      const updatedData = await updatedResponse.json();
      setBioData(updatedData);
    } catch (error) {
      console.error("Error saving biography:", error);
      setShowErrorAlert(true);
    }
  };

  useEffect(() => {
    const hideAlerts = setTimeout(() => {
      setShowSuccessAlert(false);
      setShowErrorAlert(false);
    }, 1000);

    return () => clearTimeout(hideAlerts);
  }, [showSuccessAlert, showErrorAlert]);

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
              <Form>
                <Form.Control
                  as="textarea"
                  rows={20}
                  value={editedBio}
                  onChange={(e) => setEditedBio(e.target.value)}
                  className="biography-edit"
                />
              </Form>
            ) : (
              <p>
                {bioData && bioData.bio
                  ? bioData.bio
                  : "No biography available"}
              </p>
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
          {showSuccessAlert && (
            <CustomAlert
              type="success"
              message="Bio successfully edited."
              show={showSuccessAlert}
            />
          )}
          {showErrorAlert && (
            <CustomAlert
              type="danger"
              message="Error while editing the bio, try again later."
              show={showErrorAlert}
            />
          )}
        </Container>
      )}
    </>
  );
};

export default Biography;
