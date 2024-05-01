import React from "react";
import Footer from "./components/footer/Footer";
// import Blog from "./pages/blog/Blog";
import NewPost from "./pages/new-post/NewPost";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Author from "./pages/author/Author";
import NotFound from "./pages/notfound/NotFound";
import Home from "./pages/home/Home";
import BlogDetails from "./pages/blog-details/BlogDetails";
import Profile from "./pages/profile/Profile";
import Posts from "./pages/posts/Posts";
import Signup from "./authentication/signup/Signup";
import MainPage from "./authentication/mainpage/MainPage";
import { useAuth } from "./context/AuthenticationContext";

function App() {
  const { isLogged } = useAuth();
  return (
    <Router>
      <Routes>
        {!isLogged && <Route path="/" element={<MainPage />} />}
        {isLogged && (
          <>
            <Route path="/" exact element={<Home />} />
            <Route path="/authors" element={<Author />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/details/:id" element={<BlogDetails />} />
            <Route path="/new-blog" element={<NewPost />} />
            <Route path="/*" element={<NotFound />} />
          </>
        )}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
