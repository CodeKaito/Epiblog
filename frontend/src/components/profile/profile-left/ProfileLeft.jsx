import React, { useState, useEffect } from "react";
import { Spinner, Tabs, Tab } from "react-bootstrap";
import BlogItem from "../../../components/blog/blog-item/BlogItem";
import Biography from "./Biography";
import { useUser } from "../../../context/UserContext";

const ProfileLeft = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userData } = useUser();

  useEffect(() => {
    if (userData && userData._id) {
      const fetchData = async () => {
        try {
          let url = `http://localhost:5000/api/blogPosts/author/${encodeURIComponent(
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
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [userData]);

  return (
    <>
      {loading ? (
        <div className="loader-overlay">
          <Spinner animation="border" role="status" className="loader" />
        </div>
      ) : (
        <>
          <div>
            <h5 className="blog-title my-4">
              {userData ? userData.name + " " + userData.surname : ""}
            </h5>
          </div>
          <Tabs
            defaultActiveKey="posts"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="posts" title="Posts">
              <div className="mt-5">
                {posts.length > 0 ? (
                  posts.map((post) => <BlogItem key={post._id} {...post} />)
                ) : (
                  <div className="d-flex justify-content-center mt-3">
                    <p>No posts found for this author</p>
                  </div>
                )}
              </div>
            </Tab>

            <Tab eventKey="bio" title="Bio">
              <Biography {...userData} />
            </Tab>
          </Tabs>
        </>
      )}
    </>
  );
};

export default ProfileLeft;
