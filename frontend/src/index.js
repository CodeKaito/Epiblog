import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";
import { SearchQueryProvider } from "./context/SearchQueryContext";
import { AuthProvider } from "./context/AuthenticationContext";
import { CommentContextProvider } from "./context/CommentContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <SearchQueryProvider>
        <CommentContextProvider>
          <App />
        </CommentContextProvider>
      </SearchQueryProvider>
    </AuthProvider>
  </React.StrictMode>
);
