import React, { useState } from "react";
import CustomAlert from "../../../utils/CustomAlert";
import { Image, Form } from "react-bootstrap";
import { BsTrash2 } from "react-icons/bs";
import { MdEditNote } from "react-icons/md";

const CommentSingle = ({
  author,
  createdAt,
  content,
  postId,
  commentId,
  setComments,
}) => {
  const { name, surname, avatar } = author;

  const createdDate = new Date(createdAt);

  const formattedCreatedAt = `${createdDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })} - ${createdDate.toLocaleDateString("it-IT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })}`;

  const [isEditing, setIsEditing] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [editedContent, setEditedContent] = useState(content);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedContent(content);
  };

  const handleConfirmEdit = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/blogPosts/${postId}/comments/${commentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: editedContent,
          }),
        }
      );

      if (response.ok) {
        setIsEditing(false);
        setShowAlert(true);
        setAlertType("success");
        setAlertMessage("Comment updated successfully");
        setTimeout(() => {
          setShowAlert(false);
        }, 1000);

        const updatedCommentsResponse = await fetch(
          `http://localhost:5000/api/blogPosts/${postId}/comments`
        );
        const updatedCommentsData = await updatedCommentsResponse.json();

        setComments(updatedCommentsData);
      } else {
        throw new Error("Failed to update comment");
      }
    } catch (error) {
      setShowAlert(true);
      setAlertType("danger");
      setAlertMessage("Failed to update comment");
      setTimeout(() => {
        setShowAlert(false);
      }, 1000);
      console.error("Error updating comment:", error);
    }
  };

  const handleDelete = async () => {
    if (!showConfirmDelete) {
      setShowConfirmDelete(true);
    } else {
      try {
        const response = await fetch(
          `http://localhost:5000/api/blogPosts/${postId}/comments/${commentId}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          setShowAlert(true);
          setAlertType("success");
          setAlertMessage("Comment deleted successfully");
          setTimeout(() => {
            setShowAlert(false);
          }, 1000);

          const updatedCommentsResponse = await fetch(
            `http://localhost:5000/api/blogPosts/${postId}/comments`
          );
          const updatedCommentsData = await updatedCommentsResponse.json();

          setComments(updatedCommentsData);
        } else {
          throw new Error("Failed to delete comment");
        }
      } catch (error) {
        setShowAlert(true);
        setAlertType("danger");
        setAlertMessage("Failed to delete comment");
        setTimeout(() => {
          setShowAlert(false);
        }, 1000);
        console.error("Error deleting comment:", error);
      } finally {
        setShowConfirmDelete(false);
      }
    }
  };

  return (
    <div className="comment-single-container mb-4">
      {showAlert && <CustomAlert type={alertType} message={alertMessage} />}
      <div className="d-flex">
        <div className=" d-flex align-items-center">
          <Image
            src={avatar}
            width={30}
            height={30}
            className="rounded-circle object-fit-cover me-3"
          />
        </div>

        <div className="d-flex flex-column">
          <span className="comment-author">
            {name} {surname}
          </span>
          <span className="comment-createdat">{formattedCreatedAt}</span>
        </div>
      </div>
      <div className="mt-2">
        {isEditing ? (
          <Form.Control
            as="textarea"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
        ) : (
          <p className="comment-content">{content}</p>
        )}
      </div>
      <div className="d-flex justify-content-between">
        <div className="d-flex mt-2 tag">
          <span className="tag-text">Me</span>
        </div>
        <div>
          {isEditing ? (
            <div className="d-flex align-items-center">
              <div className="mx-2">
                <span className="cancel pointer" onClick={handleCancelEdit}>
                  Cancel
                </span>
              </div>

              <div>
                <span className="confirm pointer" onClick={handleConfirmEdit}>
                  Confirm
                </span>
              </div>
            </div>
          ) : (
            <>
              {showConfirmDelete ? (
                <div className="d-flex align-items-center">
                  <div className="mx-2">
                    <span
                      className="cancel pointer"
                      onClick={() => setShowConfirmDelete(false)}
                    >
                      Cancel
                    </span>
                  </div>

                  <div>
                    <span
                      className="confirm-deletion pointer"
                      onClick={handleDelete}
                    >
                      Confirm Deletion
                    </span>
                  </div>
                </div>
              ) : (
                <BsTrash2 className="pointer bstrash" onClick={handleDelete} />
              )}
              {!showConfirmDelete && (
                <MdEditNote
                  className="pointer MdEditNote mx-2 fs-5"
                  onClick={handleEdit}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentSingle;
