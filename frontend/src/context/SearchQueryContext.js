import React, { createContext, useState, useContext } from "react";

// Definisco il contesto per la query di ricerca
const SearchQueryContext = createContext();

// Provider per il contesto della query di ricerca
export const SearchQueryProvider = ({ children }) => {
  // Stato della query di ricerca
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <SearchQueryContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchQueryContext.Provider>
  );
};

// Hook personalizzato per accedere al contesto della query di ricerca
export const useSearchQuery = () => useContext(SearchQueryContext);
