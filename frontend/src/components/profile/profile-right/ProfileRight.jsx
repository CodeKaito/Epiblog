import React, { useState } from "react";
import { Container, Image } from "react-bootstrap";
import "./styles.css";
import ProfileDataEdit from "./ProfileDataEdit";

const ProfileRight = (props) => {
  const { name, surname, avatar } = props;
  const [isEditing, setIsEditing] = useState(false);

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  return (
    <Container>
      <div className="m-4 ">
        <div>
          <Image
            src={avatar}
            alt="avatar-profile"
            className="rounded-circle object-fit-cover"
            width={100}
            height={100}
          />
        </div>
        <div className="name-profile">
          {name} {surname}
        </div>
        {!isEditing && (
          <>
            <div className="edit-profile mt-4" onClick={handleEditProfile}>
              <p>Edit your profile</p>
            </div>
          </>
        )}
        {isEditing && <ProfileDataEdit onCancel={handleCancelEdit} />}
      </div>
    </Container>
  );
};

export default ProfileRight;
