import React, { useState, useEffect } from "react";
import { Col, Row, Button } from "react-bootstrap";
import AuthorItem from "../authors-item/AuthorItem";
import "./styles.css";
import CustomLoader from "../../../utils/CustomLoader";

const AuthorList = () => {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleAuthors, setVisibleAuthors] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://epicode-api.onrender.com/api/authors"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        const shuffledAuthors = shuffleArray(data);
        setAuthors(shuffledAuthors);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const showMoreAuthors = () => {
    setVisibleAuthors((prevVisibleAuthors) => prevVisibleAuthors + 10);
  };

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  return (
    <>
      {loading ? (
        <CustomLoader />
      ) : (
        <>
          <Row>
            {authors.slice(0, visibleAuthors).map((author) => (
              <Col
                key={author._id}
                sm={6}
                lg={4}
                style={{
                  marginBottom: 50,
                }}
              >
                <AuthorItem {...author} />
              </Col>
            ))}
          </Row>
          {visibleAuthors < authors.length && (
            <div className="text-center">
              <Button onClick={showMoreAuthors} className="card-button">
                Show More Authors
              </Button>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default AuthorList;
