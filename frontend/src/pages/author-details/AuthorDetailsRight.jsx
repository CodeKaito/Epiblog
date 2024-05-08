import React from "react";
import { Container, Image } from "react-bootstrap";

const AuthorDetailsRight = (props) => {
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
      </div>
    </Container>
  );
};

export default AuthorDetailsRight;
