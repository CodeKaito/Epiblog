import React from "react";
import NavBar from "./components/navbar/BlogNavbar";
import Footer from "./components/footer/Footer";
// import Blog from "./pages/blog/Blog";
import NewPost from "./pages/new-post/NewPost";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Author from "./pages/author/Author";
import NotFound from "./pages/notfound/NotFound";
import Home from "./pages/home/Home";
import BlogDetails from "./pages/blog-details/BlogDetails";
import Profile from "./pages/profile/Profile";
import Posts from "./pages/posts/Posts";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/authors" element={<Author />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/details/:id" element={<BlogDetails />} />
        <Route path="/new-blog" element={<NewPost />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
