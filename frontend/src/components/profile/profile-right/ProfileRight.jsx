import React from "react";
import { Container, Image } from "react-bootstrap";
import "./styles.css";

const ProfileRight = (props) => {
  const { name, surname, avatar } = props;
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
        <div className="edit-profile mt-4">
          <p>Edit profile</p>
        </div>
      </div>
    </Container>
  );
};

export default ProfileRight;
