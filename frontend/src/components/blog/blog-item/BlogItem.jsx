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
              <Col lg={8} className="feed-container">
                <div className="feed-title-container">
                  <h3 className="feed-title">{title}</h3>
                </div>
                <div className="feed-description-container">
                  <p className="feed-description">{content}</p>
                </div>
              </Col>

              <Col lg={4} className="image-feed-container">
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
                <p className="author-date">
                  <span>{value} {unit} read</span>
                  <span className="mx-2">-</span>
                </p>
                <div className="category">
                  <p className="ellipsis px-2">{category}</p>
                </div>
                <span className="mx-2">-</span>
                <p>Selected for you</p>
                <span className="mx-2">-</span>
                <CiBookmark className="member" />
              </div>
              <div className="right-side">
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
