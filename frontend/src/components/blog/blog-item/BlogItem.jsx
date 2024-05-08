import React from "react";
import { Link } from "react-router-dom";
import { Image, Container, Row, Col } from "react-bootstrap";
import { PiDotsThree } from "react-icons/pi";
import { CiBookmark } from "react-icons/ci";

import "./styles.css";

const BlogItem = (props) => {
  const { _id, title, content, category, cover, readTime, author } = props;
  const { _id: authorId } = author;
  const { name, avatar, surname } = author;
  const { value, unit } = readTime;
  return (
    <Container fluid="lg" className="article-container">
      <Link to={`/author/details/${authorId}`} className="author-link">
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
            <p>
              {name} {surname}
            </p>
          </div>
        </div>
      </Link>

      <div className="article">
        <div className="feed">
          <Link to={`/details/${_id}`}>
            <Row>
              <Col xs={8} md={8} className="feed-container">
                <div className="feed-title-container mt-3 pt-lg-none">
                  <h3 className="feed-title">{title}</h3>
                </div>
                <div className="d-none d-md-block feed-description-container">
                  <p className="feed-description">{content}</p>
                </div>
              </Col>

              {cover && (
                <Col xs={4}>
                  <Image
                    src={cover}
                    alt="image-feed"
                    className="image-feed"
                    loading="lazy"
                  />
                </Col>
              )}
            </Row>
          </Link>
          <div className="feed-bottomside">
            <div className="tag-container">
              <div className="left-side">
                <p className="readtime me-2">
                  {value} {unit} read
                </p>
                <div className="category">
                  <p className="ellipsis px-3 category-text">{category}</p>
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
