import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import CustomAlert from "../utils/CustomAlert";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

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
    setShowAlert(true);
  }, []);

  const handleAlertClose = useCallback(() => {
    setShowAlert(false);
    logout();
  }, [logout]);

  const login = (token) => {
    setToken(token);
    setIsLogged(true);
    localStorage.setItem("token", token);
    localStorage.setItem("isLogged", "true");
  };

  useEffect(() => {
    let inactivityTimeout;

    if (token) {
      const handleUserActivity = () => {
        console.log("User active");
        clearTimeout(inactivityTimeout);
        inactivityTimeout = setTimeout(logoutInactive, 3000);
      };

      const events = ["mousemove", "keydown", "keyup"];

      const eventListeners = events.map((event) => {
        document.addEventListener(event, handleUserActivity);
        return () => {
          document.removeEventListener(event, handleUserActivity);
        };
      });

      inactivityTimeout = setTimeout(logoutInactive, 3000);

      return () => {
        eventListeners.forEach((removeListener) => removeListener());
        clearTimeout(inactivityTimeout);
      };
    }
  }, [token, logoutInactive]);

  return (
    <AuthContext.Provider
      value={{
        token,
        isLogged,
        login,
        logout,
      }}
    >
      {showAlert && (
        <>
          <CustomAlert
            type="danger"
            message="Logout for inactivity."
            onClose={handleAlertClose}
          />
        </>
      )}
      {children}
    </AuthContext.Provider>
  );
};
