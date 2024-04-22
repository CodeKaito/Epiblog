import React, { createContext, useState, useContext } from "react";

const SearchQueryContext = createContext();

export const SearchQueryProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <SearchQueryContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchQueryContext.Provider>
  );
};

export const useSearchQuery = () => useContext(SearchQueryContext);
