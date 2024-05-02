import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");
  const isLoggedIn = localStorage.getItem("isLogged") === "true";

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isLoggedIn) {
          const data = await getUserData();
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
  }, [isLoggedIn]);

  const getUserData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/me/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP Error ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error retrieving user data:", error);
      throw error;
    }
  };

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
