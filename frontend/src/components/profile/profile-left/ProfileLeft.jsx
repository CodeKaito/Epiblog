import React, { useState, useEffect } from "react";
import { Spinner, Tabs, Tab } from "react-bootstrap";
import BlogItem from "../../../components/blog/blog-item/BlogItem";
import Biography from "./Biography";
import { useAuth } from "../../../context/AuthenticationContext";

const ProfileLeft = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userData } = useAuth();

  useEffect(() => {
    console.log(userData);
    const fetchData = async () => {
      try {
        let authorName = userData ? userData._id : "";
        let url = `https://epicode-api.onrender.com/api/blogPosts/author/${encodeURIComponent(
          userData._id
        )}`;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();

        setPosts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data");
        setLoading(false);
      }
    };

    fetchData();
  }, [userData]);

  return (
    <>
      {loading ? (
        <div className="loader-overlay">
          <Spinner animation="border" role="status" className="loader" />
        </div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : posts.length === 0 ? (
        <div className="d-flex h-50 justify-content-center align-items-center">
          <h2>No posts found for this author.</h2>
        </div>
      ) : (
        <>
          <div>
            <h5 className="blog-title my-4">{userData ? userData.name : ""}</h5>
          </div>
          <Tabs
            defaultActiveKey="posts"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="posts" title="Posts">
              <div className="mt-5">
                {posts.map((post) => (
                  <BlogItem key={post._id} {...post} />
                ))}
              </div>
            </Tab>
            <Tab eventKey="bio" title="Bio">
              <Biography />
            </Tab>
          </Tabs>
        </>
      )}
    </>
  );
};

export default ProfileLeft;
