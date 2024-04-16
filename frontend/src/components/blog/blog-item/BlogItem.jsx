import React from "react";
// import { Link } from "react-router-dom";
import { Image, Container, Row, Col } from "react-bootstrap";
import { PiDotsThree } from "react-icons/pi";
import { CiBookmark } from "react-icons/ci";

import "./styles.css";
import { Link } from "react-router-dom";

const BlogItem = (props) => {
  const { _id, title, content, category, cover, readTime, author } = props;
  const { name, avatar } = author;
  const { value, unit } = readTime;
  return (
    <Container className="article-container">
      <div className="author-container">
        <div xs={2} className="author-image-container">
          <Image
            src={avatar}
            alt="author-image"
            className="author-image"
            roundedCircle
          />
        </div>
        <div className="author-name">
          <p>{name}</p>
        </div>
      </div>

      <div className="article">
        <div className="feed">
          <Link to={`/details/${_id}`}>
            <Row>
              <Col xs={8} md={8} className="feed-container">
                <div className="feed-title-container">
                  <h3 className="feed-title">{title}</h3>
                </div>
                <div className="d-none d-md-block feed-description-container">
                  <p className="feed-description">{content}</p>
                </div>
              </Col>

              <Col xs={4} md={4} className="image-feed-container">
                <Image
                  src={cover}
                  alt="image-feed"
                  className="image-feed"
                  loading="lazy"
                />
              </Col>
            </Row>
          </Link>
          <div className="feed-bottomside">
            <div className="tag-container">
              <div className="left-side">
                <p className="readtime me-2">
                  {value} {unit} read
                </p>
                <div className="category">
                  <p className="ellipsis px-2 category-text">{category}</p>
                </div>
              </div>
              <div className="right-side">
                <CiBookmark className="member" />
                <PiDotsThree className="ellipsis" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default BlogItem;
