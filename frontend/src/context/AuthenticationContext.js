import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const [sessionExpired, setSessionExpired] = useState(false);

  const checkTokenValidity = useCallback(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) return;

    const { exp } = JSON.parse(atob(storedToken.split(".")[1]));

    if (Date.now() >= exp * 1000) {
      setSessionExpired(true);
      localStorage.setItem("sessionExpired", "true");
    } else {
      setSessionExpired(false);
      localStorage.removeItem("sessionExpired");
    }
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const isLoggedIn = localStorage.getItem("isLogged");

    if (storedToken && isLoggedIn === "true") {
      setToken(storedToken);
      setIsLogged(true);

      checkTokenValidity();
    }
  }, [checkTokenValidity]);

  useEffect(() => {
    const interval = setInterval(() => {
      checkTokenValidity();
    }, 2 * 60 * 1000);

    return () => clearInterval(interval);
  }, [checkTokenValidity]);

  useEffect(() => {
    if (sessionExpired) {
      setToken("");
      setIsLogged(false);
      localStorage.removeItem("token");
      localStorage.removeItem("isLogged");
      alert("Session expired. Please login again.");
    }
  }, [sessionExpired]);

  const login = (token) => {
    setToken(token);
    setIsLogged(true);
    localStorage.setItem("token", token);
    localStorage.setItem("isLogged", "true");
  };

  const logout = () => {
    setIsLogged(false);
    setToken("");
    localStorage.removeItem("token");
    localStorage.removeItem("isLogged");
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        isLogged,
        login,
        logout,
        sessionExpired,
        setSessionExpired,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
