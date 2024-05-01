import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";
import { SearchQueryProvider } from "./context/SearchQueryContext";
import { AuthContextProvider } from "./context/AuthenticationContext";
import { CommentContextProvider } from "./context/CommentContext";
import { UserProvider } from "./context/UserContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <UserProvider>
        <SearchQueryProvider>
          <CommentContextProvider>
            <App />
          </CommentContextProvider>
        </SearchQueryProvider>
      </UserProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
