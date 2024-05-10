import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthenticationContext";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { isLogged } = useAuth();
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isLogged) {
          const response = await fetch("http://localhost:5000/api/me/", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            throw new Error(`HTTP Error ${response.status}`);
          }

          const data = await response.json();
          setUserData(data);
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [isLogged, token]);

  const updateUser = (newUserData) => {
    setUserData(newUserData);
  };

  return (
    <UserContext.Provider value={{ userData, isLoading, error, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
