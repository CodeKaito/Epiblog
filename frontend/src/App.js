import React from "react";
import NavBar from "./components/navbar/BlogNavbar";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
// import Blog from "./pages/blog/Blog";
import NewPost from "./pages/new/NewPost";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Author from "./pages/author/Author";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/authors" element={<Author />} />
        {/* <Route path="/details/:id" element={<Blog />} /> */}
        <Route path="/new-blog" element={<NewPost />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
