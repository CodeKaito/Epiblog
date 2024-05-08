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
  const [inactiveTimer, setInactiveTimer] = useState(null);

  const logout = useCallback(() => {
    setIsLogged(false);
    setToken("");
    localStorage.removeItem("token");
    localStorage.setItem("isLogged", "false");
    if (window.location.pathname !== "/") {
      window.location.href = "/";
    }
  }, []);

  const logoutInactive = useCallback(() => {
    alert("Sei stato disconnesso per inattività.");
    logout();
  }, [logout]);

  const login = (token) => {
    setToken(token);
    setIsLogged(true);
    localStorage.setItem("token", token);
    localStorage.setItem("isLogged", "true");

    setInactiveTimer(
      setTimeout(() => {
        logoutInactive();
      }, 30000000)
    );
  };

  const resetInactiveTimer = useCallback(() => {
    clearTimeout(inactiveTimer);
    setInactiveTimer(
      setTimeout(() => {
        logoutInactive();
      }, 30000000)
    );
  }, [inactiveTimer, logoutInactive]);

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
    const handleUserActivity = () => {
      clearTimeout(inactiveTimer);
      resetInactiveTimer();
    };

    const handleAlertInteraction = () => {
      window.addEventListener("mousemove", handleUserActivity);
      window.addEventListener("keydown", handleUserActivity);
    };

    if (sessionExpired) {
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("keydown", handleUserActivity);
      alert("Session expired. Please login again.");
      handleAlertInteraction();
    } else {
      handleAlertInteraction();
    }

    return () => {
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("keydown", handleUserActivity);
    };
  }, [inactiveTimer, resetInactiveTimer, sessionExpired]);

  return (
    <AuthContext.Provider
      value={{
        token,
        isLogged,
        login,
        logout,
        sessionExpired,
        setSessionExpired,
        resetInactiveTimer,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
